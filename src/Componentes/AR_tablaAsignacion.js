import React from 'react'
import AR_tablaRecibo from './AR_tableHeaderRecibo';

class AR_tablaAsignacion extends React.Component {
    constructor (props){
        super(props);
        
        this.state = {
            flag: false,
        }

        this.detalles = this.detalles.bind(this);
    }

    detalles = (e) => {
        this.setState({
            flag: true,
        });
    } 

    render(){
        return(
            <di>
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Recibo</th>
                        <th className="th">Código</th>
                        <th className="th">Programa</th>
                        <th className="th">Nombres</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="td">
                            <form action="#">
                                {this.props.objeto.numero}  
                                <button className="btn btn-primary btn-lg" type="submit" onClick={this.detalles}>Detalles</button> 
                            </form>
                        </td>
                        <td className="td">{this.props.objeto.codAlumno}</td>
                        <td className="td">{this.props.objeto.nom_programa}</td>
                        <td className="td">{this.props.objeto.nomAlumno}</td>
                    </tr>
                </tbody>
            </table>
            {this.state.flag?(
                <AR_tablaRecibo objeto={this.props.listaRecaudaciones}/>
            ): (null)}
            </di>
        )
    }
}
export default AR_tablaAsignacion