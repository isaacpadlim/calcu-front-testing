const {
    calcularBalanceDesdeRepositorio,
    crearResumen,
    validarMovimiento,
    buscarMovimiento,
    obtenerDescripciones
} = require('./calculos.cjs')

const {
    crearMovimiento,
    clonarMovimientosBase
} = require('./fixtures.cjs')


describe('Expense Calculator - Activity 8 Hooks and Fixtures', () => {

    let movimientos
    let repositorioMock


    // Runs once before all tests
    beforeAll(() => {
        repositorioMock = {
            obtenerMovimientos: jest.fn()
        }
    })


    // Runs before every test
    beforeEach(() => {
        movimientos = clonarMovimientosBase()

        repositorioMock.obtenerMovimientos
            .mockReturnValue(movimientos)
    })


    // Runs after every test
    afterEach(() => {
        jest.clearAllMocks()
    })


    // Runs once after all tests
    afterAll(() => {
        repositorioMock = null
    })


    // TEST 1
    // Static Fixture
    test('TC01 should return the complete financial summary', () => {

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
    // Static Fixture + Mock
    test('TC02 should call the repository once to calculate balance', () => {

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
    // Static Fixture
    test('TC03 should contain the expected balance information', () => {

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
    // Dynamic Fixture / Factory Pattern
    test('TC04 should throw an error when description is empty', () => {

        // Arrange
        const movimientoInvalido = crearMovimiento({
            descripcion: '',
            importe: 500
        })

        // Act
        const accion = () =>
            validarMovimiento(movimientoInvalido)

        // Assert
        expect(accion).toThrow('Description is required')
    })


    // TEST 5
    // Dynamic Fixture / Factory Pattern
    test('TC05 should find an existing movement', () => {

        // Arrange
        const movimientosBusqueda = [
            crearMovimiento({
                descripcion: 'Quincena',
                importe: 5000
            }),
            crearMovimiento({
                descripcion: 'Mesada',
                importe: 600
            }),
            crearMovimiento({
                descripcion: 'Uber',
                importe: -80
            })
        ]

        // Act
        const resultado =
            buscarMovimiento(movimientosBusqueda, 'Quincena')

        // Assert
        expect(resultado).toBeDefined()
        expect(resultado).toBeTruthy()
    })


    // TEST 6
    // Static Fixture
    test('TC06 should contain Quincena in movement descriptions', () => {

        // Act
        const descripciones =
            obtenerDescripciones(movimientos)

        // Assert
        expect(descripciones).toContain('Quincena')
    })

})