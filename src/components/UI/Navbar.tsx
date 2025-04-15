import React from 'react'
import { Link } from 'react-router-dom'
import * as classes from './Navbar.module.scss'

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
        <div className={classes.navbar__links}>
            <Link to="/ticketList">Ticket List</Link>
            <br />
            <Link to="/ticketStats">Ticket Statistics</Link>
        </div>
    </nav>
  )
}

export default Navbar