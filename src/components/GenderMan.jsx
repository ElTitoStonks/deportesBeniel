import { useState } from "react";
import { Productos } from "./Productos";
export function GenderMan({ selectGender }) {
    const [products, setProducts] = useState([])

    
    if (selectGender.gen !== "Masculina") {
        return null;
    }

    const man = products.filter((product) =>
        product.categories &&
        product.categories.some((category) => category.name === "Hombre")
    );

    console.log(man)

    return (
        <section className="h-dvh">
            {man.length > 0 ? (
                man.map((product) => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        {product.images ? (product.images.map((img) => (<img key={img.id} src={img.src} />))) : (<p>Error al cargar las imagenes</p>)}
                    </div>
                ))
            ) :

                (<h2>Señor OrcoFumao, no has añadido elementos aquí, hazlo</h2>)}

            <Productos setProducts={setProducts} />
        </section>
    )
}