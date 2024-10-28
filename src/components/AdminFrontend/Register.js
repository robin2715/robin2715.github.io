
// import React, { useState, useEffect } from 'react';
// import { hamburguesas } from '../../Variables';
// import { desserts } from '../../Variables';
// import { drinks } from '../../Variables';

// function Register() {
//   const [data, setData] = useState([]);
//   const [visibilityData, setVisibilityData] = useState(false);
//   const [visibilityInfo, setVisibilityInfo] = useState(false);
//   const [dataAdd, setDataAdd] = useState(null);

//   const [thisDate, setThisDate] = useState()

//   // VISIBILIDAD DEL REGISTRO EN PRODUCTOS TOTALES

//   // const [foodRegister, setFoodRegister] = useState([{name: " McBacon", count: 0, img: hamburguesas[0].imagen} , {TripleHamburguesa:0, imagen: hamburguesas[1].imagen}, {dobleHamburguesa: 0, imagen: hamburguesas[2].imagen}, {dobleMacnifica: 0, imagen: hamburguesas[3].imagen}, {Hamburguesa: 0, imagen: hamburguesas[4].imagen},{ mcFiestaJR: 0, imagen: hamburguesas[5].imagen}, {Cuartodelibra: 0, imagen: hamburguesas[6].imagen}, {bigMac:0, imagen: hamburguesas[7].imagen}])
  
//   // const [drinksRegister, setDrinksRegister] = useState({})
  
//   // const [dessertsRegister, setDessertsRegister] = useState({backedApplePie: 0, imagen: desserts[0].imagen} ChocolateChake: 0, vainillaChake: 0, McFlurry: 0, vainillaCone: 0})

//   // VISIBILIDADES DEL REGISTRO

//   const [visibilityRegister1, setVisibilityRegister1] = useState(true)
  
//   const [visibilityRegister2, setVisibilityRegister2] = useState(false)

//   const [visibilityRegisterForProduct, setVisibilityRegisterForProduct] = useState(false)

// const [visibilityRegister2Food, setVisibilityRegister2Food] = useState(true)

// const [visibilityRegister2Drink, setVisibilityRegister2Drink] = useState(false)

// const [visibilityRegister2Desserts, setVisibilityRegister2Dessers] = useState(false)


// // visibilidad estilos de comida register 2

// const funcitionVisibilityFood = () => {
//   setVisibilityRegister2(true)
//   setVisibilityRegister2Dessers(false)
//   setVisibilityRegister2Drink(false)
//   setVisibilityRegister2Food(true)
// }


// const funcitionVisibilityDesserts = () => {
//   setVisibilityRegister2(false)
//   setVisibilityRegister2Dessers(true)
//   setVisibilityRegister2Drink(false)
//   setVisibilityRegister2Food(false)
// }

// const funcitionVisibilityDrink = () => {
//   setVisibilityRegister2(false)
//   setVisibilityRegister2Dessers(false)
//   setVisibilityRegister2Drink(true)
//   setVisibilityRegister2Food(false)
// }

//   // funciones de visibilidad



//   const functionVisibilityOne = () => {
//     setVisibilityRegister1(true);
//     setVisibilityRegister2(false);
//     setVisibilityInfo(true);
//   }

//   const functionVisibilityTwo = () => {
//     setVisibilityRegister1(false);
//   setVisibilityRegister2(true);
//   setVisibilityInfo(false);
    
//   }


//   useEffect(() => {
//     fetch("https://backend-menue.onrender.com/registroGet")
//       .then(res => res.json())
//       .then(data => {
//         setData(data);
//         setVisibilityData(true);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   const showDates = (day) => {
//     setDataAdd(day);
//     setVisibilityInfo(!visibilityInfo);
//     if(dataAdd){
      
//     console.log("esta es la estructura de dataadd: " + dataAdd)
//     }
//   };

//   useEffect(() => {
//     if(dataAdd){
      
//       console.log("esta es la estructura de dataadd: " + JSON.stringify(dataAdd))
//       }
//   }, [dataAdd])

//   const functionDescription = () => {
//     if (!dataAdd) return null;
  
//     // Parseamos dataAdd.data para obtener los pedidos
//     const orders = JSON.parse(dataAdd.data); // Este debe ser un array de pedidos
  
