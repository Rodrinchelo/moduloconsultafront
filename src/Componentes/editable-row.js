import React from 'react'

class EditableRow extends React.Component {
  
  colocar=()=>{
    var hola=document.getElementById(this.props.pago.idRec);
    console.log(hola.id);
    var holas=hola.id;
    this.props.Funciones(holas);
 
    }
  

  render() {
    return(
    <tr>
      {/* <td className="td">


      <form action="#">
              <label className="row center-xs color_white">
                  <input
                  onClick={this.colocar}
                    className="checkbox1"
                    //name="chekbox"
                    id={this.props.pago.idRec}
                    type="checkbox" />
                    <span> </span>

              </label>
      </form>
     
    </td> */}
  
      <td className="td">{this.props.pago.apeNom}</td>
      <td className="td">{this.props.pago.concepto}</td>
			<td className="td">{this.props.pago.numero}</td>	
      <td className="td">{this.props.pago.nombre}</td>

      <td className="td">


      <form action="#">
              <label className="row center-xs color_white">
                  <input
                    placeholder={this.props.pago.fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1')}
                    id={this.props.pago.idRec.toString()+this.props.pago.idAlum.toString()}
                    disabled = "true"
                    type="text" />
                    <span> </span>

              </label>
      </form>

      
      </td>

      <td className="td">{this.props.pago.moneda}</td>
      <td className="td">{'S/. '+this.props.pago.importe}</td>
      <td className="td">{this.props.pago.observacion}</td>
	  </tr>
    )
  }
}

export default EditableRow;