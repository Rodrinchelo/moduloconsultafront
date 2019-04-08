import React from 'react';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert'
import CONFIG from '../Configuracion/Config'

//LOGIN NOMBRES Y APELLIDOS

class LoginForm2 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        nombres : ''
      };
  
       //this.onSubmit = this.onSubmit.bind(this);
       this.onSubmit2 = this.onSubmit2.bind(this);
      this.onChange = this.onChange.bind(this);
      this.VistaNueva = this.VistaNueva.bind(this);
    
    }
    onSubmit2=(e)=>{
      var nombreValidado= this.ValidarNombre(this.state.nombres);
      var nombres= this.state.nombres.toUpperCase();
      if(nombreValidado){
        var separador=" ";
        var arregloDeSubcadenas= nombres.split(separador);
        var arreglo=[];
        for(let i=0;i<arregloDeSubcadenas.length;i++){
          if(arregloDeSubcadenas[i]!==''){
            arreglo.push(arregloDeSubcadenas[i])
          }

        }
        
      }
      var nombrenuevo=arreglo.join(" & ");
      console.log(nombrenuevo);
        fetch(CONFIG+'/recaudaciones/alumno/concepto/listar_codigos/'+ nombrenuevo)
          .then(
            (response)=>{
              return response.json();
            })
          .then((cod_alumno)=>{
            console.log("alumnos");
            console.log(cod_alumno);
            if(cod_alumno.length>0){
  
                  
              swal("Consulta realizada exitosamente!" ,"", "success").then(
                 browserHistory.push('/filtro/'+this.state.nombres.toUpperCase()))
              }
              else{
                swal("No se encontró informacion", "", "info");
              }

            })
            .catch(error => {

                swal("Oops, Algo salió mal!", "","error")
                console.error(error)
            });
            
        
            e.preventDefault();



    }
    
    // onSubmit=(e)=>{
      
    //   // console.log(this.state.nombres);
    //  //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/alumno/leer/
    //   var nombreValidado = this.ValidarNombre(this.state.nombres);
    //   var nombres = this.state.nombres.toUpperCase();
    //   if(nombreValidado){
    //   var separador = " "; // un espacio en blanco
    //   var arregloDeSubCadenas = nombres.split(separador);
    //   // console.log("arreglo de subcadenas");
    //   // console.log(arregloDeSubCadenas);
    //   var arreglo = [];
    //   for (let i = 0; i< arregloDeSubCadenas.length; i++) {
    //     if(arregloDeSubCadenas[i]!==''){
    //        arreglo.push(arregloDeSubCadenas[i])
    //     }
    //   }
    //   // console.log("arreglo sin espacios en blanco");
    //   // console.log(arreglo);
    //   var nombrenuevo = arreglo.join(" & ");
    //   // console.log("nombre nuevo");
    //   // console.log(nombrenuevo);
    //   //ANTERIOR LINK:
    //   //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/recaudaciones/alumno/concepto/listar/
    //       fetch(CONFIG+'recaudaciones/alumno/concepto/listar/' + nombrenuevo)
    //           .then((response) => {
    //           return response.json()
    //           })
    //           .then((pagos) => {
    //            console.log("pagos recibidos");
    //            console.log(pagos);
    //            if(pagos.length>0){
  
                  
    //             swal("Consulta realizada exitosamente!" ,"", "success").then(
    //                browserHistory.push('/'+this.state.nombres.toUpperCase()))
    //             }
    //             else{
    //               swal("No se encontró informacion", "", "info");
    //             }
  
    //           })
    //           .catch(error => {
  
    //               swal("Oops, Algo salió mal!", "","error")
    //               console.error(error)
    //           });
    //   }
    //   e.preventDefault();
      
    // }
    VistaNueva=(e)=>{
      
      browserHistory.push('/vista/nueva');
      // console.log("Vista nueva");
      e.preventDefault();
      
    }
  
    VistaNueva2=(e)=>{
      
      browserHistory.push('/vista/nueva2');
      // console.log("Vista nueva 2");
      e.preventDefault();
      
    }
    VistaTablaCreada=(e)=>{
      
      browserHistory.push('/vista/Tabla');
      // console.log("Vista nueva 2");
      e.preventDefault();
      
    }
    ValidarNombre(nombres){
      if(!nombres){
        alert("Ingrese un nombre");
        return false;
      }else{
        return true;
      }
    }

    
  
    Regresar=(e)=>{
      
      browserHistory.push('/');
      e.preventDefault();
      
    }
  
    onChange(e) {
      this.setState({nombres: e.target.value});
    }
  
    render() {
      return (
        <div className="">
        <h3>Módulo consulta de pagos
           <ul id="nav-mobile" className="right  hide-on-med-and-down">
                <li ><a className="seleccionar" href="https://siga-fisi.herokuapp.com/dashboard" >Vista Principal<i className="material-icons right">launch</i></a></li>
                
            </ul>
        </h3>
        <nav>
      <div className="nav-wrapper azul">
        <ul id="nav-mobile" className="right hide-on-med-and-down">
         {/*  <li><a onClick={this.VistaNueva} >VistaNueva</a></li> */}
          <li><a onClick={this.VistaNueva2} >  <i className="small material-icons right">check_box</i>Asignar Programa</a></li>
          <li><a onClick={this.VistaTablaCreada} ><i className="small material-icons right">pageview</i>Ver tabla</a></li>
        </ul>
      </div>
    </nav>
        <div className="vista">
        <div className="grupo">
        <h4 className="center h4"><b>Consulte</b></h4>
        <form>
            <div className="center datos">
              <div>
              <i className="material-icons">person</i>
              </div>
              <b>Nombres y Apellidos:</b>
              <div className="center">
              <input type="text"  value={this.state.nombres} onChange={this.onChange} />
              </div>
             {/* <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-lg">CONSULTAR</button> */}
             <button type="submit" onClick={this.onSubmit2} className="waves-effect waves-light btn-small">CONSULTAR</button>
             
            </div>
            
        </form>
        <u className="colorI"><a onClick={this.Regresar} href="" className="row center-xs centrar colorI">Regresar</a></u>
        </div>
        
        </div>
        <footer>
              <div className="row center-xs centrar color">
              <img src="https://png.icons8.com/ios/1600/hachiko.png" height="25"/>
            UPG-FISI © 2018 
              </div>
          </footer>
        </div>
      );
    }
  }
  
  export default LoginForm2;