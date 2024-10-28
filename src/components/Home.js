import React from 'react'

import logo from "./../logo.svg";
import Barnav from "./Frontend1/barnav/Barnav";
import { hamburguesas, drinks, desserts } from "./../Variables";
import { passwords } from "./../Variables";
import Carbuy from "./Carbuy";
import logoMacDonalds from "./../asses/logo.jpeg";
import Admin from "./AdminFrontend/Admin";
import Comprobate from "./Comprobate";


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Home({setSecurityAdmin, securityAdmin, visibilityClientFrontend, setVisibilityClientFrontend}) {

    const [visibilityHamburguesas, setVisibilityHamburguesas] = useState(false);
    let [visibilityCar, setVisibilityCar] = useState(false);
    let [totalPay, setTotalPay] = useState(0);
    const [productsTocar, setProductsToCar] = useState([]);
    const [buy, setBuy] = useState({ products: null, table: 0, totalPayOrder: 0 });
    // let [tableNumber, setTableNumber] = useState(0);
   
    const [orderSucessFull, setOrderSucessFull] = useState("")
    let [numberOrders, setNumberOrders] = useState(0)
    const[alert, setAlert] = useState("")
    // const [visibilityClientFrontend, setVisibilityClientFrontend] = useState(true)
    const [productCuantity, setProductCuantity] = useState(0)
    
    const [numberBurgers, setNumberBurgers] = useState(0)
    const [alertTable, setAlertTable] = useState(0)
    const [aprobates, setAprobates] = useState(false)
    const [numberSameProduct, setNumberSameProduct] = useState(0)
    const [initiatedComprobated, setInitiatedComprobated] = useState(false)
    const [stateShowErrorInititated, setStateShowErrorInititated] = useState(true)

    // const [redireccionamiento, setRedireccionamiento] = useState("")

//REDIRECCIONAMIENTO
const {tableNumber} = useParams()



    // FUNCIONES

    // visibilidades menu

  const [visibility1, setVisibility1] = useState(true)
  
  const [visibility2, setVisibility2] = useState(false)
  
  const [visibility3, setVisibility3] = useState(false)

// functions visibility Menu

const visibilityFood = () => {
  setVisibility1(true)
  setVisibility2(false)
  setVisibility3(false)
}


const visibilityDesserts = () => {
  setVisibility1(false)
  setVisibility2(true)
  setVisibility3(false)
}


const visibilityDrinks = () => {
  setVisibility1(false)
  setVisibility2(false)
  setVisibility3(true)
}


// FUNCION DE SEGURIDAD PARA EL ADMINISTRADOR


  useEffect(() => {
if(numberOrders >= 3){
  setAlert("Ya ha realizado el maximo de pedidos.")
}
  }, [numberOrders])

useEffect(() => {
setInitiatedComprobated(true)
}, [])


  // cuerpo objeto {name: "", kcal: 0, peso: 0, ingredients: ""}

  const addProductToCar = (product) => {
    if(tableNumber && product.price){
    setTotalPay((totalPay += product.price));
   setProductCuantity(productCuantity + 1)
    setProductsToCar((prevState) => [
      ...prevState,
      { ...product, date: new Date().toString() },
    ]);
    setOrderSucessFull("")
    setNumberBurgers(numberBurgers + 1)
    const sameProduct = productsTocar.find((pro) => {
      return pro.name === product.name
        })
        if(sameProduct){
          setNumberSameProduct(numberSameProduct + 1)
        }
  }
else if(!tableNumber){
setAlertTable(alertTable + 1)
}
};

  const functionMapeoFood = (arrayFood) => {
    return arrayFood.map((food, index) => {
      return (
        <div className="card-food" key={index}>
          <div className="container-img-food">
          <img className="img-food" src={food.imagen} />
          </div>
          <div style={{padding: "1px", height: "100px"}}>
          
          <h1>{food.name}</h1>
          <h2>{food.kcal} kCal</h2>
          <p>{food.ingredients}</p>
          </div>
          
          <div style={{padding: "1.5px"}} className="container-btn-menu">
          <p>{food.price}</p>
          <button
            className="secondary-button"
            onClick={() => addProductToCar(food)}
          >
            Add To Car
          </button>
          </div>
        </div>
      );
    });
  };


  return (
    <div>
         {visibilityClientFrontend && (
          <React.Fragment>
          
             
            <div className="client-container">
              
              
              <div className="container-hamburguesas">
             
                <div className="container-logo">
                
                  <img src={logoMacDonalds} className="logo-macdonalds" />
                  <h2 className="client-container-p">Cliente</h2>
                </div>
               
                <div className="food-container">

                  {/* mapeo diferentes comidas */}
                  {/* <div className="container-food-menue"> */}
<nav className="navigate-food">
<Barnav
              setVisibilityClientFrontend={setVisibilityClientFrontend}
              setSecurityAdmin={setSecurityAdmin}
                numberOrders={numberOrders}
                setVisibilityHamburguesas={setVisibilityHamburguesas}
                setVisibilityCar={setVisibilityCar}
                visibilityCar={visibilityCar}
                numberBurgers={numberBurgers}
              />
              <div className='buttons-navigate-food-container'>
  <button className="button-chic-minimalista" onClick={() => visibilityFood()}>Comida</button>
  <button className="button-chic-minimalista" onClick={() => visibilityDesserts()}>Postres</button>
  <button className="button-chic-minimalista" onClick={() => visibilityDrinks()}>Bebidas</button>
  </div>
</nav>

                {visibility1 && functionMapeoFood(hamburguesas)}
                {visibility2 && functionMapeoFood(desserts)}
                {visibility3 && functionMapeoFood(drinks)}
                {/* </div> */}
                
                </div>
                {visibilityCar && numberOrders < 4 && (
                  <Carbuy
                    setNumberOrders={setNumberOrders}
                    alert={alert}
                    numberOrders={numberOrders}
                    setBuy={setBuy}
                    buy={buy}
                    tableNumber={tableNumber}
                    setTotalPay={setTotalPay}
                    setProductsToCar={setProductsToCar}
                    totalPay={totalPay}
                    productsTocar={productsTocar}
                    orderSucessFull={orderSucessFull}
                    setOrderSucessFull={setOrderSucessFull}
                    numberBurgers={numberBurgers}
                    setNumberBurgers={setNumberBurgers}
                    numberSameProduct={numberSameProduct}
                    setVisibilityCar={setVisibilityCar}
                  />
                )}
              </div>
          
            </div>
              
          </React.Fragment>
        )}
  
    </div>
  )
}

export default Home