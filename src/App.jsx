import React from 'react'
import { GlobalProvider } from './context/GlobalState'
import Header from './components/Header'
import Balance from './components/Balance'
import IngresosEgresos from './components/IngresosEgresos'
import MovimientosLista from './components/MovimientosLista'
import AddForm from './components/AddForm'

const App = () => {
  return (
    <GlobalProvider>
        <Header />
        <div className="container">
          <Balance />
          <IngresosEgresos />
          <MovimientosLista />
          <AddForm />
        </div>
    </GlobalProvider>
  )
}

export default App