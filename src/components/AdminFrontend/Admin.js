import React from "react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import mcDonaldsLogo from '../../asses/not-found/logo-removebg-preview.png'
import Tables from "./Tables";
import Register from "./Register";
import ChatAdmin from "./ChatAdmin";

function Admin({ setVisibilityClientFrontend }) {
  const [receiveOrders, setReceiveOrders] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef();
  const [visibilityOrder, setVisibilityOrder] = useState(false)
  const [visibilityProductsOrder, setVisibilityProductsOrder] = useState(false)
  const [sendDataState, setSendDataState] = useState()
  const [error, setError] = useState("Base de datos offline")
  const [dataOrders, setDataOrders] = useState([])
  const [newFetch, setNewFetch] = useState(0)
  const [listActive, setListActive] = useState(false)
  const [orderIdCounter, setOrderIdCounter] = useState(1); // Contador para nuevos IDs
  const [payOfDay, setPayOfDay] = useState(0)
  const [totalDayObject, setTotalDayObject] = useState({date: "", data: "", totalPay: 0})

  // VISIBILITYS

  const[homeVisibility, setHomeVisibility] = useState(true)
  const [tablesVisibility, setTablesVisibility] = useState(false)
  const [chatVisibility, setChatVisibility] = useState(false)
  const [registerVisibility, setRegisterVisibility] = useState(false)
  const [visibilityPayOfDay, setVisibilityPayOfDay] = useState(false)



  const [completedOrders, setCompletedOrders] = useState(new Set());
const [orderVisibility, setOrderVisibility] = useState({});

  // asignar ID

   // contador global para generar IDs únicos
 const generateUniqueId = () => {
  const currentId = orderIdCounter; // Guarda el ID actual
  setOrderIdCounter(prevId => prevId + 1); // Incrementa el contador
  return currentId; // Devuelve el ID actual
};


  // MAPEANDO BASE DE DATOS
  const functionMapeoBaseDeDatos = () => {
    return dataOrders.map((data, index) => {
      // Parse products JSON string into JavaScript object
      const products = JSON.parse(data.products);
      // const products = data.products;

      return (
        <div className="databaseImpresion" key={index}>
          <h1>{data.table_number}</h1>
          <ul>
            {products.map((product, i) => (
              <li className="list-database" key={i}>{product.name} - {product.kcal} kcal - <br></br> <span> {product.date}</span> </li>
            ))}
          </ul>
          <h2>{data.totalPayOrder}</h2>
          {/* <h3>{data.date}</h3> */}
        </div>
      );
    });
  }


  const completeOrder = (id) => {
    console.log(`Completar orden con ID: ${id}`);

    // Verifica que el ID sea válido
    if (id == null || id === 0) {
        console.error('ID no válido:', id);
        return; // Salir si el ID es inválido
    }

    // Actualiza el estado de órdenes completadas
    setCompletedOrders(prev => {
        const newCompletedOrders = new Set(prev);

        // Verifica si la orden ya está completada
        if (newCompletedOrders.has(id)) {
            newCompletedOrders.delete(id); // Marca como no completada
          
            console.log(`Orden ${id} marcada como no completada.`);
        } else {
            newCompletedOrders.add(id); // Marca como completada
            console.log(`Orden ${id} marcada como completada.`);
        }

        return newCompletedOrders; // Devuelve el nuevo Set
    });

};
    // Actualiza el estado de órdenes completadas
  
// Función para marcar una orden como completada
const completeState = (id) => {
  if (id == null || id === 0) {
    console.error('ID no válido:', id);
    return; // Salir si el ID es inválido
  }

  setCompletedOrders(prev => {
    const newCompletedOrders = new Set(prev);

    if (newCompletedOrders.has(id)) {
      newCompletedOrders.delete(id);
      console.log(`Orden ${id} marcada como no completada.`);
    } else {
      newCompletedOrders.add(id);
      console.log(`Orden ${id} marcada como completada.`);
    }

    return newCompletedOrders; // Devuelve el nuevo Set
  });
};


// Función para alternar la visibilidad de la orden
const toggleVisibility = (id) => {
  setOrderVisibility(prev => ({
    ...prev,
    [id]: !prev[id],
  }));
};

// sumando valores del dia
const paySum = () => {
  const sumOrders = dataOrders.reduce((data, index) => {
    return data + index.totalPayOrder  
  }, 0)

  setPayOfDay(sumOrders)
setVisibilityPayOfDay(true)
  
  
}


useEffect(() => {
paySum()
setTimeout(() => console.log("este es el total del dia: " + payOfDay), 1000)
}, [dataOrders])



  // desmontando el frontend del cliente

  useEffect(() => {

    fetch("https://backend-menue.onrender.com/dataBaseGet")
      .then(res => res.json())
      .then(data => {
        setDataOrders(data);
        console.log("prueba de datos: " + JSON.stringify(data))
      });
  }, [setReceiveOrders]);

  useEffect(() => {
    fetch("https://backend-menue.onrender.com/dataBaseGet")
      .then(res => res.json())
      .then(data => {
        setDataOrders(data);
        console.log("prueba de datos: " + data)
      });
  }, [newFetch])

  // useEffect(() => {
  //   console.log("ESTO ESTA LLEGANDO AL ADMINISTRADOR CON EL FETCH MONO: ", dataOrders);
  // }, [dataOrders, newFetch])

  useEffect(() => {
    setVisibilityClientFrontend(false)
  }, [])

  // logica visibilidades pedidos

  const functionVisibilityOrder = (e) => {
    e.preventDefault()
    setVisibilityOrder(!visibilityOrder)
  }
  // Logica coneccion backend
  const apiSendMessage = "https://backend-menue.onrender.com";

  // traer mensajes desde el chat websocket.io
  useEffect(() => {
    socketRef.current = io("https://backend-menue.onrender.com", { path: "/socket" });

    socketRef.current.on("pedidoALaCocina", (data) => {
      console.log("esta es la data que llega al admin" + JSON.stringify(data))

      console.log("y esta es esa misma data en el etado sendDataState" + sendDataState)
      const orderWithId = { ...data, id: data.id || generateUniqueId() }
      setReceiveOrders((prevMessages) => [...prevMessages, { data: orderWithId }]);
      setNewFetch(newFetch + 1)
      console.log("esta es la estructura de receiveorders: " + receiveOrders)
    });

    // Limpieza al desmontar el componente
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [socketRef, receiveOrders]);



  const deleteOrder = (orderTable) => {
    const newOrderArray = receiveOrders.filter((order) => {
      return order.data.table !== orderTable
    })
    setReceiveOrders(newOrderArray)
  }

  // GUARDAR PEDIDOS

  const saveRequests = () => {
    const now = new Date();
    setTotalDayObject({date: now,data: dataOrders, totalPay: payOfDay})
      
    
  
  }

  useEffect(() => {

    if(totalDayObject.data && totalDayObject.totalPay && totalDayObject.date){
    fetch("https://backend-menue.onrender.com/savePayOfDay", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(totalDayObject)
    })
  }

  setTotalDayObject({date: "", data: "", totalPay: 0})

  }, [totalDayObject])

  
  // LIMPIAR TABLA PEDIDOS

  const deleteAllPedidos = () => {
saveRequests()


    fetch('https://backend-menue.onrender.com/cleanDataBase', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([]) // Envía una tabla vacía
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al limpiar la tabla de órdenes');
        }
        return response.json();
      })
      .then(data => {
        console.log('Tabla de órdenes limpiada con éxito', data);
      })
      .catch(error => {
        console.error('Error al limpiar la tabla de órdenes', error);
      });
    setDataOrders([])
    setPayOfDay(0)
    setNewFetch(newFetch + 1)
  }



