import React from 'react'
import '../App.css'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
import Select from 'react-select';
import {browserHistory} from 'react-router-3';

class formulario extends React.Component{
    constructor(props){
        super(props)
        this.state={
                criterio:[],
                listacriterio:[],
                lista:[],
                codigo2:'',
                id:this.props.params.codigo,
                listas:[],
                listacondicion:[],
                idprograma:'',
                tipo:[],
                condicion:[],
                datosiniciales:[],
                OpcionBeneficio:null,
                OpcionCondicion:null,
                OpcionCriterio:null,
                codigo:this.props.codigo,
                lf:false,
                valorTipo:'',
                valorCondicion:'',
                valorCriterio:'',
                maximo:'',
                abp:'',
        }

        this.guardar=this.guardar.bind(this)
        this.handleChangeBeneficio=this.handleChangeBeneficio.bind(this)
        this.handleChangeCondicion=this.handleChangeCondicion.bind(this)
        this.handleChangeCriterio=this.handleChangeCriterio.bind(this)
    }

    componentWillMount(){



        fetch(CONFIG+'/beneficio/tipo')
        .then((response)=>{
            return response.json()
        }).then((listas)=>{
            console.log("listas");
            console.log(listas);
            var array=[];

            for(var i=0;i<listas.length;i++){
                var e={value:listas[i].tipo,label:listas[i].tipo}
                array.push(e);

            }

            this.setState({
                tipo:array,
                listas:listas
            });
        })
        .catch(error=>{
            console.error(error)
        });

        fetch(CONFIG+'/beneficio/condicion')
        .then((response)=>{
            return response.json()
        }).then((condicion)=>{
            console.log("condicion");
            console.log(condicion);
            var array2=[];

            for(var i=0;i<condicion.length;i++){
                var e={value:condicion[i].condicion,label:condicion[i].condicion}
                array2.push(e);

            }

            this.setState({
                condicion:array2,
                listacondicion:condicion
            });
        })
        .catch(error=>{
            console.error(error)
        });
        fetch(CONFIG+'/beneficio/tipo_aplica')
        .then((response)=>{
            return response.json()
        }).then((listas)=>{
            console.log("listas");
            console.log(listas);
            var array=[];

            for(var i=0;i<listas.length;i++){
                var e={value:listas[i].descripcion,label:listas[i].descripcion}
                array.push(e);

            }

            this.setState({
                criterio:array,
                listacriterio:listas
            });
        })
        .catch(error=>{
            console.error(error)
        });






    }
    componentDidMount(){
        var array=this.state.id.split("&",2)
        var  codigo=parseInt(array[0])
        var lista=parseInt(array[1])
        this.setState({
            lista:lista,
            codigo2:codigo
        })

        console.log(this.state.lista)
        fetch(CONFIG+'/beneficio/listar/' + codigo)

        .then((response)=>{
            return response.json()
        }).then((datos)=>{

                //console.log("xdddid222"+datos[lista].id_abp)                
                document.getElementById("resolucion").value=datos[lista].resolucion;
                document.getElementById("autorizacion").value=datos[lista].autorizacion;
                document.getElementById("observacion").value=datos[lista].observacion;
                document.getElementById("beneficio").value=datos[lista].benef_otrogado;
                document.getElementById("importemaximo").value=datos[lista].benef_max;
                document.getElementById("fecha").value=datos[lista].fecha;
                this.setState({
                    OpcionBeneficio:{value:datos[lista].tipo,label:datos[lista].tipo},
                    OpcionCondicion:{value:datos[lista].condicion,label:datos[lista].condicion},
                    OpcionCriterio:{value:datos[lista].criterio,label:datos[lista].criterio},
                    valorTipo:this.leertipo(datos[lista].tipo),
                    valorCondicion:this.leercondicion(datos[lista].condicion),
                    valorCriterio:this.leercriterio(datos[lista].criterio),
                    maximo:datos[lista].benef_max.substring(0,2),
                    abp:datos[lista].id_abp,
                    idprograma:datos[lista].id_programa
                })
                console.log("xdddid"+datos[lista].id_abp)








        })
        .catch(error=>{
            console.error(error)
        });




    }


