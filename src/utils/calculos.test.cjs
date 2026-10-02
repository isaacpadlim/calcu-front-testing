const {
    calcularBalanceDesdeRepositorio,
    crearResumen,
    validarMovimiento,
    buscarMovimiento,
    obtenerDescripciones
} = require('./calculos.cjs')


describe('Expense Calculator - Activity 7 Assertions', () => {


    // TEST 1
    // Structural Equivalence and Value Equality
    test('TC01 should return the complete financial summary', () => {

        // Arrange
        const movimientos = [
            { descripcion: 'Quincena', importe: 5000 },
            { descripcion: 'Mesada', importe: 600 },
            { descripcion: 'Concierto', importe: -1800 }
        ]

        // Act
        const resultado = crearResumen(movimientos)

        // Assert
        expect(resultado).toEqual({
            ingresos: 5600,
            egresos: -1800,
            balance: 3800,
            cantidad: 3
        })
    })


    // TEST 2
    // Behavioral and Mock Interaction
    test('TC02 should call the repository once to calculate balance', () => {

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
        expect(
            repositorioMock.obtenerMovimientos
        ).toHaveBeenCalledTimes(1)

        expect(resultado).toBe(3800)
    })


    // TEST 3
    // Asymmetric and Partial Matchers
    test('TC03 should contain the expected balance information', () => {

        // Arrange
        const movimientos = [
            { descripcion: 'Quincena', importe: 5000 },
            { descripcion: 'Mesada', importe: 600 },
            { descripcion: 'Concierto', importe: -1800 }
        ]

        // Act
        const resultado = crearResumen(movimientos)

        // Assert
        expect(resultado).toEqual(
            expect.objectContaining({
                balance: 3800,
                cantidad: 3
            })
        )
    })


    // TEST 4
    // Exceptions and Async Handling
    test('TC04 should throw an error when description is empty', () => {

        // Arrange
        const movimientoInvalido = {
            descripcion: '',
            importe: 500
        }

        // Act
        const accion = () =>
            validarMovimiento(movimientoInvalido)

        // Assert
        expect(accion).toThrow('Description is required')
    })


    // TEST 5
    // Existence and Truthiness
    test('TC05 should find an existing movement', () => {

        // Arrange
        const movimientos = [
            { descripcion: 'Quincena', importe: 5000 },
            { descripcion: 'Mesada', importe: 600 },
            { descripcion: 'Uber', importe: -80 }
        ]

        // Act
        const resultado =
            buscarMovimiento(movimientos, 'Quincena')

        // Assert
        expect(resultado).toBeDefined()
        expect(resultado).toBeTruthy()
    })


    // TEST 6
    // Collections and Strings
    test('TC06 should contain Quincena in movement descriptions', () => {

        // Arrange
        const movimientos = [
            { descripcion: 'Quincena', importe: 5000 },
            { descripcion: 'Mesada', importe: 600 },
            { descripcion: 'Uber', importe: -80 }
        ]

        // Act
        const descripciones =
            obtenerDescripciones(movimientos)

        // Assert
        expect(descripciones).toContain('Quincena')
    })

})