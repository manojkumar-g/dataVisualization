import React from 'react'
import teams from '../utils/teams'
import range from 'lodash/range'
import {Link} from 'react-router'

export default class Model extends React.Component {
  constructor(props) {
    super(props)
    let t = teams.map(team => ({key:team,isSelected:false}))
    this.state = {
      season :range(2008,2017).map( year => ({key:'ipl'+year,isSelected:false})),
      team1:t,
      team2:t
    }
  }
  toggleValue = (field,k) => {
    this.setState({
      [field]:this.state[field].map(
        ({key,isSelected}) => key === k ? ({key,isSelected:!isSelected}) : ({key,isSelected})
      )
    })
  }
  onSubmit = () => {
    let {season,team1, team2} = this.state
    this.props.setFilters(
                    {
                      season : season.filter(
                        ({isSelected}) => isSelected
                      ).map(({key}) => key),
                      team1 : team1.filter(
                        ({isSelected}) => isSelected
                      ).map(({key}) => key),
                      team2 : team2.filter(
                        ({isSelected}) => isSelected
                      ).map(({key}) => key)
                    }
    )
    this.props.toggleModel()
  }
  render(){
    let {tableData} = this.props
    let {season,team1,team2} = this.state
    return(
      <section className="modelData">
        <article className="seasonlist">
          <h1>Season</h1>
          <ul>
            {
              season.map(
                ({key,isSelected}) =>
                <li
                  key = {'season'+key}
                  onClick = {() => {this.toggleValue('season',key)}}
                  className = {isSelected ? 'isSelected':''}
                  >
                    {key}
                </li>
              )
            }
          </ul>
        </article>
        <article className="seasonlist">
          <h1>Team 1</h1>
          <ul>
            {
              team1.map(
                ({key,isSelected}) =>
                <li
                  key = {'team1'+key}
                  onClick = {() => {this.toggleValue('team1',key)}}
                  className = {isSelected ? 'isSelected':''}
                >
                  {key.split(' ').map(m => m.charAt(0))}
                </li>
              )
            }
          </ul>
        </article>
        <article className="seasonlist">
          <h1>Team 2</h1>
          <ul>
            {
              team2.map(
                ({key,isSelected}) =>
                <li
                  key = {'team2'+key}
                  onClick = {() => {this.toggleValue('team2',key)}}
                  className = {isSelected ? 'isSelected':''}
                  >
                    {key.split(' ').map(m => m.charAt(0))}
                  </li>
              )
            }
          </ul>
        </article>
        <article className="seasonsubmit">
          <Link to={'results'} onClick = {this.onSubmit}><h1>Submit</h1></Link>
        </article>
      </section>
    )
  }
}
