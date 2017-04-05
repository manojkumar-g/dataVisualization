import React from 'react'
import groupBy from 'lodash/groupBy'
import uniq from 'lodash/uniq'
import css from '../styles/home.styl'
import { connect } from 'react-redux'
import { getMatchData } from '../actions'

class Home extends React.Component {
    constructor(props){
      super(props);
      this.state = { data : [] }
    }
    componentDidMount(){
        this.props.getMatchData()
    }
    render(){
      return(
        <section className="homeContent">

        </section>
      );
    }
}

export default connect(
    ({MatchData}) => ({...MatchData}),
    {getMatchData}
)(Home)
