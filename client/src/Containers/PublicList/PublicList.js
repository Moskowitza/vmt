import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import * as actions from '../../store/actions/';
import BoxList from '../../Layout/BoxList/BoxList';
import Search from '../../Components/Search/Search';
import classes from './publicList.css';
let allResources = [];
class PublicList extends Component {
  state = {
    resources: [],
  }

  componentDidMount() {
    // get the rooms --> save them in the redux store
    if (Object.keys(this.props.publicRooms).length === 0){
      this.props.getCourses();
    }
    if (Object.keys(this.props.publicCourses).length === 0){
      this.props.getRooms();
    }
  }

  filterResults = value => {
    value = value.toLowerCase();
    const updatedResources = allResources.filter(resource => {
      return (
        resource.name.toLowerCase().includes(value) ||
        resource.description.toLowerCase().includes(value) ||
        resource.creator.toLowerCase().includes(value)
      )
    })
    this.setState({resources: updatedResources})
  }
  render () {
    console.log(this.state.resources)
    return (
      <div>
        <h2>{this.props.resource}</h2>
        <Search filter={value => this.filterResults(value)} />
        <div className={classes.Seperator}></div>
        {/* @ TODO Eventually remove dashboard...we want to have a public facing view
        that does not show up in  the dashboard. */}
        <Route path={`${this.props.match.url}/rooms`} render={(props => (
          <BoxList list={this.props.publicRooms} resource='rooms' dashboard={false}/>
        ))} />
        <Route path={`${this.props.match.url}/courses`} render={(props => (
          <BoxList list={this.props.publicCourses} resource='courses' dashboard={false}/>
        ))} />

          </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    publicRooms: store.roomsReducer.rooms,
    publicCourses: store.coursesReducer.courses,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getRooms: () => dispatch(actions.getRooms()),
    getCourses: () => dispatch(actions.getCourses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps,)(PublicList);
