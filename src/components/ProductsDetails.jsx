import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import parse from 'html-react-parser';
import { Toaster, toast } from 'sonner'
import "react-multi-carousel/lib/styles.css";
import axios from "axios";


export function ProductsDetails() {
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


    const [products, setProduct] = useState([]);
    const [variations, setVariations] = useState([]);
    const [isVariation, setVariation] = useState(null);
    const [attribute, getAttribute] = useState(null);
    const [cart, setCart] = useState(() => {
        const getCart = localStorage.getItem('cart')
        return getCart ? JSON.parse(getCart) : [];
    });


    const { gender, categoryName, detailsProducts } = useParams()
    const fill = products.filter((p) => String(p.id) === detailsProducts)

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem("products")))
    }, [])

    useEffect(() => {
        if (fill.length > 0 && variations.length === 0) {
            const productID = fill[0].id;
            axios({
                method: "get",
                baseURL: `https://deportesbeniel.es/wp-json/wc/v3/products/${productID}/variations`,
                auth: {
                    username: import.meta.env.VITE_USER,
                    password: import.meta.env.VITE_PASS,
                },
            })
                .then((res) => {
                    setVariations(res.data);
                })
                .catch((err) => {
                    console.log("Error al cargar las variaciones", err);
                });
        }

    }, [fill, variations.length])

    useEffect(() => {
        if (variations.length > 0 && !isVariation) {
            setVariation(variations[0])
        }
    }, [isVariation, variations])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addProductsToCard = (product) => {
        if (!cart.some((item) => item.id === product.id)) {
            setCart((prevItem => [...prevItem, product]))
            toast.success(`${product.name} ha sido añadido al carrito`);
        } else {
            toast.info(`${product.name} ya está en el carrito`);
        }
    }

    const selectVariations = (id) => {
        setVariation(id)
    }

    const customParser = (html) => {
        return parse(html, {
            replace: (domNode) => {
                if (domNode.name === "h2") {
                    const headerText = domNode.children[0]?.data?.trim();
                    if (headerText) {
                        return (
                            <h2 className="text-2xl font-bebas text-[#EEEEEE]">
                                {headerText}
                            </h2>
                        );
                    }
                    return null; // No renderiza si no hay texto
                }

                if (domNode.name === "ul") {
                    const validChildren = domNode.children.filter(
                        (child) =>
                            child.data?.trim() || (child.children && child.children.some((c) => c.data?.trim()))
                    );

                    return (
                        <ul className="list-disc pl-8 text-[#CCCCCC] font-Nunito">
                            {validChildren.map((child, index) => {
                                const listItemText = child.data?.trim() || (child.children?.[0]?.data?.trim()) || "Elemento no disponible";
                                return <li key={index}>{listItemText}</li>;
                            })}
                        </ul>
                    );
                }

                if (domNode.name === "p") {
                    const paragraphText = domNode.children[0]?.data?.trim();
                    if (paragraphText) {
                        return (
                            <p className="text-[#CCCCCC] font-Nunito mb-5">
                                {paragraphText}
                            </p>
                        );
                    }
                    return null; // No renderiza si no hay texto
                }
            },
        });
    };

    return (
        <section className="w-[80%] h-auto mx-auto pt-24">
            {variations.length > 0 ?
                (
                    <>
                        <div className="w-full h-auto mb-4 md:w-full md:flex md:justify-center">
                            {isVariation && isVariation.image && isVariation.image.src ? (
                                <img
                                    src={isVariation.image.src}
                                    alt={isVariation.image.alt || "Imagen del producto"}
                                />
                            ) : null}
                        </div>

                        <div className="flex w-full h-20 md:w-full md:h-52 mx-auto  gap-1">
                            {variations.map((images) => (
                                <div key={images.image.id} onClick={() => selectVariations(images)}
                                    className="w-full h-full md:w-1/2 md:h-full hover:scale-110 hover:filter hover:brightness-75 transition-all duration-300 ease-in-out ">
                                    <img className="w-full h-full object-cover" src={images.image.src} alt={images.image.alt || "Imagen del producto"} />
                                </div>
                            ))}
                        </div>

                        <div className="w-full font-bebas text-3xl mt-2 text-[#273129]">
                            {isVariation && isVariation.name
                                ? (<p>{isVariation.name}</p>)
                                : (<h2>No hay titulo asignado para este producto</h2>)}
                        </div>

                        <div className="w-full font-Nunito  text-[#4E6151] font-bold">
                            {isVariation && isVariation.price
                                ? (<p>{isVariation.price}€</p>)
                                : (<h2>No hay precios asignados para este producto</h2>)}
                        </div>
                    </>

                )
                :
                (<h2>Cargando toda la información</h2>)
            }

            {fill && fill.length > 0 && fill[0].description.length > 0 ? (
                <div className="w-full h-auto bg-[#4E6151] p-2 mt-4 rounded-lg">
                    <p>{customParser(fill[0].description)}</p>
                </div>
            )
                : (null)
            }


            <button onClick={() => addProductsToCard(isVariation)}
                className="mt-4 w-full h-10 font-Nunito font-bold bg-[#3B322C] text-[#ccc] rounded-lg cursor-pointer">
                Añadir a la cesta
            </button>


        </section >
    )
}