
import Shape from "./Shape";
import Datos from "./Datos";
import ListaGastos from "./ListaGastos";


export default function Informacion(props) {
    const { presupuesto, gastado, disponible, gastos, setGastos, setGastado } = props;
    return (
        <div className="information">
            <div className="information__flex">
                <Datos presupuesto={presupuesto} gastado={gastado} disponible={disponible} />
                <Shape presupuesto={presupuesto} gastado={gastado} />
            </div>
            <ListaGastos gastos={gastos} setGastos={setGastos} gastado={gastado} setGastado={setGastado} />


        </div>

    )
}