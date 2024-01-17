const inventario = [
    {
        "marca": "yamaha",
        "nombre": "dt",
        "modelo": 1997, 
        "referencia": "DT175", 
        "cilindraje": 171, 
        "foto": "img/moto1.jpeg",
        "precio": 2300000,
        "kilometraje": 53000,
    },
    {
        "marca": "yamaha",
        "nombre": "fz", 
        "modelo": 2022, 
        "referencia": "fazer", 
        "cilindraje": 150, 
        "foto": "img/moto2.jpeg",
        "precio": 4300000,
        "kilometraje": 23000,
    },
    {
        "marca": "yamaha",
        "nombre": "fz", 
        "modelo": 2022, 
        "referencia": "fazer", 
        "cilindraje": 150, 
        "foto": "img/moto2.jpeg",
        "precio": 3300000,
        "kilometraje": 23000,
    },
    {
        "marca": "yamaha",
        "nombre": "mt", 
        "modelo": 2022, 
        "referencia": "03", 
        "cilindraje": 299, 
        "foto": "img/moto3.jpeg",
        "precio": 8300000,
        "kilometraje": 23000,
    },
    {
        "marca": "honda",
        "nombre": "NAVI", 
        "modelo": 2020, 
        "referencia": "VANI MIX", 
        "cilindraje": 110,      
        "foto":"img/moto4.jpeg",
        "precio": 2800000,
        "kilometraje": 28000,
        "color":"azul",
    },
    {
        "marca": "honda",
        "nombre": "CBX", 
        "modelo": 2023, 
        "referencia": "TWISTER", 
        "cilindraje": 250, 
        "foto":"img/moto3.jpeg",
        "precio": 2300000,
        "kilometraje": 23000,
    },
    {
        "marca": "honda",
        "nombre": "CB", 
        "modelo": 2022, 
        "referencia": "CB-660", 
        "cilindraje": 660, 
        "foto":"img/moto3.jpeg",
        "precio": 4200000,
        "kilometraje": 23000,
    }
]
//PAGINACION
//Generar datos para luego llamar a imprimir
const generarDatos = function(toPrint) {
    //eliminar los articulos actuales
    const element = document.querySelector(".newsCards");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    toPrint.forEach(element => {
        const article = document.createElement("article");
        article.innerHTML = `<div class="card"><img src="${element.foto}"alt="cards"><h3>${element.marca}<span>${element.nombre.toUpperCase()}</span></h3><ul><li>Modelo: ${element.modelo}</li><li>Cilindraje: ${element.cilindraje}cc</li><li>Kilometraje: ${element.kilometraje}</li></ul><br><p>Precio: ${element.precio.toLocaleString('es-ES')} COP</p><hr><a href="#">Mas información<i class="fas fa-angle-double-right"></i></a><div id="addShop"><button id="addShop"><i class="fa fa-shopping-bag" aria-hidden="true"></i>Agregar al carrito</button></div></div>`;
        const deposito =  document.querySelector('.newsCards');
        deposito.appendChild(article)
    });
}
//ADAPTANDO PAGINACION
    //LECTURA DE BOTONES
        const botonAtrasDOM = document.querySelector(".atras");
        const botonSiguienteDOM = document.querySelector(".siguiente");
        const botonAtrasDOM1 = document.querySelector(".atras1");
        const botonSiguienteDOM1 = document.querySelector(".siguiente1");
        const elementosPorPagina = 4;
        let paginaActual = 1;

    //PAGINACION
        function avanzarPagina() {
            paginaActual++;
            window.scrollTo(0, 0)
            renderizar(inventario);
        }
        function retrocederPagina() {
            paginaActual--;
            window.scrollTo(0, 0)
            renderizar(inventario);
        }
        function obtenerRebanadaDeBaseDeDatos(pagina) {
            const corteDeInicio = (pagina - 1) * elementosPorPagina;
            let corteDeFinal = corteDeInicio + elementosPorPagina;
            if (corteDeFinal > inventario.length) corteDeFinal = inventario.length;
            return [corteDeInicio,corteDeFinal];
        }

        function gestionarBotones() {
            // Comprobar que no se pueda retroceder
            if (paginaActual === 1) {
            botonAtrasDOM.setAttribute("disabled", true);
            botonAtrasDOM1.setAttribute("disabled", true);
            botonAtrasDOM.classList.add('buttonOff');
            botonAtrasDOM1.classList.add('buttonOff');
            } else {
            botonAtrasDOM.removeAttribute("disabled");
            botonAtrasDOM1.removeAttribute("disabled");
            botonAtrasDOM.classList.remove('buttonOff');
            botonAtrasDOM1.classList.remove('buttonOff');
            }
            // Comprobar que no se pueda avanzar
            if (paginaActual === obtenerPaginasTotales()) {
            botonSiguienteDOM.setAttribute("disabled", true);
            botonSiguienteDOM1.setAttribute("disabled", true);
            botonSiguienteDOM.classList.add('buttonOff')
            botonSiguienteDOM1.classList.add('buttonOff')
            } else {
            botonSiguienteDOM.removeAttribute("disabled");
            botonSiguienteDOM1.removeAttribute("disabled");
            botonSiguienteDOM.classList.remove('buttonOff')
            botonSiguienteDOM1.classList.remove('buttonOff')
        
            }
        }

        function obtenerPaginasTotales() {
            return Math.ceil(inventario.length / elementosPorPagina);
        }
        //FUNCION PRINCIPAL DE PAGINACION ->> CREACION DE ARTICULOS
        function renderizar(toCut) {
            let toPrint = new Array();
            let [elementInicio,elementFin] = obtenerRebanadaDeBaseDeDatos(paginaActual);
            gestionarBotones();
            // Crear un artículo para cada elemento que se encuentre en la página actual
            for (let index = elementInicio; index < elementFin; index++) {
                toPrint.push(toCut[index])
            }
            generarDatos(toPrint);
        }
        botonAtrasDOM.addEventListener("click", retrocederPagina);
        botonSiguienteDOM.addEventListener("click", avanzarPagina);
        botonAtrasDOM1.addEventListener("click", retrocederPagina);
        botonSiguienteDOM1.addEventListener("click", avanzarPagina);
        //LLAMADO INICIAL A LA FUNCIONA DE PAGINACION, RECIBE EL ARREGLO QUE VOY A RECORRER
        renderizar(inventario);

    //callToSearch Button NAVEGACION
        //llamado con el boton de busqueda
        const callToSearch = () => {
            let toCut = new Array();
            let letter = document.querySelector('#textNav');
            let input = letter.value.toLowerCase();
            let arrInput = input.split(' ');
            arrInput.forEach(inputs => {
                inventario.forEach(element => {
                    JSON.stringify(element).toLowerCase().includes(inputs)?toCut.push(element):console.log("rechace")
                });
                generarDatos(toCut); 
            });

        }
        let buttonFilter = document.querySelector('#callToSearch'); 
        buttonFilter.addEventListener('click', callToSearch)

