import React from 'react'

class TableHeaderNuevo2 extends React.Component {

  render() {
    return(
    <thead>
			<tr>      
                <th className="th1">NOMBRE APELLIDO</th>
                <th className="th1">CONCEPTO</th>
                <th className="th1">RECIBO</th> 
                <th className="th1">MONEDA</th> 
                <th className="th1">IMPORTE</th> 
                <th className="th1">FECHA</th> 
                <th className="th2"> CODIGO  /  PROGRAMA  A ESCOGER </th>
       </tr>
	</thead>
    )
  }
}

export default TableHeaderNuevo2