    handleChangeBeneficio =(Opcion)=>{
        if(Opcion!=null){

        console.log("Opcion elegida : ",Opcion);
        for(let i=0;i<this.state.listas.length;i++){
            if(this.state.listas[i].tipo==Opcion.value){
                document.getElementById("resolucion").value=this.state.listas[i].resolucion;
                document.getElementById("importemaximo").value=this.state.listas[i].beneficio_max;
            }
        }
        let numero=document.getElementById("importemaximo").value;
        this.setState({OpcionBeneficio:Opcion,
            valorTipo:this.leertipo(Opcion.value),
            maximo:numero.substring(0,2)});


        console.log("xd")
        console.log(numero.substring(0,2))

        }else swal("Escoja un beneficio","","warning")
    }
    handleChangeCondicion=(Opcion)=>{
        if(Opcion!=null){
        this.setState({OpcionCondicion:Opcion,
                        valorCondicion:this.leercondicion(Opcion.value)});
        console.log("Opcion elegidaCondicion : ",Opcion);
         }else swal("Escoja una condicion","","warning")
    }
    handleChangeCriterio=(Opcion)=>{
        if(Opcion!=null){
            this.setState({OpcionCriterio:Opcion,
                            valorCriterio:this.leercriterio(Opcion.value)});
            console.log("Opcion elegidaCondicion : ",Opcion);
             }else swal("Escoja una condicion","","warning")
    }

    habilitar(){
        document.getElementById("beneficio").disabled=false;
        document.getElementById("autorizacion").disabled=false;
        document.getElementById("fecha").disabled=false;
        document.getElementById("observacion").disabled=false;

    }

    leertipo(valor){
        let id_tipo="";
        for(let i=0; i<this.state.listas.length;i++){
            if(valor==this.state.listas[i].tipo){
                 id_tipo=i;
            }
        }
        return id_tipo + 1;
    }
    leercondicion(valor){
        let id_tcondicion="";
        for(let i=0; i<this.state.listacondicion.length;i++){
                if(valor==this.state.listacondicion[i].condicion){
                  id_tcondicion=i;
                }
         }
         return id_tcondicion + 1;
    }

    leercriterio(valor){
        let id_tcriterio="";
        for(let i=0; i<this.state.listacriterio.length;i++){
                if(valor==this.state.listacriterio[i].descripcion){
                  id_tcriterio=i;
                }
         }
         return id_tcriterio + 1;
    }


    guardar(){


        var Observacion=document.getElementById("observacion").value;
        var valor=document.getElementById("beneficio").value;
        if(parseInt(valor)>parseInt(this.state.maximo)){swal("ta weon","","warning")}


        var Autorizacion=document.getElementById("autorizacion").value;
        var fecha=document.getElementById("fecha").value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1');

        console.log("xdddd  "+this.state.lista)
        console.log("beneficio_otorgado : "+valor)
        console.log( "id_bcondicion: "+ this.state.valorCondicion)
        console.log( "autorizacion"+ Autorizacion)
        console.log("fecha "+fecha)
        console.log("observacion "+Observacion)
        console.log("id_beneficio "+this.state.valorTipo)
        console.log("cod_alumno "+this.state.codigo2)
        console.log("idprograma : "+this.state.idprograma)
        console.log("id_abp: "+this.state.abp)
        console.log("id_bcc: "+this.state.valorCriterio)
        if(valor!="" && fecha!=""&& Autorizacion!=""&& this.state.valorCondicion!=""
       &&this.state.valorTipo!=""){
         console.log("la lista fake de sator "+this.state.lista)
        if(parseInt(valor)<=parseInt(this.state.maximo)){

            if(this.state.abp >= 0){
               console.log("entro we  crear"+this.state.lista)
               fetch(CONFIG+"beneficio/insertar", // "http://localhost:8080/"
                {
                headers: {
                'Content-Type': 'application/json'
                },
                method: "POST",
                    body: JSON.stringify(
                    {
                        "beneficio_otorgado":valor,
                        "id_bcondicion": this.state.valorCondicion,
                        "autorizacion":Autorizacion,
                        "fecha":fecha,
                        "observacion":Observacion,
                        "id_beneficio":this.state.valorTipo,
                        "cod_alumno":this.state.codigo2,
                        //"id_programa":this.state.idprograma,
                        "id_abp":this.state.abp,
                        "id_bcc":this.state.valorCriterio

                    }

                )
                })

                .then((resp) => {
                    console.log(resp)

                    if(resp){
                        swal("guardado exitoso...!","","success")
                        console.log("funciona beneficio");

                    }
                    else{
                        swal("Oops, el beneficio no fue editado", "","error");
                    }


                })
                .catch(error => {

                swal("Oops, Algo salió mal!!", "","error")
                console.error(error)
                });
            } else{
                console.log("entro we update "+this.state.lista)
                fetch(CONFIG+"beneficio/insertar", // "http://localhost:8080/"
                {
                headers: {
                'Content-Type': 'application/json'
                },
                method: "POST",
                    body: JSON.stringify(
                    {
                        "beneficio_otorgado":valor,
                        "id_bcondicion": this.state.valorCondicion,
                        "autorizacion":Autorizacion,
                        "fecha":fecha,
                        "observacion":Observacion,
                        "id_beneficio":this.state.valorTipo,
                        "cod_alumno":this.state.codigo2,
                    //    "id_programa":4,
                        "id_bcc":this.state.valorCriterio
                    }

                )
                })

                .then((resp) => {
                    console.log("need a little: "+resp)

                    if(resp){
                        swal("guardado exitoso...!","","success")
                        console.log("funciona beneficio");

                    }
                    else{
                        swal("Oops, El beneficio no fue ingresado!!", "","error");
                    }


                })
                .catch(error => {

                swal("Oops, Algo salió mal!!", "","error")
                console.error(error)
                });

    }
    } else {swal("El valor sobrepasa el "+this.state.maximo+" %","","warning")}
    }else{ swal("Tiene que completar todos los campos", "","warning")}
    }
    Regresar=(e)=>{
        browserHistory.push('/'+this.state.codigo2);
        e.preventDefault();
    }

