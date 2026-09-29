// Calculates total income
function calcularIngresos(movimientos) {
    const importes = movimientos.map(
        movimiento => movimiento.importe
    )

    return importes
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
}


// Calculates total expenses
function calcularEgresos(movimientos) {
    const importes = movimientos.map(
        movimiento => movimiento.importe
    )

    return importes
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0)
}


// Calculates current balance
function calcularBalance(movimientos) {
    const importes = movimientos.map(
        movimiento => movimiento.importe
    )

    return importes.reduce(
        (acc, item) => acc + item,
        0
    )
}


// Used to demonstrate Arrange Type 2:
// Instantiating an object on the SUT
class CalculadoraGastos {

    constructor(movimientos) {
        this.movimientos = movimientos
    }

    obtenerBalance() {
        return calcularBalance(this.movimientos)
    }
}


// Used to demonstrate Arrange Type 3:
// Dependency configured with a mock
function calcularBalanceDesdeRepositorio(repositorio) {

    const movimientos = repositorio.obtenerMovimientos()

    return calcularBalance(movimientos)
}


module.exports = {
    calcularIngresos,
    calcularEgresos,
    calcularBalance,
    CalculadoraGastos,
    calcularBalanceDesdeRepositorio
}