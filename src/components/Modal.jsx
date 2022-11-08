import { useState, useEffect } from "react";
import CloseIcon from "../assets/add.svg"


export default function Modal(props) {
    const { modal, setModal, gastado, setGastado, gastos, setGastos } = props;

    const [categoryActive, setCategoryActive] = useState(false)
    const [category, setCategory] = useState("");

    const categorias = ["saving", "food", "house", "various expenses", "leisure", "health", "subscriptions"]
    const capitalize = string => string.slice(0, 1).toUpperCase() + string.slice(1);


    function abrirCategorias(){
        const listaCategorias = document.querySelector('.modal__category');
        if(categoryActive){
            listaCategorias.style.setProperty("--height", "0px")
            setCategoryActive(false)
            return;
        }

        listaCategorias.style.setProperty("--height", `${listaCategorias.scrollHeight}px`)
        setCategoryActive(true)
    }

    function agregarCategoria(e){
        const categoriaActiva = document.querySelector(".modal__option--active")
        if(categoriaActiva) categoriaActiva.classList.remove("modal__option--active")

        e.target.classList.add('modal__option--active')
        setCategory(e.target.dataset.filter)
    }

    function handleSubmit(e){
        e.preventDefault()
        const datosForm =  Object.fromEntries( new FormData( e.target)) 
        const datosCompletos =  Object.values( datosForm ).every( valor => valor !== "")
        datosCompletos ? camposCompletos(datosForm, e.target) : camposIncompletos(e.target)
    }

    function camposCompletos(datos, form){
        datos.date = obtenerFecha()
        datos.id = Math.random().toString(36)
        const {amount} = datos;
        const gastoFormateado = Number( amount.replaceAll(",", ""))
        
        setGastos([...gastos, datos])
        setModal(false);
        setGastado(() => Number(gastado) + gastoFormateado)

        
        setTimeout( () => {
            form.reset()
        }, 500 );
    }

    function obtenerFecha(){
        const fecha = new Date();
        const dia = fecha.getDate()
        const mes = fecha.getMonth();
        const year = fecha.getFullYear()

        const meses = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        }

        return `${meses[mes]} ${dia}, ${year}`
    }

    function camposIncompletos(form) {
        form.classList.add('modal__box--shake')
        setTimeout(() => form.classList.remove('modal__box--shake'), 150);
    }

    function formatearGasto(e) {
        const caracteresValidos = "0123456789"
        const numero = e.target.value
        const ultimaLetra = numero.at(-1)

        if(!caracteresValidos.includes(ultimaLetra)){
            const numeroCortado = numero.substr(0, numero.length -1)
            e.target.value = numeroCortado
            return
        }

        const formatter = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' })
        const numeroFormateado = formatter.format(numero.replaceAll(",", "")).slice(1)

        e.target.value = numeroFormateado;
    }

    useEffect( () => {
        const modalBox = document.querySelector('.modal')
        if(modal){
            modalBox.classList.add("modal--active")
            return
        }
        
        modalBox.classList.add("modal--hidden")
        setTimeout(() => {
            modalBox.classList.remove("modal--active")
            modalBox.classList.remove("modal--hidden")
        }, 500);

    }, [modal])


    return (
        <div className="modal">
            <form action="#" method="#" className="modal__box" onSubmit={handleSubmit} autoComplete="off">
                <legend className="modal__title">New expense</legend>
                <input type="text" name="name" className="modal__input" placeholder="Expense name" />
                <input type="text" name="amount" className="modal__input" placeholder="Expense amount" onChange={e => formatearGasto(e)} />
                
                <div className="modal__input modal__input--open" onClick={ abrirCategorias}>
                    Category
                </div>
                
                <ul className="modal__category">
                    {

                        categorias.map( (categoria, i) => {
                            return <li className="modal__option" data-filter={i} key={i} onClick={ e => agregarCategoria(e) }>
                                { capitalize( categoria) }
                            </li>
                        })
                    }
                </ul>

                <input type="text" hidden name="category" value={category} onChange={ e => null }/>
                {/* /* React waits for a onChange when a form field has his value with a state*/}


                <input type="submit" value="Add" className="modal__submit" />

            </form>

            <button className="modal__button">
                <img src={CloseIcon} alt="close Icon" onClick={ () => setModal(false) }/>
            </button>
        </div>
    )
}