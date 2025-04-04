document.addEventListener("DOMContentLoaded", () => {
    let idProducto = localStorage.getItem("productoDetalles");

    if (!idProducto) {
        document.getElementById("detalle-producto").innerHTML = "<p>Error: Producto no encontrado.</p>";
        return;
    }

    let producto = productos.find(p => p.id == idProducto); // <-- asegúrate de usar == o convierte a Number()

    if (!producto) {
        document.getElementById("detalle-producto").innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    document.getElementById("detalle-producto").innerHTML = `
        <h2>${producto.nombre}</h2>
        <img src="${producto.imagen}" class="imagen" alt="${producto.nombre}">
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
        <button class="agregar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
    `;

    document.querySelector(".agregar").addEventListener("click", function () {
        agregarAlCarrito(producto); // O tu lógica personalizada de carrito
    });
});