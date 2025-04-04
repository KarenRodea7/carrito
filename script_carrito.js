// ---- CARRITO ----

let carrito = [];

function agregarAlCarrito(producto) {
    carrito.push(producto);  // Agregar el producto al array
    localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardar en localStorage
    actualizarCarrito();  // Actualizar la vista del carrito
}

function cargarCarritoDesdeStorage() {
    let guardado = localStorage.getItem('carrito');
    if (guardado) {
        carrito = JSON.parse(guardado); // Recupera solo lo que está en el carrito
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    let carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = ''; // Limpiar el carrito antes de agregar productos

    if (carrito.length === 0) {
        carritoDiv.innerHTML = "<p>El carrito está vacío.</p>";
        document.getElementById("totalPrecio").textContent = "0.00";
        return;
    }

    carrito.forEach((producto, index) => {
        let productoDiv = document.createElement("div");
        productoDiv.classList.add("prod");
        productoDiv.innerHTML = `
            <h4>${producto.nombre}</h4>
            <p>$ ${producto.precio.toFixed(2)}</p>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        carritoDiv.appendChild(productoDiv);
    });

    // Calcular y mostrar el total
    let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    document.getElementById("totalPrecio").textContent = total.toFixed(2);
}

function eliminarProducto(index) {
    carrito.splice(index, 1);  // Eliminar el producto por su índice
    localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardar cambios
    actualizarCarrito();  // Actualizar el carrito en pantalla
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito'); // Eliminar del almacenamiento
    actualizarCarrito();
}

function pagar() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de proceder.");
    } else {
        let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
        alert(`Total de la compra: $${total.toFixed(2)}. ¡Gracias por tu compra!`);
        vaciarCarrito();
    }
}