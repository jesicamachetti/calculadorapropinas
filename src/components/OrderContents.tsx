
import { MenuItem, OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderContentsProps = {
  order: OrderItem[],
  removeItem: (id: MenuItem['id']) => void //es una funcion que no retorna nada
}

export default function OrderContents({ order, removeItem }: OrderContentsProps) {
  return (
    //si esta vacio colocamos el primer codigo y si esta lleno el otro 
    <div>

      <h2 className='font-black text-4xl'>Consumo</h2>
      <div className="space-y-3 mt-10">
        {order.map(item => (

              <div
                key={item.id}
                className="flex justify-between items-center border-t border-gray-200 py-5 border-b"
              >
                <div>
                  <p className="text-lg">
                    {item.name} - {formatCurrency(item.price)}

                  </p>
                  <p className="font-black">Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}</p>
                </div>

                <button className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
                        onClick={() => removeItem(item.id)}> X </button>

              </div>
            ))

          }

      </div>
    </div>
  )
}
