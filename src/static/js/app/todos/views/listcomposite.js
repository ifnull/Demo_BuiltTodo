define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/listcomposite');

var ItemView = require('./item').ItemView;

var ListCompositeView = marionette.CompositeView.extend({

    template: template,

    itemView: ItemView,

    itemViewContainer: '#todo-list',

    ui: {
        toggle: '#toggle-all'
    },

    events: {
        'click #toggle-all': 'onToggleAllClick'
    },

    initialize: function () {
        this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);
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

exports.ListCompositeView = ListCompositeView;

});
