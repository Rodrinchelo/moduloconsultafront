import React from 'react'
import PagoList from './Pago-list'
import TableHeader from './Table-Header'
import Alumno from './Alumno'
import AlumnoCodigo from './AlumnoCodigo'
import Importe from './Importe'
import FiltroFecha1 from './FiltroFecha1'
import ConceptoList from './Concepto-list'
import NumeroRecibo from './NumeroRecibo'
import '../App.css';
import PropTypes from 'prop-types';
import Imprimir2 from './imprimir2';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
import FormularioIntermio from './formulario-intermedio';
import ComponenteEditable from './ComponenteEditable'
import ImporteDolar from './ImporteDolar';


//ESTA ES LA VISTA PRINCIPAL POR NOMBRES Y APELLIDOS

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
}

const defaultProps = {
  initialPage: 1
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      seleccionado:false,
      datosformulario:[],
      aparecer:true,
      todos:false,
      checkbox_:[],
      filtros: [],
      pagocero: [],
      pagos: [],
      name: this.props.params.name,
      pageOfItems: [],
      estado:0,
      filtroDel:new String(""),
      filtroAl:new String(""),
      filtroNumeros: [],
      alumno: {},
      conceptos:[],
      costosP: {},
      concepto:[],
      datos:[],
      monedas:[],
      monedasvl:[]
    }
    this.clase='';
    this.alumno = '';
    this.importe = 0;
    this.FiltrarFecha = this.FiltrarFecha.bind(this);

    this.FiltrarNumeros = this.FiltrarNumeros.bind(this);
    this.filtrarConcepto = this.filtrarConcepto.bind(this);
    this.SeleccionFechaAl = this.SeleccionFechaAl.bind(this);
    this.SeleccionFechaDel = this.SeleccionFechaDel.bind(this);
    this.Filtrar = this.Filtrar.bind(this);
    this.reporte_ciclo = this.reporte_ciclo.bind(this);
    this.reporte_credito = this.reporte_credito.bind(this);
 //   this.arreglosReporte = this.arreglosReporte.bind(this);

    this.select = [];
    this.onChangePage = this.onChangePage.bind(this);
    this.seleccionar=this.seleccionar.bind(this);
    this.enviar=this.enviar.bind(this);
    this.Funcion=this.Funcion.bind(this);
    this.Regresar=this.Regresar.bind(this);

  }
