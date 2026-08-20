const categorias = document.querySelector(".category-select");

categorias.addEventListener("change", function () {

    if(this.value === "camisa"){
        window.location.href = "camisas.html";
    }

    if(this.value === "buzos"){
        window.location.href = "buzos.html";
    }

    if(this.value === "chaquetas"){
        window.location.href = "chaquetas.html";
    }

    if(this.value === "pantalones"){
        window.location.href = "pantalones.html";
    }

    if(this.value === "zapatos"){
        window.location.href = "zapatos.html";
    }

    if(this.value === "gorras"){
        window.location.href = "gorras.html";
    }

});

const buscador = document.querySelector("buscador"); //barra
 const productos = document.querySelectorAll(".producto"); //busca todos los elementos con la clase producto
 const mensaje = document.getElementById("sinResultado"); //busca mensaje cuando no hay resultado

 buscador.addEventListener("input", function () { //addEventListener: escuchar un evento

    // Guarda el texto escrito por el usuario
    // toLowerCase() convierte todo a minúsculas
    // trim() elimina espacios al inicio y al final
    const texto = buscador.value.toLowerCase().trim();


    // Variable que contará cuántos productos encontró
    let encontrados = 0;


    // Recorre todos los productos uno por uno
    productos.forEach(producto => {

        // Busca el nombre del producto
        // textContent obtiene el texto
        // toLowerCase() convierte el texto a minúsculas
        const nombre = producto.querySelector(".nombre").textContent.toLowerCase();

        // Busca la categoría del producto
        const categoria = producto.querySelector(".categoria").textContent.toLowerCase();

        // Busca la descripción del producto
        const descripcion = producto.querySelector(".descripcion").textContent.toLowerCase();


        // "includes()" revisa si el texto escrito está dentro
        // del nombre, categoría o descripción

        if (

            nombre.includes(texto) ||
            categoria.includes(texto) ||
            descripcion.includes(texto)

        ) {

            // Si encontró coincidencia...
            // display = "block" hace que el producto sea visible
            producto.style.display = "block";

            // Suma 1 al contador de productos encontrados
            encontrados++;

        } else {

            // Si no coincide con la búsqueda...
            // display = "none" lo oculta
            producto.style.display = "none";

        }

    });


    // Cuando termina de revisar todos los productos...

    // Si no encontró ninguno...
    if (encontrados === 0) {

        // Muestra el mensaje
        mensaje.style.display = "block";

    } else {

        // Si sí encontró productos...
        // Oculta el mensaje
        mensaje.style.display = "none";

    }

});