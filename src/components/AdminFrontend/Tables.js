// import React, { useState } from 'react';
// import imageMesa from '../../asses/MESA-removebg-preview.png';
// import { tables } from '../../Variables';

// function Tables({ receiveOrders }) {
//   const [actualTable, setActualTable] = useState([]);
//   const [visibilityCheck, setVisibilityCheck] = useState(false);

//   const showCheck = (table) => {
//     localizeOrder(String(table)); // Asegúrate de pasar el número de mesa como cadena
//     setVisibilityCheck(true); // Cambié el setTimeout para que sea inmediato
//   };

//   const mapeoCheck = () => {
//     if (actualTable.length === 0) {
//       return <p>No hay órdenes para esta mesa.</p>;
//     }

//     return (
//       <div>
//         {actualTable.map((orderData, index) => {
//           const { products } = orderData; // Aquí suponemos que `orderData` es un objeto
//           return (
//             <div key={index}>
//               {products.map((product, productIndex) => (
//                 <div key={productIndex}>
//                   <h4>Name: {product.name}</h4>
//                   <p>Kcal: {product.kcal}</p>
//                   <p>Price: {product.price}</p>
//                   <p>Date: {product.date}</p>
//                   <p>Ingredients: {product.ingredients}</p>
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const localizeOrder = (tableNumber) => {
//     console.log("Tabla seleccionada:", tableNumber); // Verifica la mesa seleccionada
//     console.log("Órdenes recibidas:", receiveOrders); // Verifica cómo son las órdenes
  
//     const order = receiveOrders.filter((order) => {
//     const table = order.data.table
//     return table === tableNumber
//     });
  
//     console.log("Órdenes filtradas:", order); // Verifica qué órdenes se están filtrando
//     setActualTable(order);
//   };

//   return (
//     <div className='container-tables-panel-admin'>
//       <div>
//         {tables.map((table, index) => (
//           <div key={index} className='container-mapeo-tables'>
//             <img src={imageMesa} className='img-mesa' alt={`Mesa ${table}`} />
//             <h1>{table}</h1>
//             <button onClick={() => showCheck(table)}>Info</button>
//           </div>
//         ))}
//       </div>
//       {visibilityCheck && (
//         <div>
//           {mapeoCheck()}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Tables;


import React, { useState, useEffect } from 'react';
import imageMesa from '../../asses/MESA-removebg-preview.png';
import { tables } from '../../Variables';

function Tables({ receiveOrders, setReceiveOrders }) {
  const [actualTable, setActualTable] = useState([]);
  const [visibilityCheck, setVisibilityCheck] = useState(false);
  const [contOrder, setContOrder] = useState(0)

// comprobation content receiveorders

useEffect(() => {
console.log("estructura de receiveorders: "  +  JSON.stringify(receiveOrders))
}, [receiveOrders])


  const showCheck = (table) => {
    localizeOrder(String(table));
    setVisibilityCheck(true);
  };

  const mapeoCheck = () => {
    if (actualTable.length === 0) {
      return <p>No hay órdenes para esta mesa.</p>;
    }

    return (
      <div className='admin-carbuy' id='admin-carbuy-tables'>
        {actualTable.map((orderData, index) => {
          console.log("Orden data:", orderData); // Verifica la estructura de orderData
          const products = orderData.data.products;
          const { data } = orderData;
          const { id, table } = data; 
          
          return (
            <div key={index}>
              {products && products.length > 0 ? (
                products.map((product, productIndex) => (
                  <div className='impresion-table' key={productIndex} style={{display: "flex", flexDirection: "row"}}><div>
                    <h4>Name: {product.name}</h4>
                    <p>Kcal: {product.kcal}</p>
                    <p>Price: {product.price}</p>
                    <p>Date: {product.date}</p>
                    <p>Ingredients: {product.ingredients}</p>
                    </div><div>
                      <button onClick={() => deleteOrder(id)}>X</button>
                      </div>
                  </div>
                ))
              ) : (
                <p className='admin-carbuy' id='admin-carbuy-tables'>No hay productos en esta orden.</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const localizeOrder = (tableNumber) => {
    console.log("Tabla seleccionada:", tableNumber);
    console.log("Órdenes recibidas:", receiveOrders);
  
    const order = receiveOrders.filter((order) => {
      console.log("Comparando con:", order.data.table); // Verifica qué mesa se está comparando
      return order.data.table === tableNumber; 
    });
  
    console.log("Órdenes filtradas:", order);
    setActualTable(order);

    console.log("data del actual table: " + order)

  };


  const deleteOrder = (idOrder) => {
   const newOrders = receiveOrders.filter((order) => {
return order.data.id !== idOrder
   })
   
setReceiveOrders(newOrders)
setContOrder(contOrder + 1)

  }

  useEffect(() => {
    setActualTable(receiveOrders)
  }, [contOrder])

  return (
    
      <div className='container-tables-panel-admin'>
    <div className='grid-container'>
      {tables.map((table, index) => (
        <div key={index} className='container-mapeo-tables'>
          <img src={imageMesa} className='img-mesa' alt={`Mesa ${table}`} />
          <h1>{table}</h1>
          <button onClick={() => showCheck(table)}>Info</button>
        </div>
      ))}
  
      </div>
      {visibilityCheck && (
        <div>
          {mapeoCheck()}
        </div>
      )}
    </div>
  );
}

export default Tables;