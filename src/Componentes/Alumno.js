import React from 'react'


class Alumno extends React.Component {
  render() {
      
        if(this.props.alumno){
          return (<div className="Alumno">
        <h4 className="center ">Datos personales</h4>
        <div className="center datos">
        <div>
        <i className="material-icons medium">account_circle</i>
        </div>
        <b>Nombre y Apellidos:</b>
        <div>
        </div>
        <div className="negro">
        {this.props.alumno.apeNom}
         </div>
         </div>
     {/*    <div className="center datos">
          <div>
          <i className="material-icons">fingerprint</i>
          </div>
        
          <b>Código:</b>
          <div className="negro">
            {this.props.alumno.codigo}
          </div>
        </div> */}
        </div>)
        }
        else{
            <p>No hay datos de alumno para mostrar</p>
        }
 
  }
}

export default Alumno;
