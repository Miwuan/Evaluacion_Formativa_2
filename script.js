// -------- Variables globales --------
let baraja = []
let carta = ''
let puntosJugador = 0
let puntosComputadora = 0

const numeros = [2, 3, 4, 5, 6, 7, 8, 9, 10]
const letras = ['A', 'J', 'Q', 'K']
const palo = ['C', 'D', 'H', 'S']

// -------- Funciones --------
function nuevoJuego() {
	puntosJugador = 0
	puntosComputadora = 0
	baraja = []

	$('#c-jugador').html('')
	$('#c-computadora').html('')
	$('#p-jugador').text(puntosJugador)
	$('#p-computadora').text(puntosComputadora)

	$('#btn-card').removeClass('disabled')
	$('#btn-stop').removeClass('disabled')
	$('#mensajeGanador').attr('hidden', 'true')
	$('#mensajeGanador').removeClass('bg-danger')
	$('#mensajeGanador').removeClass('bg-info')

	crearBaraja()
}

function crearBaraja() {
	for (const p of palo) {
		for (const n of numeros) {
			baraja.push(n + p)
		}
		for (const l of letras) {
			baraja.push(l + p)
		}
	}
	baraja = _.shuffle(baraja)
	console.clear()
	console.log(baraja)
}

function pedirCarta() {
	carta = baraja.shift()
	const cartaHTML = $('#c-jugador').html() + `<img src="./assets/${carta}.png" alt="">`
	$('#c-jugador').html(cartaHTML)
	return carta
}

function sumarPuntos(carta) {
	let puntos = 0

	let valorCarta = carta.slice(0, -1)

	letras.includes(valorCarta)
		? (puntos = valorCarta == 'A' ? 11 : 10)
		: (puntos = valorCarta * 1)

	return puntos
}

function turnoComputadora() {
	console.log('Turno de la computadora')

	$('#btn-card').addClass('disabled')
	$('#btn-stop').addClass('disabled')
	const ciclo = setInterval(function () {
		cartaComputadora()
		if (puntosJugador > 21) {
			clearInterval(ciclo)
			finTurnoComputadora()
		}
		if (puntosComputadora > 21 || puntosComputadora >= puntosJugador) {
			clearInterval(ciclo)
			finTurnoComputadora()
		}
	}, 500)
	console.log('Fin del turno de la computadora')
	return
}

function cartaComputadora() {
	carta = baraja.shift()
	const cartaHTML =
		$('#c-computadora').html() + `<img src="./assets/${carta}.png" alt="">`
	$('#c-computadora').html(cartaHTML)

	puntosComputadora += sumarPuntos(carta)
	$('#p-computadora').text(puntosComputadora)
	return puntosComputadora
}

function finTurnoComputadora() {
	mensajeGanador(
		(puntosComputadora <= 21 && puntosComputadora >= puntosJugador) || puntosJugador > 21
			? (ganador = { mensaje: 'La Computadora Gana', color: 'bg-danger' })
			: (ganador = { mensaje: 'El Jugador Gana', color: 'bg-success' })
	)
}

function mensajeGanador({ mensaje, color }) {
	$('#mensajeGanador').removeAttr('hidden')
	$('#mensajeGanador').html(`<h2 class="text-white">${mensaje}</h2>`)
	$('#mensajeGanador').addClass(color)
}

// -------- Eventos --------
$('#btn-new').click(function () {
	nuevoJuego()
})

$('#btn-card').click(function () {
	let carta = pedirCarta()
	puntosJugador += sumarPuntos(carta)
	$('#p-jugador').text(puntosJugador)

	if (puntosJugador > 21) turnoComputadora()
})

$('#btn-stop').click(function () {
	turnoComputadora()
})

// -------- Empieza Juego --------
nuevoJuego()
