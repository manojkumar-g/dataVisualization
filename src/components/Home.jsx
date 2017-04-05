import React from 'react'

export default class Home extends React.Component {
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
        <section className="content">
        </section>
      );
    }
}
