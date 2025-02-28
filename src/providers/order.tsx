"use client";

import { createContext, ReactNode, useState } from "react";

type OrderDataContext = {
  isOpen: boolean;
  onRequestOpen: () => void;
  onRequestClose: () => void;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderDataContext);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function onRequestOpen() {
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider value={{ isOpen, onRequestClose, onRequestOpen }}>
      {children}
    </OrderContext.Provider>
  );
}
