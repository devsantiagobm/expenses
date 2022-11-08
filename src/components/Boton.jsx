import AddIcon from "../assets/add.svg";

export default function Boton({ setModal }){
    return (
        <>
            <button className="button" onClick={ () => setModal(true) }>
                <img src={AddIcon} alt="add icon" className="button__image"/>
            </button>
        </>
    )
}