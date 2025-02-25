"use client";

import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Button from "../../../components/button";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import getCookieClient from "@/lib/cookieClient";
import { toast } from "sonner";

interface ProductFormProps {
  categories: CategoriesProps[];
}

interface CategoriesProps {
  id: string;
  name: string;
}

const ProductForm = ({ categories }: ProductFormProps) => {
  const router = useRouter()

  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Formato da imagem inválido")
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image)); //cria uma url de preview
    }
  }

  async function handleRegisterForm(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("nome");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!categoryIndex || !name || !price || !description || !image) {
      toast.warning("Preencha todos os campos")
      return;
    }

    const data = new FormData()

    data.append("name", name)
    data.append("price", price)
    data.append("description", description)
    data.append("category_id", categories[Number(categoryIndex)].id)
    data.append("file", image)

    const token = getCookieClient()

    await api.post('/product', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((err)=> {
      console.log(err);
      toast.warning("Erro ao cadastrar produto")
    })

    toast.success("Produto cadastrado com sucesso")
    

    router.replace("/dashboard")
  }

  return (
    <div className="w-full h-[100vh-16px] flex justify-center items-center flex-col pt-4">
      <h1 className="text-[68px] md:text-6xl text-gray-50 font-bold text-center">
        Novo <span className="text-red-700">Produto</span>
      </h1>
      <form
        action={handleRegisterForm}
        className="max-w-md w-full flex flex-col items-center justify-center px-4"
      >
        <div className="relative border flex items-center justify-center w-full  bg-[--dark-900] min-h-[200px] rounded-lg mt-7">
          <label className="flex flex-col justify-center items-center">
            <span className="mb-4 opacity-70 hover:opacity-100 hover:scale-105 duration-200">
              <UploadCloud size={50} className="cursor-pointer" color="#fff" />
            </span>

            <input
              type="file"
              accept="image/png, image/jpeg"
              required
              onChange={handleFile}
              className="absolute w-full h-full opacity-0"
            />

            {previewImage && (
              <Image
                className="rounded-lg cursor-pointer"
                alt="preview image"
                src={previewImage}
                fill
                priority
              />
            )}
          </label>
        </div>

        <select
          name="category"
          className=" w-full border bg-[--dark-900] text-white resize-none rounded-lg mt-4 h-10 px-3  font-semibold text-lg"
        >
          {categories.map((categorie, index) => (
            <option value={index} key={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="nome"
          required
          placeholder="Nome do produto"
          className="w-full border bg-[--dark-900] text-white h-9 rounded-lg mt-4  px-4 font-semibold text-lg"
        />

        <input
          type="number"
          name="price"
          step="any"
          required
          placeholder="Preço"
          className="w-full border bg-[--dark-900] text-white h-9 rounded-lg mt-4  px-4 font-semibold text-lg appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" //webkit para tirar o spinner do input type number
        />

        <textarea
          required
          name="description"
          placeholder="Descrição do produto"
          className=" w-full border bg-[--dark-900] text-white pt-1 resize-none rounded-lg mt-4 h-18 px-3  font-semibold text-lg"
        />

        <Button text="Cadastrar produto" />
      </form>
    </div>
  );
};

export default ProductForm;
