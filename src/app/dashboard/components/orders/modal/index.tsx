"use client";

import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
      onClick={handleClose} // Fecha ao clicar fora do conteúdo
    >
      <div
        className="relative w-full max-w-lg p-6 border rounded-md bg-gray-900 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar dentro do modal
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-semibold text-2xl">
            Detalhes do pedido
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <X size={30} />
          </button>
        </div>

        <hr className="border-gray-700" />

        {/* Informações do pedido */}
        <span className="mt-4 text-white text-xl font-semibold block">
          Mesa: 12
        </span>

        <div className="mt-4">
          <div className="flex flex-col">
            <span className="text-green-400 text-lg font-semibold">
              1 - Pizza de frango
            </span>
            <span className="text-gray-300 text-sm -mt-1 mb-2">
              Descrição da pizza
            </span>
          </div>
        </div>

        {/* Botão de ação */}
        <button
          onClick={handleClose}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold mt-6 w-full"
        >
          Concluir pedido
        </button>
      </div>
    </div>
  );
};

export default Modal;
