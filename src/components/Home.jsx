import React from 'react'
import range from 'lodash/range'
import css from '../styles/home.styl'
import { connect } from 'react-redux'
import { VictoryPie,VictoryChart,VictoryAxis, VictoryTheme } from 'victory'
import Dot from './Dot.jsx'

class Home extends React.Component {
    constructor(props){
      super(props);
      this.state = { data : [] ,season:0}
    }
    componentDidMount(){
      window.setInterval(
        () => {
          let {tableData} = this.props
          let {season} = this.state
          this.setState({season : season+1 < tableData.length ?  season+1 : 0})
          console.log('HI');
      },4000
      )
    }
    onDotClick = (season) =>{
      this.setState({
        season
      })
    }
    render(){
      let { tableData } = this.props
      let { season } = this.state
      return(
        <section className="homeContent">
            <section className="summary">
              <h1>Summary</h1>
              <article className="dots">
              {
                range(tableData.length).map(
                  (i) => <Dot key = {i} isSelected = {season == i}
                          onClick = {() => {this.onDotClick(i)} }
                        />
                )
              }

              </article>
              {tableData.length == 0 ?'':
                <article className="sumGraph">
                  <VictoryChart animate = {{duration:500}} >
                      <VictoryAxis/>
                      <VictoryAxis dependentAxis/>
                      <VictoryPie
                        data ={tableData[season].table}
                        x = 'name'
                        y = 'pts'
                        innerRadius = {140}
                        
                        >
                      </VictoryPie>
                  </VictoryChart>

              </article>}
            </section>
        </section>
      );
    }
}

export default connect(
    ({MatchData}) => ({...MatchData}),
    {}
)(Home)
