//en los custom hooks siempre tiene que tener el use al incio
import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"


export default function useOrder() {

    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    const addItem = (item: MenuItem) => {
        //busca los elementos que son iguales y los agrupa
        const itemExist = order.find(orderItem => orderItem.id === item.id)
        if (itemExist) {
            const updatedOrder = order.map(orderItem => orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } :
                orderItem) //toma una copia del elemento y le agrega una cantidad 
            setOrder(updatedOrder)

        } else {
            const newItem = { ...item, quantity: 1 }
            setOrder([...order, newItem])

        }
    }

    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }


    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem, 
        placeOrder


    }
}