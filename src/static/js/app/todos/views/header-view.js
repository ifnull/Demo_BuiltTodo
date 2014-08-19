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
          headerView: this,
          insertNewline: this._keyNavigationReturn,
          cancelOperation: this._keyNavigationEscape,
       });
    },

    _keyNavigationReturn: function(callback, event) {
        var todoText = callback.headerView.ui.input.val().trim();
        if (todoText) {
            callback.headerView.collection.create({
                title: todoText
            });

            callback.headerView.ui.input.val('');
        }
    },

    _keyNavigationEscape: function(callback, event) {
        callback.headerView.ui.input.val('');
    },

});

exports.HeaderView = HeaderView;

});
