<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../api/common.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respuesta(['ok'=>false,'mensaje'=>'Método no permitido.'],405);

$d = datosEntrada();
$entrada = trim((string)($d['usuario_correo'] ?? ''));
$password = (string)($d['password'] ?? '');

if ($entrada === '' || $password === '') respuesta(['ok'=>false,'mensaje'=>'Ingresa usuario/correo y contraseña.'],422);

$stmt = $pdo->prepare('SELECT id_usuario, nombre, usuario, correo, password_hash, rol FROM usuarios WHERE usuario = ? OR correo = ? LIMIT 1');
$stmt->execute([$entrada, strtolower($entrada)]);
$u = $stmt->fetch();

if (!$u || !password_verify($password, $u['password_hash'])) {
    respuesta(['ok'=>false,'mensaje'=>'Usuario/correo o contraseña incorrectos.'],401);
}

session_regenerate_id(true);
$_SESSION['id_usuario'] = (int)$u['id_usuario'];
$_SESSION['usuario'] = $u['usuario'];
$_SESSION['nombre'] = $u['nombre'];
$_SESSION['rol'] = $u['rol'];

$cart = $pdo->prepare('SELECT id_carrito FROM carrito WHERE id_usuario = ? LIMIT 1');
$cart->execute([(int)$u['id_usuario']]);
if (!$cart->fetch()) {
    $ins = $pdo->prepare('INSERT INTO carrito (id_usuario, fecha_actualizacion) VALUES (?, NOW())');
    $ins->execute([(int)$u['id_usuario']]);
}

respuesta([
    'ok'=>true,
    'mensaje'=>'Inicio de sesión correcto.',
    'usuario'=>[
        'id'=>$u['id_usuario'],
        'nombre'=>$u['nombre'],
        'usuario'=>$u['usuario'],
        'correo'=>$u['correo'],
        'rol'=>$u['rol']
    ]
]);
