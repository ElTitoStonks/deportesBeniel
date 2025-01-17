import { Facebook } from "./Facebook";
import { Instagram } from "./Instagram";

export function Footer() {
    return (
        <section className="md:h-[70dvh] h-auto w-full bg-[#4E6151] flex md:flex-row items-center  flex-col pt-5 mt-2">
            <div className="flex justify-center w-full md:flex flex-col items-center md:w-1/3 gap-5">
                <img
                    src="./logo.webp"
                    alt="logo página web" />
                <h2
                    className="font-bebas text-3xl text-[#FAFAFA]">
                    Deportes Beniel
                </h2>
            </div>

            <div className=" w-full flex flex-col justify-center items-center md:w-1/4 h-[60%] p-5 gap-1">
                <h2 className="text-3xl font-bebas text-[#FAFAFA]">
                    Terminos y condiciones
                </h2>
                <nav>
                    <ul className="font-Nunito flex flex-col gap-5 text-xl text-[#FAFAFA] font-bold -ml-7">
                        <li className="hover:text-[#94E8B4] transition-all duration-300 ease-in-out cursor-pointer">Aviso legal</li>
                        <li className="hover:text-[#94E8B4] transition-all duration-300 ease-in-out cursor-pointer">Politica de privacidad</li>
                        <li className="hover:text-[#94E8B4] transition-all duration-300 ease-in-out cursor-pointer">Cookies</li>
                    </ul>
                </nav>
            </div>


            <div className="flex flex-col justify-center items-center md:w-1/4 w-full h-[60%] p-5">
                <h2 className="font-bebas text-[#FAFAFA] text-3xl">Redes sociales</h2>
                <div>
                    <Facebook />
                    <Instagram />
                </div>
            </div>


            <div className="flex flex-col md:w-1/4 h-[60%] p-5 justify-center items-center">
                <h2 className="font-bebas text-[#FAFAFA] text-3xl">Dónde encontrarnos</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d392.7551663212486!2d-1.0028126!3d38.0461233!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd639c6d18520ed3%3A0x2149893a0e5e38ee!2sDeportes%20Beniel!5e0!3m2!1ses!2ses!4v1737094086110!5m2!1ses!2ses"
                    width="300"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    )
}