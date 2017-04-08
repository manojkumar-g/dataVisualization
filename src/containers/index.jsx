import React from 'react'
import { connect } from 'react-redux'
import {Motion,spring,presets} from 'react-motion'
import css from '../styles/land.styl'
import Menu from '../components/Menu.jsx'
import Home from '../components/Home.jsx'
import Model from '../components/Model.jsx'
import { getMatchData } from '../actions'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {searchBox:false}
  }

  componentDidMount(){
      this.props.getMatchData()
  }
  toggleSeachBox = () => {
    this.setState ({searchBox : !this.state.searchBox})
  }
  render(){
    let {searchBox} = this.state
    return(
      <div className="container">
        <Menu toggleSeachBox = {this.toggleSeachBox} isOpen = {this.state.searchBox}/>
        <section className="content">
            <Home/>
            <Motion
              style = {{
                x: spring(searchBox ? 50 : 0,presets.wobbly),
                opacity : spring(searchBox ? 1:0)
              }}
            >
              {
                ({x,opacity}) =>
                <div className="model"
                  style ={{
                    width : x+'%',
                    opacity
                  }}
                  >
                      <Model data = {this.props.data}/>
                </div>
              }

            </Motion>

        </section>

      </div>
    );
  }
}

export default connect(
    (state) => ({data: state.MatchData.tableData}),
    {getMatchData}
)(App)
