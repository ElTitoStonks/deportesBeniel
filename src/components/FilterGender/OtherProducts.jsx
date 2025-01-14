import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export function OtherProducts() {
    const [product, setProduct] = useState([]);

    const { gender } = useParams()

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem("products")));
    }, [])

    const filter = product.filter((p) => p.slug.includes(gender))

    return (
        <section className="font-bebas">
            <h1>¿No sabes por dónde empezar?<br />Tal vez esto te interese</h1>

            {filter.length > 0 ?
                filter.map((p) => (
                    <div key={p.id}>
                        <h2>{p.name}</h2>
                    </div>
                ))
                :
                null}
        </section>
    )
}