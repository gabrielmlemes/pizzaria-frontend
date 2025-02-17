import Image from "next/image";
import logoImg from "/public/pizza-svgrepo-com.svg";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="flex items-center justify-center w-full px-2">
        <h1 className="text-[68px] md:text-8xl text-gray-50 font-bold">
          The <span className="text-red-700">Pizza</span>
        </h1>
        <div className="relative w-28 h-28 ">
          <Image src={logoImg} alt="logo" fill className="object-cover pl-3" />
        </div>
      </div>

      <form action="" className="w-full max-w-96 pt-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Digite seu email"
            className="px-3 h-11 rounded-md bg-[var(--dark-900)] border border-slate-600 text-gray-50 w-full"
            required
            name="email"
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            className="px-3 h-11 rounded-md bg-[var(--dark-900)] border border-slate-600 text-gray-50 w-full"
            required
          />
          <button
            className="bg-red-700 w-full hover:scale-105 duration-300 text-white font-semibold h-11 rounded-md hover:scale-h-115"
            type="submit"
          >
            Acessar
          </button>
        </div>
      </form>
    </div>
  );
}
