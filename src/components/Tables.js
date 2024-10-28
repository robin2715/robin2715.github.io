import React from 'react'
import { useState, useEffect } from 'react'

function Tables({alertTable ,tableNumber, setTableNumber}) {

useEffect(() => {
  alert("Por favor, seleccione una mesa y haga clic en el botón 'Carbuy' para realizar su pedido. Esto le permitirá completar su orden de manera rápida y sencilla. ¡Gracias!"
)
}, [alertTable])


  useEffect(() => {
    alert("Este producto de muestra utiliza la imagen empresarial de McDonald's únicamente con fines ilustrativos y demostrativos. No está asociado de ninguna manera con la empresa McDonald's Corporation. Este producto es una creación original y no pretende ser un producto oficial de McDonald's ni infringe sus derechos de autor, marca registrada o cualquier otra propiedad intelectual. el Password del administrador es: 1234")
  }, [])
  

const selectTable = (numberTable) => {
setTableNumber(numberTable)
}

const challangeTableFunction = (e) => {
  e.preventDefault()
  setTableNumber(0)
}


  return (
    <div className='container-buttons'>
        <button className='table-button' disabled={tableNumber > 0} onClick={() =>selectTable(1)}>Mesa 1</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(2)}>Mesa 2</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(3)}>Mesa 3</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(4)}>Mesa 4</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(5)}>Mesa 5</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(6)}>Mesa 6</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(7)}>Mesa 7</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(8)}>Mesa 8</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(9)}>Mesa 9</button>
     

        <div className='container-btn-challange'>
        <button className='primary-button' id='change-table' onClick={(e) =>challangeTableFunction(e)}>Cambiar Mesa</button>
        {/* <h1 className='mesa-container'>Mesa: {tableNumber}</h1>  */}
        </div>
    </div>
  )
}

export default Tables