    render(){

        return(
            <div>
                <div >
                    <h3>Formulario
                    <ul id="nav-mobile" className="row right hide-on-med-and-down">
                        <li><a className="col seleccionar" onClick={this.Regresar}>Regresar<i className="material-icons right">reply</i></a></li>
                    </ul>
                    </h3>
                </div>


                <div className="container" >



                        <div className="row ">
                            <div className="col-md-12"><h4 >Datos del beneficio</h4></div>
                        </div>


                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Beneficio:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="beneficio" placeholder="Beneficios" disabled/></div> */}
                            <div className="col-md-9 ">
                            <Select
                                value={this.state.OpcionBeneficio}
                                options={this.state.tipo}
                                onChange={this.handleChangeBeneficio}

                                />
                            </div>
                            <div className="col-md-3">
                            <h6>Importe maximo: </h6>
                            </div>
                            <div className="col-md-2">
                            <input className="form-control estilo" type="text" id="importemaximo" placeholder="" disabled/>
                            </div>
                            <div className="col-md-3">
                            <h6>Valor otorgado: </h6>
                            </div>

                            <div className="col-md-2 ">
                            <input className="form-control estilo" type="number"  id="beneficio" placeholder="" max={this.state.maximo} />
                            </div>
                            <div className="col-md-1">
                            <h6>%</h6>
                            </div>


                        </div>
                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Criterio:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                            <div className="col-md-9">
                                    <Select

                                        value={this.state.OpcionCriterio}
                                        options={this.state.criterio}
                                        onChange={this.handleChangeCriterio}




                                    />


                            </div>
                        </div>
                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Condicion:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                            <div className="col-md-9">
                                    <Select

                                        className="selectCondicion"
                                        value={this.state.OpcionCondicion}
                                        options={this.state.condicion}
                                        onChange={this.handleChangeCondicion}




                                    />


                            </div>
                        </div>
                        <div className="row sombra">

                            <div className="col-md-3"><h6 >Resolucion:</h6></div>
                            <div className="col-md-9"><input className="estilo" type="text" id="resolucion" disabled/></div>
                            {/* <div className="col-md-9">
                            <Select/>
                            </div> */}

                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Autorizacion:</h6></div>
                            <div className="col-md-9"><input className="estilo" type="text" id="autorizacion" /></div>
                        </div>
                        <div className="row sombra2">
                            {/* <div className="col-md-2"><h4 >Autorizacion:</h4></div> */}
                            <div className="col-md-3"><h6 >Observacion</h6></div>
                            <div className="col-md-9">

                            <textarea class="form-control " id="observacion"  rows="3"></textarea>
                            </div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Fecha:</h6></div>
                            <div className="col-md-9"><input  className="estilo" type="date" id="fecha" /></div>
                        </div>



                        <div className="row">

                                {/* <div className=" col-md-6">
                                    <button  onClick={this.habilitar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Editar<i className=" material-icons left">check</i></button>
                                </div> */}
                                <div className=" col-md-6">
                                    <button  onClick={this.guardar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Guardar<i className=" material-icons left">save</i></button>
                                </div>


                        </div>




                </div>


            </div>
        )
    }

}

export default formulario
