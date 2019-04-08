import React from 'react'
import FormularioList from './formulario-list'
import '../App.css';
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config';



class formulariointermedio extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listas:[]
        }
        this.Regresar=this.Regresar.bind(this);
       
    }


    componentWillMount() {
   

    fetch(CONFIG+'/beneficio/listar/' + this.props.codigo)
    .then((response)=>{
        return response.json()
    })
    .then((beneficio)=>{
        console.log("lsita de beneficios");
            console.log(beneficio);
        this.setState({listas:beneficio})
    })
    .catch(error=>{
        console.error(error)

    });

    
}
   
enviar=(e)=>{

    browserHistory.push('/formulario/'+this.props.codigo+'&'+"");
    e.preventDefault();
}


render() {
    return (
      <div className="container">

      <div className="row center-xs centrar ">
          <div className="center-xs-12 margin_top ">
              <FormularioList lista={this.state.listas} codigo={this.props.codigo} />
          </div>
      </div>
        
      <div className="row center-xs"> 
      <div className="col ">
      <button  onClick={this.enviar} className="  waves-effect waves-light btn-small botonazul2  " type="submit">Agregar<i className=" material-icons left">add</i></button>
      </div>
      </div>
      </div>
    )
  }

  Regresar=(e)=>{
    browserHistory.push('/vista/loginNyA');
    e.preventDefault();
}


}
export default formulariointermedio