//BARRA DE BUSQUEDA
    //borrar caja de texto
    let mostrarAlgo = function() {
        const mensaje = document.querySelector("#textNav");
        mensaje.value = '';
    }
    //Funciona para volver a inicio con lupa
    function toTop() {
        window.scrollTo(0, 0)
    }

    //FILTRADO LEFT
    function filtrar(e) {
        //PARA LOS PRECIOS
        if (e.target.innerText.length >= 15) {
            let motosPrice = new Array(); //array de motos que estan en el rango de precio
            let numero = new Array();
            let arrPrice = e.target.innerText.split(' - ');
            arrPrice.forEach(valor => {
                numero.push(valor.replace("'","").replace(".",""));
            });
            console.log(numero)
            inventario.forEach(element => {
                if (element.precio >= Number(numero[0]) && element.precio <= Number(numero[1])) {
                   motosPrice.push(element); 
                }
            });
            console.log(motosPrice) 
            generarDatos(motosPrice)
        } else {
            //RESTO DE FILTRADO
            let toCut = new Array();
            let letter = e.target.innerText;
            let input = letter.toLowerCase();
                inventario.forEach(element => {
                    JSON.stringify(element).toLowerCase().includes(input)?toCut.push(element):console.log("rechace")
                });
            window.scrollTo(0, 100)
            generarDatos(toCut)  
        }
    }
    const marcas = document.querySelector('.filterMarcas');
    const colores = document.querySelector('.filterColor');
    const precios = document.querySelector('.filterPrice');
    marcas.addEventListener("click", filtrar, false);
    colores.addEventListener("click", filtrar, false);
    precios.addEventListener("click", filtrar, false);
    //menu hamburguesa

        //ESCUCHA DE BOTON HAMBURGUESA
        document.querySelector('.menu-btn').addEventListener('click', () => {
            document.querySelector('.nav-menu').classList.toggle("show")
        });
        //ESCUCHAR BOTON INICIO DE SESION 
        document.querySelector('.fa-user-circle').addEventListener('click', () => {
            document.querySelector('.login-wrap').classList.toggle("showLogin")
        });


    //LLAMAR AL METODO DE CONTROLADOR PARA REGISTRO
        import { controlador } from "./controllers/controlador.js";

        const formu = document.querySelector("#singUp");   
        formu.addEventListener("submit", (e) => {
            console.log("lei registro")
            e.preventDefault();
            controlador(formu, e, "usuarios");
            e.stopPropagation();
            e.preventDefault();
        });
    //LLAMAR AL METODO DE CONTROLADOR PARA INICIO DE SESION
        const sesion = document.querySelector("#singIn");   
        sesion.addEventListener("submit", (e) => {
            console.log("lei inicio")
            e.preventDefault();
            controlador(sesion, e, "usuarios");
            e.stopPropagation();
            e.preventDefault();
        });
