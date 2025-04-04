let desplegar = document.getElementById("desp");
let menu = document.getElementById("menu").addEventListener("click", function(){
    desplegar.classList.toggle("open");
});

function cargarPorCategoria(categoria) {
    let contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = ""; // limpiar contenido

    productos
        .filter(producto => producto.categoria === categoria)
        .forEach(producto => {
            let div = document.createElement('div');
            div.classList.add('prod');
            div.innerHTML = `
                <h4>${producto.nombre}</h4>
                <img src="${producto.imagen || 'imagenes/placeholder.png'}" class="imagen" alt="${producto.nombre}">
                <p>$ ${producto.precio}</p>
                <button class="agregar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
            `;
            contenedor.appendChild(div);
        });

    // Agregar eventos a los botones
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


let carrito = [];

// Cargar los productos dinámicamente en la página
function cargarProductos() {
    let contenedor = document.querySelector('.conten_flex');
    productos.forEach(producto => {
        let productoDiv = document.createElement('div');
        productoDiv.classList.add('prod');
        productoDiv.innerHTML = `
            <h4>${producto.nombre}</h4>
            <img src="${producto.imagen}" class="imagen" alt="${producto.nombre}">
            <p>$ ${producto.precio}</p>
            <button class="agregar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
        `;
        contenedor.appendChild(productoDiv);
    });

    // Agregar los eventos a los botones de agregar al carrito
    let botonesAgregar = document.querySelectorAll(".agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", function() {
            let producto = {
                id: this.getAttribute("data-id"),
                nombre: this.getAttribute("data-nombre"),
                precio: parseFloat(this.getAttribute("data-precio"))
            };
            agregarAlCarrito(producto);
        });
    });
}

// Agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function cargarCarritoDesdeStorage() {
    let guardado = localStorage.getItem('carrito');
    if (guardado) {
        carrito = JSON.parse(guardado);
        actualizarCarrito();
    }
}

// Actualizar el carrito en la página
function actualizarCarrito() {
    let carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = ''; // Limpiar carrito

    carrito.forEach((producto, index) => {
        let productoDiv = document.createElement("div");
        productoDiv.classList.add("prod");
        productoDiv.innerHTML = `
            <h4>${producto.nombre}</h4>
            <p>$ ${producto.precio}</p>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        carritoDiv.appendChild(productoDiv);
    });

    // Mostrar el total
    let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    document.getElementById("totalPrecio").textContent = total.toFixed(2);
}

// Eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Función para pagar
function pagar() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de proceder.");
    } else {
        let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
        alert(`Total de la compra: $${total.toFixed(2)}. ¡Gracias por tu compra!`);
        vaciarCarrito();
    }
}

// Cargar productos cuando se cargue la página
window.onload = cargarProductos;