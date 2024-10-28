const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql2")
const port = 5000


app.use(express.json())
app.use(cors())


// CONFIGURACIONES A LA BASE DE DATOS

app.listen(port, () => {
    console.log("base de datos mcdonalds conectada")
})

app.get("/", (req, res) => {
    res.send("Servidor base de datos conectado")
})


const connection = mysql.createConnection({
    'host': "127.0.0.1",
    'user': 'root',
    'password': 'spizamarillo2715',
    'database': 'mcdonalds'
    
    })
    
    connection.connect((err) => {
      if (err) {
        console.error("Error de conexión a la base de datos:", err);
      } else {
        console.log("Conexión a la base de datos establecida");
      }
    });
    
    
    // app.listen(port2, () => {
    //   console.log("server 2 conected")
    // })
    
    app.post('/dataBaseSend', (req, res) => {
      console.log("esto esta llegando al backend" + JSON.stringify(req.body))
      const {  table, products, totalPayOrder } = req.body;
    
      // Convertir el objeto products a una cadena JSON
      // const productsJSON = JSON.stringify(products);
      const productsJSON = JSON.stringify(products);
     
      // Insertar datos en la tabla Pedidos
      const sql = 'INSERT INTO pedidos (table_number, products, totalPayOrder) VALUES ( ?, ?, ?)';
      connection.query(sql, [ table, productsJSON, totalPayOrder], (err, result) => {
        if (err) {
          console.error('Error al insertar datos en la tabla Pedidos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
        }
        console.log('Datos insertados en la tabla Pedidos');
        res.status(200).json({ message: 'Datos insertados correctamente en la tabla Pedidos' });
      });
    });




  
    
    
    // Configurar el servidor para escuchar en el puerto 4000
    