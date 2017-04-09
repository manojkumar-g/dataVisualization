import React from 'react'
import axios from 'axios'
import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryLabel,
  VictoryTooltip
} from 'victory'

export default class ScoreGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      firstInd:[],
      secondInd:[],
      isLoading:true,
      teamOne:'',
      teamTwo:''
    }
  }
  componentDidMount(){
    console.log(this.props.matchId);
    this.setState({isLoading:true})
    axios.get('/api/deliveries/'+this.props.matchId)
        .then(
          ({data}) => {
            this.setState({isLoading:false,data})
            this.parseData(data)
          }
        )
  }
  parseData = (data) => {
        this.setState({
          firstInd : data.filter(
            ({inning}) => inning == 1
          ),
          secondInd:  data.filter(
            ({inning}) => inning == 2
          ),
          teamOne:data[0]['batting_team'],
          teamTwo:data[0]['bowling_team']

        })
  }
  render(){
    let styles = {
      parent :{
        background: "r",
        boxSizing: "border-box",
        padding: 0,
        margin: 0,
        fontFamily: "Ubuntu",
        width: "100%",
        height: "400px"
      },
      xAxis:{
        axis: { stroke: "white", strokeWidth: 2, width :'100%'},
        tickLabels: {
          fill: "white",
          fontFamily: "Ubuntu",
          fontSize: 16
        }
      },
      yAxis:{
        axis: { stroke: "white", strokeWidth: 2, width :'100%'},
        ticks: {stroke: "grey"},
        tickLabels: {
          fill: "white",
          fontFamily: "Ubuntu",
          fontSize: 16
        }
      },
      teamOne:{
        data:{stroke:'#F012BE',strokeWidth:5,strokeOpacity:0.7},
        parent:{padding:0}
      },
      teamTwo:{
        data:{stroke:'#FF851B',strokeWidth:5,strokeOpacity:0.7},
        parent:{padding:0}
      },
      wickets:{
        data:{stroke:'#D13F19',strokeWidth:5,strokeOpacity:0.7},
        parent:{padding:0}
      }

    }
    let {firstInd,secondInd,teamOne,teamTwo} = this.state

    return(
      <section className="scoreGraphy">
        <header className="graphHead">

        </header>
        <svg style={styles.parent} viewBox="0 0 450 350">
          <rect x="370" y="50" width="10" height="10" fill="#F012BE"/>
          <rect x="370" y="70" width="10" height="10" fill="#FF851B"/>
          <VictoryLabel x={370+20} y={55}
            text={teamOne} style = {{fill:'#F012BE'}}
          />
          <VictoryLabel x={370+20} y={75}
            text={teamTwo} style = {{fill:'#FF851B'}}
          />
        <g transform={"translate(-100, 40)"}>
        <VictoryChart standalone = {false}

          >
          <VictoryAxis
            style = {styles.xAxis}
            paddin = {0}
            samples = {20}
            domain = {[0,130]}
          />
          <VictoryAxis
              dependentAxis
              domain={[0, 250]}
              orientation="left"
              standalone={false}
              style={styles.yAxis}
            />
            <VictoryLine
              animate={{ duration: 1000, easing: "linear"}}
              data = {(() =>{
                let score = 0
                 return firstInd.map(
                  ({total_runs},x) => {
                    score = score+parseInt(total_runs)
                    return {x,y:score}
                  })


              })()}
              interpolation="basis"
              padding = {0}
              style = {styles.teamOne}
            />
            <VictoryLine
              animate={{ duration: 2000, easing: "linear"}}
              data = {(() =>{
                let score = 0
                 return secondInd.map(
                  ({total_runs},x) => {
                    score = score+parseInt(total_runs)
                    return {x,y:score}
                  })
              })()}
              interpolation="basis"
              padding = {0}
              style = {styles.teamTwo}
            />
            <VictoryScatter
              labelComponent={<VictoryTooltip/>}
              animate={{ duration: 2000, easing: "linear"}}
              data = {(() =>{
                let score = 0
                 return firstInd.map(
                  ({total_runs,player_dismissed,bowler,dismissal_kind,fielder},x) => {
                    score = score+parseInt(total_runs)
                    return {x,
                      y:score,
                      label:player_dismissed+'\n b '+bowler+'\n'+dismissal_kind+' '+fielder,
                      isWicket:player_dismissed.length > 0
                    }
                  }).filter(
                    ({isWicket}) => isWicket
                  )
              })()}

              style = {styles.teamOne}
            />
            <VictoryScatter
              labelComponent={<VictoryTooltip/>}
              animate={{ duration: 2000, easing: "linear"}}
              data = {(() =>{
                let score = 0
                 return secondInd.map(
                  ({total_runs,player_dismissed,bowler,dismissal_kind,fielder},x) => {
                    score = score+parseInt(total_runs)
                    return {x,
                      y:score,
                      label:player_dismissed+'\n b '+bowler+'\n'+dismissal_kind+' '+fielder,
                      isWicket:player_dismissed.length > 0
                    }
                  }).filter(
                    ({isWicket}) => isWicket
                  )
              })()}
              style = {styles.teamTwo}
            />

        </VictoryChart>

      </g>
        </svg>
      </section>
    )
  }
}