componentDidUpdate(){
    if(this.state.estado!=0){
      var checks=document.getElementsByClassName("checkbox1");
      /*console.log(checks[0].id);
      console.log(this.state.estado);
      checks[0].checked=true;*/

      for(let i=0;i<checks.length;i++){
         var id=checks[i].id;
         for(let j=0;j<this.state.pagocero.length;j++){
             var codigo=this.state.pagocero[j].idRec;
             if(this.state.pagocero[j].check==true){
               if(id==codigo){
                 checks[i].checked=true;

               }
             }

        }

        }
       }
       else{
         this.setState({estado:1})
        }
 }

  colocar=()=>{

    var check=document.getElementById("observacion").checked;
    //console.log(check);
    if(check){
      this.setState({

        seleccionado:true
      })
    }
    if(!check){

      this.setState({
        seleccionado:false
      })
    }


  }

  componentWillMount() {
    this.pageOfItems = this.pagocero;
    var checkbox_selec=[];
    var nombres = this.state.name;
    var checks=document.getElementsByClassName("checkbox1");
    var checks_normales=Array.from(checks);
    checks_normales.map((checkbox)=>{
     if(checkbox.checked){
       checkbox_selec.push(checkbox.id);
     }
   });
//aqui van los conceptos
   var array=[];

   fetch(CONFIG+'/concepto/conceptos')
   .then((response)=>{
       return response.json()
   }).then((listas)=>{
       console.log("holaaaaaaaa")
       console.log(listas)

       this.setState({
         datos:listas
       })
       listas.forEach(function(element) {

         var e={value:element.concepto,label:element.concepto};
         array.push(e);
       });


   })
   .catch(error=>{
       console.error(error)
   });
   console.log("valores de las weas");
   console.log(array)

   this.setState({
     concepto:array
   })



//aqui terminan los conceptos


//aqui van las moneditas
    var array2=[];
    fetch(CONFIG+'/concepto/monedas')
    .then((response)=>{
        return response.json()
    }).then((listas)=>{
        console.log("moneditas---------")
        console.log(listas)

        this.setState({
          monedas: listas
        })
        listas.forEach(function(element) {

          var e={value:element.moneda,label:element.moneda};
          array2.push(e);
        });


    })
    .catch(error=>{
        console.error(error)
    });

    console.log("valores de las weas de monedas");
    console.log(array2)

    this.setState({
      monedasvl:array2
    })


//aqui terminan las moneditas





    var separador = " "; // un espacio en blanco
    var arregloDeSubCadenas = nombres.split(separador);
    // console.log("arreglo de subcadenas");
    // console.log(arregloDeSubCadenas);
    var arreglo = [];
    for (let i = 0; i< arregloDeSubCadenas.length; i++) {
      if(arregloDeSubCadenas[i]!==''){
         arreglo.push(arregloDeSubCadenas[i])
      }
    }
    // console.log("arreglo sin espacios en blanco");
    // console.log(arreglo);

    var nombrenuevo = arreglo.join(" & ");
    // console.log("arreglo con join")
    // console.log(nombrenuevo);
    var nombreAlumno = arreglo.join(" ");
//ANTERIOR LINK
//https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/recaudaciones/alumno/concepto/listar/


    //TRANSFORMANDO PARAMETRO
    var nombresTrans = nombres;
    var pruebita = parseInt(nombresTrans);


    if(isNaN(pruebita)){
      this.clase=Alumno;
    fetch(CONFIG+'recaudaciones/alumno/concepto/listar/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {


       /*
         console.log("pagos de la consulta de acuerdo el nombre ingresado");
        console.log(pagos); */
        var auxPagos = pagos;

      var alumnoDetalle = {
      apeNom: nombreAlumno
      }
        this.setState({
          pagocero: pagos,
          pagos: pagos,
          alumno: alumnoDetalle
        },

        );

        // console.log("hola");
      var total=this.state.pagocero;

     this.state.pagocero.map((pago)=>{
       pago.check=false
     })
      // console.log(this.state.pagocero);

      }
    )
      .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
      });
    //LINK ANTERIOR::
    //'https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/restringido/'
    fetch(CONFIG+'concepto/leer/restringido/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((conceptos) => {
        this.setState({
          conceptos: conceptos,
        }
        );
      })
      .catch(error => {

        console.error(error)
      });


    }
    else{
      this.clase=AlumnoCodigo

      fetch(CONFIG+'/beneficio/listar/' + nombrenuevo)
        .then((response)=>{
            return response.json()
        }).then((datos)=>{


          console.log("datos");
          console.log(datos);
          this.setState({datosformulario: datos})

        })
        .catch(error=>{
            console.error(error)
        });






      fetch(CONFIG+'recaudaciones/alumno/concepto/listar_cod/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {



         console.log("pagos de la consulta de acuerdo el nombre ingresado");

         console.log(pagos);
         console.log("UN IDREC");
        // console.log(pagos[1].idRec);
        var auxPagos = pagos;

      var alumnoDetalle = {
      apeNom: nombreAlumno
      }
        this.setState({
          pagocero: pagos,
          pagos: pagos,
          alumno: alumnoDetalle,
        },

        );
        // console.log("hola");
     //   this.arreglosReporte(this.state.lista_aux);
      var total=this.state.pagocero;

     this.state.pagocero.map((pago)=>{
       pago.check=false
     })
      // console.log(this.state.pagocero); colocar=()=>{

      fetch(CONFIG+'beneficio/comprobacion/' + nombrenuevo)//CONFIG+'beneficio/breporte/' + nombrenuevo+'/'+auxPagos[0].idPrograma
      .then((response)=>{
          return response.json()
      }).then((comprobacion)=>{//costos
          console.log("wea");
          console.log(comprobacion);
          if(comprobacion ==  1 ){
              //console.log("toffe");
              this.reporte_credito(comprobacion,nombrenuevo,auxPagos);
          }
          else if(comprobacion == 2) {
              //console.log("oso");
              this.reporte_ciclo(nombrenuevo,auxPagos,2);
          }
          else if(comprobacion == 3){
               if(comprobacion.tipo == "por ciclo"){
                   this.reporte_ciclo(nombrenuevo,auxPagos,0);
               }
               else{
                   this.reporte_credito(comprobacion,nombrenuevo,auxPagos);
               }
          }
/*
        console.log("costos");
        console.log(costos);
        this.setState({costosP: costos})
*/
      })
      .catch(error=>{
          console.error(error)
      });



      }
    )
      .catch(error => {
        // si hay algún error lo mostramos en consola
        console.error(error)
      });
    //LINK ANTERIOR::
    //'https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/restringido/'
    console.log("link conceptos")
    console.log(CONFIG+'concepto/leer/restringido/' + nombrenuevo)

    fetch(CONFIG+'concepto/leer/restringido_cod/' + nombrenuevo)
      .then((response) => {
        return response.json()
      })
      .then((conceptos) => {
        this.setState({
          conceptos: conceptos
        },


        );

      })
      .catch(error => {

        console.error(error)
      });



    }


  }


  Regresar=(e)=>{

    browserHistory.push('/');
    e.preventDefault();

  }

  render() {
    if (this.state.pagos.length > 0) {
      return (

        <div className="">
        {this.state.aparecer?(
        <div>
          <h3>Estado de pagos por alumno
          <ul id="nav-mobile" className=" row right  hide-on-med-and-down">
              <li ><a className="seleccionar col" onClick={this.enviarFormulario} >Revisar Beneficio<i className="material-icons right">edit</i></a></li>
              <li ><a className="seleccionar col" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>

          </ul>
          </h3>
          <hr/>


            <div className="SplitPane row">
              <div className=" col-xs-3">
                <this.clase alumno={this.state.alumno} />
                <h6 align="center" className="Alumno"><b>Nombres:</b></h6>
                <h6 align="center" className="negro">{this.state.pagos[0].apeNom}</h6>
              </div>
              <div className=" col-xs-9">
              {/* <div className="center-xs-12 margen_top">
                <h5 className="text-align center">Filtros</h5>
              </div> */}
                <div className="SplitPane row">
                  <div className="inline col-xs-3 ">
                    <div>
                    <label>Del:</label>
                    <FiltroFecha1 Fechas={this.SeleccionFechaDel} />
                    </div>
                    <div>
                    <label>Al:</label>
                    <FiltroFecha1 Fechas={this.SeleccionFechaAl} />
                    </div>
                  </div >
                  <div className="col-xs-3 ">

                    <div className="col-xs-12 text-align center">
                      <h4 className="  espacio">Conceptos</h4>
                      <div className="scroll center-xs mt-xs-2 ">
                        <form action="#"><ConceptoList listado={this.state.conceptos} /></form>
                      </div>
                    </div>
                    <div className="col-xs-12 center espacio2">
                      <button onClick={this.Filtrar}  className="waves-effect waves-light btn-small " type="submit">Filtrar<i className="large material-icons left">filter_list</i></button>

                    </div>
                  </div>
                  <div className="centrar col-xs-4">
                    <h4 className=" centrar">Recibo</h4>
                    <div>
                      <NumeroRecibo Numeros={this.FiltrarNumeros} />
                    </div>
                  </div>
                </div>
              </div>

          </div>
          {/* <div className="SplitPane row center-xs">
               <button onClick={this.Filtrar}  className="waves-effect waves-light btn-large newbotonFiltrar" type="submit">Filtrar<i className="large material-icons left">filter_list</i></button>
          </div> */}
          <hr />

          <div className="margen2">
            <button onClick={this.seleccionar} className="waves-effect waves-light btn-small newbotonSeleccionar start">
            Seleccionar todo<i className="large material-icons left">check</i>
            </button>

            </div>

          <div className="row">
            <div className="  col-md-12">
              <table className="table-small">
                <TableHeader   />
                <PagoList funcion={this.Funcion} listado={this.state.pageOfItems}  conceptos={this.state.concepto} datos={this.state.datos} datosMonedas={this.state.monedas}  monedas={this.state.monedasvl}/>
              </table>
              <div className="margen_top"> <Paginacion items={this.state.pagocero} onChangePage={this.onChangePage}/></div>
              <div className="row">
                <div className="col-md-7">
                  <Importe importe={this.CalcularImporte()} />
                  {/* <ImporteDolar importe={this.CalcularImporteDolar()} /> */}
                </div>
                <div className="col-md-7">
                
                  <ImporteDolar importe={this.CalcularImporteDolar()} />
                </div>
                <div className="col-md-3">
                {/* <form action="#">
                    <label className="row  ">

                      <input
                        onClick="{this.colocar}"
                        className="align-self-center"
                        id="xd"
                        type="checkbox" />
                        <span> observacion</span>





                        </label>

                  </form> */}

                  <div>
                  {/* <button  onClick={this.enviar2} listado={this.state.pagocero} className="waves-effect waves-light btn-large botonazul2">Editar<i className="large material-icons left">border_color</i></button>     */}

                  </div>
                </div>
                <div className="col-md-8 "></div>
                <div className="col-md-1 ">
                <form action="#">
                    <label className="row tfuente ">

                      <input
                        onClick={this.colocar}
                        id="observacion"
                        className="obs"

                        type="checkbox" />
                        <span className="tfuente">observacion </span>





                        </label>

                  </form>

                </div>
                <div className="col-md-3">

                  <Imprimir2 onClick={this.enviar}  seleccionado={this.state.seleccionado} listado={this.state.pagocero} conceptos={this.state.conceptos} alumno={this.state.alumno} costos={this.state.costosP} datos={this.state.datosformulario}/>
                </div>



              </div>
            </div>
          </div>
        </div>
          ):(

            <div>
              <div className="">
                    <h3>
                    Lista de Beneficios
                    <ul id="nav-mobile" className="row right hide-on-med-and-down">
                    <li ><a className="seleccionar col" onClick={this.enviarFormulario} >Regresar<i className="material-icons right">reply</i></a></li>

                    </ul>
                    </h3>
                </div>

              <FormularioIntermio codigo={this.state.name} idprograma={this.state.pagos[0].idPrograma} />
            </div>


          // <div>
          //     <h3>Editable
          // <ul id="nav-mobile" className="right  hide-on-med-and-down"></ul>
          // </h3>
          // <hr/>

          // <div className="SplitPane row center-xs">
          //   <div className="  center-xs-12">
          //     <table className=" total table ">
          //       <ComponenteEditable  listado={this.state.pagocero} conceptos={this.state.conceptos} alumno={this.state.alumno}/>
          //     </table>
          //       <div className = "row">
          //       <div className="col-md-6">
          //             <button  onClick={this.enviar2}  className="waves-effect waves-light btn-large botonazul2" type="submit">Regresar<i className="large material-icons left">arrow_back</i></button>
          //             </div>
          //         </div>
          //       </div>
          //     </div>
          // </div>
          )

        }

           <footer>
            <div className="row center-xs centrar color">
            <img src="https://png.icons8.com/ios/1600/hachiko.png" height="25"/>
            UPG-FISI © 2018
            </div>
            </footer>

        </div>
      )
    } else {
      return <p className="text-center">Cargando estado de pagos de alumno</p>
    }
  }


