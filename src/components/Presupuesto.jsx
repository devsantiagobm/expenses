import { useEffect, useState } from "react";

export default function Presupuesto(props) {
    const { presupuesto, setPresupuesto } = props;
    const [valor, setValor] = useState("");

    useEffect(() => {
        const caja = document.querySelector('.budget');
        if(Boolean(presupuesto)){
            caja.classList.add('budget--hidden')
            setTimeout(() => {
                caja.classList.remove('budget--hidden')
                caja.classList.remove('budget--active')
            }, 500);
        }
        else{
            caja.classList.add('budget--active')
        }

    }, [presupuesto])

    function handleSubmit(e) {
        e.preventDefault();
        const { input: { value } } = e.target;

        value !== "" && value !== "0"
            ? campoCorrecto(value)
            : campoIncorrecto()
    }

    function campoCorrecto(valor) {
        const valorEnNumero = Number(valor.replaceAll("$", "").replaceAll(".", "").replaceAll(",", ""))
        setPresupuesto(valorEnNumero);
    }

    function campoIncorrecto() {
        const form = document.querySelector('.budget__box')
        form.classList.add('budget__box--shake')
        setTimeout(() => form.classList.remove('budget__box--shake'), 150);
    }

    function formatearPresupuesto(e) {
        const caracteresValidos = "0123456789"
        const numero = e.target.value
        const ultimaLetra = numero.at(-1)

        if(!caracteresValidos.includes(ultimaLetra)){
            const numeroCortado = numero.substr(0, numero.length -1)
            setValor(numeroCortado)
            return
        }

        const formatter = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' })
        const numeroFormateado = formatter.format(numero.replaceAll(",", "")).slice(1)

        setValor(numeroFormateado)
    }


    return (
        <div className="budget budget--page-loaded">
            <form action="#" method="#" className="budget__box" onSubmit={handleSubmit} autoComplete="off">
                <legend className="budget__title">Define budget</legend>

                <div className="budget__row">
                    <input type="text" name="input" className="budget__input" placeholder="Enter your budget" onChange={e => formatearPresupuesto(e)} value={valor}/>

                    <input type="submit" value="Add" className="budget__submit" />
                </div>
            </form>

        </div>

    )
}