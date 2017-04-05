import React from 'react'
import axios from 'axios'
import groupBy from 'lodash/groupBy'
import uniq from 'lodash/uniq'
import css from '../styles/home.styl'

export default class Home extends React.Component {
    constructor(props){
      super(props);
      this.state = { data : [] }
    }
    componentDidMount(){
      axios.get('/api/')
           .then(
             ({data}) => {
                 this.setState({data:data})
                 let x = uniq(groupBy(data,'season')[2008].map(({team1}) => team1))

             }
           )
    }
    render(){
      return(
        <section className="homeContent">

        </section>
      );
    }
}
