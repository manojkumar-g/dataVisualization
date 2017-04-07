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
                  data={tableData[season].table}
                  x = 'name'
                  y = 'pts'
                  labels={(d) => Math.round(d.y)}
                  innerRadius={60}
                  labelRadius={74}
                  padAngle={3}
                  colorScale = {this.colorSchema()}
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
               textAnchor="middle" verticalAnchor="middle"
               x={150} y={150}
               style={{fontSize: 20,fill:'white',fontFamily:'Revalia'}}
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
                            <th>Form</th>
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
                                <td>
                                  <i className="fa fa-circle" aria-hidden="true" style = {{color:getColor(team.name)}}></i>
                                  {team.name}
                                </td>
                                <td>
                                  {team.played}
                                </td>
                                <td>{team.won}</td>
                                <td>{team.pts}</td>
                                <td>
                                  <svg viewBox = '0 0 450 300'>
                                  <VictoryLine
                                        data={[
                                          {month: "September", profit: 35000, loss: 2000},
                                          {month: "October", profit: 42000, loss: 8000},
                                          {month: "November", profit: 55000, loss: 5000}
                                        ]}
                                        padding = {0}
                                        style = {{data:{stroke:'red'},parent:{padding:0}}}
                                        x="month"
                                        standalone = {false}
                                        y={(datum) => datum.profit - datum.loss}
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
    ({MatchData}) => ({...MatchData}),
    {}
)(Home)
