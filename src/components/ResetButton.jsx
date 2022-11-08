import ResetIcon from "../assets/reset.svg";

export default function Reset({ setResetBox }){

    return (
        <button className="resetButton" onClick={() => setResetBox(true) }>
            <img src={ResetIcon} alt="reset icon"/>
        </button>
    )
}