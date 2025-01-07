import axios from 'axios'
import { useEffect } from 'react'


export function Categories({ setCategories }) {
    useEffect(() => {
        axios({
            method: 'get',
            baseURL: "https://deportesbeniel.es/wp-json/wc/v3/products/categories",
            auth: {
                username: import.meta.env.VITE_USER,
                password: import.meta.env.VITE_PASS
            }
        })
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                console.log('Error al cargar los productos', err)
            })
    }, [setCategories]);

}