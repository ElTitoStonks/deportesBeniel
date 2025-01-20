import { Route, Routes, useLocation } from "react-router-dom"
import { Genero } from "../components/Genero/Genero";
import { Gender } from "../components/FilterGender/Gender";
import { ProductsDetails } from "../components/ProductsDetails";
import { Header } from "../components/Header/Header"
import { Footer } from "../components/footer/Footer"


export function AppRoutes({ setSelectGender }) {

    const location = useLocation()

    const filterHeader = location.pathname !== "/app/";


    return (
        <>
            {filterHeader && <Header />}
            <Routes>
                <Route path="/app/" element={<Genero setSelectGender={setSelectGender} />} />
                <Route path="/app/:gender" element={<Gender />} />
                <Route path="/app/:gender/:categoryName" element={<ProductsDetails />} />
            </Routes>
            <Footer />
        </>


    )
}