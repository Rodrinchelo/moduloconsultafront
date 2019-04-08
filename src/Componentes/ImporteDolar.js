import React from 'react'

class ImporteDolar extends React.Component {
  
     render() {
      return(
        <div className="col">
          <b className="importe">IMPORTE TOTAL DOLARES:</b>
          <input value={'$. '+ this.props.importe} readOnly="true" type="text" placeholder="Importe" className="center col-xs-5"/>
        </div>
      )
    }   
}
export default ImporteDolar;