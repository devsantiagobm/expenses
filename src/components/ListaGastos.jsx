import { useEffect } from "react";
import Arrow from "../svg/Arrow";
import Gasto from "./Gasto";


export default function ListaGastos({ gastos, setGastos, gastado, setGastado }) {
    const categorias = ["saving", "food", "house", "various expenses", "leisure", "health", "subscriptions"]
    function abrirCategorias() {
        const listaCategorias = document.querySelector('.filter__list')
        const estado = listaCategorias.dataset
        const estaActivo = estado.active == "true";

        if (estaActivo) {
            listaCategorias.style.maxHeight = "0px"
            estado.active = "false"
            return;
        }

        listaCategorias.style.maxHeight = listaCategorias.scrollHeight + "px";
        estado.active = "true"

    }

    useEffect(() => {
        const ListaGastos = document.querySelector('.bill')
        ListaGastos.classList.add('bill--change')
        setTimeout(() => ListaGastos.classList.remove('bill--change'), 800);

    }, [gastos])

    function filtrarGastos(filtro){
        const gastosCajas = document.querySelectorAll('.expense')
        const idFiltro = filtro.dataset.filter
        
        for(let caja of gastosCajas){
            caja.dataset.category !== idFiltro
            ? caja.classList.add('expense--hidden')
            : caja.classList.remove('expense--hidden')
        }

        // Add classname

        const filtroActivo = document.querySelector('.filter__item--active')
        if(filtroActivo) filtroActivo.classList.remove("filter__item--active")

        filtro.classList.add("filter__item--active")

        setGastos([...gastos])
    }

    function limpiarFiltros(){
        const gastosCajas = document.querySelectorAll('.expense')
        
        for(let caja of gastosCajas){
            caja.classList.remove('expense--hidden')
        }

        const filtroActivo = document.querySelector('.filter__item--active')
        if(filtroActivo) filtroActivo.classList.remove("filter__item--active")

        setGastos([...gastos])
    }
    return (
        <div className="information__bill bill">
            <div className="information__filter filter">
                <button className="filter__button" onClick={abrirCategorias}>
                    <div className="filter__title">Filter expenses</div>

                    <picture className="filter__picture">
                        <Arrow />
                    </picture>
                </button>

                <ul className="filter__list" data-active="false">
                    {
                        categorias.map((categoria, i) => (
                            <li
                                className="filter__item"
                                data-filter={i}
                                key={i}
                                onClick={e => filtrarGastos(e.target)}>
                                {categoria}
                            </li>
                        )
                        )
                    }

                    <li className="filter__item filter__item--clean" onClick={ limpiarFiltros }>Clean filters</li>

                </ul>
            </div>

            {
                gastos.length === 0 && <h2>You do not have expenses</h2>
            }

            <div className="bill__list">
                {gastos.map(gasto =>
                (<Gasto
                    gasto={gasto}
                    key={gasto.id}
                    gastos={gastos}
                    setGastos={setGastos}
                    gastado={gastado}
                    setGastado={setGastado}
                />))}
            </div>
        </div>
    )
}