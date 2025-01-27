import { Route, Routes, useLocation } from "react-router-dom"
import { Genero } from "../components/Genero/Genero";
import { Gender } from "../components/FilterGender/Gender";
import { Products } from "../components/Products";
import { Header } from "../components/Header/Header"
import { Footer } from "../components/footer/Footer"
import { ProductsDetails } from "../components/ProductsDetails";
import { CartShop } from "../components/CartShop";


export function AppRoutes({ setSelectGender }) {

    const location = useLocation()

    const filterHeader = location.pathname !== "/app/";


    return (
        <>
            {filterHeader && <Header />}
            <Routes>
                <Route path="/app/" element={<Genero setSelectGender={setSelectGender} />} />
                <Route path="/app/:gender" element={<Gender />} />
                <Route path="/app/:gender/:categoryName" element={<Products />} />
                <Route path="/app/:gender/:categoryName/:detailsProducts" element={<ProductsDetails />} />
                <Route path="/app/carrito" element={<CartShop />} />
            </Routes>
            <Footer />
        </>


    )
}