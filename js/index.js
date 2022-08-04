import infoDeProductos from "./productos.js";

//documento
const d = document;
//variables
const $main = d.querySelector("main"),
$aside= d.querySelector("aside"),
$fragment = d.createDocumentFragment(),
$header = d.querySelector("header"),
$contadorDelCArrito = d.querySelector(".contadorDelCarrito");

//creación del localStorage
// if(!localStorage.getItem("Carrito")){
//     localStorage.setItem("Carrito", "[]");
// };
//Usando el operador ternario
!localStorage.getItem("Carrito") ? localStorage.setItem("Carrito", "[]") : null

//modo oscuro en el localStorage
// if (!localStorage.getItem("modoOscuro")) {
//     localStorage.setItem("modoOscuro", "normal");
// };
//usando el operador terniario
localStorage.getItem("Carrito") ? null : localStorage.setItem("Carrito", "[]")

function crearCards(){
    //recorremos el array de productos
    infoDeProductos.forEach((obj) => {
    //crea una sección y agrego el HTML al fragment
    const $section = d.createElement("section");
    $section.classList.add("productos")

    $section.innerHTML = `
        <img src="${obj.img}" alt="${obj.nombre}">
        <h4>Nombre: ${obj.nombre}</h4>
        <p>${obj.descripcion}</p>
        <span>Precio: $${obj.precio}</span>
        <button class="botonProd" id="${obj.id}">Comprar</button>
        `;

        $fragment.appendChild($section);

    });
    //agrego el fragment a main
    $main.appendChild($fragment);
}

//funcion para cargar los eventos iniciales
function cargandoEvents(){
    $main.addEventListener("click", agregarProducto);//evento para agregar productos
    //eventos para mostrar el Carrito
    $header.addEventListener("click", mostrarCarrito);
    $main.addEventListener("click", mostrarCarrito);
    //evento para el modo oscuro
    $main.addEventListener("click", modoOscuro)
    //evento para poder vaciar el carrito de compras desde que se inicie o actualice la página
    d.querySelector("#vaciarCarrito").addEventListener("click", vaciarCarrito);
    //a cada <span> le agrego un boton con un evento para aumentar o dismunuir un producto
    $aside.addEventListener("click", aumentarProducto);
    $aside.addEventListener("click", disminuirProducto);
}

// Funciones de Eventos DOMContentLoaded para que imprima las carts con el localStorage
d.addEventListener("DOMContentLoaded", ()=>{
    //modoOscuro
    if (localStorage.getItem("modoOscuro") === "oscuro") {
        d.querySelector("body").classList.add("dark");
        $main.querySelector("#darkTheme").textContent = "☀️";
    } else {
        d.querySelector("body").classList.remove("dark");
        $main.querySelector("#darkTheme").textContent = "🌑";
    };
    
    //funcion para crear las cartas de los productos y lo llamamos
    crearCards();
    //funcion para cargar los eventos iniciales
    cargandoEvents();
    //convierto el localStorage a un array de objetos
    const array = JSON.parse(localStorage.getItem("Carrito"));
    //pongo en el carrito la cantidad de productos agregados
    $contadorDelCArrito.innerHTML = array.length;
    //primer div del aside
    const $containerProd = d.querySelector("#containerProd");
    //recorremos el localStorage e insertamos los productos en el carrito
    array.forEach((obj) => {
        const $section = d.createElement("section");
        $section.classList.add("cards");
        $section.classList.add("d-flex");
        $section.classList.add("justify-content-evenly");
        $section.innerHTML = `
                <div class="divImagen">
                    <img src="${obj.img}" alt="${obj.nombre}">
                </div>

                <div class="divDescrip text-center">
                    <span>${obj.nombre}</span>
                    <span id="precio">$${obj.precio}</span>
                    <div id="${obj.id}">
                        <i id="menos" class="fa-solid fa-minus"></i>
                        <span id="contador">${obj.cantidad}</span>
                        <i id="mas" class="fa-solid fa-plus"></i>
                    </div>
                </div>

                <i id="trash${obj.id}" class="fa-solid fa-trash notification-alert"></i>
                `;

        $fragment.prepend($section);

        //a cada section le agrego un boton con un evento para quitar un producto
        $section.querySelector(`#trash${obj.id}`).addEventListener('click', quitarProducto);
    });

    //agregamos el fragment al aside
    $containerProd.prepend($fragment)//pone de primer hijo 

    //llamo una función 
    actualizarCarrito();

    //hago que los botones de deshabiliten si es que fueron seleccionado y guardados en el localStorage
    const botones = $main.querySelectorAll("button");
    for (const item of array) {
        for (const btns of botones) {
            if (item.id == btns.id) {
                btns.disabled = true;
                btns.innerText = "Comprado";
            }
        }
    }
});

//declarando las funciones anindadas