//     return (
//       <div className='container-info-date'>
//         <h1>Pedidos:</h1>
//         <ul>
//           {orders.map((order, index) => {
//             // Parseamos los productos del pedido
//             const products = JSON.parse(order.products);
//             return (
//               <li key={index} className='producto'>
//                 <h2>Pedido ID: {order.id}</h2>
//                 <ul>
//                   {products.map((product, prodIndex) => (
//                     <li key={prodIndex}>
//                       <img src={product.imagen} alt={product.name} />
//                       <h3>{product.name} - {product.kcal} kcal</h3>
//                       <p>Ingredientes: {product.ingredients}</p>
//                       <p>Precio: ${product.price}</p>
//                     </li>
//                   ))}
//                 </ul>
//                 <p>Ganancia de este pedido: ${order.totalPayOrder}</p>
//               </li>
//             );
//           })}
//         </ul>
//         <div className='container-info-div'>
//            <h1>Ganancia neta total:</h1>
//           <h2>${dataAdd.totalPay}</h2>
//         </div>
//       </div>
//     );
//   };


//   const catchAcumulated = (money) => {
// const retorno = money.reduce((acc, ind) => {
// return ind + acc
// }, 0)

// return (
//   <h2>{retorno}</h2>
// )
//   }



//   // LOGICA CONTEO POR PRODUCTO

//   const countProduc = (product) => {
//     if (!thisDate) return <h2>0</h2>; // Manejo de caso donde thisDate es undefined
//     const filtProduct = thisDate.filter((pro) => pro.name === product);
//     const numProduct = filtProduct.length;
//     return <h2>{numProduct}</h2>;
//   };

// const mapeoProductsFood = (food) => {
// return(
//   <div className='container-info-date' >
//     <nav>
//           <button onClick={() =>funcitionVisibilityFood()}>Food</button>
//           <button onClick={() =>funcitionVisibilityDrink()}>Drinks</button>
//           <button onClick={() =>funcitionVisibilityDesserts()}>Desserts</button>
//         </nav>
        
//     {food.map((food, index) => {
// return(
//   <div key={index} style={{display: "flex", flexDirection: "row"}}>
//     <div>
// <h1>{food.name}</h1>
// <img className='img-hamburguesa-register' src={food.imagen} />
// </div>
// <div>
// {countProduc(food.name)}
// </div>
//   </div>
// )
//     })}
//   </div>
// )

// }


// const showDates2 = (date) => {

//   const dateSelect = data.find((dateDat) => {
//     return date === dateDat
//   })
// setThisDate(dateSelect)
// setVisibilityRegisterForProduct(true)

// }

// useEffect(() => {
// if(thisDate){
//   console.log("estructura dateselect: " + thisDate)
// }
// }, [thisDate])

//   // retorno visualizacion registro 2

//   const functionRegister2 = () => {


//     return(
//       <div>
        

//         {
//       visibilityRegister2Food && mapeoProductsFood(hamburguesas)
//     }
//     {
//       visibilityRegister2Desserts && mapeoProductsFood(desserts)
//     }
//     {
//       visibilityRegister2Drink && mapeoProductsFood(drinks)
//     }       

//       </div>
//     )
// //     {
// // visibilityRegisterForProduct && mapeoProductsFood(hamburguesas)

// //     }

//   }
//   return (
//     <div className='container-information-register'>
//       <div>
//         <button onClick={functionVisibilityOne}>Registro 1</button>
//         <button onClick={functionVisibilityTwo}>Registro 2</button>
//       </div>
  
//       {visibilityData && visibilityRegister1 && (
//         <div className='information-register-buttons'>
//           {data.map((item, index) => (
//             <div key={index} className='container-btn-date'>
//               <button className='btn-date' onClick={() => showDates(item)}>
//                 {item.date}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
  
//       {visibilityData && visibilityRegister2 && (
//         <div className='information-register-buttons'>
//           {data.map((item, index) => (
//             <div key={index} className='container-btn-date'>
//               <button className='btn-date' onClick={() => showDates2(item)}>
//                 {item.date}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
  
//       <div className='container-info-date'>
//         {visibilityInfo && dataAdd && functionDescription()}
//         {visibilityRegister2 && functionRegister2()}
//       </div>
//     </div>
//   );

//   export default Register;




import React, { useState, useEffect } from 'react';
import { hamburguesas, desserts, drinks } from '../../Variables';

