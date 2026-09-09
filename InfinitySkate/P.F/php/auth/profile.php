<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/conexion.php';
require_once __DIR__ . '/../api/common.php';

$id = exigirSesion();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare('SELECT nombre, usuario, correo, telefono, fecha_nacimiento, bio FROM usuarios WHERE id_usuario = ?');
    $stmt->execute([$id]);
    $u = $stmt->fetch();
    if (!$u) respuesta(['ok'=>false,'mensaje'=>'Usuario no encontrado.'],404);
    respuesta(['ok'=>true,'usuario'=>$u]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respuesta(['ok'=>false,'mensaje'=>'Método no permitido.'],405);

$d = datosEntrada();
$usuario = trim((string)($d['usuario'] ?? ''));
$correo = strtolower(trim((string)($d['correo'] ?? '')));
$bio = trim((string)($d['bio'] ?? ''));

if ($usuario === '' || !preg_match('/^[a-zA-Z0-9]+$/', $usuario)) respuesta(['ok'=>false,'mensaje'=>'El usuario no es válido.'],422);
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) respuesta(['ok'=>false,'mensaje'=>'El correo no es válido.'],422);

$check = $pdo->prepare('SELECT id_usuario FROM usuarios WHERE (usuario = ? OR correo = ?) AND id_usuario <> ? LIMIT 1');
$check->execute([$usuario,$correo,$id]);
if ($check->fetch()) respuesta(['ok'=>false,'mensaje'=>'Ese usuario o correo ya pertenece a otra cuenta.'],409);

$stmt = $pdo->prepare('UPDATE usuarios SET usuario = ?, correo = ?, bio = ? WHERE id_usuario = ?');
$stmt->execute([$usuario,$correo,$bio,$id]);

$_SESSION['usuario'] = $usuario;
respuesta(['ok'=>true,'mensaje'=>'Cambios guardados.','usuario'=>['usuario'=>$usuario,'correo'=>$correo,'bio'=>$bio]]);
