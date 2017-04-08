import React from 'react'
import css from '../styles/result.styl'
import {connect} from 'react-redux'
import MatchTile from './MatchTile.jsx'

class Result extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <section className="results">
        <h1>Result</h1>
        <article className="allFilters">
            <div className ='filterType'>
              <h2>Seasons:</h2>
              <ul>
                {
                  this.props.filters.season.map(
                    x => <li key ={x+'season'}>{x}</li>
                  )
                }
              </ul>
            </div>
            <div className ='filterType'>
              <h2>Teams:</h2>
              <ul>
                {
                  this.props.filters.team1.map(
                    x => <li key ={x+'team'}>{x}</li>
                  )
                }
                {
                  this.props.filters.team2.map(
                    x => <li key ={x+'team'}>{x}</li>
                  )
                }
              </ul>
            </div>
        </article>
        <article className="filterResult">
          {
            this.props.resultData.map(
              (data) =>
                  <MatchTile key = {data.id+'filterResult'} data = {data}/>
            )
          }
        </article>
      </section>
    )
  }
}

export default connect (
  ({seasonData:{resultData,filters}}) => ({
    filters,resultData
  }),{}
)(Result)
