import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Presupuesto from './components/Presupuesto'
import Informacion from './components/Informacion'
import Boton from './components/Boton'
import Modal from './components/Modal'
import ResetButton from "./components/ResetButton"
import Reset from "./components/Reset"




function App() {
    const presupuestoLocalStorage = Number(localStorage.getItem("presupuesto")) || 0
    const gastadoLocalStorage = Number(localStorage.getItem("gastado")) || 0
    const gastosLocalStorage = JSON.parse(localStorage.getItem("gastos")) || []

    const [presupuesto, setPresupuesto] = useState(presupuestoLocalStorage);
    const [gastado, setGastado] = useState(gastadoLocalStorage);
    const [gastos, setGastos] = useState(gastosLocalStorage);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [resetBox, setResetBox] = useState(false);


    useEffect(() => localStorage.setItem("presupuesto", presupuesto), [presupuesto])
    useEffect(() => localStorage.setItem("gastado", gastado), [gastado])
    useEffect(() => localStorage.setItem("gastos", JSON.stringify(gastos)), [gastos])

    window.addEventListener('load', () => {
        setLoading(false)
    })

    return (
        <div className="app">
            <Loader loading={loading} />
            <ResetButton setResetBox={setResetBox} />
            <Boton
                setModal={setModal}
            />

            <Reset 
            setPresupuesto={setPresupuesto}
            setGastado={setGastado}
            setGastos={setGastos}
            setResetBox={setResetBox} 
            resetBox={resetBox} />
            <Modal
                modal={modal}
                setModal={setModal}
                gastado={gastado}
                setGastado={setGastado}
                presupuesto={presupuesto}
                gastos={gastos}
                setGastos={setGastos}
            />

            <Presupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
            />
            <Informacion
                presupuesto={presupuesto}
                gastado={gastado}
                setGastado={setGastado}
                gastos={gastos}
                setGastos={setGastos}
            >

            </Informacion>
        </div>
    )
}

export default App