function agregarProducto(e){

    //comprobamos si el evento fue en un boton
    if(e.target.matches("button")){
        const name = e.target.parentElement;
        //usando la librería toastify
        Toastify({
            text: `Producto "${name.firstElementChild.getAttribute("alt")}" agregado`,
            duration: 2000,
            close: true,
            gravity: "top", // `top` or `bottom`,
            position: "right", // `left`, `center` or `right`,
            stopOnFocus: true, // Prevents dismissing of toast on hover,
            className : "tostadas"
        }).showToast();
        //convierto el localStorage a un array de objetos
        const array = JSON.parse(localStorage.getItem("Carrito"));

        //hago uso del LocalStorage para  guardar el elemento seleccionado
        const productoClickeado = infoDeProductos.find(obj => obj.id == e.target.id); 
        //agrego el elemento al localStorage
        array.push(productoClickeado);
        //pongo en el carrito la cantidad de productos agregados
        $contadorDelCArrito.innerHTML = array.length;
        //devolvemos el contenido  inicial del carrito, borrando lo demas si es que fue agregado
        $aside.innerHTML = `
            <div id="containerProd"></div>

            <a id="precioTotal" class="text-decoration-none text-info" href="paginas/carrito.html" target="_blank" rel="noopener noreferrer">
            Precio Total: $0
            </a>

            <button id="vaciarCarrito">Vaciar carrito</button>
        `;

        //recorremos el localStorage e imprimimos los productos en el carrito
        array.forEach((obj) => {
            const $section = d.createElement("section");
            $section.classList.add("cards");
            $section.classList.add("d-flex");
            $section.classList.add("justify-content-evenly");
            $section.innerHTML = `
                <div class="divImagen">
                    <img src="${obj.img}" alt="${obj.nombre}">
                </div>

                <div class="divDescrip text-center">
                    <span>${obj.nombre}</span>
                    <span id="precio">$${obj.precio}</span>
                    <div id="${obj.id}">
                        <i id="menos" class="fa-solid fa-minus"></i>
                        <span id="contador">${obj.cantidad}</span>
                        <i id="mas" class="fa-solid fa-plus"></i>
                    </div>
                </div>

                <i id="trash${obj.id}" class="fa-solid fa-trash notification-alert"></i>
                `;

            $fragment.prepend($section);

            //a cada section le agrego un boton con un evento para quitar un producto
            $section.querySelector(`#trash${obj.id}`).addEventListener('click', quitarProducto);
        });

        const $containerProd = d.querySelector("#containerProd");
        //agregamos el fragment al aside
        $containerProd.prepend($fragment)//pone de primer hijo 

        //hago que los botones de deshabiliten si es que fueron seleccionado y guardados en el localStorage
        const botones = $main.querySelectorAll("button");

        for (const item of array) {
            for (const btns of botones) {
                if (item.id == btns.id) {
                    btns.disabled = true;
                    btns.innerText = "Comprado";
                }
            }
        }

        // Convierto el array a string y lo envio al local storage.
        localStorage.setItem("Carrito", JSON.stringify(array));
        
        //evento para poder vaciar el carrito de compras, otra vez (x2)
        d.querySelector("#vaciarCarrito").addEventListener("click", vaciarCarrito);

        //llamo una función 
        actualizarCarrito();
    }
}

//función para actualizar el precio total de todos los productos añadidos
function actualizarCarrito(){

    //cambio el precio Total cada vez que haya un cambio
    let total = 0;
    const $precioTotal = d.querySelector("#precioTotal");
    const $precioRecorrido = d.querySelectorAll(".cards");
    $precioRecorrido.forEach(obj => {

        const $precioUnitario = obj.querySelector("#precio").textContent;
        const $cantidadProductos = obj.querySelector("#contador");

        const precioUnitarioReemplazo = parseFloat($precioUnitario.replace('$', '')).toFixed(2);
        
        const cantidadProductosReemplazo = parseInt($cantidadProductos.textContent);

        total += (precioUnitarioReemplazo * cantidadProductosReemplazo);
    });

    //el resultado final se pone en el html

    $precioTotal.innerHTML = `Precio Total: $${total.toFixed(2)}`;

}

//función para quitar los productos del carrito
function quitarProducto(e) {
    //función autoinvocada
    (()=> {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Este producto se eliminará, ¿estás seguro?',
            icon: 'info',
            showConfirmButton: true,
            confirmButtonText: 'Confirmar',
            showCancelButton: true,
            cancelButtonText: 'Denegar',
            allowOutsideClick: false,
            customClass: {
                popup: "contenedor"
            }
        }).then(resolve => {
            if(resolve.isConfirmed){
                //hago uso del LocalStorage para el elemento eliminado
                const array = JSON.parse(localStorage.getItem("Carrito"));
                for (const item of array) {
                    if (`trash${item.id}` == e.target.id) {
                        const boton = d.getElementById(`${item.id}`);
                        boton.disabled = false // Activo el Boton.
                        boton.textContent = "Comprar"; // Cambio el Texto
                    };
                };

                //Elimino el producto del carrito
                const button = e.target;
                button.closest(".cards").remove();

                //Sigo usando el localStorage, ubico el elemento y lo elimino del localStorage
                const prodEliminado = array.find(obj => obj.id === e.target.id)
                const indiceProdEliminado = array.indexOf(prodEliminado);
                array.splice(indiceProdEliminado, 1);

                //Actualizo la cantidad de productos en el carrito
                $contadorDelCArrito.innerHTML = array.length;

                // Convierto el array a string y lo envio al local storage
                localStorage.setItem("Carrito", JSON.stringify(array));

                //function para actualizar el precio total en elcarrito 
                actualizarCarrito();
                //sweet alert 2
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El producto fue eliminado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    customClass: {
                        popup: "contenedor"
                    }
                });
            } else {
                Swal.fire({
                    title: 'Cancelado',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    customClass: {
                        popup: "contenedor"
                    }
                });
            }
        });
    })();
};

