import React from 'react'
import axios from 'axios'
import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryScatter
} from 'victory'

export default class ScoreGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      firstInd:[],
      secondInd:[],
      isLoading:true,
      data:[]
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
        data:{}
      }

    }
    return(
      <section className="scoreGraphy">
        <header className="graphHead">

        </header>
        <svg style={styles.parent} viewBox="0 0 450 350">
        <g transform={"translate(-100, 40)"}>
        <VictoryChart standalone = {false}>
          <VictoryAxis
            style = {styles.xAxis}
            paddin = {0}
            samples = {20}
            domain = {[0,21]}
          />
          <VictoryAxis
              dependentAxis
              domain={[0, 250]}
              orientation="left"
              standalone={false}
              style={styles.yAxis}
            />
            <VictoryLine
              interpolation="basis"
              padding = {0}
              style = {{data:{stroke:'#F012BE',strokeWidth:5,opacity:0.7},parent:{padding:0}}}
            />
            <VictoryScatter></VictoryScatter>
        </VictoryChart>

      </g>
        </svg>
      </section>
    )
  }
}
