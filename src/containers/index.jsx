import React from 'react'
import css from '../styles/land.styl'
import Menu from '../components/Menu.jsx'
import Home from '../components/Home.jsx'

export default class App extends React.Component{

  render(){
    return(
      <div className="container">
        <Menu/>
        <section className="content">
            <Home/>
        </section>

      </div>
    );
  }
}
