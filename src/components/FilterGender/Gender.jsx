import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Video } from "../../sections/Video.jsx";
import { BestProduct } from "./BestProduct.jsx";
import { OtherProducts } from "./OtherProducts.jsx";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Footer } from "../footer/Footer.jsx";


export function Gender({ onSelect }) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    // Save in categories the elements of the localStorage
    const [categories, setCategories] = useState([])

    console.log(categories)
    useEffect(() => {
        // Get categories of localStorage
        setCategories(JSON.parse(localStorage.getItem("categories")))
    }, [])

    // Take dinamic URL
    const { gender } = useParams()

    const filterGender = gender !== undefined || gender !== null ? gender : []

    // Create filter for search all genders in the URL
    const genders = categories.filter((product) =>
        product.slug.includes(filterGender) && product.slug !== `mas-vendido-${gender}`
    );

    return (
        <section className="flex flex-col">
            <span className="filter brightness-50">
                <Video />
            </span>

            <Carousel
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={5000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                className="w-full md:h-[50dvh] h-[50dvh] my-1 ">
                {genders.length > 0 ?
                    genders.map((product) => (
                        <div key={product.id}
                            className=" px-1 w-full h-full">
                            <Link
                                onClick={() => onSelect(product)}
                                to={`/app/${gender}/${product.slug.toLowerCase()}`}
                            >
                                <div
                                    className="w-full h-full flex justify-center items-center relative">
                                    <img
                                        src={product.image?.src}
                                        alt={product.image?.alt || "Imagen del producto"}
                                        className="w-full h-96 object-cover"
                                    />
                                    <h2
                                        className="absolute md:bottom-32 bottom-16 text-2xl text-white font-bebas md:text-4xl">
                                        {product.name}
                                    </h2>
                                </div>
                            </Link>
                        </div>
                    ))

                    :
                    <h2>Se ha producido un error al cargar los elementos </h2>
                }

            </Carousel>




            <BestProduct />
            <OtherProducts />
            <Footer />
        </section >

    )
}