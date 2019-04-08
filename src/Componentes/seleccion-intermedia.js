import React from 'react'
import CodigoList from './codigo-list'
import '../App.css';
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config';



class VistaIntermedia extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:this.props.params.name,
            alumnos:[]
        }
        this.Regresar=this.Regresar.bind(this);
    }


    componentWillMount() {
    var nombres = this.state.name;
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

    var nombrenuevo = arreglo.join("&");

    fetch(CONFIG+'/recaudaciones/alumno/concepto/listar_codigos/'+ nombrenuevo)
    .then((response)=>{
        return response.json()
    })
    .then((alumno)=>{
        console.log("alumnosxd");
            console.log(alumno);
        this.setState({alumnos:alumno})
    })
    .catch(error=>{
        console.error(error)

    });

    
}

render() {
    return (
      <div className="">
            <h3>Selección de codigo
            <ul id="nav-mobile" className="right  hide-on-med-and-down">
            <li ><a className="seleccionar" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
        </ul>
            </h3>
          
        <hr />

      <div className="row center-xs centrar">
          <div className="center-xs-12 margin_top ">
              <CodigoList lista={this.state.alumnos} />
          </div>
      </div>
        <footer>
          <div className="row center-xs centrar color">
          <img src="https://png.icons8.com/ios/1600/hachiko.png" height="25"/>
            UPG-FISI © 2018 
          </div>
          </footer>

      </div>
    )
  }

  Regresar=(e)=>{
    browserHistory.push('/vista/loginNyA');
    e.preventDefault();
}


}
export default VistaIntermedia