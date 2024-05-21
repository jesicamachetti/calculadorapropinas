import { useCallback } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
//use memo y use callback hacen lo mismo a diferecia que usecallback hay que llamar a la funcion()
type OrderTotalProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void //va a ser igual a una funcion que no retorna nada
}

export default function OrderTotals({order, tip, placeOrder} : OrderTotalProps) {

    const subtotalAmount = useCallback(() => order.reduce((total, item) => total + (item.quantity * item.price), 0 ) , [order])
    

//una variable para formatearlo, usememo porque queremos que se ejecute cuando ciertas dependencias cmbien, cuando cambie el calculo de propina, o cuando cambiemos el contenido de nuestra orden
    const tipAmount = useCallback(() => subtotalAmount() * tip, [tip])
    const totalAmount = useCallback(() => subtotalAmount() + tipAmount(), [tip])
    //diabled el boton va a estar deshabilitado si la cantidad es =0 
  return (
    <>
    <div className="space-y-3">
        <h2 className="font-black text-2xl">Total y Propina: </h2>
        <p>Subtotal a pagar: {''} 
            <span className="font-bold">{formatCurrency(subtotalAmount())}</span>
        </p>
        <p>Propina: {''} 
            <span className="font-bold">{ formatCurrency(tipAmount())}</span>
        </p>
        <p>Total a pagar: {''} 
            <span className="font-bold">{ formatCurrency(totalAmount())}</span>
        </p>
    </div>
    
    <button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
            disabled={totalAmount() === 0}
            onClick={placeOrder}
            > 
           Guardar orden
        </button>
      
    </>
  )
}
