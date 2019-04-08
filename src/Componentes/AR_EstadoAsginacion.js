import React from 'react'
import CONFIG1 from '../Configuracion/Config1'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'

class AR_EstadoAsignacion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          objProgramas: [],
          detalle: {
              codigo: '',
              nombre: '',
              programa: ''
          },
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
    toggle = (e) => {
        let id_alum = this.props.recibo[0].idAlum;
        console.log(id_alum);
            fetch(CONFIG1 + 'alumnoalumnoprograma/buscar/' + id_alum)
                .then((response) => {
                    return response.json();
                })
                .then((asignado) => {
                    if(asignado.length != 0){
                        fetch(CONFIG1 + '/programa/buscarPrograma/' + asignado.idPrograma)
                            .then((response) => {
                                return response.json();
                            })
                            .then((programas) => {
                                console.log("---Programas---");
                                console.log(programas);
                                this.setState({
                                    objProgramas: programas,
                                });
                                console.log("---ObjProgramas---");
                                console.log(this.state.objProgramas);
                                if(this.state.objProgramas.length != 0){
                                    this.setState({
                                        detalle: {
                                            codigo: this.props.alumno[0].codAlumno,
                                            nombre: this.props.recibo[0].apeNom,
                                            programa: this.state.objProgramas.siglaPrograma,
                                        },
                                        modal: !this.state.modal
                                    });
                                }else{
                                    console.log("--NO ENTRÓ--");
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    } else{
                        console.log("NO ENTRA :(");
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        e.preventDefault();
    }

    render(){
        if(this.props.estadoAsignacion === true){
            return(
                <div>
                    <Button color="success" onClick={this.toggle}>
                        Asignado
                        <i className="large material-icons left">visibility</i>
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Detalles del Recibo Asignado</ModalHeader>
                        <ModalBody>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="th">Código</th>
                                        <th className="th">Apellidos y Nombres</th>
                                        <th className="th">Programa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="td">{this.state.detalle.codigo}</td>
                                        <td className="td">{this.state.detalle.nombre}</td>
                                        <td className="td">{this.state.detalle.programa}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Aceptar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        } else{
            return(
                <div>
                    No Asignado
                </div>
            )
        }
    }

}

export default AR_EstadoAsignacion