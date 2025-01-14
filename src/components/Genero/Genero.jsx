import { Gen } from "./const"
import { Link } from "react-router-dom"

export function Genero({ setSelectGender }) {


    return (
        <section className="flex flex-col justify-between w-full ">
            <header className="w-full h-40 bg-[#4E6151] text-[#FAFAFA]">
                <h1 className="flex w-full h-full justify-center items-center font-bebas text-4xl">Deportes Beniel</h1>
            </header>

            <div className="h-full w-full flex flex-col md:flex-row items-center justify-center gap-16 overflow-hidden ml-1">
                {Gen.map((genero) => (
                    <div key={genero.id}
                        onClick={() => setSelectGender(genero)}
                        className="flex justify-center items-center"
                    >
                        <Link className="relative w-full h-full flex flex-col" to={`/app/${genero.gen.toLowerCase()}`}>
                            <img className="object-contain h-full w-full" src={genero.img} alt="Hombre haciendo deporte" />
                            <span className="w-full absolute bottom-0 h-40 flex flex-col justify-center items-center text-white">
                                <p className="font-Nunito font-bold ">Ir a moda</p>
                                <h2 className="font-bebas text-5xl">{genero.gen}</h2>
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}