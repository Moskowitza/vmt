import React from 'react';
import classes from './breadCrumbs.css';
import glb from '../../../global.css';
import { Link } from 'react-router-dom';
const breadCrumbs = props => {
  const crumbs = props.crumbs.map((crumb, i)=> (
    <Link  key={i} className={glb.Link} to={crumb.link} style={{zIndex: 10 - i}}>
      <div className={classes.Crumb}>
        {crumb.title}
      </div>
    </Link>
  ))
  return (
    <div className={classes.CrumbContainer}>
      {crumbs}
    </div>
  )
}

export default breadCrumbs;