//función para vaciar el carrito
function vaciarCarrito() {

    (()=>{
        Swal.fire({
            title: '¡Advertencia!',
            text: 'El carrito se vaciará por completo, ¿estás seguro?',
            icon: 'info',
            showConfirmButton: true,
            confirmButtonText: 'Confirmar',
            showCancelButton: true,
            cancelButtonText: 'Denegar',
            allowOutsideClick: false,
            customClass: {
                popup: "contenedor"
            }
        }).then(resolve => {
            if(resolve.isConfirmed){
                //establezco el localStorage a vacío
                localStorage.setItem("Carrito", "[]");

                //Actualizo la cantidad de elementos en el lolcalStorage, o sea 0 xd
                $contadorDelCArrito.innerHTML = JSON.parse(localStorage.getItem("Carrito")).length;

                //vacío el main
                $main.innerHTML = `
                <div id="darkTheme">🌑</div>
            `;

                //creo las cartas, otra vez, en el main
                crearCards();

                //devolvemos el contenido  inicial del carrito, borrando lo demas
                $aside.innerHTML = `
                    <div id="containerProd"></div>
    
                    <a id="precioTotal" class="text-decoration-none text-info" href="paginas/carrito.html" target="_blank" rel="noopener noreferrer">
                    Precio Total: $0
                    </a>

                    <button id="vaciarCarrito">Vaciar carrito</button>
                `;
                //sweet alert 2
                Swal.fire({
                    title: 'Limpiado',
                    text: 'El carrito fue limpiado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    customClass: {
                        popup: "contenedor"
                    }
                });
            } else {
                Swal.fire({
                    title: 'Cancelado',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    customClass: {
                        popup: "contenedor"
                    }
                });
            };
        });
    })();
};

//funcion para dismiunuir la cantidad de un producto en el carrito
function disminuirProducto (e){
    if (e.target.matches("#menos")){
        // if (e.target.nextElementSibling.textContent > 1){
        //     e.target.nextElementSibling.textContent--;
        // } else {
        //     e.target.nextElementSibling.textContent = 1;
        // }
        e.target.nextElementSibling.textContent > 1 ? e.target.nextElementSibling.textContent-- : e.target.nextElementSibling.textContent = 1;

        //actualizo el carrito 
        actualizarCarrito()

        //convierto el localStorage en array para modificar un valor con el método map
        const array = JSON.parse(localStorage.getItem("Carrito"));
        array.map(obj => {

            if (obj.id != e.target.parentElement.id) {
                return;
            };

            obj.cantidad <= 1 ? null : obj.cantidad--;
            
        });

        // Convierto el array a string y lo envio al local storage
        localStorage.setItem("Carrito", JSON.stringify(array));

        const name = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute("alt");
        //usando la librería toastify
        Toastify({
            text: `Producto ${name} disminuido`,
            duration: 1000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }
}

//función para aumentar la cantidad de un producto en el carrito
function aumentarProducto (e){
    if (e.target.matches("#mas")){
        e.target.previousElementSibling.textContent++;

        //actualizo el carrito 
        actualizarCarrito()

        //convierto el localStorage en array para modificar un valor con el método map
        const array = JSON.parse(localStorage.getItem("Carrito"));
        array.map(obj => {
            // if (obj.id == e.target.parentElement.id) {
            //     obj.cantidad += 1;
            // };
            obj.id == e.target.parentElement.id ? obj.cantidad++ : null;
        });

        // Convierto el array a string y lo envio al local storage
        localStorage.setItem("Carrito", JSON.stringify(array));

        const name = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute("alt");
        //usando la librería toastify
        Toastify({
            text: `Producto ${name} aumentado`,
            duration: 1000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }
}

//función para mostrar carrito 
function mostrarCarrito(e){
    // e.stopPropagation();
    // if (e.target.matches("#carrito")){
    //     $aside.classList.toggle("mostrarCarrito");
    // } else {
    //     $aside.classList.remove("mostrarCarrito");
    // };
    e.target.matches("#carrito") ? $aside.classList.toggle("mostrarCarrito") : $aside.classList.remove("mostrarCarrito");
};

//función para el modo oscuro
function modoOscuro(e){
    if (e.target.matches("#darkTheme")){
        if(localStorage.getItem("modoOscuro") === "normal"){
            d.querySelector("body").classList.add("dark");
            localStorage.setItem("modoOscuro", "oscuro")
            e.target.textContent = "☀️";

        } else {
            d.querySelector("body").classList.remove("dark");
            localStorage.setItem("modoOscuro", "normal")
            e.target.textContent = "🌑";

        };
    };
};
