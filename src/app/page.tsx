import Image from "next/image";
import logoImg from "/public/pizza-svgrepo-com.svg";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      return;
    }

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      if (!response.data.token) {
        return;
      }

      // Guardar o token do usuário dentro de um cookie
      const expressTime = 60 * 60 * 24 * 30 * 1000; // 30d em milisegundos
      const cookiesStore = await cookies();

      cookiesStore.set("session", response.data.token, {
        maxAge: expressTime,
        httpOnly: false,
        path: "/",
        secure: process.env.NODE_END === "production",
      });
    } catch (error) {
      console.log(error);
    }
    redirect("/dashboard");
  }

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

      <form action={handleLogin} className="w-full max-w-96 pt-4">
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
            placeholder="*********"
            className="px-3 h-11 rounded-md bg-[var(--dark-900)] border border-slate-600 text-gray-50 w-full"
            required
            name="password"
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
