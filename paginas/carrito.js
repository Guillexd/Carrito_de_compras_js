          // carrito.html
//variables
const d = document,
$formulario = d.getElementById("formulario"),
$inputs = d.querySelectorAll(".formularioInput"),
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
        console.log("funciona")
		d.getElementById(`texto-${campo}`).classList.remove("opacity-100");
        d.getElementById(`texto-${campo}`).classList.add("opacity-0");
		d.querySelector(`#icon-${campo}`).classList.add("fa-check-circle");
		d.querySelector(`#icon-${campo}`).classList.remove("fa-times-circle");
        d.querySelector(`#icon-${campo}`).classList.add("opacity-100");
        d.querySelector(`#icon-${campo}`).classList.remove("opacity-0");
		campos[campo] = true;
	} else {
        console.log("jaja no");
		d.getElementById(`texto-${campo}`).classList.remove("opacity-0");
        d.getElementById(`texto-${campo}`).classList.add("opacity-100");
		d.querySelector(`#icon-${campo}`).classList.add('fa-times-circle');
		d.querySelector(`#icon-${campo}`).classList.remove('fa-check-circle');
        d.querySelector(`#icon-${campo}`).classList.add("opacity-100");
        d.querySelector(`#icon-${campo}`).classList.remove("opacity-0");
		campos[campo] = false;
	};
};

//agregando los eventos a los inputs
$inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

d.addEventListener("DOMContentLoaded", ()=>{
    //convierto el localStorage a un array de objetos
    const array = JSON.parse(localStorage.getItem("Carrito"));
    //primer div del aside
    const $prodFormulario = d.querySelector("#productosLocalStorage")
    //recorremos el localStorage e insertamos los productos en el carrito
    array.forEach((obj) => {
        let total = 0;
        const $precioTotal = d.querySelector("#productosLocalStorage");
        array.forEach(obj => {
            const cantidadStorage = obj.cantidad,
            precioStorage = obj.precio;

            total += (cantidadStorage * precioStorage);
        });

        //el resultado final se pone en el html

        $prodFormulario.innerHTML = `Precio Total: $${total.toFixed(2)}`;
    });
})
