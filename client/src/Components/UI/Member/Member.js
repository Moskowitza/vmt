import React, { PureComponent } from 'react';
import clickOutside from 'react-click-outside';
import classes from './member.css';
import Avatar from '../Avatar/Avatar';
import Aux from '../../HOC/Auxil';
import PositionedBox from '../Edit/PositionedBox';
import EditMember from './EditMember';
class Member extends PureComponent {

  state = {
    role: this.props.info.role,
    editing: false,
    changing: false,
    x: 0,
    y: 0,
  }

  componentWillUnmount() {

  }

  edit = event => {
    console.log("turning editing mode on")
    this.setState({
      editing: true,
      x: event.pageX,
      y: event.pageY,
    })
  }

  changeRole = (event) => {
    const { changeRole, info } = this.props;
    this.setState({role: event.target.name, changing: true})
    info.role = event.target.name
    changeRole(info);
  }

  stopEditing = () => {
    this.setState({editing: false})
  }

  // handleClickOutside() {
  //   console.log("Clickoutside: ", this.props.info)
  //   // @QUESTION is this too @HACK y?
  //   setTimeout(() => {
  //     if (this.state.editing && this.state.changing) {
  //       setTimeout(() => this.setState({editing: false, changing: false}), 500)
  //     }
  //     else {this.setState({editing: false})}
  //   }, 0) // MOVE TO THE BACK OF THE CALLSTACK SO THE CHANGEROLE() EXECUTES FIRST - GUARANTEED
  // }

  render() {
    const { info, owner } = this.props;
    return (
      <Aux>
        {this.state.editing ?
          <PositionedBox hide={this.stopEditing} x={this.state.x} y={this.state.y}>
            <EditMember role={this.state.role} changeRole={this.changeRole}/>
          </PositionedBox> : null}
        <div className={classes.Container}>
          <div style={{margin: 20}}><Avatar username={info.user.username} /></div>
          <div className={classes.Row}>
            <div className={classes.Role}>{info.role}</div>
            {owner ? <div className={classes.Icon} onClick={this.edit}><i className="fas fa-edit"></i></div> : null}
          </div>
        </div>
      </Aux>
    )
  }
}

export default Member;
