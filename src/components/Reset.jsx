import { useEffect } from "react"

export default function Reset({ resetBox, setResetBox, setPresupuesto, setGastado, setGastos}) {
    function resetearValores(){
        setPresupuesto(0)
        setGastado(0)
        setGastos([])
        setResetBox(false);
    }


    useEffect( () => {
        const reset = document.querySelector('.reset')
        if(resetBox){
            reset.classList.add("reset--active")
            return
        }
        
        reset.classList.add("reset--hidden")
        setTimeout(() => {
            reset.classList.remove("reset--active")
            reset.classList.remove("reset--hidden")
        }, 500);

    }, [resetBox])

    return (
        <div className="reset">
            <div className="reset__box">
                <div className="reset__title">Reset my budget</div>
                <div className="reset__options">
                    <div className="reset__cancel" onClick={ () => setResetBox(false)}>Cancel</div>
                    <div className="reset__confirm" onClick={() => resetearValores()}>Confirm</div>
                </div>
            </div>
        </div>
    )

}