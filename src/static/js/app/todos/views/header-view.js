define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/header');

var KeyResponder = require('built/core/responders/keys').KeyResponder;

var HeaderView = marionette.ItemView.extend({

    template: template,

    ui: {
        input: '#new-todo'
    },

    initialize: function () {
      this.keyNavigation = new KeyResponder({
          el: this.$el,
          ref: this,
          insertNewline: this._keyNavigationReturn,
          cancelOperation: this._keyNavigationEscape,
       });
    },

    _keyNavigationReturn: function(c,e) {
        var todoText = c.ref.ui.input.val().trim();
        if (todoText) {
            c.ref.collection.create({
                title: todoText
            });

            c.ref.ui.input.val('');
        }
    },

    _keyNavigationEscape: function(c,e) {
        c.ref.ui.input.val('');
    },

});

exports.HeaderView = HeaderView;

});
