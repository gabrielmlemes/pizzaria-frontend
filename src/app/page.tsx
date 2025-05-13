import Image from "next/image";
import logoImg from "/public/pizza-svgrepo-com.svg";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getCookiesServer from "@/lib/cookieServer";

export default async function Home() {
  const session = await getCookiesServer();

  if (session) {
    redirect("/dashboard");
  }

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
          <Image
            src={logoImg}
            alt="logo"
            fill
            className="object-cover pl-3"
            priority={true}
            quality={100}
          />
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

      <div className="bg-gray-500/30 rounded-xl p-2 mt-7 text-center"> 
        <b className="text-gray-300"> Acesso para testes:</b> 
        <p className="text-gray-300">Email: admin@admin.com</p>
        <p className="text-gray-300">Senha: 123456</p>
      </div>
    </div>
  );
}
