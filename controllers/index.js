const activity = require('./ActivityController');
const course = require('./CourseController');
const message = require('./MessageController');
const room = require('./RoomController');
const tab = require('./TabController');
const team = require('./TeamController');
const user = require('./UserController');
const event = require('./eventController');
const courseTemplate = require('./courseTemplateController');
const roomTemplate = require('./roomTemplateController');

module.exports = {
  activity,
  course,
  courseTemplate,
  message,
  room,
  roomTemplate,
  tab,
  team,
  user,
  event,
};
