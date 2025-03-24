"use client";
import { use } from "react";
import { X } from "lucide-react";
import { OrderContext } from "@/providers/order";
import { calculateTotalOrder } from "@/app/helpers/totalOrder";

const Modal = () => {
  const { onRequestClose, order, handleFinishOrder } = use(OrderContext);

  async function finishOrder() {
    await handleFinishOrder(order[0].order.id);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
      onClick={onRequestClose}
    >
      <div
        className="relative w-full max-w-lg p-6 border rounded-md bg-gray-900 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-semibold text-2xl">
            Detalhes do pedido
          </h2>
          <button
            className="p-2 text-red-500 hover:text-red-700"
            onClick={onRequestClose}
          >
            <X size={30} />
          </button>
        </div>

        <hr className="border-gray-700" />

        {/* Informações do pedido */}
        <div className="flex flex-col">
          <span className="mt-4 text-white text-xl font-semibold block">
            Mesa: {order[0].order.table}
          </span>
          {order[0].order.name && (
            <span className=" text-gray-200 text-sm font-semibold block">
              Cliente: {order[0].order.name}
            </span>
          )}
        </div>

        <div className="mt-4">
          {order.map((item) => (
            <div className="flex flex-col" key={item.id}>
              <span className="text-green-400 text-lg font-semibold">
                Qtd: {item.amount} - {item.product.name} - R${" "}
                {parseFloat(item.product.price) * item.amount}
              </span>
              <span className="text-gray-300 text-sm -mt-1 mb-2">
                {item.product.description}
              </span>
            </div>
          ))}
        </div>
        <h4 className="text-xl border-t-2 pt-2 text-center font-bold text-[var(--green-900)]">
          Total: R${calculateTotalOrder(order)}
        </h4>

        {/* Botão de ação */}
        <button
          onClick={finishOrder}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold mt-6 w-full"
        >
          Concluir pedido
        </button>
      </div>
    </div>
  );
};

export default Modal;
