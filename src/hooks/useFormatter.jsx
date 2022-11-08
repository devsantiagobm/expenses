export default function useFormatter(numero){
    const formatter = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' })
    let numeroFormateado;

    String(numero)[0] === "-" ?
    numeroFormateado = String(numero)[0] + formatter.format(numero).slice(2)
    :  numeroFormateado = formatter.format(numero).slice(1)

    return [ numeroFormateado ];
}