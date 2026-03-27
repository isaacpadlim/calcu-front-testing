import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import Movimiento from './Movimiento'

const MovimientosLista = () => {

    const {movimientos} = useContext(GlobalContext)

  return (
    <>
        <h3>Movimientos</h3>
        <ul className='list'>
            {movimientos.map(movimiento => (
                <Movimiento key={movimiento._id} movimiento={movimiento} />
            ))}
        </ul>
    </>
  )
}

export default MovimientosLista