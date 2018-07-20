import React, { Component } from 'react';
import NewCourse from './NewCourse/NewCourse';
import BoxList from '../../Layout/BoxList/BoxList';
import Filter from '../../Components/UI/Button/Filter/Filter';
import classes from './courses.css';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';

class Courses extends Component {
  // @TODO Toggling myCourses doesn't work
  // local state describing which courses should be displayed
  // all, or just the user's
  state = {
    allCourses: true,
  }
  componentDidMount() {
    console.log('rerender of courses triggered')
    // only dispatch action if we need to
    if (!this.props.courses.length) {
      this.props.getCourses();
    }
  }

  filter = event => {
    event.preventDefault();
    const allCourses = this.state.allCourses;
    this.setState({allCourses: !allCourses})
  }

  render() {
    const courses = this.state.allCourses ? 'courses' : 'myCourses';
    const list = this.props[courses];
    return (
      <div>
        <div>
          {(this.props.match.path === '/courses/new') ?
            <NewCourse
              createCourse={this.props.createCourse}
              userId={this.props.userId}
              updateUserCourses={this.props.updateUserCourses}
              myRooms={this.props.myRooms}
              rooms={this.props.rooms}
            /> : null}
        </div>
        <div className={classes.Filters}>
          <Filter click={this.filter} on={this.state.allCourses}>
            {this.state.allCourses ? 'Show courses created by me' : 'Show public courses'}
          </Filter>
        </div>
        <div>
          <BoxList list={list} resource='course'/>
            </div>
      </div>
    )
  }
}

// connect react functions to redux actions
const mapDispatchToProps = dispatch => {
  return {
    getCourses: () => dispatch(actions.getCourses()),
    createCourse: body => dispatch(actions.createCourse(body)),
    updateUserCourses: newCourse => dispatch(actions.updateUserCourses(newCourse)),
  }
}

// connect redux store to react props
const mapStateToProps = store => {
  console.log(store.roomsReducer)
  return {
    courses: store.coursesReducer.courses,
    myCourses: store.userReducer.myCourses,
    username: store.userReducer.username,
    myRooms: store.userReducer.myRooms,
    rooms: store.roomsReducer.rooms,
    userId: store.userReducer.userId
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Courses);
