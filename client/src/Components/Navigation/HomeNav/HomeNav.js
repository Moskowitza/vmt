import React from 'react';
import NavItem from '../NavItem/NavItem';
import { Link } from 'react-router-dom';
import classes from './homeNav.css';
const navbar = (props) => {
  return (
    <nav className={classes.Nav}>
      <div className={classes.NavContainer}>
        <div className={classes.Logo}><Link to='/'>Logo</Link></div>
        <ul className={classes.NavList}>
          <NavItem link='/login' name='Login' />
          <NavItem link='/signup' name='Signup' />
          <NavItem link='/about' name='About' />
          <NavItem link='/tutorials' name='Tutorials' />
        </ul>
      </div>
    </nav>
  )
}

export default navbar;
