<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/common.php';

$idUsuario = exigirSesion();

function obtenerCarrito(PDO $pdo, int $idUsuario): array {
    $stmt = $pdo->prepare(
        'SELECT ic.id_item_carrito, ic.id_variante, ic.cantidad,
                p.id_producto, p.nombre AS title, p.imagen_url AS img,
                p.precio_base AS price, vp.talla, vp.color, vp.stock
         FROM carrito c
         INNER JOIN items_carrito ic ON ic.id_carrito = c.id_carrito
         INNER JOIN variantes_productos vp ON vp.id_variante = ic.id_variante
         INNER JOIN productos p ON p.id_producto = vp.id_producto
         WHERE c.id_usuario = ?
         ORDER BY ic.id_item_carrito ASC'
    );
    $stmt->execute([$idUsuario]);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$row) {
        $row['price'] = (float)$row['price'];
        $row['cantidad'] = (int)$row['cantidad'];
        $row['stock'] = (int)$row['stock'];
    }
    return $rows;
}

function idCarrito(PDO $pdo, int $idUsuario): int {
    $stmt = $pdo->prepare('SELECT id_carrito FROM carrito WHERE id_usuario = ? LIMIT 1');
    $stmt->execute([$idUsuario]);
    $id = $stmt->fetchColumn();
    if (!$id) {
        $ins = $pdo->prepare('INSERT INTO carrito (id_usuario, fecha_actualizacion) VALUES (?, NOW())');
        $ins->execute([$idUsuario]);
        return (int)$pdo->lastInsertId();
    }
    return (int)$id;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    respuesta(['ok'=>true,'carrito'=>obtenerCarrito($pdo,$idUsuario)]);
}

$d = datosEntrada();
$action = (string)($d['action'] ?? '');

