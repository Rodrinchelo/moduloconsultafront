import React from 'react'

class FiltroFecha1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      fecha : ' '};
      this.onChange = this.onChange.bind(this);
  
    }
    onChange(e) {
      this.setState({fecha: e.target.value});
      this.props.Fechas(e.target.value);
    }
     render() {
        return(
      
           <div >
            <input type="date" value={this.state.fecha} onChange={this.onChange}  />
           </div>
          
       
        )
      }
    
  }
  export default FiltroFecha1;