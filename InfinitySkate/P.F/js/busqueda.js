const discountsFilterBar = document.getElementById('discountsFilterBar');
    const discountsGrid = document.getElementById('discountsGrid');

    if (discountsFilterBar && discountsGrid) {
        const discountCards = Array.from(discountsGrid.querySelectorAll('.product-card'));
        const filterLinks = discountsFilterBar.querySelectorAll('a[data-cat]');

        function ordenarDescuentosPrimero(lista) {

            
            return lista.slice().sort((a, b) => {
                const aTiene = a.querySelector('.discount-badge') ? 0 : 1;
                const bTiene = b.querySelector('.discount-badge') ? 0 : 1;
                return aTiene - bTiene;
            });
        }

        function mostrarCategoriaDescuentos(categoria) {
            const visibles = categoria === 'recomendados'
                ? discountCards
                : discountCards.filter(card => card.dataset.categoria === categoria);

            const ordenados = ordenarDescuentosPrimero(visibles);

            discountCards.forEach(card => { card.style.display = 'none'; });
            ordenados.forEach(card => {
                card.style.display = '';
                discountsGrid.appendChild(card);
            });

            filterLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.cat === categoria);
            });
        }

        filterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                mostrarCategoriaDescuentos(link.dataset.cat);
            });
        });

        mostrarCategoriaDescuentos('recomendados');
    }
const buscador = document.querySelector(".search-input"); 

const productos = document.querySelectorAll(".product-card"); 

const mensaje = document.getElementById("sinResultado"); 

const recomendadosTitulo = document.getElementById("recommendedTitle");
const descuentosTitulo = document.getElementById("discountsTitle");
const descuentosFilterBar = document.getElementById("discountsFilterBar");

const ordenOriginalPorGrilla = new Map();
document.querySelectorAll(".product-grid").forEach(grilla => {
    ordenOriginalPorGrilla.set(grilla, Array.from(grilla.children));
});

function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function tieneDescuento(producto) {
    return producto.querySelector(".discount-badge") !== null;
}

const grillaResultadosBusqueda = document.getElementById("recommendedGrid");

buscador.addEventListener("input", function () { 

    const texto = normalizar(buscador.value);

    
    
    const esBusquedaDePromociones = texto.includes("promocion") || texto.includes("promo");

    let encontrados = 0;

    
    const encontradosLista = [];

    productos.forEach(producto => {

        const nombreEl = producto.querySelector(".nombre");
        const nombre = nombreEl ? normalizar(nombreEl.textContent) : "";

        const categoria = normalizar(producto.dataset.categoria || "");

        
        
        const esExtra = producto.classList.contains("extra-product");

        let coincide;

        if (texto === "") {

            coincide = !esExtra;
        } else if (esBusquedaDePromociones) {
            
            coincide = tieneDescuento(producto);
        } else {
            
            coincide = nombre.includes(texto) || categoria.includes(texto);
        }

        producto.style.display = coincide ? "" : "none";

        if (coincide) {
            encontrados++;

            if (texto !== "") {
                encontradosLista.push(producto);
            }
        }
    });

    if (texto === "") {
        
        ordenOriginalPorGrilla.forEach((hijosOriginales, grilla) => {
            hijosOriginales.forEach(hijo => grilla.appendChild(hijo));
        });
    } else {

        
        
        const conDescuento = encontradosLista.filter(tieneDescuento);
        const sinDescuento = encontradosLista.filter(p => !tieneDescuento(p));
        const ordenFinal = conDescuento.concat(sinDescuento);

        const contenedorDestino = grillaResultadosBusqueda || (ordenFinal[0] && ordenFinal[0].parentElement);
        if (contenedorDestino) {
            ordenFinal.forEach(producto => contenedorDestino.appendChild(producto));
        }
    }

    
    const estaBuscando = texto !== "";
    if (recomendadosTitulo) recomendadosTitulo.style.display = estaBuscando ? "none" : "";
    if (descuentosTitulo) descuentosTitulo.style.display = estaBuscando ? "none" : "";
    if (descuentosFilterBar) descuentosFilterBar.style.display = estaBuscando ? "none" : "";

    if (mensaje) {
        if (encontrados === 0) {

            mensaje.style.display = "block";

        } else {

            mensaje.style.display = "none";
        }
    }

});
