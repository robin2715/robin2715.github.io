import React from 'react'
import { NavLink, useNavigate, } from 'react-router-dom'
import { useState } from 'react'
import carbuyImg from '../../../asses/not-found/logocarbuy-removebg-preview.png'

function Barnav({setSecurityAdmin, setVisibilityClientFrontend, numberOrders, setVisibilityHamburguesas, setVisibilityCar, visibilityCar, numberBurgers}) {
  const [password, setPassword] = useState("1234")
  const navigate = useNavigate()

  // LOGICA SEGURIDAD ADMINISTRADOR
  
const verificationPasswordSecurity = (e) => {
  e.preventDefault()
  const challangeUser = prompt("Digite la contraseña del establecimiento")
if(challangeUser === password){
openAdmin()
}
else{
  alert("contraseña incorrecta")
}


}

const openAdmin = () => {

navigate("/admin")
setVisibilityClientFrontend(false)
setSecurityAdmin(true)
} 




// FUNCIONES RELACIONADAS AL CARRITO


  const visibilityCarFunction = (e) => {
    e.preventDefault()
    setVisibilityCar(!visibilityCar)
  }
  


const funcionChallengeVisibility = () => {
setVisibilityHamburguesas(true)

}

  return (
    <div className='container-buttons-barnav'>
     {  numberOrders < 4 && <button className='primary-button' id='btn-pedido' onClick={(e) => visibilityCarFunction(e)}><img src={carbuyImg} className='img-carbuy-logo' /><p className='number-orders-car'>{numberBurgers}</p></button>
     
      }
        <button id='btn-mesero' className='primary-button'>Mesero </button>
        
        <button id='btn-chat' className='primary-button'>Chat</button>
      
        <button id='btn-administrado' onClick={(e) => verificationPasswordSecurity(e)} className='primary-button'>Administrador </button>
        
    
    </div>
  )
}

export default Barnav