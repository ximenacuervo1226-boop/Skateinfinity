<?php
declare(strict_types=1);

session_start();
header('Content-Type: application/json; charset=utf-8');

function respuesta(array $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function datosEntrada(): array {
    $raw = file_get_contents('php://input');
    if (!$raw) return $_POST;
    $data = json_decode($raw, true);
    return is_array($data) ? $data : $_POST;
}

function exigirSesion(): int {
    if (empty($_SESSION['id_usuario'])) {
        respuesta(['ok' => false, 'mensaje' => 'Debes iniciar sesión para realizar esta acción.'], 401);
    }
    return (int) $_SESSION['id_usuario'];
}
