"use client";

import { createContext, ReactNode, useState } from "react";
import { OrderItemProps } from "@/utils/orderDetail.type";
import { api } from "@/lib/api";
import getCookieClient from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type OrderDataContext = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (order_id: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderDataContext);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);

  async function onRequestOpen(order_id: string) {
    const token = await getCookieClient();

    const response = await api.get("/orders/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        order_id: order_id,
      },
    });

    setOrder(response.data);

    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  const router = useRouter()
  async function handleFinishOrder(orderId: string) {
    const token = await getCookieClient();

    const data = {
      orderId: orderId,
    };

    try {
      await api.put("/order/finish", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Falha ao finalizar este pedido")
      return
    }

    toast.success("Pedido finalizado com sucesso")
    setIsOpen(false)
    router.refresh()
  }

  return (
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestClose,
        onRequestOpen,
        order,
        handleFinishOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
