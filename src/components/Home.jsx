import React from 'react'
import range from 'lodash/range'
import css from '../styles/home.styl'
import { connect } from 'react-redux'
import { VictoryPie,VictoryChart,VictoryAxis, VictoryTheme, VictoryLabel, VictoryTransition } from 'victory'
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

                  <svg height={300}>
    <VictoryTransition animationWhitelist={['data']}>
      <VictoryPie
        animate={{ duration: 1000 }}
        width={300}
        height={300}
        standalone={false}
        data={tableData[season].table}
        x = 'name'
        y = 'pts'
        labels={(d) => Math.round(d.y)}
        innerRadius={60}
        labelRadius={74}
        padAngle={3}
        style={{
          data: {
            width: 60
          },
          labels: {
            fill: '#FDFEFE',
            fontSize: 20
          }
        }} />
    </VictoryTransition>
    <VictoryLabel
      textAnchor='middle'
      verticalAnchor='middle'
      x={150}
      y={150}
      style={{fontSize: 50, fontFamily: 'Roboto Condensed', fill: '#651747'}}
       />
  </svg>

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
