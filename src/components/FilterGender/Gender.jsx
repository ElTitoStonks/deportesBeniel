import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Video } from "../../sections/Video.jsx";
import { BestProduct } from "./BestProduct.jsx";
import { OtherProducts } from "./OtherProducts.jsx";


export function Gender({ onSelect }) {
    // Save in categories the elements of the localStorage
    const [categories, setCategories] = useState([])

    useEffect(() => {
        // Get categories of localStorage
        setCategories(JSON.parse(localStorage.getItem("categories")))
    }, [])

    // Take dinamic URL
    const { gender } = useParams()

    const filterGender = gender !== undefined || gender !== null ? gender : []

    // Create filter for search all genders in the URL
    const genders = categories.filter((product) =>
        product.slug.includes(filterGender)
    );


    return (
        <section className="flex flex-col">
            <span className="filter brightness-50">
                <Video />
            </span>
            <div className="md:h-[50dvh] h-auto flex-col md:flex md:flex-row  md:gap-6 mx-2 justify-center overflow-hidden">

                {genders.length > 0 ? (
                    genders.map((product) => (
                        <>
                            {product.image ?
                                (
                                    <Link onClick={() => onSelect(product)} to={`/app/${gender}/${product.slug.toLowerCase()}`} key={product.id} className="flex items-center justify-center my-5 relative">
                                        <h2 className="absolute font-bebas md:text-xl lg:text-3xl text-3xl bottom-20 md:bottom-10 text-[#FAFAFA] z-40">{product.name}</h2>
                                        <img className=" h-full w-full filter brightness-50 object-cover" src={product.image.src}
                                            alt={product.image.alt}
                                        />
                                    </Link>
                                )
                                :
                                (<p>Error al cargar las imagenes</p>)}
                        </>
                    ))
                ) :
                    (<p>No se ha añadido ninguna categoria. Por favor hazlo</p>)
                }
            </div>
            <BestProduct />
            <OtherProducts />
        </section>

    )
}