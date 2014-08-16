define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/todo-list');

var TodoItemView = require('./todo-item-view').TodoItemView;

var TodoListView = marionette.CompositeView.extend({

    template: template,

    itemView: TodoItemView,

    itemViewContainer: '#todo-list',

    ui: {
        toggle: '#toggle-all'
    },

    events: {
        'click #toggle-all': 'onToggleAllClick'
    },

    initialize: function (options) {
        this.listenTo(
            this.collection,
            'all',
            this.updateToggleCheckbox,
            this);
    },

    onRender: function () {
        this.updateToggleCheckbox();
    },

    updateToggleCheckbox: function () {
        var allCompleted = this.collection.reduce(function (lastModel, thisModel) {
            return lastModel && thisModel.get('completed');
        }, true);

        this.ui.toggle.prop('checked', allCompleted);
    },

    onToggleAllClick: function (event) {
        var isChecked = event.currentTarget.checked;

        this.collection.each(function (todo) {
            todo.save({ completed: isChecked });
        });
    }

});

exports.TodoListView = TodoListView;

});
