import React from 'react';
import Select from 'react-select';
 
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'xd' },
  { value: 'vanilla', label: 'Vanilla' }
];
 
class App extends React.Component {
  constructor(props){

    super(props)
    this.state = {
      xd2: null,
    }
  }
  

  handleChange = (xd) => {
    // this.setState({ selectedOption });
    this.setState({xd2:xd})
    console.log(`Option selected:`, xd);
  }


  render() {
 
    return (
      <Select
         value={this.state.xd2}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default App;