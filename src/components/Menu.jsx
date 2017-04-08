import React from 'react'
import {Link} from 'react-router'

const Menu = ({toggleSeachBox,isOpen}) =>
    <nav className = 'menu'>
      <Link to={'/'}><div className = 'menuItem menuActive'><i className="fa fa-home" aria-hidden="true"></i></div></Link>
      <Link to={'/charts'}><div className = 'menuItem'><i className="fa fa-pie-chart" aria-hidden="true"></i></div></Link>
      <div className = {isOpen?'menuItem menuActive':'menuItem'} onClick = {toggleSeachBox} ><i className="fa fa-search" aria-hidden="true"></i></div>

    </nav>
export default Menu
