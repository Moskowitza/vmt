import * as actionTypes from './actionTypes';
import { updateUserCourses, updateUserCourseTemplates } from './user';
import { createdCourseTemplate } from './courseTemplates';
import API from '../../utils/apiRequests';


//@TODO HAVE MORE ACTIONS HERE FOR TRACKING STATUS OF REQUEST i.e. pending erro success
export const gotCourses = (courses, courseIds) => ({
  type: actionTypes.GOT_COURSES,
  courses,
  courseIds,
})

export const updateCourse = course => ({
  type: actionTypes.UPDATE_COURSE,
  course,
})

export const clearCurrentCourse = () => ({
  type: actionTypes.CLEAR_COURSE,
})

export const createdCourse = resp => {
  return {
    type: actionTypes.CREATED_COURSE,
    course: resp,
  }
}

export const updateCourseRooms = room => {
  return {
    type: actionTypes.UPDATE_COURSE_ROOMS,
    room,
  }
}


export const getCourses = () => {
  return dispatch => {
    API.get('course')
    .then(res => {
      const courses = res.data.results.reduce((acc, current) => {
        acc[current._id] = current;
        return acc;
      }, {});
      const courseIds = Object.keys(courses)
      dispatch(gotCourses(courses, courseIds))
    })
    .catch(err => console.log(err));
  }
}

export const getCurrentCourse = id => {
  return dispatch => {
    API.getById('course', id)
    .then(res => {
      console.log(res.data.result)
      dispatch(updateCourse(res.data.result))})
    .catch(err => console.log(err))
  }
}

export const createCourse = body => {
  return dispatch => {
    API.post('course', body)
    .then(res =>{
      console.log(res.data.result)
      if (body.template) {
        dispatch(updateUserCourseTemplates(res.data.result[1]._id))
        dispatch(createdCourse(res.data.result[0]))
        dispatch(createdCourseTemplate(res.data.result[1]))
        console.log('template')
        // NB If we're creating a template we're going to get back two results in an array (the course that was created & then template that was created)
        return dispatch(updateUserCourses(res.data.result[0]._id))
      }
      const id = res.data.result._id;
      dispatch(createdCourse(res.data.result))
      return dispatch(updateUserCourses(id))
    })
    .catch(err => console.log(err))
  }
}
