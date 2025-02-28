"use client";

import { OrderProps } from "@/utils/orders.type";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Modal from "./modal";
import { use } from "react";
import { OrderContext } from "@/providers/order";

interface Props {
  orders: OrderProps[];
}

const Orders = ({ orders }: Props) => {
  const { isOpen, onRequestOpen } = use(OrderContext);

  const router = useRouter();

  function handleRefresh() {
    router.refresh();
    toast.success("Pedidos atualizados");
  }

  return (
    <>
      <main className="w-full max-w-lg mx-auto mt-12 px-3 relative">
        <div className="flex items-center justify-start gap-3">
          <h1 className="text-white font-bold text-3xl">Últimos pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCw color="green" className="mt-1" />
          </button>
        </div>

        <section className="w-full mt-7 flex flex-col gap-2 items-center">
          {orders.map((order) => (
            <button
              key={order.id}
              className="border-l-[5px] hover:brightness-105 flex items-start pl-3 border-green-400 bg-gray-900 rounded-md w-full py-2"
              onClick={onRequestOpen}
            >
              <span className="text-white font-semibold">
                Mesa {order.table}
              </span>
            </button>
          ))}
        </section>
      </main>
      
      {/* renderiza o modal se isOpen for true */}
      {isOpen && <Modal />}
    </>
  );
};

export default Orders;
