import Header from './components/Header.jsx'
import Guitar from './components/Guitar.jsx'
import { db } from './data/db.js'
import { useState, useEffect } from 'react';
function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart , setCart] = useState(initialCart)
  const MAX_ITEMS = 10
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [ cart ])

  const removeFrontCart = (id) => {
     setCart(cart => cart.filter( guitar => guitar.id !== id))
  }

  const decreaseQuantity = (id) => {
    const updateCart = cart.map( item => {
    if(item.id === id && item.quantity > MIN_ITEMS) {
      return {
        ...item,
        quantity: item.quantity - 1
      }
    }
    return item
  })
  setCart(updateCart)
  }

  const increaseQuantity = (id) => {
    const updateCart = cart.map( item => {
    if(item.id === id && item.quantity < MAX_ITEMS) {
      return {
        ...item,
        quantity: item.quantity + 1
      }
    }
    return item
  })
  setCart(updateCart)
}

  const addToCart = (item) => {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0) {
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <>
       <Header
         cart={cart}
         removeFrontCart={removeFrontCart}
         decreaseQuantity={decreaseQuantity}
         increaseQuantity={increaseQuantity}
         clearCart={clearCart}
       />

       <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            
        {
          data.map((guitar) => {
            return (
              <Guitar
               key={guitar.id}
               guitar={guitar}
               setCart={setCart}
               addToCart={addToCart}
               />
            )
            
          })
        }
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
