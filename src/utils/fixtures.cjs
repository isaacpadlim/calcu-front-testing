const movimientosBase = [
    { descripcion: 'Quincena', importe: 5000 },
    { descripcion: 'Mesada', importe: 600 },
    { descripcion: 'Concierto', importe: -1800 }
]

function crearMovimiento(overrides = {}) {
    return {
        descripcion: 'Movimiento de prueba',
        importe: 100,
        ...overrides
    }
}

function clonarMovimientosBase() {
    return movimientosBase.map(
        movimiento => ({ ...movimiento })
    )
}

module.exports = {
    movimientosBase,
    crearMovimiento,
    clonarMovimientosBase
}