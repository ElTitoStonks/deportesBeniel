// import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css'
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Productos } from '../components/Productos';
import { Categories } from '../components/Categories';
import { Toaster } from 'sonner';

function App() {
  const [selectedGender, setSelectedGender] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products && categories) setLoading(false)
  }, [])

  return (
    <BrowserRouter>
      <Toaster expand={true} richColors />
      <main>
        {loading ?
          <h2>Cargando datos...</h2>
          :
          <>
            <AppRoutes setSelectGender={setSelectedGender} />
            <Productos setProducts={setProducts} />
            <Categories setCategories={setCategories} />
          </>
        }

      </main>
    </BrowserRouter>
  )
}

export default App
