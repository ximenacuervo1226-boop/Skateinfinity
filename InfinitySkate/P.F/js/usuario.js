const SKATE_USERNAME_KEY = 'skate_username';
const SKATE_EMAIL_KEY = 'skate_user_email';
const SKATE_BIO_KEY = 'skate_user_bio';

function obtenerNombreUsuario() {
    return localStorage.getItem(SKATE_USERNAME_KEY) || '';
}

function guardarNombreUsuario(nombre) {
    localStorage.setItem(SKATE_USERNAME_KEY, nombre);
}

function actualizarNombreUsuarioEnHeader() {
    const nombre = obtenerNombreUsuario();
    document.querySelectorAll('.username').forEach(span => {
        span.textContent = nombre !== '' ? nombre : 'Mi Cuenta';
    });
}

document.addEventListener('DOMContentLoaded', actualizarNombreUsuarioEnHeader);

function crearBurbujasFondo() {
    const contenedores = [
        ...document.querySelectorAll('.store-main'),
        ...document.querySelectorAll('.main-container')
    ];

    contenedores.forEach(contenedor => {
        if (contenedor.querySelector(':scope > #particle-container')) return;

        const particleContainer = document.createElement('div');
        particleContainer.id = 'particle-container';
        particleContainer.setAttribute('aria-hidden', 'true');

        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 12 + 8;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 15}s`;

            particleContainer.appendChild(particle);
        }

        contenedor.insertBefore(particleContainer, contenedor.firstChild);
    });
}

document.addEventListener('DOMContentLoaded', crearBurbujasFondo);

const dropdown = document.getElementById('categoryDropdown');
const btn = document.getElementById('dropdownBtn');

if (dropdown && btn) {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
}

const accountDropdown = document.getElementById('accountDropdown');
const accountBtn = document.getElementById('accountDropdownBtn');

if (accountDropdown && accountBtn) {
    accountBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        accountDropdown.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
    if (accountDropdown && !accountDropdown.contains(e.target)) {
        accountDropdown.classList.remove('active');
    }
});

document.querySelectorAll('input[required], textarea[required], select[required]').forEach((input) => {
    input.addEventListener('invalid', () => {
        if (input.validity.valueMissing) {
            input.setCustomValidity('Este campo es obligatorio.');
        } else if (input.validity.typeMismatch) {
            input.setCustomValidity('Ingresa un correo electrónico válido.');
        } else if (input.validity.patternMismatch) {
            input.setCustomValidity(input.title || 'El valor ingresado no cumple con el formato requerido.');
        }
    });

    input.addEventListener('input', () => {
        input.setCustomValidity('');
    });
});

function toggleVisibility(inputId, btn) {
            const input = document.getElementById(inputId);
            if (input.type === "password") {
                input.type = "text";
                btn.textContent = "🐵";
                btn.title = "Ocultar contraseña";
            } else {
                input.type = "password";
                btn.textContent = "🙈";
                btn.title = "Mostrar contraseña";
            }
        }

        async function actualizarSesionDesdeServidor() {
    try {
        const response = await fetch('../php/auth/session.php', { credentials: 'same-origin' });
        const data = await response.json();

        if (data.autenticado && data.usuario) {
            const nombre = data.usuario.usuario || data.usuario.nombre || '';
            localStorage.setItem(SKATE_USERNAME_KEY, nombre);
            document.querySelectorAll('.username').forEach(span => {
                span.textContent = nombre || 'Mi Cuenta';
            });
        }
    } catch (error) {
        // Si PHP no está disponible, la página conserva el nombre local guardado.
    }
}

document.addEventListener('DOMContentLoaded', actualizarSesionDesdeServidor);

async function validarFormulario(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = document.getElementById('email').value.trim().toLowerCase();
    const confirmEmail = document.getElementById('confirmEmail').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (email !== confirmEmail) {
        alert('Los correos electrónicos no coinciden.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    const nombre = form.querySelector('input[name="nombre"]')?.value.trim() || '';
    const usuario = document.getElementById('usuario')?.value.trim() || '';
    const telefono = form.querySelector('input[name="telefono"]')?.value.trim() || '';
    const fechaNacimiento = form.querySelector('input[name="fecha_nacimiento"]')?.value || '';

    try {
        const response = await fetch('../php/auth/register.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify({
                nombre,
                usuario,
                telefono,
                fecha_nacimiento: fechaNacimiento,
                correo: email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
            alert(data.mensaje || 'No se pudo completar el registro.');
            return false;
        }

        localStorage.setItem(SKATE_USERNAME_KEY, data.usuario);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'iniciarsesion.html';
    } catch (error) {
        alert('No se pudo conectar con el servidor PHP. Asegúrate de tener Apache y MySQL encendidos en XAMPP.');
    }

    return false;
}

const registroForm = document.getElementById('email') ? document.getElementById('email').form : null;
if (registroForm) {
    registroForm.addEventListener('submit', validarFormulario);

    const nombreCompleto = registroForm.querySelector('input[name="nombre"]');
    const telefono = registroForm.querySelector('input[name="telefono"]');
    const fechaNacimiento = registroForm.querySelector('input[name="fecha_nacimiento"]');

    if (nombreCompleto) {
        nombreCompleto.addEventListener('input', () => {
            nombreCompleto.value = nombreCompleto.value.toLowerCase();
        });
    }

    if (telefono) {
        telefono.addEventListener('input', () => {
            telefono.value = telefono.value.replace(/[^0-9]/g, '');
        });
    }

    if (fechaNacimiento) {
        fechaNacimiento.addEventListener('focus', () => {
            fechaNacimiento.type = 'date';
        });

        fechaNacimiento.addEventListener('blur', () => {
            if (!fechaNacimiento.value) fechaNacimiento.type = 'text';
        });
    }

    registroForm.querySelectorAll('.toggle-password').forEach((button) => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            if (input) toggleVisibility(input.id, button);
        });
    });

    const regresarButton = registroForm.querySelector('.btn-register');
    if (regresarButton) {
        regresarButton.addEventListener('click', () => {
            window.location.href = 'iniciarsesion.html';
        });
    }
}

async function validarLogin(event) {
    event.preventDefault();

    const userInput = document.getElementById('userInput').value.trim();
    const password = document.getElementById('password').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    const esCorreoValido = emailRegex.test(userInput);
    const esUsuarioValido = usernameRegex.test(userInput);

    if (!esCorreoValido && !esUsuarioValido) {
        alert('Ingresa un correo electrónico válido (con @) o un usuario que solo contenga letras y números sin caracteres especiales.');
        return false;
    }

    try {
        const response = await fetch('../php/auth/login.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify({
                usuario_correo: userInput,
                password
            })
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
            alert(data.mensaje || 'No se pudo iniciar sesión.');
            return false;
        }

        const usuario = data.usuario.usuario || data.usuario.nombre;
        localStorage.setItem(SKATE_USERNAME_KEY, usuario);
        localStorage.setItem(SKATE_EMAIL_KEY, data.usuario.correo || '');
        localStorage.removeItem('skate_cart');
        window.location.href = 'principal.html';
    } catch (error) {
        alert('No se pudo conectar con el servidor PHP. Asegúrate de tener Apache y MySQL encendidos en XAMPP.');
    }

    return false;
}

const loginForm = document.getElementById('userInput') ? document.getElementById('userInput').form : null;
if (loginForm) {
    loginForm.addEventListener('submit', validarLogin);

    loginForm.querySelectorAll('.toggle-password').forEach((button) => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            if (input) toggleVisibility(input.id, button);
        });
    });

    const registrarseButton = loginForm.querySelector('.btn-register');
    if (registrarseButton) {
        registrarseButton.addEventListener('click', () => {
            window.location.href = 'registrarse.html';
        });
    }
}

// ---------------- PERFIL / AJUSTES ----------------
if (document.getElementById('settingsSaveBtn')) {
    const sidebarItems = document.querySelectorAll('.settings-sidebar-item');
    const panelPerfil = document.getElementById('panelPerfil');
    const panelMantenimiento = document.getElementById('panelMantenimiento');

    panelPerfil.style.display = '';
    panelMantenimiento.style.display = 'none';

    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            if (item.dataset.tab === 'perfil') {
                panelPerfil.style.display = '';
                panelMantenimiento.style.display = 'none';
            } else {
                panelPerfil.style.display = 'none';
                panelMantenimiento.style.display = '';
            }
        });
    });

    async function cargarPerfil() {
        try {
            const response = await fetch('../php/auth/profile.php', {credentials: 'same-origin'});
            const data = await response.json();

            if (!response.ok || !data.ok) {
                if (response.status === 401) {
                    alert('Debes iniciar sesión para acceder a tu perfil.');
                    window.location.href = 'iniciarsesion.html';
                }
                return;
            }

            document.getElementById('settingsUsername').value = data.usuario.usuario || '';
            document.getElementById('settingsEmail').value = data.usuario.correo || '';
            document.getElementById('settingsBio').value = data.usuario.bio || '';

            localStorage.setItem(SKATE_USERNAME_KEY, data.usuario.usuario || '');
            localStorage.setItem(SKATE_EMAIL_KEY, data.usuario.correo || '');
            localStorage.setItem(SKATE_BIO_KEY, data.usuario.bio || '');
            actualizarNombreUsuarioEnHeader();
        } catch (error) {
            // Mantener valores locales si el servidor no responde.
            document.getElementById('settingsUsername').value = localStorage.getItem(SKATE_USERNAME_KEY) || '';
            document.getElementById('settingsEmail').value = localStorage.getItem(SKATE_EMAIL_KEY) || '';
            document.getElementById('settingsBio').value = localStorage.getItem(SKATE_BIO_KEY) || '';
        }
    }

    document.addEventListener('DOMContentLoaded', cargarPerfil);

    const settingsSaveBtn = document.getElementById('settingsSaveBtn');
    const settingsSaveMsg = document.getElementById('settingsSaveMsg');

    settingsSaveBtn.addEventListener('click', async () => {
        const nuevoUsuario = document.getElementById('settingsUsername').value.trim();
        const nuevoEmail = document.getElementById('settingsEmail').value.trim().toLowerCase();
        const nuevaBio = document.getElementById('settingsBio').value.trim();

        try {
            const response = await fetch('../php/auth/profile.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'same-origin',
                body: JSON.stringify({
                    usuario: nuevoUsuario,
                    correo: nuevoEmail,
                    bio: nuevaBio
                })
            });

            const data = await response.json();

            if (!response.ok || !data.ok) {
                settingsSaveMsg.textContent = data.mensaje || 'No se pudieron guardar los cambios.';
                return;
            }

            localStorage.setItem(SKATE_USERNAME_KEY, nuevoUsuario);
            localStorage.setItem(SKATE_EMAIL_KEY, nuevoEmail);
            localStorage.setItem(SKATE_BIO_KEY, nuevaBio);
            actualizarNombreUsuarioEnHeader();

            settingsSaveMsg.textContent = 'Cambios guardados.';
            setTimeout(() => { settingsSaveMsg.textContent = ''; }, 2500);
        } catch (error) {
            settingsSaveMsg.textContent = 'No se pudo conectar con el servidor.';
        }
    });
}

// ---------------- CARRITO MYSQL ----------------
if (document.getElementById('cartItemsContainer')) {
    const SHIPPING_COST = 10000;
    const VALID_PROMO_CODE = 'SkateInfinity2026';
    const PROMO_DISCOUNT_RATE = 0.05;
    let appliedPromoCode = null;
    let cart = [];

    function formatMoney(value) {
        return Number(value).toLocaleString('es-CO') + '$';
    }

    function setCartMessage(text, type='') {
        const msg = document.getElementById('promoCodeMsg');
        if (msg) {
            msg.textContent = text;
            msg.className = 'promo-code-msg' + (type ? ' ' + type : '');
        }
    }

    async function cargarCarrito() {
        try {
            const response = await fetch('../php/api/cart.php', {credentials: 'same-origin'});
            const data = await response.json();

            if (response.status === 401) {
                alert('Debes iniciar sesión para usar el carrito.');
                window.location.href = 'iniciarsesion.html';
                return;
            }

            if (!response.ok || !data.ok) {
                setCartMessage(data.mensaje || 'No se pudo cargar el carrito.', 'error');
                return;
            }

            cart = data.carrito || [];
            renderCart();
        } catch (error) {
            setCartMessage('No se pudo conectar con PHP/MySQL.', 'error');
        }
    }

    function renderCart() {
        const container = document.getElementById('cartItemsContainer');
        const emptyMsg = document.getElementById('emptyCartMsg');
        const discountRow = document.getElementById('summaryDiscountRow');

        container.innerHTML = '';

        if (cart.length === 0) {
            emptyMsg.style.display = 'block';
            document.getElementById('summarySubtotal').textContent = '0$';
            document.getElementById('summaryTotal').textContent = '0$';
            discountRow.style.display = 'none';
            return;
        }

        emptyMsg.style.display = 'none';
        let subtotalAccumulator = 0;

        cart.forEach((item) => {
            const itemSubtotal = Number(item.price) * Number(item.cantidad);
            subtotalAccumulator += itemSubtotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="cart-item-info">
                        <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                        <div>
                            <span class="cart-item-title">${item.title}</span>
                            <div class="cart-item-variant">Talla: ${item.talla} · Color: ${item.color}</div>
                        </div>
                    </div>
                </td>
                <td>${formatMoney(item.price)}</td>
                <td>
                    <div class="qty-controls">
                        <button class="qty-btn" data-cart-action="decrease" data-item-id="${item.id_item_carrito}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="qty-btn" data-cart-action="increase" data-item-id="${item.id_item_carrito}">+</button>
                    </div>
                </td>
                <td>${formatMoney(itemSubtotal)}</td>
                <td>
                    <button class="btn-remove" data-cart-action="remove" data-item-id="${item.id_item_carrito}" title="Eliminar producto">✕</button>
                </td>
            `;
            container.appendChild(tr);
        });

        const discountAmount = appliedPromoCode === VALID_PROMO_CODE
            ? Math.round(subtotalAccumulator * PROMO_DISCOUNT_RATE)
            : 0;

        if (discountAmount > 0) {
            discountRow.style.display = 'flex';
            document.getElementById('summaryDiscount').textContent = `-${formatMoney(discountAmount)}`;
        } else {
            discountRow.style.display = 'none';
        }

        document.getElementById('summarySubtotal').textContent = formatMoney(subtotalAccumulator);
        document.getElementById('summaryTotal').textContent = formatMoney(subtotalAccumulator - discountAmount + SHIPPING_COST);
    }

    async function modificarCarrito(action, itemId, change=0) {
        try {
            const response = await fetch('../php/api/cart.php', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                credentials: 'same-origin',
                body: JSON.stringify({action, item_id: itemId, change})
            });
            const data = await response.json();

            if (!response.ok || !data.ok) {
                setCartMessage(data.mensaje || 'No se pudo actualizar el carrito.', 'error');
                return;
            }

            cart = data.carrito || [];
            renderCart();
        } catch (error) {
            setCartMessage('No se pudo conectar con el servidor.', 'error');
        }
    }

    document.getElementById('cartItemsContainer').addEventListener('click', (e) => {
        const button = e.target.closest('[data-cart-action]');
        if (!button) return;

        const itemId = Number(button.dataset.itemId);
        const action = button.dataset.cartAction;

        if (action === 'decrease') modificarCarrito('update', itemId, -1);
        if (action === 'increase') modificarCarrito('update', itemId, 1);
        if (action === 'remove') modificarCarrito('remove', itemId);
    });

    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const promoCodeInput = document.getElementById('promoCodeInput');

    function aplicarCodigoEspecial() {
        const codigoEscrito = promoCodeInput.value.trim();

        if (codigoEscrito === '') {
            appliedPromoCode = null;
            setCartMessage('');
        } else if (codigoEscrito === VALID_PROMO_CODE) {
            appliedPromoCode = codigoEscrito;
            setCartMessage('Código aplicado: 5% de descuento sobre el subtotal.', 'success');
        } else {
            appliedPromoCode = null;
            setCartMessage('Código no válido.', 'error');
        }

        renderCart();
    }

    if (applyPromoBtn && promoCodeInput) {
        applyPromoBtn.addEventListener('click', aplicarCodigoEspecial);
        promoCodeInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                aplicarCodigoEspecial();
            }
        });
    }

    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', async () => {
            if (!cart.length) {
                alert('Tu carrito está vacío.');
                return;
            }

            const direccion = prompt('Ingresa la dirección de envío:');
            if (!direccion || !direccion.trim()) return;

            const metodo = prompt('Método de pago (por ahora se registrará como pendiente):', 'Pendiente') || 'Pendiente';

            try {
                const response = await fetch('../php/api/cart.php', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        action: 'checkout',
                        direccion: direccion.trim(),
                        metodo_pago: metodo.trim(),
                        promo_code: appliedPromoCode || ''
                    })
                });

                const data = await response.json();

                if (!response.ok || !data.ok) {
                    alert(data.mensaje || 'No se pudo registrar el pedido.');
                    return;
                }

                alert('Pedido #' + data.id_pedido + ' registrado correctamente.');
                cart = [];
                renderCart();
                cargarCarrito();
            } catch (error) {
                alert('No se pudo conectar con el servidor.');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', cargarCarrito);
}
