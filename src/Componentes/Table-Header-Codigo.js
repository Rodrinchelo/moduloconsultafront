import React from 'react'

class TableHeaderCodigo extends React.Component {

  render() {
    return(
    <thead>
			<tr>      <th className="th">SELECCIONAR</th>
                <th className="th2">CODIGO ALUMNO</th>
                <th className="th2">NOMBRE ALUMNO</th>
                <th className="th2">PROGRAMA</th> 
       </tr>
	</thead>
    )
  }
}

export default TableHeaderCodigo