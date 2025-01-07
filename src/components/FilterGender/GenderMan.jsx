import { useState } from "react";
import { Categories } from "../Categories";
export function GenderMan({ selectGender }) {
    const [categories, setCategories] = useState([])
    const [url, setUrl] = useState([])

    console.log(url)
    if (selectGender.gen !== "Masculina") {
        return null;
    }

    const man = categories.filter((product) =>
        product.slug.includes("hombre")
    );

    return (
        <section className="md:h-[50dvh] h-dvh md:flex md:flex-row flex-col md:gap-6 mx-2 justify-center">
            {man.length > 0 ? (
                man.map((product) => (
                    <>
                        {product.image ?
                            (
                                <a onClick={() => setUrl(product.name)} href={`/app/${url}`} key={product.id} className="relative flex items-center justify-center my-5">
                                    <h2 className="absolute font-bebas text-3xl bottom-28 text-[#FAFAFA] z-40">{product.name}</h2>
                                    <img className="filter brightness-50" src={product.image.src}
                                        alt={product.image.alt}
                                    />
                                </a>
                            )
                            :
                            (<p>Error al cargar las imagenes</p>)}
                    </>
                ))
            ) :

                (<p>No se ha añadido ninguna categoria. Por favor hazlo</p>)}

            <Categories setCategories={setCategories} />
        </section>
    )
}