import React from 'react'
import PagoListNuevo from './Pago-list-nuevo'
import Importe from './Importe'
import FiltroFecha1 from './FiltroFecha1'
import ConceptoList from './Concepto-list'
import NumeroRecibo from './NumeroRecibo'
import '../App2.css';
import PropTypes from 'prop-types';

import Buscar from './Buscar';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert'


class AppNueva extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      conceptos : [],
      todos:false,
      nombre: '',
      apellido: '',
      checkbox_:[],
      filtros: [],
      pagocero: [],
      pagoOpciones:[],
      pagos: [],
      name: this.props.params.name,
      pageOfItems: [],
      estado:0,
      filtroDel:new String(""),
      filtroAl:new String(""),
      filtroNumeros: [],
      alumno: ''
    }
    this.conceptos = []
    this.alumno = ''
    this.importe = 0;
    this.BuscarNombre = this.BuscarNombre.bind(this);
    this.FiltrarNumeros = this.FiltrarNumeros.bind(this);
    this.SeleccionFechaDel = this.SeleccionFechaDel.bind(this);
    this.SeleccionFechaAl = this.SeleccionFechaAl.bind(this);
    this.Filtrar = this.Filtrar.bind(this);
    this.SeleccionConceptos = this.SeleccionConceptos.bind(this);
    this.Regresar = this.Regresar.bind(this);
    this.select = [];
    this.enviar=this.enviar.bind(this);
 
    this.Asignar = this.Asignar.bind(this);
    
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
Regresar=(e)=>{
    
    browserHistory.push('/');
    e.preventDefault();
    
}

  render() {
    
      return (
        <div className="">
          <h3>Estado de pagos  <ul id="nav-mobile" class="right  hide-on-med-and-down">
              <li ><a className="seleccionar" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
          </ul></h3>
         
          <hr />
          <div className="SplitPane row">
            <div className=" col-xs-4 margen_top">
              <div className="margen">
                <Buscar Busqueda={this.BuscarNombre} />
              </div>
            </div>

            <div className=" col-xs-8 ">
              <div className="center-xs-12 margen_top">
              <h5>Filtros</h5>
              </div>
              <div className="SplitPane row">
                <div className="inline col-xs-3">
                  <div>
                    <label>Del:</label>
                    <FiltroFecha1 Fechas={this.SeleccionFechaDel} />
                  </div>
                  <div>
                    <label>Al:</label>
                    <FiltroFecha1 Fechas={this.SeleccionFechaAl} />
                  </div>
                </div >
                <div className="row center-xs-4 block">
                  <h4 className="centrar margen_top espacio">Conceptos</h4>
                  <div className="scroll center-xs ">
                    <form action="#"><ConceptoList listado={this.state.conceptos} /></form>
                  </div>
                </div>
                <div className="centrar col-xs-5">
                  <h4 className="centrar margen_top">Recibo</h4>
                    <NumeroRecibo Numeros={this.FiltrarNumeros} />
                </div>
                <div className="SplitPane row">
                <div className="row center-xs-12">
                <button onClick={this.Filtrar}  className="waves-effect waves-light btn-large botonazul2 right" type="submit">Filtrar<i className="large material-icons left">check</i></button>
                </div>
              </div>
              </div>
              
            </div>   
          </div> 
          <hr />
          <div className="row center-xs centrar">
            <div className="center-xs-12 margin_top">
                <PagoListNuevo  funcion={this.Funcion} listado={this.state.pagocero}/>
            </div>
          </div>
          <div>
            <div>
              <div className="SplitPane row margin_top">
                <div className="col-xs-7">
                </div>
                <div className="col-xs-5">
                  <Importe importe={this.CalcularImporte()} />
                </div>
              </div>
              <div className="SplitPane row center-xs">  
                <button  onClick={this.Asignar} className="waves-effect waves-light btn-large botonazul2 center"type="submit">Actualizar<i className="large material-icons left">check</i></button>
              </div>
           
            </div>
          </div>
          <footer>
            <div className="row center-xs centrar color">
            Realizado por Hardcode © 2018 
            </div>
            </footer>
        </div>
      )
  }
