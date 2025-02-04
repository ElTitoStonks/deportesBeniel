import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { CartLogo } from "./Header/CartLogo";
import { Toaster, toast } from 'sonner'
import Carousel from "react-multi-carousel";



export function Products() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const [category, setCategory] = useState([]);
    const [products, setProduct] = useState([]);
    const [carousel, setCarousel] = useState(false)
    const [selectedImage, setSelectedImage] = useState([]);
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
                            {p.images && p.images.length > 0 ? (
                                <img
                                    onClick={() => handleImgClick(p.images)}
                                    className="md:h-56 w-full md:max-h-full max-h-[50%] object-cover"
                                    src={p.images[0].src}
                                    alt={p.images[0].alt || "Imagen del producto"}

                                />
                            ) :
                                (<h2>No se han encontrado imagenes</h2>)
                            }

                            {carousel && selectedImage && (
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center "
                                >
                                    <svg className="absolute z-50 md:left-[70%] left-[90%] top-24 cursor-pointer" onClick={closeCarousel} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#ccc" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z" /></svg>

                                    <Carousel responsive={responsive} className="md:w-1/3 w-full h-full z-40">
                                        {selectedImage && selectedImage.length > 0 ?
                                            (selectedImage.map((image, index) => (
                                                < img key={index}
                                                    className=" object-cover w-full h-full"
                                                    src={image.src}
                                                    alt="Imagen ampliada"
                                                />
                                            ))

                                            )
                                            :
                                            (null)
                                        }
                                    </Carousel>

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
