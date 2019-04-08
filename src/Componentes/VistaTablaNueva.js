import React from 'react'

import AlumnoAPList from './Alumno-AP-List'
import '../App.css';
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config'


class VistaTablaNueva extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      alumnos: []
    }
    this.Regresar = this.Regresar.bind(this);

  }

  componentWillMount() {
    //ANTERIOR LINK
    //https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/alumno/alumnoprograma/programa/listar
    fetch(CONFIG+'alumno/alumnoprograma/programa/listar')
    .then((response) => {
    return response.json()
    })
    .then((alumno) => {
      this.setState({ alumnos: alumno})
      
      // console.log(alumno);
   
    })
    .catch(error => {
    // si hay algún error lo mostramos en consola
        console.error(error)
    });
  }
  Regresar=(e)=>{
    
    browserHistory.push('/');
    e.preventDefault();
    
  }

  render() {
      return (
        <div className="">
              <h3>Tabla Alumno-AlumnoPrograma
              <ul id="nav-mobile" className="right  hide-on-med-and-down">
              <li ><a className="seleccionar" onClick={this.Regresar} >Regresar<i className="material-icons right">reply</i></a></li>
          </ul>
              </h3>
            
          <hr />

        <div className="row center-xs centrar">
            <div className="center-xs-12 margin_top ">
                <AlumnoAPList listado={this.state.alumnos} />
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
   
}



export default VistaTablaNueva;