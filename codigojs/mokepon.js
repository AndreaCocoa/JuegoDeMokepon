const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
let botonFuego
let botonTierra 
let botonAgua
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorTarjetasAtaques = document.getElementById("contenedor-tarjetas-ataques")

//para el canvas
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
let lienzo = mapa.getContext("2d")

//variables globales de ataques y vidas
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let mokeponElegido
let opcionDeAtaques
let victoriasJugador = 0
let victoriasEnemigo = 0
let botones = []
let mascotaAleatoria
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo


let inputHipodoge
let inputCapipepo
let inputRatigueya

//Definir la clase:
class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

//Crear objetos
let hipodoge = new Mokepon("Hipodoge", "./assets/hipodoge.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/capipepo.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/ratigueya.png", 5)

//Agregar ataques por cada objeto con objetos literales
hipodoge.ataques.push(
    {nombre : "💦", id : "boton-agua"},
    {nombre : "💦", id : "boton-agua"},
    {nombre : "💦", id : "boton-agua"},
    {nombre : "🔥", id : "boton-fuego"},
    {nombre : "🌱", id : "boton-tierra"}
    
)

capipepo.ataques.push(
    {nombre : "🌱", id : "boton-tierra"},
    {nombre : "🌱", id : "boton-tierra"},
    {nombre : "🌱", id : "boton-tierra"},
    {nombre : "💦", id : "boton-agua"},
    {nombre : "🔥", id : "boton-fuego"}
)

ratigueya.ataques.push(
    {nombre : "🔥", id : "boton-fuego"},
    {nombre : "🔥", id : "boton-fuego"},
    {nombre : "🔥", id : "boton-fuego"},
    {nombre : "💦", id : "boton-agua"},
    {nombre : "🌱", id : "boton-tierra"}
)

mokepones.push(hipodoge, capipepo, ratigueya)


// Log permite dar mensajes en el navegador para, por ejemplo, ver si algo funciona, mapear errores, etc.

// función para que se ejecute el código después de que cargue todo el html.
function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"    
    sectionReiniciar.style.display = "none"
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type = "radio" name = "mascota" id="${mokepon.nombre}"/>
        <label class = "tarjeta-de-mokepon" for = "${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")
    inputHipodoge = document.getElementById("Hipodoge")
    })

    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

// buscará al elemento de html que tenga el id (nombre de la variable)
function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = "none"
    sectionVerMapa.style.display = "flex"
    
    //vamos a dibujar
        //lo que .fillRect() hace es rellenar con un cuadrado.
        //5: coordenada x; 15: coordenada y; 20: ancho; 40: alto
    //lienzo.fillRect(5, 15, 20, 40)

    let imagenDeCapipepo = new Image()
    imagenDeCapipepo.src = capipepo.foto
    lienzo.drawImage(
        imagenDeCapipepo,
        20,
        40,
        50,
        50
    )


    // sectionSeleccionarAtaque.style.display = "flex"

    //Usar una sola Fuente de Verdad:
    //al usar typeof(inputCapipepo), vemos que inputCapipepo es un objeto.
    //Por tanto, es posible acceder a su id de la siguiente manera:
    if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mokeponElegido = inputCapipepo.id
    } else if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mokeponElegido = inputHipodoge.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mokeponElegido = inputRatigueya.id
    } else {
        alert("Elija una mascota!")
    }

    extraerAtaque(mokeponElegido)
    seleccionarMascotaEnemigo()
}

function extraerAtaque(mokeponElegido) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mokeponElegido === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        opcionDeAtaques = `
        <button id = ${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
        `
        contenedorTarjetasAtaques.innerHTML += opcionDeAtaques
    });

    botonFuego = document.getElementById("boton-fuego")
    botonTierra = document.getElementById("boton-tierra")
    botonAgua = document.getElementById("boton-agua")
    botones = document.querySelectorAll(".boton-de-ataque")
    //El profesor creó una nueva clase llamada BAtaques para extraer estos elementos.
    //Pero ¿por qué no usó la clase que ya existía?
}


function aleatorio(max, min) {
    return Math.floor(Math.random()*(max-min+1)+min)
}


