import { useState } from "react"
import { CrossCart } from "./CrossCart"
import { Productos } from "../Productos"


export function CartLogo() {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState([])

    return (
        <>
            {!open && (
                <svg onClick={() => setOpen(!open)} className="" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2" /></svg>
            )}


            <section className={`p-5 md:w-1/2 w-4/5 fixed bg-[#5E8C61] h-dvh top-0 right-0 transition-all duration-300 ease-in-out 
                ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="w-full flex items-center justify-center mb-5">
                    <h2 className="font-bebas md:text-4xl text-3xl w-[90%]">Carrito</h2>
                    <CrossCart handleClick={() => setOpen(!open)} />
                </div>
                {content.length === 0 ?
                    <div>
                        <h3>Vaya... No hemos encontrado nada por aquí 👀</h3>
                        <a href="/">Añade cosas al carrito</a>
                    </div>
                    :
                    <h3>Aquí irán todos los productos que se agregen al carrito</h3>

                }
                <Productos setProducts={setContent} />
            </section>

        </>
    )
}