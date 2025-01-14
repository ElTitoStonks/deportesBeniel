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
                    setProducts(res.data)
                    localStorage.setItem("products", JSON.stringify(res.data))
                }
            }).catch((err) => {
                console.log("Error al cargar los datos", err)
            })
    }, [setProducts]);

}