Asignar=(e)=>{
    var check = [];
    var check2 = [];
    var opcionesSeleccionadas = [];
    var listadoAlumnoPrograma = [];
    

    check = document.getElementsByClassName("opcion");

    console.log("seleccionados codigos");
    for (var item of check) {
     opcionesSeleccionadas.push(item.id);
     console.log("item recibido");
     console.log(item.id);
    }

    var listado2 = this.state.pagocero;
    console.log("listado 2");
    console.log(listado2);
    
    for (let i = 0; i < listado2.length; i++) {
        var index = opcionesSeleccionadas[i];
        console.log("indice")
        console.log(index);
        if(!index){
            listadoAlumnoPrograma.push(null);
        }else{
            var ap = listado2[i].alumnoPrograma[index];
            listadoAlumnoPrograma.push(ap);
            console.log("ap");
            console.log(ap);
        }
    
    }
    console.log("listado alumno programa obtenidos del filtro");
    console.log(listadoAlumnoPrograma);
    
    var PagosActualizados = this.state.pagos;
    var PagosGuardar = [];
    for (let i = 0; i < PagosActualizados.length; i++) {
        var ap = listadoAlumnoPrograma[i];
        if(ap != null){
          PagosActualizados[i].idPrograma = ap.idPrograma;
          PagosActualizados[i].codAlumno = ap.codAlumno;
          PagosGuardar.push(PagosActualizados[i]);
        }
    }
    console.log("Pagos actualizados para enviar a actualizar");
    console.log(PagosActualizados);
    console.log("Pagos a enviar para actualizar");
    console.log(PagosGuardar);

    //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client

    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/update/recaudaciones/alumno/concepto/facultad/list/actualizar',
    {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",//cambiar a metodo PUT de actualizacion
    body: JSON.stringify(
       PagosGuardar
    )
})
.then((response) => {
  return response.json()
  })
.then((data) => {
  console.log("respuesta recibida");
  console.log(data);
  swal("Actualizado exitosamente!","","success");

  })
  .catch(error => {
      swal("Error al actualizar!", "", "error");
      console.error(error)
});    //
   //---------------------

}

