import React from 'react'
import range from 'lodash/range'
import css from '../styles/home.styl'
import { connect } from 'react-redux'
import {
  VictoryPie,
  VictoryTransition,
  VictoryContainer,
  VictorySharedEvents,
  VictoryLabel,
  VictoryLegend
} from 'victory'
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

                <article className="sumGraph">
              {tableData.length == 0 ?'':
              <svg height={300}>
              <VictoryTransition
                animationWhitelist={['data']}
                animate={{
                  duration:1000,
                  onLoad: {
                        duration: 100,
                      },
                  onEnter: {
                        duration: 100,
                      }
                }}
                >
                <VictoryPie

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
                  colorScale = {'qualitative'}
                  style={{
                    data: {
                      width: 60
                    },
                    labels: {
                      fill: 'black',
                      fontSize: 20
                    }
                  }} />
              </VictoryTransition>
              <VictoryLabel
                textAnchor='middle'
                verticalAnchor='middle'
                x={150}
                y={150}
                 />
               </svg>

          }
              </article>


            </section>

        </section>
      );
    }
}

export default connect(
    ({MatchData}) => ({...MatchData}),
    {}
)(Home)
