<?php
declare(strict_types=1);
require_once __DIR__ . '/../api/common.php';

if (empty($_SESSION['id_usuario'])) {
    respuesta(['ok'=>true,'autenticado'=>false]);
}
respuesta(['ok'=>true,'autenticado'=>true,'usuario'=>[
    'id'=>$_SESSION['id_usuario'],
    'nombre'=>$_SESSION['nombre'] ?? '',
    'usuario'=>$_SESSION['usuario'] ?? '',
    'rol'=>$_SESSION['rol'] ?? 'cliente'
]]);
