import React from 'react';
import SelectNuevo2 from './SelectNuevo2';

class PagoRowNuevo2 extends React.Component {
  constructor(props) {
    super(props);
    this.OpcionSeleccionada= this.OpcionSeleccionada.bind(this);
    this.state = {
      
    };
  }
  OpcionSeleccionada(opcion,mantener) {
    // console.log(mantener);
    
      if(opcion != null){
        // console.log("opcion seleccionada");
    
        var opcionSeleccionada = this.props.pago.alumnoPrograma[opcion];
          /* console.log("opcion seleccionada en select")
          console.log(opcionSeleccionada) */
        //console.log(opcion);
        var listadoRec = { 
          "idAlumno" : this.props.pago.idAlum,
          "codAlumno" :opcionSeleccionada.codAlumno,
          "idPrograma":opcionSeleccionada.idPrograma
          }
        // console.log(listadoRec);
        }
        this.props.Opcion(listadoRec,mantener);
    
    
  }
  render() {
    return(
    <tr>
      <td className="td1">{this.props.pago.apeNom}</td>
      <td className="td1">{this.props.pago.concepto}</td>
      <td className="td1">{this.props.pago.numero}</td>
      <td className="td1">{this.props.pago.moneda}</td>
      <td className="td1">{this.props.pago.importe}</td>
      <td className="td1">{this.props.pago.fecha}</td>
      <td className="td1"><SelectNuevo2 Opcion={this.OpcionSeleccionada} nombre={this.props.pago.apeNom} listado = {this.props.pago.codigos}/></td>
	</tr>
    )
  }
}
//
//

//<td className="td">{this.props.pago.concepto}</td>
//<td className="td">{this.props.pago.facultad}</td>
//<td className="td">{this.props.pago.idRec}</td>

//<td className="td">{this.props.pago.alumno.idAlum}</td>
export default PagoRowNuevo2;