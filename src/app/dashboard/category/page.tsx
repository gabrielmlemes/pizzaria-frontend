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

    redirect('/dashboard')
  }

  return (
    <section className=" w-full max-w-lg mx-auto mt-12 px-3">
      <div className="flex justify-start">
        <h1 className="text-white font-bold text-3xl">Nova categoria</h1>
      </div>

      <form action={handleNewCategory}>
        <input
          type="text"
          name="name"
          required
          placeholder="Digite o nome da nova categoria"
          className="px-3 h-10 rounded-md bg-[--dark-900] w-full mt-7 text-slate-200"
        />

        <Button text="Cadastrar" />
      </form>
    </section>
  );
};

export default Category;
