import React from 'react'
class NumeroList extends React.Component {
  
    render() { 
     
      return (
        <ul className="numero">     
        {
            this.props.listado.map((numero) => {
              return <li key={numero.toString()} className="center">
              <p>
                <span>{numero}</span>
                <button onClick={(e) => {e.preventDefault(); this.props.Eliminado({numero})}} className="delete"><b>x</b></button>
              </p>
            </li>
            })
          }   
        </ul>
      )
    }
  }
  export default NumeroList;