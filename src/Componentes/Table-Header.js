import React from 'react'
import '../App.css';
class TableHeader extends React.Component {

  render() {
    return(
    <thead>
			<tr>      
        <th className="th">SELECCIONAR</th>
        <th className="th">N°</th>
        <th className="th">CICLO</th>
      
        <th className="th ancho">CONCEPTO</th>
        <th className="th">NUMERORECIBO</th>
        <th className="th">DEPENDENCIA</th>
        <th className="th">FECHA</th>
        <th className="th ancho">MONEDA</th>
        <th className="th">IMPORTE</th>
        <th className="th">OBSV</th>
        <th className="th">EDITAR</th>
        <th className="th">GUARDAR</th>
      </tr>
	</thead>
    )
  }
}

export default TableHeader