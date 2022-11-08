import { useEffect } from "react"

export default function Loader({ loading }) {

    useEffect( () => {
        const loader = document.querySelector(".loader");
        loader.classList.add("loader--hidden")
    }, [loading])

    return (
        <div className="loader">
            <div className="loader__box">
                <span className="loader__shape"></span>
            </div>
        </div>
    )

}