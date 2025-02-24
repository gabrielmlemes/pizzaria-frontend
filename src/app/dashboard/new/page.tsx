import { api } from "@/lib/api";
import Button from "../components/button";

const NewUser = () => {
  async function handleRegister(formData: FormData) {
    "use server";

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    if (name === "" || email === "" || password === "") {
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }
  return (
    <div className="w-full h-[100vh-16px] flex justify-center items-center flex-col pt-16">
      <h1 className="text-[68px] md:text-8xl text-gray-50 font-bold text-center">
        Novo <span className="text-red-700">Usuário</span>
      </h1>

      <form action={handleRegister} className="w-full max-w-96 pt-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            type="name"
            placeholder="Digite o nome"
            className="px-3 h-11 rounded-md bg-[var(--dark-900)] border border-slate-600 text-gray-50 w-full"
            required
            name="name"
          />
          <input
            type="email"
            placeholder="Digite o email"
            className="px-3 h-11 rounded-md bg-[var(--dark-900)] border border-slate-600 text-gray-50 w-full"
            required
            name="email"
          />
          <input
            type="password"
            placeholder="Digite a senha"
            className="px-3 h-11 rounded-md bg-[var(--dark-900)] border border-slate-600 text-gray-50 w-full"
            required
            name="password"
          />
          <Button text="Cadastrar"/>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
