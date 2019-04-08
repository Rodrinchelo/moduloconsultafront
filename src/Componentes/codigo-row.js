import React from 'react'
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config'
import swal from 'sweetalert';

class CodigoRow extends React.Component{


    

    validar=(e)=>{
        fetch(CONFIG+'recaudaciones/alumno/concepto/listar_cod/'+ this.props.alumno.cod_alumno)
        .then((response)=>{
            return response.json()   
        })
        .then((pagos)=>{
            if(pagos.length>0){
                swal("Consulta realizada exitosamente","","success").then(browserHistory.push('/'+ this.props.alumno.cod_alumno))
            }
            else{
                swal("No se encontraron pagon con el nombre ingresado ","","info");
            }


        })
        .catch(()=>{
            swal("Oops,Algo salio mal.!","","error");
            
        });
        e.preventDefault();
    }
    

render(){
    return(
        <tr>
             <td className="td">
            <form action="#">
                <label className="center-xs ">
                <button type="submit" onClick={this.validar} className="waves-effect waves-light btn-small">CONSULTAR</button>
                
                <span></span>
                
                </label>



            </form>

            </td> 
            <td className="td">{this.props.alumno.cod_alumno}</td>
            <td className="td">{this.props.alumno.nombre_alumno}</td>
            <td className="td">{this.props.alumno.nombre_programa}</td>
        
        </tr>
    )
}



}

export default CodigoRow;