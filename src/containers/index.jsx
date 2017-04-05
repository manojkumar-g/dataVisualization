import React from 'react'
import { connect } from 'react-redux'
import css from '../styles/land.styl'
import Menu from '../components/Menu.jsx'
import Home from '../components/Home.jsx'
import { getMatchData } from '../actions'

class App extends React.Component{

  componentDidMount(){
      this.props.getMatchData()
  }

  render(){
    return(
      <div className="container">
        <Menu/>
        <section className="content">
            <Home/>
        </section>

      </div>
    );
  }
}

export default connect(
    undefined,
    {getMatchData}
)(App)