try {
    $cartId = idCarrito($pdo, $idUsuario);

    if ($action === 'add') {
        $productId = (int)($d['product_id'] ?? 0);
        $talla = trim((string)($d['talla'] ?? ''));
        $color = trim((string)($d['color'] ?? ''));
        $quantity = max(1, (int)($d['quantity'] ?? 1));

        $v = $pdo->prepare('SELECT id_variante, stock FROM variantes_productos WHERE id_producto = ? AND talla = ? AND color = ? LIMIT 1');
        $v->execute([$productId,$talla,$color]);
        $variant = $v->fetch();
        if (!$variant) respuesta(['ok'=>false,'mensaje'=>'La combinación de talla y color no está disponible.'],404);
        if ((int)$variant['stock'] < $quantity) respuesta(['ok'=>false,'mensaje'=>'No hay suficiente stock para esa cantidad.'],409);

        $find = $pdo->prepare('SELECT id_item_carrito, cantidad FROM items_carrito WHERE id_carrito = ? AND id_variante = ? LIMIT 1');
        $find->execute([$cartId,(int)$variant['id_variante']]);
        $existing = $find->fetch();

        if ($existing) {
            $newQty = (int)$existing['cantidad'] + $quantity;
            if ($newQty > (int)$variant['stock']) respuesta(['ok'=>false,'mensaje'=>'La cantidad supera el stock disponible.'],409);
            $up = $pdo->prepare('UPDATE items_carrito SET cantidad = ? WHERE id_item_carrito = ?');
            $up->execute([$newQty,(int)$existing['id_item_carrito']]);
        } else {
            $ins = $pdo->prepare('INSERT INTO items_carrito (id_carrito,id_variante,cantidad) VALUES (?,?,?)');
            $ins->execute([$cartId,(int)$variant['id_variante'],$quantity]);
        }
        $pdo->prepare('UPDATE carrito SET fecha_actualizacion = NOW() WHERE id_carrito = ?')->execute([$cartId]);
        respuesta(['ok'=>true,'mensaje'=>'Producto agregado al carrito.','carrito'=>obtenerCarrito($pdo,$idUsuario)]);
    }

    if ($action === 'update') {
        $itemId = (int)($d['item_id'] ?? 0);
        $change = (int)($d['change'] ?? 0);
        $stmt = $pdo->prepare(
            'SELECT ic.id_item_carrito, ic.cantidad, vp.stock
             FROM items_carrito ic INNER JOIN carrito c ON c.id_carrito=ic.id_carrito
             INNER JOIN variantes_productos vp ON vp.id_variante=ic.id_variante
             WHERE ic.id_item_carrito=? AND c.id_usuario=? LIMIT 1'
        );
        $stmt->execute([$itemId,$idUsuario]);
        $item = $stmt->fetch();
        if (!$item) respuesta(['ok'=>false,'mensaje'=>'Artículo no encontrado.'],404);
        $newQty = (int)$item['cantidad'] + $change;
        if ($newQty <= 0) {
            $pdo->prepare('DELETE FROM items_carrito WHERE id_item_carrito=?')->execute([$itemId]);
        } elseif ($newQty <= (int)$item['stock']) {
            $pdo->prepare('UPDATE items_carrito SET cantidad=? WHERE id_item_carrito=?')->execute([$newQty,$itemId]);
        } else {
            respuesta(['ok'=>false,'mensaje'=>'No puedes superar el stock disponible.'],409);
        }
        respuesta(['ok'=>true,'carrito'=>obtenerCarrito($pdo,$idUsuario)]);
    }

    if ($action === 'remove') {
        $itemId = (int)($d['item_id'] ?? 0);
        $stmt = $pdo->prepare(
            'DELETE ic FROM items_carrito ic
             INNER JOIN carrito c ON c.id_carrito=ic.id_carrito
             WHERE ic.id_item_carrito=? AND c.id_usuario=?'
        );
        $stmt->execute([$itemId,$idUsuario]);
        respuesta(['ok'=>true,'carrito'=>obtenerCarrito($pdo,$idUsuario)]);
    }

    if ($action === 'checkout') {
        $direccion = trim((string)($d['direccion'] ?? ''));
        $metodo = trim((string)($d['metodo_pago'] ?? 'Pendiente'));
        $promoCode = trim((string)($d['promo_code'] ?? ''));
        if ($direccion === '') respuesta(['ok'=>false,'mensaje'=>'Ingresa una dirección de envío.'],422);

        $items = obtenerCarrito($pdo,$idUsuario);
        if (!$items) respuesta(['ok'=>false,'mensaje'=>'El carrito está vacío.'],422);

        $pdo->beginTransaction();
        $total = 0.0;
        foreach ($items as $item) {
            if ($item['cantidad'] > $item['stock']) {
                throw new RuntimeException('Stock insuficiente para '.$item['title']);
            }
            $total += $item['price'] * $item['cantidad'];
        }
        $subtotal = $total;
        $discount = ($promoCode === 'SkateInfinity2026') ? round($subtotal * 0.05) : 0;
        $total = $subtotal - $discount + 10000;

        $order = $pdo->prepare('INSERT INTO pedidos (id_usuario, fecha_pedido, pago_total, descuento, estado, direccion_envio) VALUES (?, NOW(), ?, ?, ?, ?)');
        $order->execute([$idUsuario,$total,$discount,'Pendiente',$direccion]);
        $orderId = (int)$pdo->lastInsertId();

        $detail = $pdo->prepare('INSERT INTO detalle_pedidos (id_pedido,id_variante,cantidad,precio_unitario) VALUES (?,?,?,?)');
        $stock = $pdo->prepare('UPDATE variantes_productos SET stock = stock - ? WHERE id_variante = ?');
        foreach ($items as $item) {
            $detail->execute([$orderId,$item['id_variante'],$item['cantidad'],$item['price']]);
            $stock->execute([$item['cantidad'],$item['id_variante']]);
        }

        $payment = $pdo->prepare('INSERT INTO pagos (id_pedido,monto,metodo_pago,estado,fecha_pago) VALUES (?,?,?,?,CURDATE())');
        $payment->execute([$orderId,$total,$metodo,'Pendiente']);
        $pdo->prepare('DELETE FROM items_carrito WHERE id_carrito=?')->execute([$cartId]);
        $pdo->prepare('UPDATE carrito SET fecha_actualizacion=NOW() WHERE id_carrito=?')->execute([$cartId]);

        $pdo->commit();
        respuesta(['ok'=>true,'mensaje'=>'Pedido registrado correctamente.','id_pedido'=>$orderId]);
    }

    respuesta(['ok'=>false,'mensaje'=>'Acción no reconocida.'],400);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    respuesta(['ok'=>false,'mensaje'=>'No se pudo completar la operación.'],500);
}