//función para elegir una mascota enemiga aleatoriamente
function seleccionarMascotaEnemigo() {
    mascotaAleatoria = aleatorio(mokepones.length -1,0)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
    
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => { //e hace referencia al evento
            if (e.target.textContent === "🔥") { //e.target es... el target del e xd
                ataqueJugador.push("fuego")
            } else if (e.target.textContent === "💦") {
                ataqueJugador.push("agua")
            } else if (e.target.textContent === "🌱") {
                ataqueJugador.push("tierra")
            }
            
            secuenciaAtaqueEnemigo()
        boton.style.background = "#60acf828"
        boton.disabled = true
        })
    })
}

function secuenciaAtaqueEnemigo() {     
    let ataqueAleatorio = aleatorio(3, 1)
    //función para elegir un ataque aleatorio del enemigo
    if (ataqueAleatorio == 1) {
        ataqueEnemigo.push("fuego")
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo.push("agua")
    } else {
        ataqueEnemigo.push("tierra")
    }
    validacionIniciarPelea()
}

//Asegura que ya estén listos los ataques en los arreglos
function validacionIniciarPelea() {
    if (ataqueEnemigo.length === 5) {
        console.log(ataqueEnemigo)
        console.log(ataqueJugador)
        combate()
    }
}
//     ataqueJugador = "FUEGO"
//     ataqueAleatorioEnemigo()
// }

// function ataqueAgua() {
//     ataqueJugador = "AGUA"
//     ataqueAleatorioEnemigo()
// }

// function ataqueTierra() {
//     ataqueJugador = "TIERRA"
//     ataqueAleatorioEnemigo()
// }




//     combate()
// }

//función para crear mensajes
function crearMensaje(resultado) {

    let nuevoAtaqueDelEnemigo = document.createElement("p")
    let nuevoAtaqueDelJugador = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    console.log(indexAtaqueJugador)
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    console.log(indexAtaqueEnemigo)
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}


//función para anunciar resultados con un mensaje
function crearMensajeFinal(resultadoFinal) {
    

    sectionMensajes.innerHTML = resultadoFinal

    //deshabilitar botones!
    

    

    //mostrar botón para reiniciar
    
    sectionReiniciar.style.display = "block"

}

//función para guardar los ataques en variables(que cambian por cada ronda)
function indexAmbosOponentes(numero) {
    indexAtaqueEnemigo = ataqueEnemigo[numero]
    indexAtaqueJugador = ataqueJugador[numero]
}


// función para saber quién gana el combate
function combate() {
    for (let i = 0; i < ataqueEnemigo.length; i++) {
        indexAmbosOponentes(i)
        if (ataqueJugador[i] == ataqueEnemigo[i]) {
            crearMensaje("Empate")
        } else if ((ataqueJugador[i] == "agua" && ataqueEnemigo[i] == "fuego") || (ataqueJugador[i] == "fuego" && ataqueEnemigo[i] == "tierra") || (ataqueJugador[i] == "tierra" && ataqueEnemigo[i] == "agua")) {
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
            //aunque la variable haga referencia a las vidas del jugador, en realidad 
            //solo estamos tomando el espacio con ese nombre para mostrar las victorias 
        } else {
            crearMensaje("Perdiste")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
    } 

    // if (ataqueJugador == ataqueEnemigo) {
    //     crearMensaje("EMPATE")
    // } else if ((ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") || (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") || (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA")) {
    //     crearMensaje("GANASTE")
    //     vidasEnemigo--
    //     spanVidasEnemigo.innerHTML = vidasEnemigo
    // } else {
    //     crearMensaje("PERDISTE")
    //     vidasJugador--
    //     spanVidasJugador.innerHTML = vidasJugador
    // }

    revisarVidas()
}


//función para ver cuándo las vidas llegan a 0
function revisarVidas() {
    if (victoriasEnemigo < victoriasJugador) {
        crearMensajeFinal("FELICITACIONES, GANASTE")
    } else if (victoriasEnemigo > victoriasJugador) {
        crearMensajeFinal("LOSIEMTO, PERDISTE")
    } else {
        crearMensajeFinal("EMPATE!")
    }   

}


//función para reiniciar
function reiniciarJuego() {
    location.reload()
}


window.addEventListener("load", iniciarJuego)