//obtenemos la fecha del componente FILTROFECHA1
Filtrar=(e)=>{
  var concep = [];
  concep = this.SeleccionConceptos();
  var filtrodel = this.state.filtroDel;

  var filtroal = this.state.filtroAl;

  if(filtrodel.length == 0){
   // console.log("no hay del ")
    filtrodel = "0000-00-00";
   // console.log(filtrodel)
  }
  if(filtroal.length == 0){
    //console.log("no hay al");
    filtroal = "9999-12-12";
    //console.log(filtroal)
  }
  let nombreFiltro = this.state.name;

  var separadorFiltro = " "; // un espacio en blanco
  var arregloDeSubCadenasFiltro = nombreFiltro.split(separadorFiltro);
  /*
  console.log("arreglo de subcadenas");
  console.log(arregloDeSubCadenas);*/
  var arregloFiltro = [];
  for (let i = 0; i< arregloDeSubCadenasFiltro.length; i++) {
    if(arregloDeSubCadenasFiltro[i]!==''){
       arregloFiltro.push(arregloDeSubCadenasFiltro[i])
    }
  }
  /*
  console.log("arreglo sin espacios en blanco");
  console.log(arreglo);
*/
  var nombrenuevoFiltro = arregloFiltro.join(" & ");
  /* console.log("lista de numeros pasados");
   console.log(this.state.filtroNumeros);
   console.log("lista de CONCEPTOS PASADOSs");
   console.log(concep); */
  //ANTERIOR LINK:
  //http://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/recaudaciones/alumno/concepto/listar/filtrar
  console.log("link filtros")
  console.log(CONFIG+'recaudaciones/alumno/concepto/listar/filtrar')
  var json={
    "nom_ape": nombrenuevoFiltro,
    "fechaInicial": filtrodel,
    "fechaFinal": filtroal,
    "conceptos": concep,
    "recibos":this.state.filtroNumeros
  }
  console.log("json enviado")
  console.log(json);
  fetch(CONFIG+'recaudaciones/alumno/concepto/listar/filtrar', //CONFIG+'recaudaciones/alumno/concepto/listar/filtrar'
  {
  headers: {
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify(
    {
      "nom_ape": nombrenuevoFiltro,
      "fechaInicial": filtrodel,
      "fechaFinal": filtroal,
      "conceptos": concep,
      "recibos":this.state.filtroNumeros
    }

  )
}
).then((response) => {
return response.json()
})
.then((pagos) => {
if(pagos.length > 0){

this.setState({
  pagocero: pagos
});
swal("Filtro realizado exitosamente!","","success");
}else{
  console.log(pagos);
  swal("No se encontraron registros","","info");
}
/*
console.log("Pagos filtrados que recibo")
console.log(pagos);*/
})
.catch(error => {
// si hay algún error lo mostramos en consola
swal("Oops, Algo salió mal!!", "","error")
console.error(error)
});



}





  SeleccionFechaDel(Fecha) {

    var fecha1 = new String(Fecha);
    this.setState({filtroDel: fecha1});

  }
  SeleccionFechaAl(Fecha) {

    var fecha1 = new String(Fecha);
    this.setState({filtroAl: fecha1});

  }
  SeleccionConceptos(){

    var idconcepto = [];
    var checkbox_seleccionados = [];
    var check = [];
    var seleccionados = 0;
    var arrayfiltrado = [];
    check = document.getElementsByClassName("clase_concepto");


    for (var item of check) {
      if (item.checked) {
        checkbox_seleccionados.push(item.name);
      }
    }

   // console.log(checkbox_seleccionados);

    return checkbox_seleccionados;

  }
  Funcion(holas){
    for(let j=0;j<this.state.pagocero.length;j++){
      if(holas==this.state.pagocero[j].idRec){
        if(this.state.pagocero[j].check==true){
          this.state.pagocero[j].check=false;
        }else{
          this.state.pagocero[j].check=true;
        }
      }
    }
  }
seleccionar(){
  //console.log("gg agg");
  var checks=document.getElementsByClassName("checkbox1");
  for (let i=0;i<checks.length;i++) {
            if(this.state.todos==false){
              checks[i].checked=true;
            }
            else{
              checks[i].checked=false;
            }
}
 if(this.state.todos==false){
          this.setState({
            todos:true
          })
          this.state.pagocero.map((pago)=>{
            pago.check=true;
          })
        }else{
          this.setState({
            todos:false
          })
          this.state.pagocero.map((pago)=>{
            pago.check=false;
          })
        }
}


enviarFormulario=(e)=>{
  if(this.state.aparecer){
    this.setState({
      aparecer:false,
    });

  }

  else{
    this.setState({
      aparecer:true,
    });
    // window.location.reload();
  }

}
reporte_credito(idx,nombrenuevo,auxPagos){
     fetch(CONFIG+'beneficio/breporte_cr/' + nombrenuevo+'/'+auxPagos[0].idPrograma+"/"+idx)
     .then((response)=>{
         return response.json();
     }).then((costos)=>{
         console.log("costos");
         console.log(costos);
         this.setState({costosP: costos})
     }) .catch(error=>{
          console.error(error)
      });
 }

 reporte_ciclo(nombrenuevo,auxPagos,idx){
      fetch(CONFIG+'beneficio/breporte_ci/'+ nombrenuevo+'/'+auxPagos[0].idPrograma+"/"+idx)
      .then((response)=>{
          return response.json();
      }).then((costos)=>{
          console.log("costos");
          console.log(costos);
          this.setState({costosP: costos})
      }) .catch(error=>{
           console.error(error)
       });
  }

enviar(){
   console.log("lo que envio:");
  console.log(this.state.pagocero);
}

enviar2=(e)=>{
  console.log("lo que envio:");
  console.log(this.state.pagocero);
  let flac=false;
  for(let i=0;i<this.state.pagocero.length;i++){

    if(this.state.pagocero[i].check==true){
      flac=true;break
    }

  }


  if(flac){

  if(this.state.aparecer){
    this.setState({
      aparecer:false,
    });

  }
  else{
    this.setState({
      aparecer:true,
    });
    window.location.reload();
  }
}
else{
  swal("Seleccione al menos un estado de pago","","info");
}

}

CalcularImporteDolar() {

  let pagos = this.state.pagocero;
  let importe = 0;
  console.log("ESTOS SON LOS PAGOS BIEN CHIDORIS");
  console.log(pagos)
  for (var indice in pagos) {
    if(pagos[indice].moneda=="113")
        importe = importe + pagos[indice].importe;
  }
  return importe;
}

CalcularImporte() {

    let pagos = this.state.pagocero;
    let importe = 0;
    console.log("ESTOS SON LOS PAGOS BIEN CHIDORIS");
    console.log(pagos)
    for (var indice in pagos) {
      if(pagos[indice].moneda=="108")
      importe = importe + pagos[indice].importe;
    }
    return importe;
}

FiltrarFecha(Fechas) {
    var filtrado = [];
    var del = new String(Fechas.del);
    var al = new String(Fechas.al);
    this.setState({
      filtroDel: del,
      filtroAL : al
    })

  }

  FiltrarNumeros = (listaNumeros) => {
    this.setState({
      filtroNumeros: listaNumeros
     })

  }


  onChangePage(pageOfItems) {

   var total=[];
   var checkbox_selec=[];
   var checks=document.getElementsByClassName("checkbox1");
   var checks_normales=Array.from(checks);
   checks_normales.map((checkbox)=>{
     if(checkbox.checked){
       checkbox_selec.push(checkbox.id);

     }
   });

   for(let i=0;i<checkbox_selec.length;i++){
    var id=checkbox_selec[i];
    for(let j=0;j<this.state.pagocero.length;j++){
      if(this.state.pagocero[j].idRec==id){
          total.push(this.state.pagocero[j]);
      }
    }
 }
    // update state with new page of items
    this.setState({
      checkbox_:total,
      pageOfItems: pageOfItems });

     console.log(pageOfItems)
  }


  filtrarConcepto = (filtrado) => {
    //console.log(filtrado);
    var idconcepto = [];
    var checkbox_seleccionados = [];
    var check = [];
    var seleccionados = 0;
    var arrayfiltrado = [];
    check = document.getElementsByClassName("clase_concepto");


    for (var item of check) {
      if (item.checked) {
        checkbox_seleccionados.push(item.name);
      }
    }

    for (let i = 0; i < this.conceptos.length; i++) {
      idconcepto.push(this.conceptos[i].idConcepto);
    }
   // console.log(checkbox_seleccionados);
    //var arrayflitrado=this.state.pagos.filter(pago => pago.concepto.idConcepto===5);
    if (checkbox_seleccionados.length == 0) {

      arrayfiltrado = filtrado;
    }
    else {
      for (let i = 0; i < checkbox_seleccionados.length; i++) {
        var conceptoactual = checkbox_seleccionados[i];
        for (let j = 0; j < filtrado.length; j++) {
          var concepto_seleccionado = filtrado[j].concepto.idConcepto;
          if (concepto_seleccionado == conceptoactual) {
            arrayfiltrado.push(filtrado[j]);
          }

        }
      }

      if (arrayfiltrado.length == 0) {
        arrayfiltrado = filtrado;
      }
     // console.log(arrayfiltrado);



    }
    var numero_codigos = this.state.filtros;
    //console.log(numero_codigos);
    var filtrofinal = [];
    var listaNumeros_seleccionados = numero_codigos;
    if (listaNumeros_seleccionados.length == 0) {

      this.setState({
        pagocero: arrayfiltrado
      })


    }
    else {
      if (arrayfiltrado.length == 0) {

        this.setState({
          pagocero: arrayfiltrado
        })
      }
      else {

        for (let i = 0; i < listaNumeros_seleccionados.length; i++) {
          var numeroactual = listaNumeros_seleccionados[i];
          for (let j = 0; j < arrayfiltrado.length; j++) {
            var numero_seleccionado = arrayfiltrado[j].numero;
            if (numero_seleccionado == numeroactual) {
              filtrofinal.push(arrayfiltrado[j]);
            }

          }
        }

        if (filtrofinal.length == 0) {
          alert("No hay registros.Se volverán a cargar todos")
          this.setState({
            pagocero: this.state.pagos
          })
        } else {
          this.setState({
            pagocero: filtrofinal
          })
        }
/*

        console.log(arrayfiltrado);
        console.log(this.state.pagocero);*/

      }
    }



  }
}


class Paginacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {

    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }
  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    //var pages = _.range(startPage, endPage + 1);
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    return (
      <ul className="pagination row center-xs">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}><i className="material-icons">chevron_left</i></a>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index + 28} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}><i className="material-icons">chevron_right</i></a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}
Paginacion.propTypes = propTypes;
Paginacion.defaultProps = defaultProps;

export default App;
