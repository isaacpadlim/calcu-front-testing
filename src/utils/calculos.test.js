const {
    calcularIngresos,
    CalculadoraGastos,
    calcularBalanceDesdeRepositorio
} = require('./calculos')


describe('Expense Calculator Unit Tests', () => {


    // TEST 1
    // Arrange Type 1: Initializing inputs and parameters
    test('should calculate total income correctly', () => {

        // Arrange
        const movimientos = [
            { descripcion: 'Quincena', importe: 5000 },
            { descripcion: 'Mesada', importe: 600 },
            { descripcion: 'Marquesita', importe: -70 }
        ]

        // Act
        const resultado = calcularIngresos(movimientos)

        // Assert
        expect(resultado).toBe(5600)
    })


    // TEST 2
    // Arrange Type 2: Instantiating object on the SUT
    test('should calculate current balance correctly', () => {

        // Arrange
        const movimientos = [
            { descripcion: 'Marquesita', importe: -70 },
            { descripcion: 'Tacos de pastor', importe: -35 },
            { descripcion: 'Quincena', importe: 5000 },
            { descripcion: 'Uber', importe: -80 },
            { descripcion: 'Concierto', importe: -1800 },
            { descripcion: 'Mesada', importe: 600 }
        ]

        const calculadora = new CalculadoraGastos(movimientos)

        // Act
        const resultado = calculadora.obtenerBalance()

        // Assert
        expect(resultado).toBe(3615)
    })


    // TEST 3
    // Arrange Type 3: Configuring dependency with mock
    test('should calculate balance using a mocked repository', () => {

        // Arrange
        const repositorioMock = {
            obtenerMovimientos: jest.fn().mockReturnValue([
                { descripcion: 'Quincena', importe: 5000 },
                { descripcion: 'Mesada', importe: 600 },
                { descripcion: 'Concierto', importe: -1800 }
            ])
        }

        // Act
        const resultado =
            calcularBalanceDesdeRepositorio(repositorioMock)

        // Assert
        expect(resultado).toBe(3800)

        expect(
            repositorioMock.obtenerMovimientos
        ).toHaveBeenCalledTimes(1)
    })


})