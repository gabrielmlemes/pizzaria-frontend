import Image from "next/image";
import logoImg from "/public/pizza-svgrepo-com.svg";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";

const Header = () => {
  return (
    <header>
      <nav className=" px-12 pt-4 flex justify-between">
        <Link href="/dashboard">
          <div className="flex items-center justify-center">
            <h1 className="hidden md:flex md:text-3xl md:text-gray-50 md:font-bold">
              The <span className="text-red-700">Pizza</span>
            </h1>
            <div className="relative w-14 h-14 ">
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
        </Link>

        <div className="items-center justify-center flex gap-5">
          <Link
            href="#"
            className="text-gray-200 text-lg hover:scale-105 hover:text-red-600 duration-300"
          >
            Nova categoria
          </Link>
          <Link
            href="#"
            className="text-gray-200 text-lg hover:scale-105 hover:text-red-600 duration-300"
          >
            Cardápio
          </Link>
          <Link
            href="/dashboard/new"
            className="text-gray-200 text-lg hover:scale-105 hover:text-red-600 duration-300"
          >
            Criar usuário
          </Link>
          <form className="pt-1">
            <button type="submit">
              <Link href="#">
                <LogOutIcon color="#fff" />
              </Link>
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
