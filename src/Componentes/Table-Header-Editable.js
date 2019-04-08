import React from 'react'

class TableHeaderEditable extends React.Component {

  render() {
    return(
    <thead>
			<tr>      
        <th className="th">NOMBRE/APELLIDOS</th>
        <th className="th">CONCEPTO</th>
        <th className="th">NUMERORECIBO</th>
        <th className="th">DEPENDENCIA</th>
        <th className="th">FECHA</th>
        <th className="th">MONEDA</th>
        <th className="th">IMPORTE</th>
        <th className="th">OBSERVACION</th>
      </tr>
	</thead>
    )
  }
}

export default TableHeaderEditable