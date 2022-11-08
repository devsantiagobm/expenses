import useFormatter from "../hooks/useFormatter";

export default function Datos(props) {
    const { presupuesto, gastado } = props;


    return (
        <div className="information__data">
            <ul className="information__list">
                <li className="information__item item">
                    <div className="item__title">Budget</div>
                    <div className="item__quantity">{ useFormatter(presupuesto)}</div>
                </li>
                <li className="information__item item">
                    <div className="item__title">Spent</div>
                    <div className="item__quantity">{ useFormatter(gastado)}</div>
                </li>
                <li className="information__item item">
                    <div className="item__title">Available</div>
                    <div className="item__quantity">
                        {
                             useFormatter(presupuesto - gastado) 
                        }
                    </div>
                </li>

            </ul>
        </div>
    )
}