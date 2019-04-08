import React from 'react'
import Select from 'react-select'
import AR_tableHeaderPendientes from './AR_TableHeaderPendientes';

class AR_PendienteAsignacion extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            objPendienteAsignacion: this.props.listPendienteAsignacion,
        }
    }

    render() {
        return(
            <div>
                <table className="table">
                    <AR_tableHeaderPendientes/>
                    <tbody>
                        {
                            this.props.listPendienteAsignacion.map((recaudaciones, key) => {
                                return(
                                    <tr>
                                        <td className="td1">{key+1}</td>
                                        <td className="td1 text-align left" >{recaudaciones.apeNom}</td>
                                        <td className="td1">{recaudaciones.concepto}</td>
                                        <td className="td1">{recaudaciones.numero}</td>
                                        <td className="td1">{recaudaciones.moneda}</td>
                                        <td className="td1">{recaudaciones.importe}</td>
                                        <td className="td1">{recaudaciones.fecha}</td>
                                        <td className="td1"></td>
                                        <td className="td1">
                                            <form>
                                                <div className="row justify-content-md-center">
                                                    <div className="col-xs-8">
                                                        <Select value={this.state.alumno} onChange={this.handleChangeAlumno} options={this.state.opcAlumno}/>
                                                    </div>
                                                </div>
                                            </form>
                                        </td>
                                        <td className="td1">
                                            <div className="row justify-content-md-center">
                                                <button className="btn btn-primary btn-sm" onClick={this.onClickBuscar}>
                                                    <i className="large material-icons left">search</i>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="td1">
                                            <div className="row justify-content-md-center">
                                                <button className="btn btn-success btn-sm" onClick={this.onClickBuscar}>
                                                    <i className="large material-icons left">save</i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}
export default AR_PendienteAsignacion