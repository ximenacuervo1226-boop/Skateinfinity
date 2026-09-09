<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../api/common.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respuesta(['ok'=>false,'mensaje'=>'Método no permitido.'],405);

$d = datosEntrada();
$nombre = trim((string)($d['nombre'] ?? ''));
$usuario = trim((string)($d['usuario'] ?? ''));
$telefono = preg_replace('/\D+/', '', (string)($d['telefono'] ?? ''));
$fecha = trim((string)($d['fecha_nacimiento'] ?? ''));
$correo = strtolower(trim((string)($d['correo'] ?? '')));
$password = (string)($d['password'] ?? '');

if ($nombre === '' || $usuario === '' || $telefono === '' || $fecha === '' || $correo === '' || $password === '') {
    respuesta(['ok'=>false,'mensaje'=>'Completa todos los campos.'],422);
}
if (!preg_match('/^[a-zA-Z0-9]+$/', $usuario)) respuesta(['ok'=>false,'mensaje'=>'El usuario solo puede contener letras y números.'],422);
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) respuesta(['ok'=>false,'mensaje'=>'El correo no es válido.'],422);
if (!preg_match('/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/', $password)) {
    respuesta(['ok'=>false,'mensaje'=>'La contraseña no cumple los requisitos de seguridad.'],422);
}
$dateObj = DateTime::createFromFormat('Y-m-d', $fecha);
if (!$dateObj || $dateObj->format('Y-m-d') !== $fecha) respuesta(['ok'=>false,'mensaje'=>'La fecha de nacimiento no es válida.'],422);

try {
    $check = $pdo->prepare('SELECT id_usuario FROM usuarios WHERE usuario = ? OR correo = ? LIMIT 1');
    $check->execute([$usuario, $correo]);
    if ($check->fetch()) respuesta(['ok'=>false,'mensaje'=>'El usuario o correo ya está registrado.'],409);

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $pdo->beginTransaction();

    $stmt = $pdo->prepare('INSERT INTO usuarios (nombre, usuario, correo, telefono, fecha_nacimiento, password_hash, rol, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$nombre, $usuario, $correo, $telefono, $fecha, $hash, 'cliente', '']);

    $id = (int)$pdo->lastInsertId();
    $cart = $pdo->prepare('INSERT INTO carrito (id_usuario, fecha_actualizacion) VALUES (?, NOW())');
    $cart->execute([$id]);

    $pdo->commit();
    respuesta(['ok'=>true,'mensaje'=>'Registro exitoso.','usuario'=>$usuario]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    respuesta([
        'ok' => false,
        'mensaje' => 'ERROR MYSQL: ' . $e->getMessage()
    ], 500);
}
