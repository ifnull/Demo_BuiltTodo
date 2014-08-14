define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var Todo = require('../models/todo').Todo;

var TodoList  =  backbone.Collection.extend({
    model: Todo,

    localStorage: new backbone.LocalStorage('todos-backbone'),

    getCompleted: function () {
      return this.where({completed: true});
    },

    getActive: function () {
      return this.where({completed: false});
    },

    comparator: 'created'
});

exports.TodoList = TodoList;

});
