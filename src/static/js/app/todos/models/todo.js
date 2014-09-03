define(function( require, exports, module ){

var backbone = require('backbone');

var Todo = backbone.Model.extend({

    defaults: {
        title: '',
        completed: false,
        created: 0
    },

    initialize: function () {
        if (this.isNew()) {
            this.set('created', Date.now());
        }
    },

    toggle: function () {
        return this.set('completed', !this.get('completed'));
    }
});

exports.Todo = Todo;

});
