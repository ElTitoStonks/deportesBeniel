import axios from 'axios'
import { useEffect } from 'react'


export function Productos({ setProducts }) {
    useEffect(() => {
        axios({
            method: 'get',
            baseURL: "https://deportesbeniel.es/wp-json/wc/v3/products",
            auth: {
                username: import.meta.env.VITE_USER,
                password: import.meta.env.VITE_PASS
            }
        })
            .then((res) => {
                if (Array.isArray(res.data)) {
                    const cleanProducts = res.data.map((product) => (

                        {
                            ...product,
                            description: product.description.replace(/<\/?[^>]+(>|$)/g, ""),
                        }

                    ))
                    setProducts(cleanProducts)
                    console.log("Quitamos descrip", cleanProducts)
                    localStorage.setItem("products", JSON.stringify(cleanProducts))
                }
            }).catch((err) => {
                console.log("Error al cargar los datos", err)
            })
    }, [setProducts]);

}