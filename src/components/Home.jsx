import React from 'react'
import range from 'lodash/range'
import sortBy from 'lodash/sortBy'
import css from '../styles/home.styl'
import { connect } from 'react-redux'
import {
  VictoryPie,
  VictoryTransition,
  VictoryContainer,
  VictorySharedEvents,
  VictoryLabel,
  VictoryLine
} from 'victory'
import Dot from './Dot.jsx'
import { getColor } from '../utils/colors'


class Home extends React.Component {
    constructor(props){
      super(props);
      this.state = { data : [] ,season:0,interest : 'Royal Challengers Bangalore'}
    }
    componentDidMount(){
      this.setStateInterval = window.setInterval(
        () => {
          let {tableData} = this.props
          let {season} = this.state
          this.setState({season : season+1 < tableData.length ?  season+1 : 0})
      },6000
      )
    }
    componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }
    colorSchema = () => {
      let {tableData} = this.props
      let {season} = this.state
      if(tableData.length > 0){
        return tableData[season].table.map(
          ({name}) => {
            return getColor(name)
          }
        )
      }
    }
    onDotClick = (season) =>{
      this.setState({
        season
      })
    }
    changeInterest = (interest) =>{
      this.setState({interest})
    }
    render(){
      let { tableData,teamForm } = this.props
      let { season, interest } = this.state
      return(
        <section className="homeContent">
            <section className="summary">
              <h1>IPL 2008-16</h1>
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
                  onExit: {
                        duration: 1000,

                      },
                  onLoad: {
                        duration: 1000,

                      },
                  onEnter: {
                        duration: 100,
                        after: () => {
                          return{y: 0}

                        }
                      }
                }}
                >

                <VictoryPie

                  width={300}
                  height={300}
                  standalone={false}
                  data={sortBy(tableData[season].table,['name'])}
                  x = 'name'
                  y = 'pts'
                  labels={(d) => Math.round(d.y)}
                  innerRadius={60}
                  labelRadius={74}
                  padAngle={3}
                  colorScale = {'qualitative'}
                  style={{
                    data: {
                      width: 60,
                      stroke:({x}) => x === interest ? '#B10DC9':'',
                      strokeWidth: ({x}) => x === interest ? 5:0
                    },
                    labels: {
                      fill: 'black',
                      fontSize: 20
                    }
                  }} />
              </VictoryTransition>

             <VictoryLabel
               textAnchor="middle" verticalAnchor="middle"
               x={150} y={150}
               style={{fontSize: 20,fill:'white',fontFamily:'Ubuntu'}}
               text={tableData[season].key.toUpperCase()}
             />
               </svg>

              }
              </article>
              <article className = 'table'>
                {
                  tableData.length ===0 ? '':
                      <div className = 'tableData'>
                        <table>
                          <thead>
                          <tr>
                            <th></th>
                            <th>Team</th>
                            <th>Pld</th>
                            <th>Won</th>
                            <th>pts</th>
                            <th>Pulse</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            tableData[season].table.sort(
                              (a,b) => b.pts-a.pts
                            ).map(
                              (team,no) =>
                              <tr key = {'table'+no}>
                                <td>{no+1}</td>
                                <td style = {{cursor:'pointer'}}
                                  className = {team.name === interest ?'teamName teamlike':'teamName'}
                                  onClick = {
                                    ()=>this.changeInterest(team.name)
                                  }
                                  >

                                  {team.name}
                                  {team.name === interest ?<i className="fa fa-heart liked" aria-hidden="true"></i>:''}
                                </td>
                                <td>
                                  {team.played}
                                </td>
                                <td>{team.won}</td>
                                <td>{team.pts}</td>
                                <td>
                                  <svg viewBox = '0 0 450 300'>

                                  <VictoryLine
                                        data = {(() =>{
                                          let pts = 0
                                          return teamForm[season].table.filter(
                                            ({name}) => team.name === name
                                          )[0].data.map(
                                            ({result},x) => {
                                              if(result ==='W')
                                                pts = pts+2
                                              if(result === 'L') {
                                                pts = pts -2
                                              }
                                              if(result === 'D') {
                                                pts = pts+1
                                              }
                                              return {x,y:pts}
                                            }
                                          )

                                        })()}
                                        interpolation="basis"
                                        padding = {0}
                                        style = {{data:{stroke:getColor(team.name)},parent:{padding:0}}}

                                        standalone = {false}
                                      />
                                    </svg>
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                        </table>
                      </div>
                }


              </article>
            </section>
        </section>
      );
    }
}

export default connect(
    ({seasonData}) => ({...seasonData}),
    {}
)(Home)
