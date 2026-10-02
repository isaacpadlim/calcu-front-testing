function calcularIngresos(movimientos) {
    const importes = movimientos.map(
        movimiento => movimiento.importe
    )

    return importes
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
}


function calcularEgresos(movimientos) {
    const importes = movimientos.map(
        movimiento => movimiento.importe
    )

    return importes
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0)
}


function calcularBalance(movimientos) {
    const importes = movimientos.map(
        movimiento => movimiento.importe
    )

    return importes.reduce(
        (acc, item) => acc + item,
        0
    )
}


class CalculadoraGastos {

    constructor(movimientos) {
        this.movimientos = movimientos
    }

    obtenerBalance() {
        return calcularBalance(this.movimientos)
    }
}


function calcularBalanceDesdeRepositorio(repositorio) {

    const movimientos = repositorio.obtenerMovimientos()

    return calcularBalance(movimientos)
}


// New function for HW07
function crearResumen(movimientos) {

    return {
        ingresos: calcularIngresos(movimientos),
        egresos: calcularEgresos(movimientos),
        balance: calcularBalance(movimientos),
        cantidad: movimientos.length
    }
}


// New function for HW07
function validarMovimiento(movimiento) {

    if (!movimiento.descripcion) {
        throw new Error('Description is required')
    }

    if (typeof movimiento.importe !== 'number') {
        throw new Error('Amount must be a number')
    }

    return true
}


// New function for HW07
function buscarMovimiento(movimientos, descripcion) {

    return movimientos.find(
        movimiento => movimiento.descripcion === descripcion
    )
}


// New function for HW07
function obtenerDescripciones(movimientos) {

    return movimientos.map(
        movimiento => movimiento.descripcion
    )
}


module.exports = {
    calcularIngresos,
    calcularEgresos,
    calcularBalance,
    CalculadoraGastos,
    calcularBalanceDesdeRepositorio,
    crearResumen,
    validarMovimiento,
    buscarMovimiento,
    obtenerDescripciones
}