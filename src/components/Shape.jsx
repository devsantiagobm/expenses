import { useEffect, useState } from "react";

export default function Shape(props) {
    const { presupuesto, gastado } = props;
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        if (gastado && presupuesto) {
            const nuevoPorcentaje = Math.floor(gastado * 100 / presupuesto);
            crearAnimacion(nuevoPorcentaje)
            return;
        }

        crearAnimacion(0)
        setPorcentaje(0)
    }, [gastado])

    function crearAnimacion(nuevoPorcentaje) {
        const circulo = document.querySelector('.shape__progress')
        const porcentajeActual = Number(getComputedStyle(circulo).getPropertyValue("--deg").replace("deg", "").trim()) / 3.6
        let counter = porcentajeActual;
        porcentaje < nuevoPorcentaje
        ? incrementarAnimacion(counter, nuevoPorcentaje)
        : reducirAnimacion(counter, nuevoPorcentaje)

    }

    function incrementarAnimacion(counter, nuevoPorcentaje){
        const circulo = document.querySelector('.shape__progress')
        
        const intervalo = setInterval(() => {

            circulo.style.setProperty("--deg", `${counter * 3.6}deg`)
            if (counter === nuevoPorcentaje || counter >= 100) clearInterval(intervalo)
            setPorcentaje(counter)
            counter++;

        }, 20)
    }

    function reducirAnimacion(counter, nuevoPorcentaje){
        const circulo = document.querySelector('.shape__progress')
        const intervalo = setInterval(() => {
            circulo.style.setProperty("--deg", `${counter * 3.6}deg`)
            if (counter === nuevoPorcentaje || counter <= 0) clearInterval(intervalo)
            setPorcentaje(counter)
            counter--;
        }, 20)
    }

    return (
        <div className="information__shape shape">
            <div className="shape__circle">
                <div className="shape__progress">
                </div>
                <div className="shape__inner">

                    <div className="shape__flex">
                        <div className="shape__porcentaje">
                            {porcentaje}
                        </div>
                        <span className="shape__symbol">%</span>

                    </div>
                    <div className="shape__text">Percentage spent</div>
                </div>

            </div>
        </div>
    )
}