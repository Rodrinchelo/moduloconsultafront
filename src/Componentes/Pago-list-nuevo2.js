import React from 'react'
import PropTypes from 'prop-types';
import PagoRowNuevo2 from './Pago-row-nuevo2'
import TableHeaderNuevo2 from './Table-Header-Nuevo2'
import swal from 'sweetalert'
import CONFIG from '../Configuracion/Config'
const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
}

const defaultProps = {
  initialPage: 1
}
class PagoListNuevo2 extends React.Component {

  constructor(props){
    super(props)
    this.state={
      pageOfItems: []
    }
    this.onChangePage = this.onChangePage.bind(this);
    this.OpcionSeleccionada=this.OpcionSeleccionada.bind(this);
    this.pagoInsertar = [];
    this.Asignar=this.Asignar.bind(this);
    

  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ 
      pageOfItems: pageOfItems });  
  }

 componentWillReceiveProps(){
    this.pagoInsertar = [];

 }


  OpcionSeleccionada(opcion,mantener) {

    if(opcion != null){
    if(mantener){
      var array=this.pagoInsertar.filter((e)=>{return e.idAlumno==opcion.idAlumno });
      if(array.length==0){
        // console.log("no hay, se va a insertar");
        this.pagoInsertar.push(opcion);
      }else{
        // console.log("ya hay, se va a reemplazar");
        this.pagoInsertar.map(function(dato){
          if(dato.idAlumno==opcion.idAlumno){
            dato.idPrograma=opcion.idPrograma;
            dato.codAlumno=opcion.codAlumno;
          }
        });
      }
      
    }else{
     /*  console.log("se va a borrar");
      console.log(opcion); */
      var array=this.pagoInsertar.filter((e)=>{return e.idAlumno!==opcion.idAlumno});
      /* console.log("array filtrado");
      console.log(array); */
      this.pagoInsertar=array;
      //
    }
    
    // console.log("pago insertar")
    // console.log(this.pagoInsertar);

    }
/*     console.log("Listado de pagos luego de realizar una insercion");
    console.log(this.pagoInsertar); */
  }
  Asignar=(e)=>{
  
   //ANTERIOR LINK
  //'https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-jdbc-client/alumnoalumnoprograma/add'
   //'https://modulo-alumno-jdbc.herokuapp.com/alumnoalumnoprograma/add'
   var pagos= this.pagoInsertar;
    for (let i = 0; i < pagos.length; i++) {
      //llamar servicio insertar alumno alumno-programa
      fetch(CONFIG+'alumnoalumnoprograma/add',
    {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(
      pagos[i]
    )
  })
  .then((response) => {
    return response.json()
  })
  .then((pagos) => {

    var busqueda1 = {nombres:this.props.nombreBusqueda,
                     mensaje:1}
    this.props.Opcion(busqueda1);
    
  })
  .catch(error => {
    // si hay algún error lo mostramos en consola
    swal("Oops, Algo salió mal!", "","error")
    console.error(error)
  });
  
  
  }
  swal("Se ha Asignado exitosamente!","","success");

  e.preventDefault();
}
  render() {
    if(this.props.listado.length >0){
      return (
        <div>
        <table className="table">
        <TableHeaderNuevo2/>
        <tbody>
          {
            this.state.pageOfItems.map((pago) => {
              return <PagoRowNuevo2  Opcion={this.OpcionSeleccionada} nombre={this.props.nombre} Funciones={this.props.funcion} key={pago.idAlum} 
                                  pago={pago} />
            })
          }
        </tbody>
        </table>
       <div className="margen_top"> <Paginacion items={this.props.listado} onChangePage={this.onChangePage}/></div>

        <div className="SplitPane row center-xs">  
                <button  onClick={this.Asignar} className="waves-effect waves-light btn-large botonazul2 center"type="submit">Asignar<i className="large material-icons left">check</i></button>
        </div>
      </div>
    )
    }else{
      return <div className="mensaje centrar"></div>
    }

    
  }
}

class Paginacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {

    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }
  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);
    /*
    console.log("cantidad de items");
    console.log(totalItems);
    console.log("cantidad de paginas");
    console.log(totalPages);

   */
    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    //var pages = _.range(startPage, endPage + 1);
   // var pages = [];
    /* for (let i = startPage-1; i < endPage; i++) {
      pages.push(startPage + i);
    } */
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
    /*
    console.log("endpage");
    console.log(endPage);
    console.log("cantidad de pageeees");
    console.log(pages.length);
*/

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    return (
      <ul className="pagination row center-xs">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}><i className="material-icons">chevron_left</i></a>
        </li>
        {/* {console.log("final")
          }
          {console.log(pager.pages.length)} */}
        {pager.pages.map((page, index) =>
          <li key={index + 28} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}><i className="material-icons">chevron_right</i></a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }








  /*
    FiltrarCodigo(codigo) {
      
      fetch('https://modulo-alumno-zuul.herokuapp.com/modulo-alumno-client/pago/listar/'+ codigo)
        .then((response) => {
          return response.json()
        })
        .then((pagos) => {
          this.setState({ pagos: pagos })
        })
  
  
      let id = codigo;
      var alumnosfiltrados = this.state.alumnos.filter((alumno) => alumno.alumno.idAlumno === id)
      console.log(alumnosfiltrados);
      this.setState({ alumnos: alumnosfiltrados })
      
  
  
      let id = this.codigo;
      let greaterTen = [];
  
      for (let i = 0; i<this.state.alumnos.length; i++) {
        var currentNumber = this.state.alumnos[i];
        if (currentNumber.alumno.idAlumno === id) {
         greaterTen.push(currentNumber)
        }
      }
      this.solicitudesfiltradas = greaterTen;
      console.log(this.solicitudesfiltradas);
    }*/


}
Paginacion.propTypes = propTypes;
Paginacion.defaultProps = defaultProps;

export default PagoListNuevo2