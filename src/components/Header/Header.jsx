import { useState } from "react"
import { CartLogo } from "./CartLogo"
import { MenuLogo } from "./MenuLogo"
import { Cross } from "./Cross"

export function Header() {

    const [responsive, setResponsive] = useState(false)


    return (
        <header className="flex items-center bg-[#4E6151] fixed w-full h-20 z-50">
            <h1 className="w-1/2 flex justify-center font-bebas md:text-4xl text-2xl cursor-default text-[#FAFAFA]">
                <a href="/">Deportes Beniel</a>
            </h1>
            <nav className="w-1/2 text-[#FAFAFA] mr-10 font-Nunito text-xl">
                {/* Menú desktop */}
                <div className="flex justify-end gap-5">
                    <ul className="md:flex hidden gap-10">
                        <li className="flex-grow h-full transition-all duration-300 ease-in-out hover:scale-105">Productos</li>
                        <li className="flex-grow transition-all duration-300 ease-in-out hover:scale-105">Tienda</li>
                        <li className="flex-grow transition-all duration-300 ease-in-out hover:scale-105">Quienes somos</li>
                        <li className="flex-grow transition-all duration-300 ease-in-out hover:scale-105">Contacto</li>
                    </ul>

                    {/* Menú Responsive */}
                    <CartLogo />
                    <MenuLogo toggleMenu={() => setResponsive(!responsive)} />
                </div>
                <div
                    className={`md:hidden fixed top-0 right-0 bg-gray-50 h-screen w-1/2 flex flex-col items-center justify-center gap-10 py-10 text-black shadow-lg transition-all duration-500 ease-in-out ${responsive ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <Cross quitMenu={() => setResponsive(!responsive)} />
                    <ul className="flex flex-col items-center gap-10">
                        <li>Productos</li>
                        <li>Tienda</li>
                        <li>Quienes somos</li>
                        <li>Contacto</li>
                    </ul>
                </div>

            </nav>
        </header>
    )
}