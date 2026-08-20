const buscador = document.querySelector(".search-input"); // barra de búsqueda

const productos = document.querySelectorAll(".product-card"); // busca todos los productos

const mensaje = document.getElementById("sinResultado"); // mensaje cuando no hay resultados


buscador.addEventListener("input", function () { // escucha cuando escribimos en el buscador

    // Guarda el texto escrito por el usuario
    // toLowerCase() convierte todo a minúsculas
    // trim() elimina espacios al inicio y al final
    const texto = buscador.value.toLowerCase().trim();


    // Variable que contará cuántos productos encontró
    let encontrados = 0;


    // Recorre todos los productos uno por uno
    productos.forEach(producto => {

        // Busca el nombre del producto
        const nombre = producto.querySelector(".nombre").textContent.toLowerCase();

        // Obtiene la categoría del producto
        // dataset.categoria obtiene el valor de data-categoria
        const categoria = producto.dataset.categoria.toLowerCase();


        // Revisa si lo escrito coincide con el nombre o la categoría
        if (
            nombre.includes(texto) ||
            categoria.includes(texto)
        ) {

            // Muestra el producto
            producto.style.display = "";

            // Suma 1 al contador
            encontrados++;

        } else {

            // Oculta el producto
            producto.style.display = "none";
        }
    });


    // Si no encontró ningún producto
    if (encontrados === 0) {

        // Muestra el mensaje
        mensaje.style.display = "block";

    } else {

        // Oculta el mensaje
        mensaje.style.display = "none";
    }

});