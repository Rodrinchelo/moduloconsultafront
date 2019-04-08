import React from 'react'
import PagoListNuevo2 from './Pago-list-nuevo2'
import '../App2.css';
import BuscarNuevo from './BuscarNuevo';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert'
import CONFIG1 from '../Configuracion/Config1'


class AppNueva extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nombre_select: '',
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
      programa:[],
      arregloInsertar:[],

      flag: false
    }

    this.enviar=this.enviar.bind(this);

    this.BuscarNombre = this.BuscarNombre.bind(this);
    this.Asignar = this.Asignar.bind(this);
    this.Regresar = this.Regresar.bind(this);
    this.PagoAsignar=this.PagoAsignar.bind(this);
   
}

flag = (flag) => {
  this.setState({
    flag: flag
  });
}

Regresar=(e)=>{
    
    browserHistory.push('/');
    e.preventDefault();
    
}
PagoAsignar(opcion) {

  if(opcion != null){
    this.setState({
      arregloInsertar:opcion
    });
    // console.log("opcion de array")
    // console.log(opcion)
  }

}
  render() {
    
      return (
        <div className="">
          <h3>Estado de pagos
            <ul id="nav-mobile" className="right  hide-on-med-and-down">
              <li >
                <a className="seleccionar" onClick={this.Regresar} >
                  Regresar
                  <i className="material-icons right">reply</i>
                </a>
              </li>
            </ul>
          </h3>
          <hr />
          <div className="SplitPane row">
            <div className="col-xs-12">
              <BuscarNuevo Busqueda={this.BuscarNombre} flag={this.flag}/>
            </div>  
          </div> 
          <hr/>
          {this.state.flag?(
            <div className="row center-xs centrar">
              <div className="center-xs-12 margin_top ">
                <PagoListNuevo2 Opcion={this.BuscarNombre} nombreBusqueda={this.state.nombre} nombre={this.state.nombre_select} funcion={this.Funcion} listado={this.state.pagocero}/>
              </div>
            </div>
          ):(null)}
          <footer>
            <div className="row center-xs centrar color">
              UPG-FISI © 2018
            </div>
          </footer>
        </div>
      )
  }
