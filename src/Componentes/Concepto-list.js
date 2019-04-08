import React from 'react'
class ConceptoList extends React.Component {
    
    render() { 
      if( this.props.listado.length>0){
      return (
        <p>     
        {
            this.props.listado.map((concepto) => {
              return <label key={concepto.idConcepto} className="">
                <input
                className="clase_concepto"
                name={concepto.concepto}
                type="checkbox" />
                <span key={concepto.idConcepto} className="mdc-checkbox">
                {concepto.concepto.substr(0,3)+'-'+ concepto.concepto.substr(3,3)}
                </span>
            </label>
            })
          }
          
        </p>
      )}
      else{
        return <p className="text-center">No se encontraron conceptos</p>
      }
    }
  }
  export default ConceptoList;