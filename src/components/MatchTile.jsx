import React from 'react'
import {Motion,spring,presets} from 'react-motion'
import ScoreGraph from './ScoreGraph.jsx'

export default class MatchTile extends React.Component{
  constructor(props) {
    super(props)
    this.state = {show:false}
  }
  toggle = ()=>{
    this.setState({show:!this.state.show})
  }
  render(){
    let {data} = this.props
    let {show} = this.state
    return(
      <div className="matchTile" >
        <ul>
          <li>
            <i
              className="fa fa-map-marker loc" aria-hidden="true"></i>
              {data.city}
          </li>
          <li>
            <i className="fa fa-compass loc" aria-hidden="true"></i>
              {data.venue}
          </li>
          <li>
            <i className="fa fa-calendar loc" aria-hidden="true"></i>
              {data.date}
          </li>
        </ul>
        <article className="showcase">
          <h3>{data.team1}</h3>
          <h2>Vs</h2>
          <h3>{data.team2}</h3>
        </article>
        <article className="summ">
              <h2>
                <i className="fa fa-trophy" aria-hidden="true"></i>
                {
                  ' '+data.winner+ ' Won By '}
                {
                   data.win_by_runs != 0 ? data.win_by_runs+
                     ' Runs' :
                      data.win_by_wickets+' by Wickets'
                }
              </h2>
              <h5>Man of The Match : {data.player_of_match}</h5>
              <h5>
                Toss was won by {data.toss_winner} and decided to {data.toss_decision}
              </h5>
              <h3 className="stats">
                <span onClick = {this.toggle}>
                  View Stats
                </span>

              </h3>
        </article>
        <article className="toggler">

          <Motion
            style = {{
              height: spring(show ? 400 : 0),
              opacity: spring(show ? 1 : 0)
            }}
            >
            {
              ({height,opacity}) => <div className="hidefoot" style = {{height : height +'px',opacity}}>
                          {show && <ScoreGraph matchId = {data.id}/>}

                      </div>
            }
          </Motion>
        </article>

      </div>
    )
  }
}
