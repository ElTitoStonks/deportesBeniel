import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { CartLogo } from "./Header/CartLogo";
import { Toaster, toast } from 'sonner'



export function Products() {
    const [category, setCategory] = useState([]);
    const [products, setProduct] = useState([]);
    const [carousel, setCarousel] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [cart, setCart] = useState(() => {
        const getCart = localStorage.getItem('cart')
        return getCart ? JSON.parse(getCart) : [];
    });

    const { gender, categoryName } = useParams()

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem("products")));
        setCategory(JSON.parse(localStorage.getItem("categories")));
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


    const filterCat = category.filter((e) => e.slug.includes(gender))
    const filterProc = products.filter((p) => p.slug.includes(categoryName))

    const handleImgClick = (imageSrc) => {
        setSelectedImage(imageSrc)
        setCarousel(true)
    }

    const closeCarousel = () => {
        setCarousel(false)
        setSelectedImage(null)
    }

    const addProductsToCard = (product) => {
        if (!cart.some((item) => item.id === product.id)) {
            setCart((prevItem => [...prevItem, product]))
            toast.success(`${product.name} ha sido añadido al carrito`);
        } else {
            toast.info(`${product.name} ya está en el carrito`);
        }
    }

    return (
        <>
            <CartLogo addcart={cart} />

            <section className="pt-20 md:pt-24 h-auto md:w-4/5 md:mx-auto md:grid md:grid-cols-3 md:gap-5 relative">
                {filterCat && filterProc.length > 0 ?
                    filterProc.map((p) => (
                        <div
                            key={p.id}
                            className="h-auto mb-5 flex flex-col md:flex-col bg-[#5E8C61] "
                        >
                            {p.images.map((i) => (
                                <img onClick={() => handleImgClick(i.src)} className="md:h-56 w-full md:max-h-full max-h-[50%] object-cover"
                                    key={i.id}
                                    src={i.src}
                                    alt={i.alt || "Imagen del producto"} />
                            ))}

                            {carousel && selectedImage && (
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                                    onClick={closeCarousel}
                                >
                                    {p.images.map((i) => (
                                        <img key={i.id}
                                            className="max-w-full max-h-full object-contain"
                                            src={selectedImage}
                                            alt="Imagen ampliada"
                                        />
                                    ))}

                                </div>


                            )}

                            <div className="w-full h-full flex flex-col justify-start pt-5">

                                <h2 className="font-bebas text-center text-2xl md:text-3xl  text-[#3B322C]">
                                    {p.name}
                                </h2>

                                <div className="font-Nunito font-bold px-5">
                                    {
                                        p.sale_price ?
                                            (
                                                <div className="flex gap-2 items-center w-full justify-start ">
                                                    <p className="line-through text-[#374639]">
                                                        {p.regular_price}€
                                                    </p>

                                                    <p className="bg-[#3B322C] w-10 text-center text-[#72BDA3] rounded-full h-10 flex items-center justify-center">
                                                        {p.regular_price - p.price}€
                                                    </p>

                                                    {p.stock_status === "outofstock" ?
                                                        (
                                                            <p className="text-sm text-red-900 font-bold font-Nunito">Sin existencias</p>

                                                        )
                                                        :
                                                        (
                                                            <p className="text-sm text-green-900 font-bold font-Nunito">Hay stock</p>
                                                        )}
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="flex gap-2 items-center w-full ">
                                                    <p className="bg-[#3B322C] w-10 text-center text-[#72BDA3] rounded-full h-10 flex items-center justify-center">{p.regular_price}€</p>
                                                    {p.stock_status === "outofstock" ?
                                                        (
                                                            <p className="text-sm text-red-900 font-bold font-Nunito">
                                                                Sin existencias
                                                            </p>
                                                        )
                                                        :
                                                        (
                                                            <p className="text-sm text-green-900 font-bold font-Nunito">Hay stock</p>)}
                                                </div>
                                            )
                                    }
                                </div>



                                {
                                    p.stock_status === "outofstock"
                                        ?
                                        (
                                            <div className="w-full h-20 flex justify-around items-center font-Nunito">
                                                <button className="p-2 w-50 h-14 rounded-2xl border-2 border-[#4E6151] text-[#3B322C] hover:cursor-default">
                                                    Avisarme cuando haya Stock
                                                </button>

                                            </div>
                                        )

                                        :

                                        (
                                            <div className="w-full h-20 flex justify-around items-center font-Nunito">
                                                <Link to={`/app/${gender}/${categoryName}/${p.id}`} className="w-40 h-10 rounded-2xl border-2 border-[#4E6151] text-[#3B322C] flex items-center justify-center">
                                                    Más info
                                                </Link>
                                                <button onClick={() => addProductsToCard(p)} className="text-[#eeeeee] bg-[#3B322C] w-40 h-10 rounded-2xl ">
                                                    Añadir al carrito
                                                </button>
                                            </div>
                                        )
                                }


                            </div>
                        </div>
                    ))
                    :
                    <h2>No se han encontrado productos...</h2>
                }


            </section>
        </>
    )

}
