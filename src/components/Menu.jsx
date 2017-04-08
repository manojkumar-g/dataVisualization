import React from 'react'

const Menu = ({toggleSeachBox,isOpen}) =>
    <nav className = 'menu'>
      <div className = 'menuItem menuActive'><i className="fa fa-home" aria-hidden="true"></i></div>
      <div className = 'menuItem'><i className="fa fa-pie-chart" aria-hidden="true"></i></div>
      <div className = {isOpen?'menuItem menuActive':'menuItem'} onClick = {toggleSeachBox} ><i className="fa fa-search" aria-hidden="true"></i></div>

    </nav>
export default Menu
