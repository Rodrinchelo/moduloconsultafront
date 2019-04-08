import React from 'react'

class FiltroFecha extends React.Component {
  
    addNewFiltro(e) {
        e.preventDefault();
        var del = this.del.value;
        var al = this.al.value;
        var fechas = {del: del, al:al}
        this.props.Fechas(fechas);
    
    }  
     render() {
        return(
          <div className="row center-xs margen_der">
          
          <form className="margen_izq" onSubmit={(e) => this.addNewFiltro(e)}>
          
           <h4 className=" centrar margen_top ">Fechas</h4>
            <div className = "SplitPane">
              <div >
              <label>Del:</label>
              <input ref={ ( input ) => this.del = input } type="date" name="Del"/>
              <label>Al:</label>
              <input ref={ ( input ) => this.al = input } type="date" name="Al" />
              </div>
            </div>
          <div>
           <button  className="waves-effect waves-light btn-large botonazul2 center"type="submit">Filtrar<i className="large material-icons left">search</i></button>
          </div>
          
          </form>
        </div>
        )
      }
    
  }
  export default FiltroFecha;