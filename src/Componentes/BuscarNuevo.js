import React from 'react'
import '../App.css';
import Select from 'react-select'
import swal from 'sweetalert'
import CONFIG1 from '../Configuracion/Config1';
import AR_tableHeaderRecibo from './AR_tableHeaderRecibo'
import AR_EstadoAsignacion from './AR_EstadoAsginacion'
import AR_PendienteAsignacion from './AR_PendienteAsignacion';

const opciones = [
    {value: 'Búsqueda por nombre', label: 'Búsqueda por nombre'},
    {value: 'Búsqueda por recibo', label: 'Búsqueda por recibo'},
    {value: 'Pendiente de asignación', label: 'Pendiente de asignación'}
];

class BuscarNuevo extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            value: {value: 'Búsqueda por nombre', label: 'Búsqueda por nombre'},
            nomB: true,
            recB: false,
            posgradoB: false,

            objRecaudaciones: [],
            objAlumnos: [],			
            ObjAsignación: [],

            objPendienteAsignacion: [],

            buscarRec: false,
            asignarRec: false,            

            dni: '',
            codigo: '',
            apePat: '',
            apeMat: '',
            nombre: '',

            alumno: null,
            opcAlumno: [],

            btnGuardar: false,
            btnReasignar: false,

            detalleRecaudaciones: {
                apeNom: '',
                concepto: '',
                recibo: '',
                moneda: '',
                importe: '',
                fecha: '',
                estado: '',
                codAlumno: '',
                programa: '',
            },

            estado: false,
        }

        this.handleChange = this.handleChange.bind(this);

        this.handleChangeAlumno = this.handleChangeAlumno.bind(this);

        this.onSubmitNombre = this.onSubmitNombre.bind(this);
        this.onSubmitRecibo = this.onSubmitRecibo.bind(this);

        this.onSubmitAsignar = this.onSubmitAsignar.bind(this);

        this.onSubmitGuardar = this.onSubmitGuardar.bind(this);
        this.onSubmitReasignar = this.onSubmitReasignar.bind(this);
        this.onSubmitEliminar = this.onSubmitEliminar.bind(this);

        this.onChangeDni = this.onChangeDni.bind(this);
        this.onChangeCodigo = this.onChangeCodigo.bind(this);
        this.onChangeApePaterno = this.onChangeApePaterno.bind(this);
        this.onChangeApeMaterno = this.onChangeApeMaterno.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);

        this.onClickBuscar = this.onClickBuscar.bind(this);

        this.buscarDni = this.buscarDni.bind(this);
        this.buscarCodigo = this.buscarCodigo.bind(this);
        this.buscarApellidoNombre = this.buscarApellidoNombre.bind(this);

        this.getDetalleRecaudaciones = this.getDetalleRecaudaciones.bind(this);

        this.Validar = this.Validar.bind(this);

    }

    handleChange = (selectedOption) => {
        if(selectedOption.value == 'Búsqueda por nombre'){
            this.setState({
                value: selectedOption,
                nomB: true,
                recB: false,
                posgradoB: false,
                buscarRec: false,
                asignarRec: false,
            });
            this.props.flag (false);
        } else if(selectedOption.value == 'Búsqueda por recibo'){
            this.setState({
                value: selectedOption,
                nomB: false,
                recB: true,
                posgradoB: false,
                buscarRec: false,
                asignarRec: false,
            });
            this.props.flag (false);
        } else if(selectedOption.value == 'Pendiente de asignación'){
            this.setState({
                value: selectedOption,
                nomB: false,
                recB: false,
                posgradoB: true,
                buscarRec: false,
                asignarRec: false,
            });
            this.props.flag (false);
            this.onSubmitRecaudaciones();
        }
    }

    handleChangeAlumno = (selectedOption) => {
        this.setState({
            alumno: selectedOption
        });
    }

    onSubmitNombre = (e) => {
        var nombres = this.nombre.value.toUpperCase();
        if(!nombres){
            swal("Ingrese nombre apellido a buscar", "", "info");
        } else{
            var busqueda = {nombres: nombres};
            this.props.flag(true);
            this.props.Busqueda(busqueda);
        }
        e.preventDefault();
    }

    onSubmitRecibo = (e) => {
        var rec = this.recibo.value;
        if(!rec){
            swal("Ingrese numero de recibo a buscar", " ", "info");
        } else{
            this.setState({
                objRecaudaciones: [],
                objAlumnos: [],				
                ObjAsignación: [],
                buscarRec: false,
                asignarRec: false,
                estado: false,
                alumno: null,
                opcAlumno: [],
                dni: '',
                codigo: '',
                apePat: '',
                apeMat: '',
                nombre: '',
            })
            fetch(CONFIG1 + 'recaudaciones/rec/' + rec)
                .then((response) => {
                    return response.json();
                })
                .then((recaudaciones) => {
                    console.log("---Recaudaciones---");
                    console.log(recaudaciones);
                    this.setState({
                        objRecaudaciones: recaudaciones
                    });
                    console.log("---ObjRecaudaciones---");
                    console.log(this.state.objRecaudaciones);
                    if(this.state.objRecaudaciones.length > 0){
                       this.getDetalleRecaudaciones(this.state.objRecaudaciones);
                       /* //this.buscarApellidoNombre(this.state.objRecaudaciones[0].apeNom, ' ', ' ', e);
                       this.buscarCodigoAlumnoPrograma(this.state.objRecaudaciones[0].codAlum, this.state.objRecaudaciones[0].idProg,e);
                        
                        console.log("---ObjAlumnos---");
                        console.log(this.state.objAlumnos);*/

                       /* this.setState({
                            buscarRec: true,
                        });*/
                       /* if(this.state.objAlumnos.length = 0)
                        {

                            this.buscarApellidoNombre(this.state.objRecaudaciones[0].apeNom, ' ', ' ', e);
                            this.setState({
                            buscarRec: true,
                            });

                        }

                        console.log("---ObjAlumnos---");
                        console.log(this.state.objAlumnos);
*/

                       /* fetch(CONFIG1 + 'alumnoprograma/buscarc/' + this.state.objRecaudaciones[0].codAlum)
                            .then((response) => {
                                return response.json();
                            })
                            .then((alumnos) => {
                                console.log("---Alumnos---");
                                console.log(alumnos);
                                this.setState({
                                    objAlumnos: alumnos
                                });
                                console.log("---ObjAlumnos---");
                                console.log(this.state.objAlumnos);
								console.log(this.state.detalleRecaudaciones);
								
								if(this.state.objAlumnos.length > 0){
                                                this.setState({
                                                    estado: true,
                                                });
                                                swal("Este numero ya ha sido asignado", "", "success");
                                            }else{
                                                console.log("Array de ObjAlumnos está vació: seguimiento 1");
                                            }
                                
                            })
                            .catch((error) => {
                                console.log(error);
                        });*/
                    } else{
                        console.log("Array de ObjRecaudaciones está vació: seguimiento 2");
                        swal("Número de recibo incorrecto", "", "warning");
                    }
                })
                .catch((error) => {
                    this.setState({
                        buscarRec: false
                    });
                    swal("Algo salió mal", "", "warning")
                    console.log(error);
                });
        }
        e.preventDefault();
    }

    onSubmitRecaudaciones = (e) => {
        fetch(CONFIG1 + 'recaudaciones/listar/posgrado')
            .then((response) => {
                return response.json();
            })
            .then((pendienteAsignacion) => {
                console.log("---PendienteAsignacion---");
                console.log(pendienteAsignacion);

                var lista = [];
                for(let i = 0; i < pendienteAsignacion.length; i++){
                    var listadoRec = { 
                        apeNom:'',
                        concepto: '',
                        fecha: '',
                        id_rec: '',
                        numero: '',
                        idAlum : '',
                        moneda: '',
                        importe: ''
                    }

                    if(pendienteAsignacion[i].moneda == '108'){

                        listadoRec.apeNom = pendienteAsignacion[i].ape_nom;
                        listadoRec.concepto = pendienteAsignacion[i].concepto;
                        listadoRec.fecha = pendienteAsignacion[i].fecha;
                        listadoRec.id_rec = pendienteAsignacion[i].id_rec;
                        listadoRec.numero = pendienteAsignacion[i].numero;
                        listadoRec.idAlum = pendienteAsignacion[i].id_alum;
                        listadoRec.moneda = 'SOL';
                        listadoRec.importe = 'S/' + pendienteAsignacion[i].importe;
              
                    } else if(pendienteAsignacion[i].moneda == '113'){
              
                        listadoRec.apeNom = pendienteAsignacion[i].ape_nom;
                        listadoRec.concepto = pendienteAsignacion[i].concepto;
                        listadoRec.fecha = pendienteAsignacion[i].fecha;
                        listadoRec.id_rec = pendienteAsignacion[i].id_rec;
                        listadoRec.numero = pendienteAsignacion[i].numero;
                        listadoRec.idAlum = pendienteAsignacion[i].id_alum;
                        listadoRec.moneda = 'DOL';
                        listadoRec.importe = '$ ' + pendienteAsignacion[i].importe;
              
                    } else{
              
                        listadoRec.apeNom = pendienteAsignacion[i].ape_nom;
                        listadoRec.concepto = pendienteAsignacion[i].concepto;
                        listadoRec.fecha = pendienteAsignacion[i].fecha;
                        listadoRec.id_rec = pendienteAsignacion[i].id_rec;
                        listadoRec.numero = pendienteAsignacion[i].numero;
                        listadoRec.idAlum = pendienteAsignacion[i].id_alum;
                        listadoRec.moneda = ' ';
                        listadoRec.importe = pendienteAsignacion[i].importe;
              
                    }
                    lista.push(listadoRec);

                }

                this.setState({
                    objPendienteAsignacion: lista,
                })
                console.log("---ObjPendienteAsignacion---");
                console.log(this.state.objPendienteAsignacion);
                if(this.state.objPendienteAsignacion.length > 0){
                    swal("Consulta realizada exitosamente", " ", "success");
                }else{
                    swal("No hay pendientes por asignación", " ", "info")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getDetalleRecaudaciones = (objRec) => {
        if(objRec[0].moneda == '108'){
            this.setState({
                detalleRecaudaciones: {
                    apeNom: objRec[0].apeNom,
                    concepto: objRec[0].concepto,
                    recibo: objRec[0].numero,
                    moneda: 'SOL',
                    importe: 'S/ ' + objRec[0].importe,
                    fecha: objRec[0].fecha,
                    estado: objRec[0].estado,
                    codAlumno: objRec[0].codAlumno,
                    programa: objRec[0].programa
                }
            });
        } else if(objRec[0].moneda == '113'){
            this.setState({
                detalleRecaudaciones: {
                    apeNom: objRec[0].apeNom,
                    concepto: objRec[0].concepto,
                    recibo: objRec[0].numero,
                    moneda: 'DOL',
                    importe: '$ ' + objRec[0].importe,
                    fecha: objRec[0].fecha,
                    estado: objRec[0].estado,
                    codAlumno: objRec[0].codAlumno,
                    programa: objRec[0].programa
                }
            });
        } else{
            this.setState({
                detalleRecaudaciones: {
                    apeNom: objRec[0].apeNom,
                    concepto: objRec[0].concepto,
                    recibo: objRec[0].numero,
                    moneda: ' ',
                    importe: objRec[0].importe,
                    fecha: objRec[0].fecha,
                    estado: objRec[0].estado,
                    codAlumno: objRec[0].codAlumno,
                    programa: objRec[0].programa
                }
            });
        }
    }
 
    onClickBuscar = (e) => {
        this.setState({
            asignarRec: true,
        });
        e.preventDefault();
    } 

    render () {
        return (
            <div>
                <div className="col-xs-3">
                    <Select value={this.state.value} onChange={this.handleChange} options={opciones}/>
                </div>
                {this.state.nomB?(
                    <form>
                        <div className="SplitPane row">
                            <div className="col-xs-3 margen2">
                                <input ref={ ( input ) => this.nombre = input } type="text" maxLength="100" placeholder="Nombres Apelllidos" /> 
                            </div>
                            <div className="col-xs-2 margen2">
                                <button  className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitNombre}>
                                    Buscar
                                    <i className="large material-icons left">search</i>
                                </button>
                            </div>
                        </div>
                    </form>
                ): (null)}
                {this.state.recB?(
                    <div>
                        <form>
                            <div className="SplitPane row">
                                <div className="col-xs-3 margen2">
                                    <input ref={ ( input ) => this.recibo = input } type="text" maxLength="100" placeholder="Número de recibo" /> 
                                </div>
                                <div className="col-xs-2 margen2">
                                    <button  className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitRecibo}>
                                        Buscar
                                        <i className="large material-icons left">search</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        {this.state.buscarRec?(
                            <div className="row justify-content-md-center">
                                <table className="table">
                                    <AR_tableHeaderRecibo/>
                                    <tbody>
                                        <tr>
                                            <td className="td1">{1}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.apeNom}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.concepto}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.recibo}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.moneda}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.importe}</td>
                                            <td className="td1">{this.state.detalleRecaudaciones.fecha}</td>
                                            <td className="td1">
                                                <AR_EstadoAsignacion estadoAsignacion={this.state.estado} recibo={this.state.objRecaudaciones} alumno={this.state.objAlumnos} asignado={this.state.ObjAsignación}/>
                                            </td>
                                            <td className="td1">
                                                <form>
                                                    <div className="SplitPane row">
                                                        <div className="col-xs-10">
                                                            <Select value={this.state.alumno} onChange={this.handleChangeAlumno} options={this.state.opcAlumno}/>
                                                        </div>
                                                        <div className="col-xs-1">
                                                            <button className="waves-effect waves-light btn-small" onClick={this.onClickBuscar}>
                                                                <i className="large material-icons left">search</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="center datos">
                                    <div>
                                        <div className="col col-lg-4">
                                            <button className="waves-effect btn-success btn-large center" type="submit" onClick={this.onSubmitGuardar}>
                                                Asignar <i className="large material-icons left">save</i>
                                            </button>
                                        </div>
                                        <div className="col col-lg-4">
                                            <button className="waves-effect btn-warning btn-large center" type="submit" onClick={this.onSubmitReasignar}>
                                                Reasignar <i className="large material-icons left">replay</i>
                                            </button>
                                        </div>
                                        <div className="col col-lg-4">
                                            <button className="waves-effect btn-danger btn-large center" type="submit" onClick={this.onSubmitEliminar}>
                                                Desasignar <i className="large material-icons left">delete</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ): (null)}
                    </div>
                ): (null)}
                {this.state.posgradoB?(
                    <div>
                        <AR_PendienteAsignacion listPendienteAsignacion={this.state.objPendienteAsignacion}/>
                    </div>
                ): (null)}
                <hr/>
                {this.state.asignarRec?(
                    <div>
                        <div className="row justify-content-md-center">
                            <div className="col col-lg-2">
                                <input className="autocomplete" value={this.state.dni} onChange={this.onChangeDni} placeholder="DNI"></input>
                            </div>
                            <div className="col col-lg-2">
                                <input className="autoomplete" value={this.state.codigo} onChange={this.onChangeCodigo} placeholder="Código"></input>
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col col-lg-2">
                                <input className="autocomplete" value={this.state.apePat} onChange={this.onChangeApePaterno} placeholder="Apellido paterno"></input>
                            </div>
                            <div className="col col-lg-2">
                                <input className="autocomplete" value={this.state.apeMat} onChange={this.onChangeApeMaterno} placeholder="Apellido materno"></input>
                            </div>
                            <div className="col col-lg-2">
                                <input className="autocomplete" value={this.state.nombre} onChange={this.onChangeNombre} placeholder="Nombres"></input>
                            </div>
                        </div>
                        <br/>
                        <div className="row justify-content-md-center">
                            <div className="col col-lg-2">
                                <button className="waves-effect waves-light btn-large center" type="submit" onClick={this.onSubmitAsignar}>
                                    Buscar <i className="large material-icons left">search</i>
                                </button>
                            </div>
                        </div>
                    </div>
                ): (null)}
            </div>
        )
    }

    onSubmitAsignar = (e) => {
        if(this.Validar(this.state.dni, this.state.codigo, this.state.apePat, this.state.apeMat, this.state.nombre)){
            if(this.state.dni != '' && this.state.codigo == '' && this.state.apePat == '' && this.state.apeMat == '' && this.state.nombre == ''){
                this.buscarDni(this.state.dni, e);
            } else if(this.state.dni == '' && this.state.codigo != '' && this.state.apePat == '' && this.state.apeMat == '' && this.state.nombre == ''){
            this.buscarCodigo(this.state.codigo, e);
            } else if(this.state.dni == '' && this.state.codigo == '' && this.state.apePat != '' || this.state.apeMat != '' || this.state.nombre != ''){
                this.buscarApellidoNombre(this.state.apePat, this.state.apeMat, this.state.nombre, e);
            } else{
                swal("Lo sentimos, sólo puede llenar un campo para la búsqueda", "", "info");
            }
        }
        e.preventDefault();
    }

    onSubmitGuardar = (e) => {
        console.log("---ACTUALIZA CODIGO Y PROGRAMA EN RECAUDACIONES ---");
        console.log(this.state.objRecaudaciones[0].idRec);
		console.log(this.state.alumno);		
		console.log(this.state.alumno.codAlumno);		
		console.log(this.state.alumno.idPrograma);		
        if(this.state.alumno != null){            
            fetch(CONFIG1 + 'recaudaciones/actualizar/' + this.state.objRecaudaciones[0].idRec + '/'+ this.state.alumno.codAlumno + '/'+ this.state.alumno.idPrograma, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify ({
                        'idRec': this.state.objRecaudaciones[0].idRec,
                        'codAlumno': this.state.alumno.codAlumno,
                        'idPrograma': this.state.alumno.idPrograma
                    })
                })
                .then((response) => {
                    console.log(response);
                    if(response){
                        swal("guardado exitosamente!", "","success");
                        this.setState({
                            estado: true,
                        });
                    }else{
                        swal("Oops, Algo salió mal!!", "","error");
                    }
                })
                .catch((error) => {
                    swal("Oops, Algo salió mal!!", "","error");
                    console.log(error);
                })
        }else{
            swal("Seleccione una opción", " ", "info");
        }
    } 

    onSubmitReasignar = (e) =>{
        if(this.state.alumno != null){
            fetch(CONFIG1 + 'alumnoalumnoprograma/actualizar/' + this.state.objRecaudaciones[0].idAlum + '/' + this.state.alumno.codAlumno + '/' + this.state.alumno.idPrograma)
                .then((response) => {
                    if(response){
                        console.log(response);
                        swal("Reasignado exitosamente", "", "success");
                    } else{
                        swal("Oops, algo salió mal", "","error");
                    }
                }) 
                .catch((error) => {
                    swal("Oops, algo salió mal", "","error");
                })
        }else{
            swal("Seleccione una opción", " ", "info");
        }
        e.preventDefault();
    }

    onSubmitEliminar = (e) => {
        let id_alum = this.state.objRecaudaciones[0].idAlum;
        if(this.state.estado){
            fetch(CONFIG1 + 'alumnoalumnoprograma/eliminar/' + id_alum)
                .then((response) => {
                    if(response){
                        console.log(response);
                        swal("Eliminado exitosamente", "", "success");
                        this.setState({
                            estado: false,
                        });
                    } else{
                        swal("Oops, algo salió mal", "","error");
                    }
                })
                .catch((error) => {
                    swal("Oops, algo salió mal", "","error");
                })
        }else{
            swal("Registro no asignado, no se puede eliminar", " ", "info");
        }
    }

    onChangeDni = (e) => {
        this.setState({
            dni: e.target.value
        });
        e.preventDefault();
    }

    onChangeCodigo = (e) => {
        e.preventDefault();
        this.setState({
            codigo: e.target.value			
        });
    }

    onChangeApePaterno = (e) => {
        e.preventDefault();
        this.setState({
            apePat: e.target.value
        });
    }

    onChangeApeMaterno = (e) => {
        e.preventDefault();
        this.setState({
            apeMat: e.target.value
        });
    }

    onChangeNombre = (e) => {
        e.preventDefault();
        this.setState({
            nombre: e.target.value
        });
    }

    buscarDni = (dni) => {
        fetch(CONFIG1 + 'alumnoprograma/buscard/' + dni)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log("---Alumnos---");
                console.log(alumnos);
                var Array = [];
                if(alumnos.length > 0){
                    for(var i = 0; i < alumnos.length; i++){
                        var e = {
                            codAlumno: alumnos[i].codAlumno,
                            idPrograma: alumnos[i].idPrograma, 
                            value: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa,
                            label: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa
                        }
                        Array.push(e);
                    }
                    swal("Consulta realizada exitosamente!", "", "success");
                }else{
                    swal("No hay registro de ese alumno", " ", "info");
                }
                this.setState({
                    opcAlumno: Array,
                    objAlumnos: alumnos,
                    asignarRec: false,
                });
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
    }

    buscarCodigo = (codigo) => {
        console.log(codigo, "Codigo");
        fetch(CONFIG1 + 'alumnoprograma/buscarc/' + codigo)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log("---Alumnos---");
                console.log(alumnos);
                var Array = [];
                if(alumnos.length > 0){
                    for(var i = 0; i < alumnos.length; i++){
                        var e = {
                            codAlumno: alumnos[i].codAlumno,
                            idPrograma: alumnos[i].idPrograma, 
                            value: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa,
                            label: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa
                        }
                        Array.push(e);
                    }
                    swal("Consulta realizada exitosamente!", "", "success");
                }else{
                    swal("No hay registro de ese alumno", " ", "info");
                }
                this.setState({
                    opcAlumno: Array,
                    objAlumnos: alumnos,
                    asignarRec: false,
                });
                swal("Consulta realizada exitosamente!", "", "success");
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
    }

    buscarApellidoNombre = (pat, mat, nom, e) => {
        console.log(pat + ' ' + mat + ' ' + nom, "Apellidos y Nombres");

        var nombre = pat + ' ' + mat + ' ' + nom;
        var separador = ' ';
        var arregloCadenas = nombre.split(separador);
        var arreglo = [];

        for(let i = 0; i < arregloCadenas.length; i++){
            if(arregloCadenas[i] != ''){
                arreglo.push(arregloCadenas[i]);
            }
        }
        var nuevoNombre = arreglo.join('&');

        fetch(CONFIG1 + 'alumnoprograma/leer/' + nuevoNombre)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log("---Alumnos---");
                console.log(alumnos);
                var Array = [];
                if(alumnos.length > 0){
                    for(var i = 0; i < alumnos.length; i++){
                        var e = {
                            codAlumno: alumnos[i].codAlumno,
                            idPrograma: alumnos[i].idPrograma, 
                            value: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa,
                            label: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa
                        }
                        Array.push(e);
                    }
                    swal("Consulta realizada exitosamente!", "", "success");
                }else{
                    swal("No hay registro de ese alumno", " ", "info");
                }
                this.setState({
                    opcAlumno: Array,
                    objAlumnos: alumnos,
                    asignarRec: false,
                });
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
            e.preventDefault();
    }

    buscarCodigoAlumnoPrograma = (codAlum, idProg, e) => {
        console.log(codAlum + ' ' + idProg, "AlumnoPrograma:codAlum,idProg");        

        fetch(CONFIG1 + 'alumnoprograma/leer/' + codAlum + '/'+ idProg)
            .then((response) => {
                return response.json();
            })
            .then((alumnos) => {
                console.log("---Alumnos---");
                console.log(alumnos);
                var Array = [];
                if(alumnos.length > 0){
                    for(var i = 0; i < alumnos.length; i++){
                        var e = {
                            codAlumno: alumnos[i].codAlumno,
                            idPrograma: alumnos[i].idPrograma, 
                            value: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa,
                            label: alumnos[i].codAlumno + " / " + alumnos[i].apePaterno + " " + alumnos[i].apeMaterno + " " + alumnos[i].nomAlumno + " / " + alumnos[i].nom_programa
                        }
                        Array.push(e);
                    }
                    swal("Consulta realizada exitosamente!", "", "success");
                    this.setState({
                    opcAlumno: Array,
                    objAlumnos: alumnos,
                    asignarRec: true,
                    });


                }else{
                    swal("No hay registro de ese alumno", " ", "info");
                    this.setState({
                    opcAlumno: Array,
                    objAlumnos: alumnos,
                    asignarRec: false,
                });

                }
                
            })
            .catch((error) => {
                swal("Algo salío mal", "", "error");
                console.log(error);
            });
            e.preventDefault();
    }

    Validar(dni, codigo, paterno, materno, nombre){
        if(dni == '' && codigo == '' && paterno == '' && materno =='' && nombre == ''){
            swal("Llene uno de los campos para realizar la búsqueda", "", "info");
            return false;
        } else{
            return true;
        }
    } 

}
export default BuscarNuevo