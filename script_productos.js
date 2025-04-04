document.addEventListener("DOMContentLoaded", () => {
    cargarProductos(); // Cargar todos los productos
    cargarCarritoDesdeStorage(); // Recuperar el carrito guardado

    // Agregar evento de filtrado
    const inputFiltro = document.getElementById("filtro");
    if (inputFiltro) {  // Verifica que el input existe antes de agregar el evento
        inputFiltro.addEventListener("input", () => {
            cargarProductos(inputFiltro.value); 
        });
    } else {
        console.warn("El elemento con ID 'filtro' no fue encontrado.");
    }
});

// Función para cargar productos con filtro y categoría
function cargarProductos(filtro = "", categoria = "") {
    let contenedor = document.querySelector('.conten_flex');
    contenedor.innerHTML = ""; // Limpiar productos

    let productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(filtro.toLowerCase().trim()) &&
        (categoria === "" || producto.categoria === categoria)
    );

    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    productosFiltrados.forEach(producto => {
        let productoDiv = document.createElement('div');
        productoDiv.classList.add('prod');
        productoDiv.innerHTML = `
            <h4>${producto.nombre}</h4>
            <img src="${producto.imagen}" class="imagen" alt="${producto.nombre}">
            <p>$ ${producto.precio}</p>
            <button class="agregar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
            <button class="ver-detalles" data-id="${producto.id}">Ver detalles</button>
        `;
        contenedor.appendChild(productoDiv);
    });

    asignarEventosBotones();
    asignarEventosDetalles();
}

// Función para filtrar por categoría
function cargarPorCategoria(categoria) {
    cargarProductos("", categoria);
}

// Función para asignar eventos a los botones después de cargar productos
function asignarEventosBotones() {
    document.querySelectorAll('.agregar').forEach(boton => {
        boton.addEventListener("click", function () {
            let producto = {
                id: this.getAttribute("data-id"),
                nombre: this.getAttribute("data-nombre"),
                precio: parseFloat(this.getAttribute("data-precio"))
            };
            agregarAlCarrito(producto);
        });
    });
}

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

function asignarEventosDetalles() {
    document.querySelectorAll('.ver-detalles').forEach(boton => {
        boton.addEventListener("click", function () {
            let idProducto = this.getAttribute("data-id");
            localStorage.setItem("productoDetalles", idProducto);
            window.location.href = "detalles.html";
        });
    });
}