import React from 'react'

class Importe extends React.Component {
  
     render() {
      return(
        <div className="col">
          <b className="importe">IMPORTE TOTAL SOLES:</b>
          <input value={'S/. '+ this.props.importe} readOnly="true" type="text" placeholder="Importe" className="center col-xs-5"/>
        </div>
      )
    }   
}
export default Importe;
