import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

const Balance = () => {

    const {movimientos} = useContext(GlobalContext)

    //obtener todos los importes de nuestros gastos
    const importes = movimientos.map(movimiento => movimiento.importe)

    //calcular el total
    const total = importes.reduce((acc, item) => (acc += item), 0).toFixed(2)

  return (
    <>
        <h4>Tu Saldo</h4>
        <h1>${total}</h1>
    </>
  )
}

export default Balance