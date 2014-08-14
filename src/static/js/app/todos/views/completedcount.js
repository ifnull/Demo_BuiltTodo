define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');

var CompletedCountView = marionette.Layout.extend({

    initialize: function () {
      this.listenTo(this.collection, 'all', this.render, this);
    },

    render: function () {
      this.$el = $('#clear-completed');

      var completedTodos = this.collection.getCompleted();

      this.$el
        .toggle(completedTodos.length > 0)
        .html('Clear completed (' + completedTodos.length + ')');
    }

});

exports.CompletedCountView = CompletedCountView;

});
