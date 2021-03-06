const db = require('../models')

module.exports = {
  get: (params) => {
    return new Promise((resolve, reject) => {
      db.Message.find(params).populate('user')
      .then(messages => resolve(messages))
      .catch(err => reject(err));
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.Message.findById(id)
      .then(message => resolve(message))
      .catch(err => reject(err))
    });
  },

  post: (body) => {
    return new Promise((resolve, reject) => {
      console.log("COntroller: ",body)
      db.Message.create(body)
      .then(message => resolve(message))
      .catch(err => reject(err))
    })
  },

  put: (id, body) => {
    return new Promise((resolve, reject) => {
      console.log('body')
      db.Message.findByIdAndUpdate(id, body)
      .then(message => resolve(message))
      .catch(err => reject(err))
    })
  }
}
