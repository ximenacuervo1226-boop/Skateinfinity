const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('cat') || 'todas';

    const titleElement = document.getElementById('currentCategoryTitle');
    const productCards = document.querySelectorAll('.product-card');

    if (titleElement) {
        titleElement.textContent = `Categoría: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;

        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedCategory === 'todas' || cardCategory === selectedCategory) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        const productGrid = document.getElementById('productGrid');
        if (productGrid) {
            const visibles = Array.from(productCards).filter(card => !card.classList.contains('hidden'));
            const ordenados = visibles.slice().sort((a, b) => {
                const aTiene = a.querySelector('.discount-badge') ? 0 : 1;
                const bTiene = b.querySelector('.discount-badge') ? 0 : 1;
                return aTiene - bTiene;
            });
            ordenados.forEach(card => productGrid.appendChild(card));
        }

        const filterLinks = document.querySelectorAll('.filter-bar a');
        filterLinks.forEach(link => {
            if (link.getAttribute('data-cat') === selectedCategory) {
                link.classList.add('active');
            }
        });
    }

document.addEventListener('DOMContentLoaded', () => {

    
    const TALLAS_POR_CATEGORIA = {
        camisas: ['S', 'M', 'L', 'XL'],
        buzos: ['S', 'M', 'L', 'XL'],
        chaquetas: ['S', 'M', 'L', 'XL'],
        pantalones: ['28', '30', '32', '34', '36'],
        zapatos: ['38', '39', '40', '41', '42', '43'],
        gorras: ['Única']
    };

    const COLORES_DISPONIBLES = ['Negro', 'Blanco', 'Gris', 'Rojo', 'Azul', 'Verde'];

    const overlay = document.getElementById('productModalOverlay');

    
    if (!overlay) return;

    const modalBox = overlay.querySelector('.modal-box');
    let unavailableBox = document.getElementById('unavailableProductBox');
    if (!unavailableBox) {
        unavailableBox = document.createElement('div');
        unavailableBox.className = 'modal-box unavailable-product-box';
        unavailableBox.id = 'unavailableProductBox';
        unavailableBox.innerHTML = `
            <button type="button" class="modal-close-btn" id="unavailableModalCloseBtn" aria-label="Cerrar">&times;</button>
            <div class="unavailable-icon">!</div>
            <h3 class="modal-title">Producto fuera de venta</h3>
            <p class="modal-desc" id="unavailableProductName"></p>
            <p class="modal-desc">Este producto se encuentra en producción y no está disponible para la venta por el momento.</p>
        `;
        overlay.appendChild(unavailableBox);
    }

    const modalImg = document.getElementById('modalProductImg');
    const modalTitle = document.getElementById('modalProductTitle');
    const modalPrice = document.getElementById('modalProductPrice');
    const modalDiscount = document.getElementById('modalProductDiscount');
    const modalDesc = document.getElementById('modalProductDesc');
    const modalTallaSelect = document.getElementById('modalTallaSelect');
    const modalColorSelect = document.getElementById('modalColorSelect');
    const modalQtyInput = document.getElementById('modalQtyInput');
    const modalAddBtn = document.getElementById('modalAddToCartBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const unavailableCloseBtn = document.getElementById('unavailableModalCloseBtn');
    const unavailableProductName = document.getElementById('unavailableProductName');

    let productoActual = null;

    function parsePrecio(textoPrecio) {
        const soloNumeros = textoPrecio.replace(/[^\d]/g, '');
        return parseInt(soloNumeros, 10) || 0;
    }

    function abrirModal(card) {
        const tituloEl = card.querySelector('.product-title');
        const imgEl = card.querySelector('.product-img-box img');
        const precioEl = card.querySelector('.product-price');

        if (!tituloEl || !imgEl || !precioEl) return;

        const nombre = tituloEl.textContent.trim();
        const imgSrc = imgEl.getAttribute('src');
        const precioTexto = precioEl.textContent.trim();
        const disponible = card.getAttribute('data-disponible') !== 'false';

        if (!disponible) {
            if (modalBox) modalBox.style.display = 'none';
            unavailableBox.style.display = 'block';
            unavailableProductName.textContent = nombre;
            overlay.classList.add('active');
            return;
        }

        if (modalBox) modalBox.style.display = '';
        unavailableBox.style.display = 'none';

        
        const categoria = (
            card.getAttribute('data-category') ||
            card.getAttribute('data-categoria') ||
            ''
        ).toLowerCase();

        productoActual = {
            nombre: nombre,
            imgSrc: imgSrc,
            precio: parsePrecio(precioTexto),
            precioTexto: precioTexto,
            categoria: categoria
        };

        modalImg.setAttribute('src', imgSrc);
        modalImg.setAttribute('alt', nombre);
        modalTitle.textContent = nombre;
        modalPrice.textContent = precioTexto;

        
        const badgeEl = card.querySelector('.discount-badge');
        if (modalDiscount) {
            if (badgeEl) {
                modalDiscount.textContent = 'Descuento: ' + badgeEl.textContent.trim();
                modalDiscount.style.display = 'block';
            } else {
                modalDiscount.textContent = '';
                modalDiscount.style.display = 'none';
            }
        }

        modalDesc.textContent = 'Prenda de la categoría ' + categoria + ' de Skate∞. Alta calidad y estilo urbano, ideal para tu día a día.';

        const tallas = TALLAS_POR_CATEGORIA[categoria] || ['Única'];
        modalTallaSelect.innerHTML = tallas
            .map(talla => '<option value="' + talla + '">' + talla + '</option>')
            .join('');

        modalColorSelect.innerHTML = COLORES_DISPONIBLES
            .map(color => '<option value="' + color + '">' + color + '</option>')
            .join('');

        modalQtyInput.value = 1;

        overlay.classList.add('active');
    }

    function cerrarModal() {
        overlay.classList.remove('active');
        if (modalBox) modalBox.style.display = '';
        unavailableBox.style.display = 'none';
        productoActual = null;
    }

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => abrirModal(card));
    });

    modalCloseBtn.addEventListener('click', cerrarModal);
    unavailableCloseBtn.addEventListener('click', cerrarModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            cerrarModal();
        }
    });

    modalAddBtn.addEventListener('click', () => {
        if (!productoActual) return;

        const cantidad = Math.max(1, parseInt(modalQtyInput.value, 10) || 1);
        const talla = modalTallaSelect.value;
        const color = modalColorSelect.value;

        const cart = JSON.parse(localStorage.getItem('skate_cart')) || [];

        cart.push({
            img: productoActual.imgSrc,
            title: productoActual.nombre,
            price: productoActual.precio,
            quantity: cantidad,
            talla: talla,
            color: color
        });

        localStorage.setItem('skate_cart', JSON.stringify(cart));

        cerrarModal();
        alert('"' + productoActual.nombre + '" se agregó al carrito.');
    });

});
