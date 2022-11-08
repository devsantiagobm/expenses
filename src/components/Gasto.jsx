import useFormatter from "../hooks/useFormatter";
import DeleteIcon from "../assets/delete.svg"

export default function Gasto({ gasto, keyId, gastos, setGastos, gastado, setGastado }) {
    const { name, amount, category, date, id } = gasto;
    const dineroFormateado = useFormatter(Number(amount.replaceAll(",", "")))
    
    const imagenes = {
        0: "savings.svg",
        1: "food.svg",
        2: "house.svg",
        3: "expenses.svg",
        4: "leisure.svg",
        5: "health.svg",
        6: "subscription.svg"
    }

    const categorias = {
        0: "Saving",
        1: "Food",
        2: "House",
        3: "Various expenses",
        4: "Leisure",
        5: "Health",
        6: "Subscriptions"
    }

    function borrarGasto(id){
        const gastosFiltrados = gastos.filter( gasto => gasto.id !== id)
        const elementoFiltrado = gastos.filter( gasto => gasto.id === id)[0]
        const dineroElementoFiltrado = Number(elementoFiltrado.amount.replaceAll(",", "") )

        setGastado( gastado - dineroElementoFiltrado)
        setGastos( gastosFiltrados)
    }

    return (
        <div className="bill__expense expense" data-category={category}>
            <div className="expense__flex">
                <picture className="expense__picture">
                    {/* <img src={`../src/assets/${imagenes[category]}`} alt="ahorro" /> dev */ } 
                    <img src={`./assets/${imagenes[category]}`} alt="ahorro" />{ /* build */ }
                </picture>

                <div className="expense__data">
                    <span className="expense__type">{categorias[category]}</span>
                    <span className="expense__invoice">{name}</span>
                    <span className="expense__added">
                        Added the:
                        <div className="expense__date">{date}</div>
                    </span>
                </div>
            </div>


            <div className="expense__actions">
                <div className="expense__amount">${dineroFormateado}</div>
                <button className="expense__delete" data-id={id} onClick={ () => borrarGasto(id)}>
                    <img src={DeleteIcon} alt="delete icon" className="expense__icon"/>
                </button>

            </div>
        </div>

    )
}