          // carrito.html
//variables
const d = document,
$formulario = d.getElementById("formulario"),
$inputs = d.querySelectorAll(".formularioInput"),
$fragment2 = d.createDocumentFragment(),
expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^(\+?[\d-_\s]{2,4})?\d{7,14}$/ // 7 a 14 numeros.
},
campos = {
	nombre: false,
	correo: false,
	telefono: false
};

//evento para enviar formulario
$formulario.addEventListener("submit", (e) => {

	e.preventDefault();

	const $terminos = d.getElementById("terminos");
	if(campos.nombre && campos.correo && campos.telefono && $terminos.checked ){
        //sweet alert 2
        Swal.fire({
            title: '¡Advertencia!',
            text: 'El formulario se enviará, ¿estás seguro?',
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
            if (resolve.isConfirmed){

                $formulario.reset();

                d.getElementById("formularioMensaje").classList.add("opacity-0");
                d.getElementById("formularioMensaje").classList.remove("opacity-100");
                d.getElementById("formularioExito").classList.add("opacity-100");
                setTimeout(() => {
                    d.getElementById("formularioExito").classList.remove("opacity-100");
                }, 7000);

                d.querySelectorAll(".icon").forEach(icon => {
                    icon.classList.add('fa-times-circle');
                    icon.classList.remove('fa-check-circle');
                    icon.classList.remove("opacity-100");
                    icon.classList.add("opacity-0");
                });
                //sweet alert 2
                Swal.fire({
                    title: '¡Envio exitoso!',
                    text: 'El formulario fue enviado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    customClass: {
                        popup: "contenedor"
                    }
                });
            } else{
                //sweet alert 2
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
    } else{
        d.querySelector("#formularioMensaje").classList.add("opacity-100")
        setTimeout(()=>{
            d.querySelector("#formularioMensaje").classList.remove("opacity-100");
        }, 3000)

        //sweet alert 2
        Swal.fire({
            title: 'No se puede enviar el formulario',
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

//función para validar inputs parte 1
const validarFormulario = (e) => {
    e.target.innerHTML="holaxdxd"
	switch (e.target.id) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, e.target.id);
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, e.target.id);
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, e.target.id);
		break;
	};
};

//funcion para validar inputs parte 2
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		d.getElementById(`texto-${campo}`).classList.remove("opacity-100");
        d.getElementById(`texto-${campo}`).classList.add("opacity-0");
		d.querySelector(`#icon-${campo}`).classList.add("fa-check-circle");
		d.querySelector(`#icon-${campo}`).classList.remove("fa-times-circle");
        d.querySelector(`#icon-${campo}`).classList.add("opacity-100");
        d.querySelector(`#icon-${campo}`).classList.remove("opacity-0");
		campos[campo] = true;
	} else {
		d.getElementById(`texto-${campo}`).classList.remove("opacity-0");
        d.getElementById(`texto-${campo}`).classList.add("opacity-100");
		d.querySelector(`#icon-${campo}`).classList.add('fa-times-circle');
		d.querySelector(`#icon-${campo}`).classList.remove('fa-check-circle');
        d.querySelector(`#icon-${campo}`).classList.add("opacity-100");
        d.querySelector(`#icon-${campo}`).classList.remove("opacity-0");
		campos[campo] = false;
	};
};

//función para quitar los productos del carrito
function quitarProducto_ls(e) {

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
        if (resolve.isConfirmed) {
            //hago uso del LocalStorage para el elemento eliminado
            const array = JSON.parse(localStorage.getItem("Carrito"));

            //ubico el elemento y lo elimino del localStorage
            const prodEliminado = array.find(obj => `trash_ls${obj.id}` == e.target.id)
            const indiceProdEliminado = array.indexOf(prodEliminado);
            array.splice(indiceProdEliminado, 1);

            //Elimino el producto del carrito
            const button = e.target;
            button.closest(".cards").remove();

            // Convierto el array a string y lo envio al local storage
            localStorage.setItem("Carrito", JSON.stringify(array));

            //function para actualizar el precio total en elcarrito 
            mostrarTotal();
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
};

//funcion para dismiunuir la cantidad de un producto en el carrito
function disminuirProducto_ls(e) {
    if (e.target.matches("#menos_ls")) {
        e.target.nextElementSibling.textContent > 1 ? e.target.nextElementSibling.textContent-- : e.target.nextElementSibling.textContent = 1;

        //actualizo el carrito 
        mostrarTotal()

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
            duration: 500,
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
function aumentarProducto_ls(e) {
    if (e.target.matches("#mas_ls")) {
        e.target.previousElementSibling.textContent++;

        //actualizo el carrito 
        mostrarTotal()

        //convierto el localStorage en array para modificar un valor con el método map
        const array = JSON.parse(localStorage.getItem("Carrito"));
        array.map(obj => {
            obj.id == e.target.parentElement.id ? obj.cantidad++ : null;
        });
        // Convierto el array a string y lo envio al local storage
        localStorage.setItem("Carrito", JSON.stringify(array));

        const name = e.target.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute("alt");
        //usando la librería toastify
        Toastify({
            text: `Producto ${name} aumentado`,
            duration: 500,
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

//función para actualizar el precio
function mostrarTotal(){
    //convierto el localStorage a un array de objetos
    const array = JSON.parse(localStorage.getItem("Carrito"));
    //primer div del aside
    const $prodFormulario = d.querySelector("#productosLocalStorageTotal")
    //recorremos el localStorage e insertamos los productos en el carrito
    array.forEach((obj) => {
        let total = 0;
        array.forEach(obj => {
            const cantidadStorage = obj.cantidad,
            precioStorage = obj.precio;

            total += (cantidadStorage * precioStorage);
        });

        //el resultado final se pone en el html

        $prodFormulario.innerHTML = `Precio Total: $${total.toFixed(2)}`;
    });
}

//cargando eventos
function cargandoEventos_ls(){
    d.addEventListener("click", aumentarProducto_ls);
    d.addEventListener("click", disminuirProducto_ls);
}

d.addEventListener("DOMContentLoaded", ()=>{

    //agregando los eventos a los inputs
    $inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    //cargando más eventos
    cargandoEventos_ls()

    //convierto el localStorage a un array de objetos
    const array = JSON.parse(localStorage.getItem("Carrito"));
    //primer div del aside
    const $containerProd_ls = d.querySelector("#productosLocalStorage");
    //recorremos el localStorage e insertamos los productos en el carrito
    array.forEach((obj) => {
        const $section = d.createElement("section");
        $section.classList.add("cards");
        $section.classList.add("d-flex");
        $section.classList.add("justify-content-between");
        $section.classList.add("align-items-center");
        $section.classList.add("px-5");
        $section.innerHTML = `
                <div class="img_ls">
                    <img src="../${obj.img}" alt="${obj.nombre}">
                </div>

                <div class="text-center">
                    <span>${obj.nombre}</span>
                    <span id="precio_ls">$${obj.precio}</span>
                    <div id="${obj.id}">
                        <i id="menos_ls" class="fa-solid fa-minus"></i>
                        <span id="contador">${obj.cantidad}</span>
                        <i id="mas_ls" class="fa-solid fa-plus"></i>
                    </div>
                </div>

                <i id="trash_ls${obj.id}" class="fa-solid fa-trash notification-alert_ls"></i>
                `;

        $fragment2.prepend($section);

        //a cada section le agrego un boton con un evento para quitar un producto
        $section.querySelector(`#trash_ls${obj.id}`).addEventListener('click', quitarProducto_ls);
    });

    //agregamos el fragment al aside
    $containerProd_ls.prepend($fragment2)//pone de primer hijo 

    mostrarTotal();
})
