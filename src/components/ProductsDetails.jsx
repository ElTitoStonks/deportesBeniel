import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";



export function ProductsDetails() {
    const [category, setCategory] = useState([]);
    const [products, setProduct] = useState([]);

    const { gender, categoryName } = useParams()

    console.log(categoryName)
    console.log(products)

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem("products")));
        setCategory(JSON.parse(localStorage.getItem("categories")));
    }, [])

    const filterCat = category.filter((e) => e.slug.includes(gender))
    const filterProc = products.filter((p) => p.slug.includes(categoryName))

    return (
        <section className="">

            <h1 className="pt-20">Estas en productsDetails</h1>

            {filterCat && filterProc ?
                filterProc.map((p) => (
                    <div key={p.id}>
                        <h3>{p.name}</h3>

                    </div>
                ))

                : null}

        </section>

    )

}
