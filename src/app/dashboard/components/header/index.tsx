"use client";

import Image from "next/image";
import logoImg from "/public/pizza-svgrepo-com.svg";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie("session", { path: "/" });
    toast.success("Logout feito com sucesso")

    router.replace("/");
  }

  return (
    <header>
      <nav className=" px-8 pt-4 flex justify-between">
        <Link href="/dashboard" className="mr-4">
          <div className="flex items-center justify-center">
            <h1 className="hidden md:flex md:text-3xl md:text-gray-50 md:font-bold">
              The <span className="text-red-700">Pizza</span>
            </h1>
            <div className="relative w-14 h-14 ">
              <Image
                src={logoImg}
                alt="logo"
                fill
                className="object-cover"
                priority={true}
                quality={100}
              />
            </div>
          </div>
        </Link>

        <div className="items-center justify-center flex gap-5">
          <Link
            href="/dashboard/category"
            className="text-gray-200 text-lg hover:scale-105 hover:text-red-600 duration-300"
          >
            Nova categoria
          </Link>
          <Link
            href="/dashboard/product"
            className="text-gray-200 text-lg hover:scale-105 hover:text-red-600 duration-300"
          >
            Novo Produto
          </Link>
          <Link
            href="/dashboard/new"
            className="text-gray-200 text-lg hover:scale-105 hover:text-red-600 duration-300"
          >
            Novo Usuário
          </Link>
          <button type="button" onClick={handleLogout}>
            <LogOutIcon color="#fff" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