function Register() {
  const [data, setData] = useState([]);
  const [visibilityData, setVisibilityData] = useState(false);
  const [visibilityInfo, setVisibilityInfo] = useState(false);
  const [dataAdd, setDataAdd] = useState(null);
  const [thisDate, setThisDate] = useState();

  const [visibilityRegister1, setVisibilityRegister1] = useState(true);
  const [visibilityRegister2, setVisibilityRegister2] = useState(false);
  const [visibilityRegister2Food, setVisibilityRegister2Food] = useState(true);
  const [visibilityRegister2Drink, setVisibilityRegister2Drink] = useState(false);
  const [visibilityRegister2Desserts, setVisibilityRegister2Desserts] = useState(false);

  const functionVisibilityOne = () => {
    setVisibilityRegister1(true);
    setVisibilityRegister2(false);
    setVisibilityInfo(true);
  };

  const functionVisibilityTwo = () => {
    setVisibilityRegister1(false);
    setVisibilityRegister2(true);
    setVisibilityInfo(false);
  };

  useEffect(() => {
    fetch("https://backend-menue.onrender.com/registroGet")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setVisibilityData(true);
     
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    console.log("esta es la estuctura de data en el register2: " +  JSON.stringify(data))
  }, [data])

  const showDates = (day) => {
    setDataAdd(day);
    setVisibilityInfo(!visibilityInfo);
  };

  const functionDescription = () => {
    if (!dataAdd) return null;

    const orders = JSON.parse(dataAdd.data);

    return (
      <div className='container-info-date'>
        <h1>Pedidos:</h1>
        <ul>
          {orders.map((order, index) => {
            const products = JSON.parse(order.products);
            return (
              <li key={index} className='producto'>
                <h2>Pedido ID: {order.id}</h2>
                <ul>
                  {products.map((product, prodIndex) => (
                    <li key={prodIndex}>
                      <img src={product.imagen} alt={product.name} />
                      <h3>{product.name} - {product.kcal} kcal</h3>
                      <p>Ingredientes: {product.ingredients}</p>
                      <p>Precio: ${product.price}</p>
                    </li>
                  ))}
                </ul>
                <p>Ganancia de este pedido: ${order.totalPayOrder}</p>
              </li>
            );
          })}
        </ul>
        <div className='container-info-div'>
          <h1>Ganancia neta total:</h1>
          <h2>${dataAdd.totalPay}</h2>
        </div>
      </div>
    );
  };

  const countProduct = (product) => {
    if (!thisDate) return <h2>0</h2>;
    const filtProduct = thisDate.filter((pro) => pro.name === product.name);
    return <h2>{filtProduct.length}</h2>;
  };

  const mapeoProducts = (food) => (
    <div className='container-info-date'>
      <nav>
        <button onClick={() => { setVisibilityRegister2Food(true); setVisibilityRegister2Desserts(false); setVisibilityRegister2Drink(false); }}>Food</button>
        <button onClick={() => { setVisibilityRegister2Food(false); setVisibilityRegister2Desserts(false); setVisibilityRegister2Drink(true); }}>Drinks</button>
        <button onClick={() => { setVisibilityRegister2Food(false); setVisibilityRegister2Desserts(true); setVisibilityRegister2Drink(false); }}>Desserts</button>
      </nav>
      {food.map((item, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "row" }}>
          <div className='producto-2'>
          <div style={{display: "flex", flexDirection: "column", textAlign: "center", width: "80%"}}>
          <h1>{item.name}</h1>
            {countProduct(item.name)}
          </div>
            
            {/* className='img-hamburguesa-register' */}
            <div style={{padding: "10px", width: "20%"}} >
            <img  src={item.imagen} alt={item.name} />
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );

  const showDates2 = (date) => {
    const dateSelect = data.find(dateDat => date === dateDat.date);
    setThisDate(dateSelect);
  };

  return (
    <div className='container-information-register'>
      <div>
        <button onClick={functionVisibilityOne}>Registro 1</button>
        <button onClick={functionVisibilityTwo}>Registro 2</button>
      </div>

      {visibilityData && visibilityRegister1 && (
        <div className='information-register-buttons'>
          {data.map((item, index) => (
            <div key={index} className='container-btn-date'>
              <button className='btn-date' onClick={() => showDates(item)}>
                {item.date}
              </button>
            </div>
          ))}
        </div>
      )}

      {visibilityData && visibilityRegister2 && (
        <div className='information-register-buttons'>
          {data.map((item, index) => (
            <div key={index} className='container-btn-date'>
              <button className='btn-date' onClick={() => showDates2(item)}>
                {item.date}
              </button>2
            </div>
          ))}
        </div>
      )}

      <div className='container-info-date'>
        {visibilityInfo && dataAdd && functionDescription()}
        {visibilityRegister2 && (
          <>
            {visibilityRegister2Food && mapeoProducts(hamburguesas)}
            {visibilityRegister2Desserts && mapeoProducts(desserts)}
            {visibilityRegister2Drink && mapeoProducts(drinks)}
          </>
        )}
      </div>
    </div>
  );
}

export default Register;