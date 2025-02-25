import { api } from "@/lib/api";
import Button from "../components/button";
import getCookiesServer from "@/lib/cookieServer";
import { redirect } from "next/navigation";

const Category = () => {
  async function handleNewCategory(formData: FormData) {
    "use server";

    const name = formData.get("name");

    if (name === "") {
      return;
    }

    const data = {
      name: name,
    };

    const token = await getCookiesServer();

    await api.post("/category", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    redirect("/dashboard/product");
  }

  return (
    <section className="w-full h-[100vh-16px] flex justify-center items-center flex-col pt-16">
      <h1 className="text-[68px] md:text-8xl text-gray-50 font-bold text-center">
        Nova <span className="text-red-700">Categoria</span>
      </h1>

      <form action={handleNewCategory} className="w-full max-w-96 pt-10 px-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Digite o nome da nova categoria"
          className="px-3 h-11 rounded-md bg-[var(--dark-900)] border border-slate-600 text-gray-50 w-full"
        />

        <Button text="Cadastrar" />
      </form>
    </section>
  );
};

export default Category;
