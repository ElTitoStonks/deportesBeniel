import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export function BestProduct() {
    const [bestSeller, setBestSeller] = useState([]);
    const { gender } = useParams()

    useEffect(() => {
        setBestSeller(JSON.parse(localStorage.getItem("categories")))
    }, [])

    const filterBest = bestSeller.filter((b) => b.slug.includes(`mas-vendido-${gender}`))

    return (
        <section className="h-[90dvh] w-full overflow-hidden">
            {filterBest.length > 0 ?
                filterBest.map((b) => (
                    <div className="w-full h-full relative" key={b.id}>
                        <img className="object-cover w-full h-full filter brightness-50" src={b.image.src} alt={b.image.alt} />
                        <span className="absolute text-white flex flex-col justify-center items-center bottom-0 w-full h-72 ">
                            <h2 className="md:text-5xl text-4xl font-bebas">{b.name}</h2>
                            <button className="bg-[#72BDA3] font-bold rounded-2xl text-2xl h-10 w-56 md:hover:scale-110 md:hover:text-[#000] transition-all duration-300 ease-in-out font-Nunito">Ver más</button>
                        </span>
                    </div>

                ))

                :
                <div className="h-[50dvh] w-dvw flex justify-center items-center">
                    <h2 className="md:text-4xl text-xl font-bebas text-center">Se ha producido un error al cargar los elementos <br />
                        estamos trabajando en solucionarlo lo antes posible</h2>
                </div>
            }
        </section>
    )
}