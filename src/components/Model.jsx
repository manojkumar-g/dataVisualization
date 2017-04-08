import React from 'react'
import teams from '../utils/teams'
import range from 'lodash/range'

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
  // componentWillReceiveProps(nextProps){
  //   let {data} = nextProps
  //   if(data.length >0){
  //     this.setState({
  //       season : data.map(({key})=> ({key,isSelected:false}))
  //     })
  //   }
  // }
  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.props.data.length > 0)
  //     return true
  //   return false
  // }
  toggleSeason = (key) =>{

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
                <li key = {'season'+key}>{key}</li>
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
                <li key = {'team1'+key}>{key.split(' ').map(m => m.charAt(0))}</li>
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
                <li key = {'team2'+key}>{key.split(' ').map(m => m.charAt(0))}</li>
              )
            }
          </ul>
        </article>
        <article className="seasonsubmit">
          <h1>Submit</h1>
        </article>
      </section>
    )
  }
}
