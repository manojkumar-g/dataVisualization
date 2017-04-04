import React from 'react';
import axios from 'axios'
import Menu from '../components/Menu.jsx'

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { data : [] }
  }
  componentDidMount(){
    axios.get('/api/')
         .then(
           res => {this.setState({data:res.data})}
         )
  }
  render(){
    return(
      <div className="container">
        <Menu/>
      </div>
    );
  }
}