// funciones visibilidades

const functionVisibilityHome = () => {
  setHomeVisibility(true)
  setChatVisibility(false)
  setTablesVisibility(false)
  setRegisterVisibility(false)
}



const functionVisibilityChat = () => {
  setHomeVisibility(false)
  setChatVisibility(true)
  setTablesVisibility(false)
  setRegisterVisibility(false)
}

const functionVisibilityTables = () => {
  setHomeVisibility(false)
  setChatVisibility(false)
  setTablesVisibility(true)
  setRegisterVisibility(false)
}

const functionVisibilityRegister = () => {
  setHomeVisibility(false)
  setChatVisibility(false)
  setTablesVisibility(false)
  setRegisterVisibility(true)
}

  // RETURN PRINCIPAL COMPONENTE
  return (
    <div className="container-admin">
      <div className="container-logo-macdonalds-admin">
        <img src={mcDonaldsLogo} className="img-logo-macdonalds-admin" />
        <h1>Administrador</h1>
      
      
      
        <nav className="barnav-admin">
          <button onClick={() => functionVisibilityHome()}>HOME</button>
        <button onClick={deleteAllPedidos}>SAVE</button>
        <button onClick={() => functionVisibilityTables()}>TABLES</button>
        <button onClick={() => functionVisibilityChat()}>CHAT</button>
        <button onClick={() => functionVisibilityRegister()}>REGISTRO</button>
        </nav>

        {
        tablesVisibility && <React.Fragment>
          <Tables receiveOrders={receiveOrders} setReceiveOrders={setReceiveOrders} />
        </React.Fragment>
      }

      {
        registerVisibility && <React.Fragment>
          <Register  dataOrders={dataOrders}/>
        </React.Fragment>
      }

      {
        chatVisibility && <React.Fragment>
          <ChatAdmin />
        </React.Fragment>
      }
    
        {
          homeVisibility &&   <div>
          {functionMapeoBaseDeDatos()} 
          <div>
          { visibilityPayOfDay && <h1>GANANCIAS DEL DIA: {payOfDay}</h1>}
          </div>
        </div>
        }
       
      </div>
{ homeVisibility &&
      <div className="admin-carbuy">
       
        <h1>Órdenes En Curso</h1>
        {receiveOrders.map((orderData) => {
          const { data } = orderData;
          const { id, table, products, totalPayOrder } = data;
          const isCompleted = completedOrders.has(id);
          const isVisible = orderVisibility[id];
 
          return (
            <div key={id} >
              <button onClick={() => toggleVisibility(id)}  className={`order-item ${isCompleted ? 'active' : ''}`}>
                Orden mesa: {table}<br /> hora: {products[0].date}
              </button>
              <button onClick={() => completeOrder(id)}>R</button>
              <button onClick={() => deleteOrder(table)}>X</button>

              {isVisible && (
                <div>
                  <h1>Table: {table}</h1>
                  <h2>Total Pay: {totalPayOrder}</h2>
                  <h3>Products:</h3>
                  {products.map((product, productIndex) => (
                    <div key={productIndex}>
                      <h4>Name: {product.name}</h4>
                      <p>Kcal: {product.kcal}</p>
                      <p>Price: {product.price}</p>
                      <p>Date: {product.date}</p>
                      <p>Ingredients: {product.ingredients}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      }

      
    </div>
  );
}



export default Admin