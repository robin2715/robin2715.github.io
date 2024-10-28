import React from 'react'
import { useEffect, useState } from 'react'
import { passwords } from '../Variables'

function Comprobate({setStateShowErrorInititated, setAprobates, initiatedComprobated}) {
    const [passwordsIntent1, setPasswordsIntent1] = useState(0)
    const [passwordsIntent2, setPasswordsIntent2] = useState(0)
    const [maxiumIntents, setMaxiumIntents] = useState(0)


// comprobacion usuario presencial


// chatgpt solution 
const[error, setError] = useState("")
const [passwordAttempts, setPasswordAttempts] = useState(0);

  useEffect(() => {
    if (!initiatedComprobated) return;

    const checkPassword = () => {
      const passwordUser = prompt("Por favor ingrese la contraseña de la mesa en la que está sentado");
      return passwords.includes(passwordUser);
    };

    const maxAttempts = 3;
    const existPassword = checkPassword();

    if (existPassword) {
      setAprobates(true);
      setStateShowErrorInititated(false)
    } else {
      setPasswordAttempts((prevAttempts) => prevAttempts + 1);
    }

    if (passwordAttempts >= maxAttempts) {
      setError("MÁXIMO DE INTENTOS. HAGA SU PEDIDO PRESENCIALMENTE");
    }
  }, [initiatedComprobated, passwordAttempts, setAprobates]);
// let passwordIntents = 0


// const checkPassword = () => {
//     const passwordUser = prompt("Por favor ingrese la contraseña de la mesa en la que está sentado");
//     const existPassword = passwords.includes(passwordUser);
//     return existPassword;
// };

// // useEffect para el primer intento
// useEffect(() => {
//     alert("Este es un producto meramente hipotético. Para continuar, por favor ingresa la contraseña correspondiente a la mesa en la que te encuentras. Es importante destacar que estas contraseñas se cambian periódicamente, según la preferencia del cliente (dueño del restaurante). Las contraseñas válidas en este momento son: 5678, 9432, 8764, 5432, 9875, 1928, 2893, 8721, 8954. ¡Gracias por tu comprensión!")
//     const existPassword = checkPassword();
//     if (existPassword) {
//         setAprobates(true);
//     } else {
//         setPasswordsIntent1(1);
//     }
// }, [initiatedComprobated]);

// // useEffect para el segundo intento
// useEffect(() => {
//     if (passwordsIntent1 === 1 && passwordsIntent2 === 0) {
//         const existPassword = checkPassword();
//         if (existPassword) {
//             setAprobates(true);
//         } else {
//             setPasswordsIntent2(2);
//         }
//     }
// }, [passwordsIntent1]);

// // useEffect para el tercer intento
// useEffect(() => {
//     if (passwordsIntent2 === 2 && maxiumIntents === 0) {
//         const existPassword = checkPassword();
//         if (existPassword) {
//             setAprobates(true);
//         } else {
//             setMaxiumIntents(3);
//         }
//     }
// }, [passwordsIntent2]);

// // useEffect final
// useEffect(() => {
//     if (maxiumIntents === 3) {
//         setError("MAXIMO DE INTENTOS. HAGA SU PEDIDO PRESENCIALMENTE");
//     }
// }, [maxiumIntents]);

// intento 1

// useEffect(() => {
    
   
   
//     const functionComprobated = () => {
//         let passwordUser = prompt("Por favor ingrese la contraseña de la mesa en la que esta sentado")
  
//         const existPassword = passwords.includes(passwordUser)
      
//   if(existPassword){
// setAprobates(true)
//   }
//   else if(!existPassword) {

// // let passwordUser = prompt("Por favor ingrese la contraseña de la mesa en la que esta sentado")
// setPasswordsIntent1(1)
//   }

//     }
//   functionComprobated()

//   }, [])

// //   intento 2

//   useEffect(() => {
    
   
   
//     const functionComprobated = () => {
//         let passwordUser = prompt("Por favor ingrese la contraseña de la mesa en la que esta sentado")
  
//         const existPassword = passwords.includes(passwordUser)
      
//   if(existPassword){
// setAprobates(true)
//   }
//   else if(!existPassword) {
// setPasswordsIntent2(2)

// // let passwordUser = prompt("Por favor ingrese la contraseña de la mesa en la que esta sentado")
  
//   }

//     }
//   functionComprobated()

//   }, [passwordsIntent1])


// //   intento 3

//   useEffect(() => {
    
   
   
//     const functionComprobated = () => {
//         let passwordUser = prompt("Por favor ingrese la contraseña de la mesa en la que esta sentado")
  
//         const existPassword = passwords.includes(passwordUser)
   
//   if(existPassword){
// setAprobates(true)
//   }
//   else if(!existPassword) {
// setMaxiumIntents(3)

// // let passwordUser = prompt("Por favor ingrese la contraseña de la mesa en la que esta sentado")
  
//   }

//     }
//   functionComprobated()

//   }, [passwordsIntent2])



// //   USEEFFECT FINAL 

//   useEffect(() => {
// setError("MAXIMO DE INTENTOS. HAGA SU PEDIDO PRESENCIALMENTE")
//   }, [maxiumIntents])


  
  return (
    <div>
    {error &&
    <div style={{backgroundColor: "red", color: "white", fontSize: "50px", textAlign: "center", justifyContent: "center"}} >{error}</div>
}
</div>
  )
}

export default Comprobate