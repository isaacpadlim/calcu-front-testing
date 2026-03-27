import React, {createContext, useReducer, useEffect} from "react";
import AppReducer from './AppReducer'

//Estado Inicial
const initialState = {
    movimientos : [],
    loading: true,
    error: null
}

//URL de la API
const API_URL = 'https://calculadora-back-u4d2.onrender.com/api/movimientos'

//Creamos el contexto
export const GlobalContext = createContext(initialState)

//Creamos el provider
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    //Cargar la lista de gastos al abrir la app
    useEffect(()=> {
        getMovimientos()
    },[])

    //Actions
    async function getMovimientos() {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'GET'
            })

            const data = await response.json()

            dispatch({
                type: 'GET_MOVIMIENTOS',
                payload: data
            })

        } catch (error) {
            dispatch({
                type: 'ERROR_MOVIMIENTO',
                payload: error.message
            })
        }
    }

    async function addMovimiento(movimiento) {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movimiento)
            })

            const data = await response.json()

            dispatch({
                type: 'ADD_MOVIMIENTO',
                payload: data
            })
        } catch (error) {
            dispatch({
                type: 'ERROR_MOVIMIENTO',
                payload: error.message
            })
        }
    }

    async function deleteMovimiento(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })

            dispatch({
                type: 'DELETE_MOVIMIENTO',
                payload: id
            })

        } catch (error) {
             dispatch({
                type: 'ERROR_MOVIMIENTO',
                payload: error.message
            })
        }
    }

    return(<GlobalContext.Provider value= {{
        movimientos: state.movimientos,
        loading: state.loading,
        error: state.error,
        deleteMovimiento,
        addMovimiento
    }}>
        {children}
    </GlobalContext.Provider>)
}