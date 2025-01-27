import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function ProductsDetails() {
    const [products, setProduct] = useState([])
    const { gender, categoryName, detailsProducts } = useParams()

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem("products")))
    }, [])

    const fill = products.filter((p) => String(p.id) === detailsProducts)

    return (
        <section>
            <h2 className="pt-20">Se ha movido a product ProductsDetails</h2>


        </section>
    )
}