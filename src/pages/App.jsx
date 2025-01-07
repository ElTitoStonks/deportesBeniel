
import { useState } from 'react';
import '../App.css'
import { Genero } from '../components/Genero/Genero'
import { Header } from '../components/Header/Header'
import { Video } from '../sections/Video';
import { GenderMan } from '../components/FilterGender/GenderMan';

function App() {
  const [selectedGender, setSelectedGender] = useState(null); // Estado para el género seleccionado

  return (
    <main>
      {!selectedGender && <Genero setSelectGender={setSelectedGender} />}

      {selectedGender && (
        <>
          <Header />
          <Video />
          <GenderMan selectGender={selectedGender}/>
        </>
      )}
    </main>
  )
}

export default App
