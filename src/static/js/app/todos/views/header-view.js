define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/header');

var HeaderView = marionette.ItemView.extend({

    template: template,

    ui: {
        input: '#new-todo'
    },

    events: {
        'keypress #new-todo': 'onInputKeypress'
    },

    onInputKeypress: function (event) {
        var ENTER_KEY = 13;
        var todoText = this.ui.input.val().trim();

        if (event.which === ENTER_KEY && todoText) {
            this.collection.create({
                title: todoText
            });

            this.ui.input.val('');
        }
    }

});

exports.HeaderView = HeaderView;

});
