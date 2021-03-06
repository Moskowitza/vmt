import React, { Component } from 'react';
import classes from './graph.css';
import Aux from '../../Components/HOC/Auxil';
import Modal from '../../Components/UI/Modal/Modal';
import Script from 'react-load-script';
import API from '../../utils/apiRequests'
class DesmosGraph extends Component {

  state = {
    loading: true,
    sendingEvent: false,
  }

  calculatorRef = React.createRef();

  onScriptLoad =  () => {
    this.calculator = window.Desmos.GraphingCalculator(this.calculatorRef.current);
    const { events, desmosLink } = this.props.room;
    if (events.length > 0) {
      this.calculator.setState(events[events.length - 1].event)
      this.setState({loading: false})
      this.initializeListeners()
    } else if (desmosLink) {
      // @TODO This will require some major reconfiguration / But what we shoould do is
      // when the user creates this room get teh state from the link and then just save it
      // as as event on this model.
      API.getDesmos(desmosLink)
      .then(res => {
        this.calculator.setState(res.data.result.state)
        console.log("CALCULATOR: ", this.calculator)
        // console.
        this.setState({loading: false})
        this.initializeListeners()

      })
      .catch(err => console.log(err))
    }
    else {
      console.log('no initial state')
      this.initializeListeners()
      this.setState({loading: false})
    }
  }

  initializeListeners(){
    // INITIALIZE EVENT LISTENER
    this.calculator.observeEvent('change', () => {
      if (!this.state.receivingEvent) {
        const newData = {
          room: this.props.room._id,
          event: this.calculator.getState(),
          user: {_id: this.props.user._id, username: this.props.user.username},
          timestamp: new Date().getTime()
        }
        console.log(newData.timestamp)
        this.props.socket.emit('SEND_EVENT', newData, res => {
          console.log(res)
        })
      } else {
        // @TODO CONSIDER DOING THIS AS JUST A PROPERTY OF THIS CLASS AND NOT A PROPERTY
        // OF STATE ... WE DON"T REALLY NEED RE_RENDERS HERE
        this.setState({receivingEvent: false})
      }
      // this.socket.emit('SEND_EVENT', event)
    })
    this.props.socket.on('RECEIVE_EVENT', data => {
      this.setState({receivingEvent: true})
      console.log(JSON.parse(data.event))
      this.calculator.setState(JSON.parse(data.event))
    })
  }

  render() {
    return (
      <Aux>
        <Script url='https://www.desmos.com/api/v1.1/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6' onLoad={this.onScriptLoad} />
        <div className={classes.Graph} style={{height: window.innerHeight - 300}} id='calculator' ref={this.calculatorRef}></div>
        <Modal show={this.state.loading} message='Loading...'/>
      </Aux>
    )
  }
}

export default DesmosGraph;
