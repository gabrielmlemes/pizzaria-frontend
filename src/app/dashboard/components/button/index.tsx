"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[--red] hover:scale-105 duration-500 w-full h-10 mt-4 rounded-md font-semibold text-slate-200"
    >
      { pending ? 'Carregando...' : text}
    </button>
  );
};

export default Button;
