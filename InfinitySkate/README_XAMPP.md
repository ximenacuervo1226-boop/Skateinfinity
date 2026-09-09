# SkateInfinity - versión conectada a MySQL/XAMPP

## Qué se integró

- Registro de usuarios en MySQL con `password_hash`.
- Inicio de sesión con sesiones PHP.
- Perfil/ajustes guardados en MySQL.
- Carrito asociado al usuario y guardado en MySQL.
- Validación de talla, color y stock desde la base de datos.
- Creación de pedidos y detalles de pedido.
- Registro del estado del pago como `Pendiente` (no se implementa una pasarela de pago real).
- Base de datos reconstruida para coincidir con los productos/categorías que realmente aparecen en SkateInfinity.
- Se conserva el CSS y la estructura visual existente; solo se añadieron atributos de enlace a BD y lógica PHP/JS necesaria.

## Instalación en XAMPP

1. Copia la carpeta `InfinitySkate` completa dentro de:
   `C:\xampp\htdocs\`
2. Abre XAMPP y enciende **Apache** y **MySQL**.
3. Entra a `http://localhost/phpmyadmin`.
4. Ve a **Importar** y selecciona `InfinitySkate/skate.sql`.
5. La importación crea automáticamente la base de datos `skateinfinity`.
6. Abre:
   `http://localhost/InfinitySkate/P.F/html/principal.html`

## Si MySQL tiene contraseña

Abre:
`P.F/php/config/conexion.php`

y cambia:

```php
$pass = '';
```

por la contraseña de tu usuario MySQL.

## Funcionamiento

### Registro
`registrarse.html` -> `auth/register.php` -> tabla `usuarios`.

### Login
`iniciarsesion.html` -> `auth/login.php` -> sesión PHP.

### Perfil
`ajustes.html` -> `auth/profile.php` -> tabla `usuarios`.

### Carrito
Producto -> `api/cart.php` -> `carrito` + `items_carrito` + `variantes_productos`.

### Pedido
`Procesar Pago` solicita dirección y registra:
- `pedidos`
- `detalle_pedidos`
- `pagos`

El método de pago queda como pendiente porque la web original no contiene una pasarela de pago real.

## Estructura de la base de datos

- `usuarios`
- `categorias`
- `productos`
- `variantes_productos`
- `carrito`
- `items_carrito`
- `pedidos`
- `detalle_pedidos`
- `pagos`

Las variantes usan tallas de texto (`S`, `M`, `L`, `XL`, `28`... `Única`) porque así funcionan las opciones que presenta la interfaz.

## Importante

No abras los HTML con doble clic (`file://`). PHP necesita Apache. Usa siempre la dirección `http://localhost/...`.

Los productos marcados visualmente como **"en producción"** en la página son placeholders de la interfaz y no se registraron como inventario real en la BD porque no tienen nombre, precio ni variante definida.
