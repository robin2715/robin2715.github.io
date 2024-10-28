import React from 'react'
import { io } from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';

function Carbuy({setVisibilityCar, numberSameProduct, setNumberBurgers,numberBurgers, setProductCuantity, productCuantity ,setNumberOrders, alert, numberOrders, orderSucessFull, setOrderSucessFull,setTotalPay, tableNumber, buy, setBuy, setProductsToCar, totalPay, productsTocar}) {
  const [messageSocket, setMessageSocket] = useState(null)
  const [errorSocket, setErrorSocket] = useState(null)
  const [visibilityFunctionConfirmation, setVisibilityFunctionConfirmation] = useState(false)
const [alertState, setAlertState] = useState(0)
  const socketRef = useRef()


// cerrar confirmacion pedido 
// const closeConfirmationFunction = (e) => {
//   e.preventDefault()
//   setVisibilityFunctionConfirmation(false)
// }

// open confirmation function

// const openConfirmationFunction = (e) => {
//   e.preventDefault()
//   setVisibilityFunctionConfirmation(true)
// } 
//   // funcion confirmacion pedido

//   const functionConfirmation = (e) => {
// e.preventDefault()
//     return(
//       <div className='confirmation-container'>
//         <h3>Confirma Su Pedido?</h3>
//         <div style={{display: "flex", flexDirection: "row"}}>
// <button className='secondary-button' onClick={(e) => sendOrderToKitchen(e)}>Si</button>
// <buttonn className='secondary-button' onClick={(e) => closeConfirmationFunction(e)}>No</buttonn>
//         </div>
//       </div>
//     )
//   }

  

  // arquitectura base de datos
  
  socketRef.current = io('https://backend-menue.onrender.com', { path: '/socket' });
   
    
    const sendOrderToKitchen  = async  (e) => {
      if(productsTocar.length > 0){
      e.preventDefault()
      socketRef.current = io('https://backend-menue.onrender.com', { path: '/socket' });
      setBuy({products: productsTocar, table: tableNumber, totalPayOrder: totalPay})
     setProductsToCar([])
     setOrderSucessFull("Pedido listo. Por favor, espere su turno.")
    
     console.log("esta es la etructura de producst: " + JSON.stringify(productsTocar) + "esto es lo que esta llegando en table:  " + tableNumber + "y esto es lo que esta llegando en el pago: " + totalPay) 
     setNumberOrders(numberOrders += 1)
      try {
        await socketRef.current.emit('nuevoPedido', { table: tableNumber, products: productsTocar, totalPayOrder: totalPay });
        console.log('Pedido enviado al servidor');
        // Lógica adicional después de enviar el pedido
      } catch (error) {
        console.error('Error al enviar el pedido:', error.message);
        setErrorSocket(error.message);
      }
      setTotalPay(0)
      setNumberBurgers(0)}
      else {
        setAlertState(alertState + 1)
      }
    };
  
    // alerta
// useEffect(() => {
//   alert("Debe realizar una orden antes de solicitar un pedido.")
//   }, [alertState])
  

// const deleteProductFuncion = (productName) => {
//   const findProduct = productsTocar.find((product) => {
// return product.name === productName
//   })

// const repeatProduct = productsTocar.filter((product) => {
//   return product.name === findProduct.name
// })

//   const cuantityProducts = productsTocar.filter((product) => {
//     return product.name === findProduct.name
//   })

//   const cuantityProducsPrice = cuantityProducts.reduce((product, indice) => {
// return product.price += indice.price
//   })
  

// const deleteProduct = productsTocar.filter((products, index) => {
// return products.name !== productName
// })
// // let newTotalPay = numberSameProduct > 1 ? totalPay - (cuantityProducts.length * findProduct.price)
// //  : totalPay - (cuantityProducts.length (findProduct.price * numberSameProduct))
// // setTotalPay(totalPay - (findProduct.price * numberSameProduct))
// // let newTotalPay = !repeatProduct ? totalPay - (cuantityProducts.length * findProduct.price ) : totalPay - ((cuantityProducts.length * repeatProduct.length) * findProduct.price )
// let numberProductsDelete = productsTocar.length - deleteProduct.length
// console.log("el numero de productos eliminado es " + numberProductsDelete + "y el producto que se elimino es: " + JSON.stringify(findProduct))

// console.log("esto es lo que se deberia eliminar del carrito de compras " + (numberProductsDelete * findProduct.price ))
// let newTotalPay = totalPay - (numberProductsDelete * findProduct.price )
// setTotalPay(newTotalPay)
// setProductsToCar(deleteProduct)

// }

// GPT SOLUTION 

const deleteProductFuncion = (productName) => {
  const productsToDelete = productsTocar.filter((product) => product.name === productName);
  const newTotalPay = totalPay - productsToDelete.reduce((acc, product) => acc + product.price, 0);
  const newProductsTocar = productsTocar.filter((product) => product.name !== productName);
  setNumberBurgers(numberBurgers - (productsTocar.length - newProductsTocar.length))
  setTotalPay(newTotalPay);
  setProductsToCar(newProductsTocar);
};
  return (
    <div className='container-carbuy'>


<div className='totalPaiContainer'>
  <div className='container-buttons-carbuy'>
  <button className='primary-button' onClick={() => setVisibilityCar(false)}>X</button>
    <button className='primary-button' style={{marginTop: "5%"}} onClick={(e) => sendOrderToKitchen(e)}>Place Order</button>
    </div>
    <h1>Total Pay: {totalPay}</h1>
    <h1>Orders: {numberBurgers}</h1>
      {alert && <div className='order-sucessfull'>
    <h1 className='ordersucess-h1'>{alert}</h1>
    </div>}
    {orderSucessFull && <div className='order-sucessfull'>
<h1 className='ordersucess-h1'>{orderSucessFull}</h1>

  </div>
  
  

  }

{productsTocar && productsTocar.map((product, index) => {
return(
    <div key={index}>
        <h1>{product.name}</h1>
        {/* <h2>Kcal: {product.kcal}</h2> */}
        <h3>{product.price}$</h3>
        <div style={{display: "flex", flexDirection: "column"}}>
        <img className='img-carbuy' src={product.imagen} />
        {/* <h4>Date: {product.date}</h4> */}
        <button onClick={() => deleteProductFuncion(product.name)}>X</button>
        </div>
        </div>
)
})}


</div>

    </div>
  )
}

export default Carbuy