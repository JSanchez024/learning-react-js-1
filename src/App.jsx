import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitarra from "./components/Guitarra"
import { db } from "./data/db"

function App() {

  const [data, setData] = useState(db)
  const [carrito, setCarrito] = useState([])
  const MAX_ITEM = 5

  function addToCart(item){

    const itemExists = carrito.findIndex(guitarra => guitarra.id === item.id)

    if(itemExists >= 0){
      const updatedCarrito = [...carrito]
      updatedCarrito[itemExists].quantity++
      setCarrito(updatedCarrito)
    }else{
      item.quantity = 1
      setCarrito([...carrito, item])

    }
  }
  
  function removeFromCarrito(id){
    setCarrito(prevCarrito => prevCarrito.filter(guitarra => guitarra.id !== id))
  }

  function increaseQuantity(id){
    const updatedCarrito = carrito.map(item => {
      if(item.id === id && item.quantity < MAX_ITEM){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCarrito(updatedCarrito)
  }



  return (
    <>
    
      <Header 
        carrito={carrito}
        removeFromCarrito={removeFromCarrito}
        increaseQuantity={increaseQuantity}
      />  

    <main className="container-xl mt-5">
      <h2 className="text-center">Nuestra Colección</h2>

      <div className="row mt-5">

        {data.map((guitarra) => (
          <Guitarra 
            key={guitarra.id}
            guitarra={guitarra}
            setCarrito={setCarrito}
            addToCart={addToCart}
          />
          
        ))}

      </div>

    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
