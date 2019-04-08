import React from 'react';
import NumeroList from './Numero-List'

class NumeroRecibo extends React.Component {
  
    constructor(props) {
      super(props)
      this.state = { 
        listaNumeros:[],
        numero: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.Buscar = this.Buscar.bind(this);
        this.eliminar=this.eliminar.bind(this);
    
    }
    onChange(e) {
        this.setState({numero: e.target.value});
      }
    onSubmit=(e)=>{
        console.log("numero ingresado");
        console.log(this.state.numero);
        console.log("longitud del numero");
        console.log(this.state.numero.length);
    
        console.log(this.state.numero);
        if(this.state.numero==''){
          alert("Debe ingresar un numero de recibo");
        }else{
         if(this.state.numero.length < 7){
          alert("Debe ingresar un numero de recibo valido");
         }else{
          var num = this.state.numero;
          console.log(num);
          var listaAgregados=[];
          listaAgregados = this.state.listaNumeros;
          var lista = this.state.listaNumeros.filter(h => h === num);

          if(!(lista.length>0)){
            listaAgregados.push(this.state.numero);
          }else{
            alert("El numero de voucher ya ha sido ingresado");
          }
          this.setState({
          listaNumeros: listaAgregados,
          })
          this.state.numero='';
      
          this.Buscar(e);
         } 
        }
       
        e.preventDefault();
    }
    Buscar=(e)=>{
      this.props.Numeros(this.state.listaNumeros);
      e.preventDefault();
      
    }
    eliminar(numero){
      console.log("Eliminando");
      var listaActual = this.state.listaNumeros;
      var num = numero.numero;
      console.log(num);
      /*var indice = this.state.listaNumeros.indexOf(numero.numero);
      console.log(indice);
      listaActual.splice(indice,1);*/
      listaActual = this.state.listaNumeros.filter(h => h !== num)
      console.log("lista actual:");
      console.log(listaActual);
      this.setState({
        listaNumeros: listaActual
      });
      this.props.Numeros(listaActual);
      console.log("lista numeros");
      console.log(this.state.listaNumeros);
    }

    render() {
        return (
          <div>
            <div className="datos">
              
              <div className="SplitPane row">
              <div className="col-xs-2 centrar">
               <b className="recibo">N°: </b> 
              </div>
              <div className="col-xs-5 centrar">
                <input type="text" value={this.state.numero} onChange={this.onChange}/>
              </div>
              <div className="col-xs-2 centrar">
                <button  onClick={this.onSubmit} className="btn-floating red margen_iz"><b><i className="large material-icons">add</i></b></button>
              </div >
              </div>
              <div className="scroll center-xs ">
              <NumeroList  Eliminado={this.eliminar} listado={this.state.listaNumeros}/>
              </div>
             {/*  <div className="center ">
                <button  onClick={this.Buscar} className="waves-effect waves-light btn botonazul2 " >Buscar<i className="large material-icons left">search</i></button>
              </div> */}
              
            </div>
          </div>
        )
    }
    
  }
  export default NumeroRecibo;