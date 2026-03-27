const AppReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MOVIMIENTOS':
            return {
                ...state,
                loading: false,
                movimientos: action.payload
            }
        case 'DELETE_MOVIMIENTO':
            return {
                ...state,
                loading: false,
                movimientos: state.movimientos.filter(movimiento => movimiento._id !== action.payload)
            }
        case 'ADD_MOVIMIENTO':
            return {
                ...state,
                loading: false,
                movimientos : [action.payload, ...state.movimientos]
            }
        case 'ERROR_MOVIMIENTO':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    }
}

export default AppReducer