Asignar=(e)=>{

   

    var check = [];
    var opcionesSeleccionadas = [];
    var listadoAlumnoPrograma = [];
    

    check = document.getElementsByClassName("opcion2");
   
    for (var item of check) {
     opcionesSeleccionadas.push(item.id);
    }
    
    // console.log("opciones seleccionadas");
    // console.log(opcionesSeleccionadas);
    var listado2 = this.state.pagocero;
    // console.log("listado 2");
    // console.log(listado2);
    var indices=[];
    
    for (let i = 0; i < listado2.length; i++) {
        var index = opcionesSeleccionadas[i];
      
        if(!index){
           listadoAlumnoPrograma.push(null);
        }else{
           var ap = listado2[i].alumnoPrograma[index];
           listadoAlumnoPrograma.push(ap);
        }
    }
  
    
    var pagoinsertar = [];
    var PagosActualizados = this.state.pagocero;

    for (let i = 0; i < PagosActualizados.length; i++) {
        var ap = listadoAlumnoPrograma[i];
        if(ap != null){
          var listadoRec = { 
          "idAlumno" : PagosActualizados[i].idAlum,
          "codAlumno" :ap.codAlumno,
          "idPrograma":ap.idPrograma
        }
        pagoinsertar.push(listadoRec);
        }
    }
    /*
    console.log("alumno-alumno programa generado a insertar");
    console.log(pagoinsertar)
  
*/
    for (let i = 0; i < pagoinsertar.length; i++) {
      //llamar servicio insertar alumno alumno-programa
      fetch('https://modulo-alumno-jdbc.herokuapp.com/alumnoalumnoprograma/add',
    {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
      pagoinsertar[i]
    )
  })
  .then((response) => {
    return response.json()
  })
  .then((pagos) => {
    /*if(pagos){
      swal("Asignado exitosamente!","","success");
    }
    console.log("ALUMNO QUE HA SIDO INSERTADO");
    console.log(pagos);*/
    

    var busqueda1 = {nombres: this.state.nombre,
                     mensaje:1}
    this.BuscarNombre(busqueda1);
    
  })
  .catch(error => {
    // si hay algún error lo mostramos en consola
    swal("Oops, Algo salió mal!", "","error")
    console.error(error)
  });
  
  
  }
  swal("Asignado exitosamente!","","success");
  //Actualizamos la vista:
  

  e.preventDefault();
}
enviar(){

  // console.log("lo que envio:");
  // console.log(this.state.pagocero);
}
BuscarNombre(busqueda) {
  //  console.log("Nombre ingresado");
  //  console.log(busqueda.nombres);
    let nombre = busqueda.nombres;
    this.setState({
      nombre: nombre
    });
    var separador = " "; // un espacio en blanco
    var arregloDeSubCadenas = nombre.split(separador);
    /*
    console.log("arreglo de subcadenas");
    console.log(arregloDeSubCadenas);*/
    var arreglo = [];
    for (let i = 0; i< arregloDeSubCadenas.length; i++) {
      if(arregloDeSubCadenas[i]!==''){
         arreglo.push(arregloDeSubCadenas[i])
      }
    }
    /*
    console.log("arreglo sin espacios en blanco");
    console.log(arreglo);
*/
    var nombrenuevo = arreglo.join(" & ");
    /*
    console.log("arreglo con join")
    console.log(nombrenuevo);
    */

   
    var listado1 =[];
    //ANTERIOR LINK
    //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/alumno/leer/restringido/

    fetch(CONFIG1 + 'recaudaciones/alumno/concepto/buscar/' + nombrenuevo)
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
          apeNom:'',
          concepto: '',
          fecha: '',
          id_rec: '',
          numero: '',
          idAlum : '',
          moneda: '',
          importe: '',
          codigos:[]
        }
        if(pagos[i].moneda == '108'){

          listadoRec.apeNom = pagos[i].ape_nom;
          listadoRec.concepto = pagos[i].concepto;
          listadoRec.fecha = pagos[i].fecha;
          listadoRec.id_rec = pagos[i].id_rec;
          listadoRec.numero = pagos[i].numero;
          listadoRec.idAlum = pagos[i].id_alum;
          listadoRec.moneda = 'SOL';
          listadoRec.importe = 'S/' + pagos[i].importe;

        } else if(pagos[i].moneda == '113'){

          listadoRec.apeNom = pagos[i].ape_nom;
          listadoRec.concepto = pagos[i].concepto;
          listadoRec.fecha = pagos[i].fecha;
          listadoRec.id_rec = pagos[i].id_rec;
          listadoRec.numero = pagos[i].numero;
          listadoRec.idAlum = pagos[i].id_alum;
          listadoRec.moneda = 'DOL';
          listadoRec.importe = '$ ' + pagos[i].importe;

        } else{

          listadoRec.apeNom = pagos[i].ape_nom;
          listadoRec.concepto = pagos[i].concepto;
          listadoRec.fecha = pagos[i].fecha;
          listadoRec.id_rec = pagos[i].id_rec;
          listadoRec.numero = pagos[i].numero;
          listadoRec.idAlum = pagos[i].id_alum;
          listadoRec.moneda = ' ';
          listadoRec.importe = pagos[i].importe;

        }
        listado1.push(listadoRec); 
        console.log("Listado de recibos");
        console.log(listadoRec);
      }

      // console.log("arreglo con join con espacios")
      // console.log(nombrenuevo2);
      for (let i = 0; i< listado1.length; i++) {
        var apeNombre = listado1[i].apeNom;
        var separador1 = " "; // un espacio en blanco
        var arregloDeSubCadenas1 = apeNombre.split(separador1);
        /*
        console.log("arreglo de subcadenas");
        console.log(arregloDeSubCadenas);*/
        var arreglo1 = [];
        for (let i = 0; i< arregloDeSubCadenas1.length; i++) {
          if(arregloDeSubCadenas1[i]!==''){
             arreglo1.push(arregloDeSubCadenas1[i])
          }
        }
        
        // console.log("arreglo sin espacios en blanco para alumno programa");
        // console.log(arreglo1);
    
        var nombrenuevo2 = arreglo1.join(" ");

        // console.log("arreglo a enviar al servicio alumno programa")
        // console.log(nombrenuevo2)

       /*  this.setState({
          nombre_select:nombrenuevo2
        }); */
           //ANTERIOR LINK
            //1//https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/alumno/alumnoprograma/programa/listar/restringido/
            //2//https://modulo-alumno-jdbc.herokuapp.com/alumno/alumnoprograma/programa/listar/restringido/
           fetch(CONFIG1+'alumno/alumnoprograma/programa/listar/restringido/'+nombrenuevo2)
          .then((response) => {
          return response.json()
          })
          .then((programa) => {
          
              var alumnoprograma = programa;
              var listadoOpcionesCodigos = [];
              var listadoOpcionesProgramas = [];
              listado1[i].alumnoPrograma = programa;
               
               for(let j = 0; j< alumnoprograma.length; j++){       
      
                  var value1 = j;
                  var label1 = alumnoprograma[j].codAlumno+"-"+alumnoprograma[j].apeNom+"/"+ alumnoprograma[j].idPrograma+"-"+alumnoprograma[j].siglaPrograma;
                 
                  var option1 = {value: value1, label:label1};
                  listado1[i].codigos.push(option1);
              }
         
           // }
          })
          .catch(error => {
          console.error(error)
          });

        }

      if(pagos.length >0){
      
        this.setState({
          pagocero: listado1,
          pagos: pagos 
      },
        );
        if(!busqueda.mensaje){
          swal("Busqueda realizada exitosamente!","","success");
        }
        
      }else{
        
        this.setState({
          pagocero: [],
          pagos: []
      },
        );
        if(!busqueda.mensaje){
        swal("No se encontraron registros","","info");
        }
      }
    /*
        console.log("listado de alumno y codigo programa que se muestra en la tabla");
        console.log(listado1);*/
    }
    )
    .catch(error => {
        // si hay algún error lo mostramos en consola
        swal("Oops, Algo salió mal!", "","error")
        console.error(error)
    });
}


}
export default AppNueva;