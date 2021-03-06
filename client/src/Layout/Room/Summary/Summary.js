import React from 'react';
import classes from './summary.css';
import Button from '../../../Components/UI/Button/Button';
import ContentBox from '../../../Components/UI/ContentBox/ContentBox';
import { withRouter } from 'react-router-dom';
const summary = ({room, history, loading}) => {
  console.log("rendering summary")
  const clickHandler = () => {
    console.log('go to workspace')
    history.push(`/workspace/${room._id}`);
  }
  const goToReplayer = () => {history.push(`/workspace/${room._id}/replayer`)}
  return (
    <div className={classes.Container}>
      <div className={classes.Section}>
        <ContentBox align='left' title='Room Stats'>
          {/*CONSIDER: COULD REPLACE THESE 0'S WITH LOADING SPINNERS? */}
          <div>Current Members: {room.currentUsers ? room.currentUsers.length : 0}</div>
          <div>Total Events: {room.events ? room.events.length : 0}</div>
          <div>Total Messages: {room.chat ? room.chat.length : 0}</div>
        </ContentBox>
      </div>
      <div className={classes.Section}>
        {/* <div>Events: </div>{room.events ? room.events.length : 0} */}
      </div>
      {/*  Make sure we have all of the room info before letting the user enter */}
      {loading ? null :
      <div className={classes.Section}>
        <span className={classes.Button}><Button click={clickHandler}>Join</Button></span>
        <span className={classes.Button}><Button click={goToReplayer}>Replayer</Button></span>
      </div>
      }
    </div>
  )
}

export default withRouter(summary);
