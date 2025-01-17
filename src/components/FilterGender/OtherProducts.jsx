import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

export function OtherProducts() {
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

    const [product, setProduct] = useState([]);

    const { gender } = useParams()

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem("products")));
    }, [])

    const filter = product.filter((p) => p.slug.includes(gender))

    console.log(filter)
    return (
        <section className="font-bebas flex flex-col items-center justify-start gap-5 mt-5 h-[60dvh] w-full ">
            <h1 className="text-3xl font-bold text-center mb-5 h-[10%]">¿No sabes por dónde empezar?<br />Tal vez esto te interese</h1>

            <Carousel responsive={responsive}
                removeArrowOnDeviceType={["mobile", "tablet"]}
                className="w-full h-full">
                {filter.length > 0 ?
                    filter.map((p) => (
                        p.images.map((i) => (
                            <div key={i.id}
                                className="relative w-full h-full flex justify-center  px-1">
                                <img
                                    src={i.src}
                                    alt={i.alt || "Imagen de prueba"}
                                    className="filter brightness-50 w-full h-96 object-cover"
                                />

                                <h2
                                    className="text-white absolute bottom-16 text-xl md:text-4xl text-center">
                                    {p.name}
                                </h2>
                            </div>
                        ))
                    ))
                    :
                    <h2>Se ha producido un error al cargar los elementos </h2>
                }
            </Carousel>



        </section >

    )
}