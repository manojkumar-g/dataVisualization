import React from 'react'

export default class MatchTile extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    let {data} = this.props
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
                <span>
                  View Stats
                </span>

              </h3>
        </article>
      </div>
    )
  }
}
