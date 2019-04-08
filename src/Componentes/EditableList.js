import React from 'react'
import EditableRow from './editable-row'

class EditableList extends React.Component {

  
  
  render() { 
    return (
         
        <tbody>
          {
            this.props.listado.map((pago) => {
              return <EditableRow Funciones={this.props.funcion} key={pago.idRec} 
                                  pago={pago} />
            })
          }
        </tbody>
    )
  }
}

export default EditableList