import React from 'react'
import AlumnoAPRow from './Alumno-AP-Row'
import TableHeaderAlumnoAP from './TableHeader-AlumnoAP'

class AlumnoAPList extends React.Component {

  render() {
    if(this.props.listado.length >0){
      return (
      <table className="table">
      <TableHeaderAlumnoAP/>
        <tbody>
          {
            this.props.listado.map((alumnoAP) => {
              return <AlumnoAPRow  key={alumnoAP.idAlumno} 
              alumnoAP={ alumnoAP} />
            })
          }
        </tbody>
        </table>
    )}
    else{
      return <div className="mensaje centrar">No se encontraron datos</div>
    }
  }
}

export default AlumnoAPList