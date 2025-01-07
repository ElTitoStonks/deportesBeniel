import { Gen } from "./const"
export function Genero({ setSelectGender }) {
    return (
        <section className="flex flex-col justify-center items-center w-full h-dvh">
            <h1 className="flex flex-1 justify-center items-center font-bebas text-4xl pt-10">Deportes Beniel</h1>

            <div className="flex flex-col md:flex-row h-[90%] items-center gap-16">
                {Gen.map((genero) => (
                    <div key={genero.id}
                        onClick={() => setSelectGender(genero)}
                        className="relative flex justify-center items-center ml-2"
                    >
                        <img src={genero.img} alt="Hombre haciendo deporte" />
                        <div className="items-center flex flex-col absolute bottom-24 text-[#FAFAFA]">
                            <p className="font-Nunito font-bold">Ir a moda</p>
                            <h2 className="font-bebas text-5xl">{genero.gen}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}