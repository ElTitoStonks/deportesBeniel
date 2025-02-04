import { useEffect, useState } from "react"

export function CartShop() {
    const [cart, getCart] = useState([]);
    const [count, setCount] = useState({})


    if (count < 0) {
        setCount(0)
    }

    const addProducts = (id) => {
        setCount((item) => {
            const quantity = item[id] || 1
            return {
                ...item,
                [id]: quantity + 1
            }
        })
    };

    const delProducts = (id) => {
        setCount((item) => {
            const quantity = item[id] || 1
            return {
                ...item,
                [id]: quantity - 1
            }
        })
    };

    const delStorage = (id) => {
        const updateCart = cart.filter((item) => item.id !== id)

        getCart(updateCart)

        localStorage.setItem('cart', JSON.stringify(updateCart))
    };

    const delAllStorage = () => {
        localStorage.removeItem('cart')

        getCart([])
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('cart'))) {
            getCart(JSON.parse(localStorage.getItem('cart')))
        } else {
            null
        }

    }, [])

    return (
        <section className="pt-24 h-auto p-4">
            {cart.length === 0 ?
                (
                    <div className="flex font-bebas w-full h-full justify-center items-center gap-1 ">
                        <svg className="w-10 md:w-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="#444" d="M480 674V192c0-18 14-32 32-32s32 14 32 32v482zm0 63h64v60h-64zM0 512C0 229 229 0 512 0s512 229 512 512s-229 512-512 512S0 795 0 512m961 0c0-247-202-448-449-448S64 265 64 512s201 448 448 448s449-201 449-448" /></svg>
                        <h2 className="text-xl text-[#444] md:text-4xl">No se ha encontrado elementos en el carrito</h2>
                    </div>

                )
                :
                (
                    <>
                        <h2 className="text-3xl md:text-4xl font-bebas">Carrito</h2>
                        {cart.map((e) => (
                            <div className="h-auto w-full flex flex-col items-center justify-center border-b border-black"
                                key={e.id}>
                                <div className="bg-[#72BDA3] p-2 h-40 md:h-72 w-full flex overflow-hidden">
                                    <div
                                        className="w-1/3 md:w-2/3 lg:w-1/2 h-full flex justify-center items-center">
                                        <img
                                            src={e.image.src}
                                            alt={e.image.alt || "Imagen de carrito"}
                                            className="object-cover w-full h-2/3 md:w-1/2"
                                        />
                                    </div>
                                    <div className="w-2/3 p-2 md:p-8 font-Nunito">
                                        <h2 className="font-bebas md:text-4xl text-xl text-[#444444] w-full text-ellipsis">{e.name}</h2>
                                        <p className="font-sm md:text-lg">Talla: <b>M</b></p>

                                        {e.sale_price ?
                                            (
                                                <p className="text-sm md:text-lg font-bold text-[#444444]">{e.regular_price - e.sale_price}€</p>
                                            )
                                            :
                                            (
                                                <p className="text-sm font-bold md:text-lg text-[#444444]">{e.regular_price}€</p>
                                            )
                                        }
                                        <div className="w-full flex items-center gap-2">
                                            <button
                                                className="font-bold text-xl md:text-4xl w-5 "
                                                onClick={() => addProducts(e.id)}
                                            >
                                                +
                                            </button>

                                            <span
                                                className="font-bold text-xl md:text-2xl w-5 text-center"
                                            >{count[e.id] || 1}</span>

                                            <button
                                                className="font-bold text-xl md:text-4xl w-5"
                                                onClick={() => delProducts(e.id)}
                                            >
                                                -
                                            </button>

                                            <button onClick={() => delStorage(e.id)}>
                                                <svg className="w-[20px] h-[20px] md:w-[30px] md:h-[30px]" viewBox="0 0 24 24"><path fill="#444444" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z" /></svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="pt-5 font-Nunito">
                                        {
                                            e.sale_price ?
                                                (
                                                    <p className="text-sm md:text-2xl font-bold text-[#444444]">{(count[e.id] || 1) * (e.regular_price - e.sale_price)}€</p>
                                                )
                                                :
                                                (
                                                    <p className="text-sm md:text-2xl font-bold text-[#444444]">{e.regular_price * (count[e.id] || 1)}€</p>
                                                )

                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="h-32 w-full">
                            <div className="w-full flex justify-between px-2 font-Nunito text-[#444444] mt-2">
                                <p className="text-base md:text-xl">Total</p>
                                <p className="text-base font-bold md:text-xl">
                                    {cart.reduce((acc, p) => {
                                        const price = p.sale_price
                                            ? p.regular_price - p.sale_price
                                            : p.regular_price;
                                        return acc + price * (count[p.id] || 1);
                                    }, 0)}€
                                </p>
                            </div>

                            <div className="w-full md:flex md:gap-4">
                                <button className="w-full md:w-1/2 border border-[#5E8C61] rounded-lg mt-3 h-10 font-Nunito text-[#3B322C] font-bold hover:bg-[#5E8C61] transition-all duration-300 ease-out">
                                    Proceder al pago
                                </button>

                                <button onClick={() => delAllStorage()}
                                    className="w-full md:w-1/2 border border-[#72BDA3] rounded-lg mt-3 h-10 font-Nunito text-[#3B322C] bg-[#72BDA3] hover:bg-[#538a76]  font-bold transition-all duration-300 ease-out">
                                    Vaciar carrito
                                </button>

                            </div>

                        </div>
                    </>
                )
            }

        </section>
    )
}