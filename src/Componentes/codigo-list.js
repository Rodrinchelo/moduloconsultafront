import React from 'react'
import CodigoRow from './codigo-row'
import TableHeaderCodigo from './Table-Header-Codigo'
class CodigoList extends React.Component{

    render(){
        if(this.props.lista.length >0){
        return(
            <table className="table">
            <TableHeaderCodigo/>
                <tbody>
                {
                    this.props.lista.map((alumno)=>{
                        return <CodigoRow  alumno={alumno} /> 
                    })
                }
            </tbody>
            </table>
            
        ) }    
        else {
            return <div className="mensaje central">No hay datos que mostrar</div>
        }
        }
        
}
export default CodigoList
// funciones={this.props.funcion} 