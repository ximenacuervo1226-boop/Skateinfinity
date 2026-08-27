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

        function validarFormulario(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const confirmEmail = document.getElementById('confirmEmail').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (email !== confirmEmail) {
                alert("Los correos electrónicos no coinciden.");
                return false;
            }

            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden.");
                return false;
            }

            
            const usuario = document.getElementById('usuario').value;
            if (usuario) {
                localStorage.setItem('skate_username', usuario);
            }

            window.location.href = 'iniciarsesion.html';
            return true;
        }
const registroForm = document.getElementById('email') ? document.getElementById('email').form : null;
if (registroForm) {
    registroForm.addEventListener('submit', validarFormulario);

    const nombreCompleto = registroForm.querySelector('input[placeholder="Nombre Completo..."]');
    const telefono = registroForm.querySelector('input[type="tel"]');
    const fechaNacimiento = registroForm.querySelector('input[placeholder="Fecha de Nacimiento..."]');

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
            if (!fechaNacimiento.value) {
                fechaNacimiento.type = 'text';
            }
        });
    }

    registroForm.querySelectorAll('.toggle-password').forEach((button) => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            if (input) {
                toggleVisibility(input.id, button);
            }
        });
    });

    const regresarButton = registroForm.querySelector('.btn-register');
    if (regresarButton) {
        regresarButton.addEventListener('click', () => {
            window.location.href = 'iniciarsesion.html';
        });
    }
}

function validarLogin(event) {
            event.preventDefault();

            const userInput = document.getElementById('userInput').value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const usernameRegex = /^[a-zA-Z0-9]+$/;

            const esCorreoValido = emailRegex.test(userInput);
            const esUsuarioValido = usernameRegex.test(userInput);

            if (!esCorreoValido && !esUsuarioValido) {
                alert("Ingresa un correo electrónico válido (con @) o un usuario que solo contenga letras y números sin caracteres especiales.");
                return false;
            }

            
            localStorage.setItem('skate_username', userInput);

            window.location.href = 'principal.html';
            return true;
        }
const loginForm = document.getElementById('userInput') ? document.getElementById('userInput').form : null;
if (loginForm) {
    loginForm.addEventListener('submit', validarLogin);

    loginForm.querySelectorAll('.toggle-password').forEach((button) => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            if (input) {
                toggleVisibility(input.id, button);
            }
        });
    });

    const registrarseButton = loginForm.querySelector('.btn-register');
    if (registrarseButton) {
        registrarseButton.addEventListener('click', () => {
            window.location.href = 'registrarse.html';
        });
    }
}

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

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('settingsUsername').value = localStorage.getItem('skate_username') || '';
        document.getElementById('settingsEmail').value = localStorage.getItem('skate_user_email') || '';
        document.getElementById('settingsBio').value = localStorage.getItem('skate_user_bio') || '';
    });

    const settingsSaveBtn = document.getElementById('settingsSaveBtn');
    const settingsSaveMsg = document.getElementById('settingsSaveMsg');

    settingsSaveBtn.addEventListener('click', () => {
        const nuevoUsuario = document.getElementById('settingsUsername').value.trim();
        const nuevoEmail = document.getElementById('settingsEmail').value.trim();
        const nuevaBio = document.getElementById('settingsBio').value.trim();

        localStorage.setItem('skate_username', nuevoUsuario);
        localStorage.setItem('skate_user_email', nuevoEmail);
        localStorage.setItem('skate_user_bio', nuevaBio);

        if (typeof actualizarNombreUsuarioEnHeader === 'function') {
            actualizarNombreUsuarioEnHeader();
        }

        settingsSaveMsg.textContent = 'Cambios guardados.';
        setTimeout(() => { settingsSaveMsg.textContent = ''; }, 2500);
    });

}

if (document.getElementById('cartItemsContainer')) {
const SHIPPING_COST = 10000;

    
    const VALID_PROMO_CODE = 'SkateInfinity2026';
    const PROMO_DISCOUNT_RATE = 0.05;
    let appliedPromoCode = null;

    function getCart() {
        return JSON.parse(localStorage.getItem('skate_cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('skate_cart', JSON.stringify(cart));
    }

    function renderCart() {
        const cart = getCart();
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

        cart.forEach((item, index) => {
            const itemSubtotal = item.price * item.quantity;
            subtotalAccumulator += itemSubtotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="cart-item-info">
                        <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                        <div>
                            <span class="cart-item-title">${item.title}</span>
                            ${(item.talla || item.color) ? `<div class="cart-item-variant">${item.talla ? 'Talla: ' + item.talla : ''}${item.talla && item.color ? ' · ' : ''}${item.color ? 'Color: ' + item.color : ''}</div>` : ''}
                        </div>
                    </div>
                </td>
                <td>${item.price.toLocaleString('es-CO')}$</td>
                <td>
                    <div class="qty-controls">
                        <button class="qty-btn" data-cart-action="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" data-cart-action="increase" data-index="${index}">+</button>
                    </div>
                </td>
                <td>${itemSubtotal.toLocaleString('es-CO')}$</td>
                <td>
                    <button class="btn-remove" data-cart-action="remove" data-index="${index}" title="Eliminar producto">✕</button>
                </td>
            `;
            container.appendChild(tr);
        });

        const discountAmount = appliedPromoCode === VALID_PROMO_CODE
            ? Math.round(subtotalAccumulator * PROMO_DISCOUNT_RATE)
            : 0;

        if (discountAmount > 0) {
            discountRow.style.display = 'flex';
            document.getElementById('summaryDiscount').textContent = `-${discountAmount.toLocaleString('es-CO')}$`;
        } else {
            discountRow.style.display = 'none';
        }

        document.getElementById('summarySubtotal').textContent = `${subtotalAccumulator.toLocaleString('es-CO')}$`;
        document.getElementById('summaryTotal').textContent = `${(subtotalAccumulator - discountAmount + SHIPPING_COST).toLocaleString('es-CO')}$`;
    }

    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const promoCodeInput = document.getElementById('promoCodeInput');
    const promoCodeMsg = document.getElementById('promoCodeMsg');

    function aplicarCodigoEspecial() {
        const codigoEscrito = promoCodeInput.value.trim();

        if (codigoEscrito === '') {
            appliedPromoCode = null;
            promoCodeMsg.textContent = '';
            promoCodeMsg.className = 'promo-code-msg';
            renderCart();
            return;
        }

        if (codigoEscrito === VALID_PROMO_CODE) {
            appliedPromoCode = codigoEscrito;
            promoCodeMsg.textContent = 'Código aplicado: 5% de descuento sobre el subtotal.';
            promoCodeMsg.className = 'promo-code-msg success';
        } else {
            appliedPromoCode = null;
            promoCodeMsg.textContent = 'Código no válido.';
            promoCodeMsg.className = 'promo-code-msg error';
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

    function updateQuantity(index, change) {
        const cart = getCart();
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            saveCart(cart);
            renderCart();
        }
    }

    function removeItem(index) {
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    }

    document.addEventListener('DOMContentLoaded', renderCart);

const cartItemsContainer = document.getElementById('cartItemsContainer');
if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
        const button = e.target.closest('[data-cart-action]');
        if (!button) return;

        const index = Number(button.dataset.index);
        const action = button.dataset.cartAction;

        if (action === 'decrease') {
            updateQuantity(index, -1);
        } else if (action === 'increase') {
            updateQuantity(index, 1);
        } else if (action === 'remove') {
            removeItem(index);
        }
    });
}

const checkoutButton = document.querySelector('.checkout-btn');
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        alert('Funcionalidad de pago en desarrollo');
    });
}
}