Filtrar=(e)=>{
    var concep = [];
    concep = this.SeleccionConceptos();
    console.log("conceptos con check recibidos")
    console.log(concep);
    console.log(concep.length);
    console.log("filtro del recibido")
    console.log(this.state.filtroDel);
    console.log("filtro al recibido")
    console.log(this.state.filtroAl);
    console.log("listado de numeros recibidos")
    console.log(this.state.filtroNumeros);
    console.log(this.state.filtroNumeros.length);

    var filtrodel = this.state.filtroDel;

    var filtroal = this.state.filtroAl;

    if(filtrodel.length == 0){
      console.log("no hay del ")
      filtrodel = "0000-00-00";
      console.log(filtrodel)
    }
    if(filtroal.length == 0){
      console.log("no hay al");
      filtroal = "9999-12-12";
      console.log(filtroal)
    }
    var listado1 =[];
    //antiguo link 
    //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/updaterecaudaciones/listar/
    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/update/recaudaciones/alumno/concepto/facultad/listar/filtrar',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(
        {
          "nombres":this.state.nombre,
          "apellidos":this.state.apellido,
          "fechaInicial": filtrodel,
          "fechaFinal": filtroal,
          "conceptos":concep,
          "recibos":this.state.filtroNumeros
        }
      )
    })
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {
      console.log("Listado de pagos  recibidos luego de filtrar");
      console.log(pagos);

      var listado1 =[];
      var opciones  = [];
      for (let i = 0; i< pagos.length; i++) {
        var listadoRec = { 
          idRec : 0,
          idAlum:0,
          apeNom:'',
          concepto:'',
          numero:'',
          nombre:'',
          moneda:'',
          importe:0,
          fecha:'',
          idPrograma:0,
          codAlumno:'',
          codigos:[],
          
        }
        listadoRec.idRec = pagos[i].idRec;
        listadoRec.idAlum = pagos[i].idAlum;
        listadoRec.apeNom= pagos[i].apeNom;
        listadoRec.concepto= pagos[i].concepto;
        listadoRec.numero = pagos[i].numero;
        listadoRec.nombre= pagos[i].nombre;
        listadoRec.moneda = pagos[i].moneda;
        listadoRec.importe = pagos[i].importe;
        listadoRec.fecha= pagos[i].fecha;
        listadoRec.idPrograma = pagos[i].idPrograma;
        listadoRec.idPrograma =  pagos[i].codAlumno;
        listado1.push(listadoRec);
      }
     
  console.log("listado1 en la tabla");
  console.log(listado1);
  
  for (let i = 0; i< listado1.length; i++) {
    var nombrefiltro = listado1[i].apeNom;
    var separador1 = " "; // un espacio en blanco
    var arregloDeSubCadenas1 = nombrefiltro.split(separador1);
    //console.log("arreglo de subcadenas para alumno programa");
    var nombrenuevo1 = arregloDeSubCadenas1.join(" & ");
    //console.log(nombrenuevo1);
    //ANTERIOR LINK:https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/alumnoprograma/leer/
    
    
    fetch('https://modulo-alumno-jdbc.herokuapp.com/alumno/alumnoprograma/programa/leer/restringido/'+nombrenuevo1)
    .then((response) => {
    return response.json()
    })
    .then((programa) => {
    var alumnoprograma = programa;
    //listado1[i].alumnoPrograma = 
    var listadoOpcionesCodigos = [];
    var listadoOpcionesProgramas = [];
    /*console.log("ALUMNO PROGRAM RECIBIDO");
    console.log(alumnoprograma);
    console.log("longitud del array alumno programa recibido")
    console.log(alumnoprograma.length);*/

    listado1[i].alumnoPrograma = programa;
     
     for(let j = 0; j< alumnoprograma.length; j++){       

        var value1 = j;
        var label1 = alumnoprograma[j].codAlumno+"-"+alumnoprograma[j].apeNom+"/"+alumnoprograma[j].siglaPrograma;
        var option1 = {value: value1, label:label1};
        listado1[i].codigos.push(option1);
     
    
    }
    /*
    console.log("programa leido");
    console.log(programa);*/
    })
    .catch(error => {
    // si hay algún error lo mostramos en consola
    console.error(error)
    });
}
      if(pagos.length>0){
        this.setState({
          pagocero: listado1,
          pagos: pagos
      }
        );
        swal("Filtro realizado exitosamente!","","success");
      }else{
        
        this.setState({
          pagocero: [],
          pagos: []
        },
        );
        swal("No se encontraron registros","","info");
      }
      
    }
    )
    .catch(error => {
      swal("Oops, Algo salió mal!!", "","error")
        // si hay algún error lo mostramos en consola
        console.error(error)
    });


}
SeleccionFechaDel(Fecha) {
    console.log(Fecha);
    var fecha1 = new String(Fecha);
    console.log("fecha del");
    console.log(fecha1);
    this.setState({filtroDel: fecha1});
    
}
SeleccionFechaAl(Fecha) {
    console.log(Fecha);
    var fecha1 = new String(Fecha);
    console.log("fecha al");
    console.log(fecha1);
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
   
    console.log(checkbox_seleccionados);
   
    return checkbox_seleccionados;

}
enviar(){
  console.log("lo que envio:");
  console.log(this.state.pagocero);
}
CalcularImporte() {
    
    let pagos = this.state.pagocero;
    let importe = 0;
    for (var indice in pagos) {
      importe = importe + pagos[indice].importe;
    }
    return importe;
}
BuscarNombre(busqueda) {
    let nombres = busqueda.nombres;
    console.log("Nombre ingresado");
    console.log(busqueda.nombres);
    console.log("apellido ingresado");
    console.log(busqueda.apellidos);
    
    
    //Verificamos los espacios ingresados en el nombre
    let nombre = busqueda.nombres;
    var separador = " "; // un espacio en blanco
    var arregloDeSubCadenas = nombre.split(separador);
    console.log("arreglo de subcadenas");
    console.log(arregloDeSubCadenas);
    var arreglo = [];
    for (let i = 0; i< arregloDeSubCadenas.length; i++) {
      if(arregloDeSubCadenas[i]!==''){
         arreglo.push(arregloDeSubCadenas[i])
      }
    }
    console.log("arreglo sin espacios en blanco");
    console.log(arreglo);

    var nombrenuevo = arreglo.join(" ");
    console.log("arreglo nombre con join")
    console.log(nombrenuevo);
 //verificamos los espacio ingresado en el apellido}
 let apellido = busqueda.apellidos;
 var separador1 = " "; // un espacio en blanco
 var arregloDeSubCadenas1 = apellido.split(separador);
 console.log("arreglo de subcadenas");
 console.log(arregloDeSubCadenas1);
 var arreglo1 = [];
 for (let i = 0; i< arregloDeSubCadenas1.length; i++) {
   if(arregloDeSubCadenas1[i]!==''){
      arreglo1.push(arregloDeSubCadenas1[i])
   }
 }
 console.log("arreglo sin espacios en blanco");
 console.log(arreglo1);

 var apellidonuevo = arreglo1.join(" ");
 console.log("arreglo apellido con join")
 console.log(apellidonuevo);

    this.setState({
      nombre: nombre,
      apellido:apellido
    });
   
      var listado1 =[];
    //antiguo link 
    //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/updaterecaudaciones/listar/
    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/recaudaciones/alumno/concepto/leer/restringido/'+nombrenuevo+'/'+apellidonuevo)
      .then((response) => {
        return response.json()
      })
      .then((pagos) => {
      console.log("Listado de pagos recibidos");
      console.log(pagos);

      var listado1 =[];
      var opciones  = [];
      for (let i = 0; i< pagos.length; i++) {
        var listadoRec = { 
          idRec : 0,
          idAlum:0,
          apeNom:'',
          concepto:'',
          numero:'',
          nombre:'',
          moneda:'',
          importe:0,
          fecha:'',
          idPrograma:0,
          codAlumno:'',
          codigos:[],
          
        }
        listadoRec.idRec = pagos[i].idRec;
        listadoRec.idAlum = pagos[i].idAlum;
        listadoRec.apeNom= pagos[i].apeNom;
        listadoRec.concepto= pagos[i].concepto;
        listadoRec.numero = pagos[i].numero;
        listadoRec.nombre= pagos[i].nombre;
        listadoRec.moneda = pagos[i].moneda;
        listadoRec.importe = pagos[i].importe;
        listadoRec.fecha= pagos[i].fecha;
        listadoRec.idPrograma = pagos[i].idPrograma;
        listadoRec.idPrograma =  pagos[i].codAlumno;
        listado1.push(listadoRec);
      }
     
  //console.log("listado1 en la tabla");
  //console.log(listado1);
  
    //link anterior
    //http://modulo-alumno-jdbc.herokuapp.com/alumnoprograma/leer/
      for (let i = 0; i< listado1.length; i++) {
            var nombrefiltro = listado1[i].apeNom;
            var separador1 = " "; // un espacio en blanco
            var arregloDeSubCadenas2 = nombrefiltro.split(separador1);
            //console.log("arreglo de subcadenas para alumno programa");
            var nombrenuevo1 = arregloDeSubCadenas2.join(" & ");
            //console.log(nombrenuevo1);
            //ANTERIOR LINK:https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/alumnoprograma/leer/
            
            
            fetch('https://modulo-alumno-jdbc.herokuapp.com/alumno/alumnoprograma/programa/leer/restringido/'+nombrenuevo1)
            .then((response) => {
            return response.json()
            })
            .then((programa) => {
            var alumnoprograma = programa;
            //listado1[i].alumnoPrograma = 
            var listadoOpcionesCodigos = [];
            var listadoOpcionesProgramas = [];
            /*console.log("ALUMNO PROGRAM RECIBIDO");
            console.log(alumnoprograma);
            console.log("longitud del array alumno programa recibido")
            console.log(alumnoprograma.length);*/

            listado1[i].alumnoPrograma = programa;
             
             for(let j = 0; j< alumnoprograma.length; j++){       
    
                var value1 = j;
                var label1 = alumnoprograma[j].codAlumno+"-"+alumnoprograma[j].apeNom+"/"+alumnoprograma[j].siglaPrograma;
                var option1 = {value: value1, label:label1};
                listado1[i].codigos.push(option1);
             
            
            }
            /*
            console.log("programa leido");
            console.log(programa);*/
            })
            .catch(error => {
            // si hay algún error lo mostramos en consola
            console.error(error)
            });
      }
      if(pagos.length >0){
      
        this.setState({
          pagocero: listado1,
          pagos: pagos
      });
        swal("Busqueda realizada exitosamente!","","success");
      }else{

        this.setState({
          pagocero: [],
          pagos: []
        },
        );
        swal("No se encontraron registros","","info");
      }
        console.log("listado de pagos que recibo del get");
        console.log(pagos);
    }
    )
    .catch(error => {
        swal("Oops, Algo salió mal!!", "","error")
        console.error(error)
    });
  
    fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/concepto/leer/'+nombre+'/'+apellido)
      .then((response) => {
        return response.json()
      })
      .then((conceptos) => {
        this.setState({
          conceptos: conceptos
      });
      console.log("Conceptos recibidos de los nombres ingresados");
      console.log(this.state.conceptos);
      })
      .catch(error => {

        console.error(error)
      });


}
FiltrarNumeros = (listaNumeros) => {
    console.log("Listado de numeros recibidos:")
    console.log(listaNumeros);
    this.setState({
      filtroNumeros: listaNumeros
     }) 
  }
}
export default AppNueva;
