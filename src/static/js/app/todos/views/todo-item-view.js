define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/todo-item');

var KeyResponder = require('built/core/responders/keys').KeyResponder;

var TodoItemView = marionette.CompositeView.extend({

    tagName: 'li',

    template: template,

    value: '',

    ui: {
      edit: '.edit'
    },

    events: {
      'click .toggle': 'toggle',
      'click .destroy': 'destroy',
      'dblclick label': 'onEditDblclick',
      'keydown .edit': 'onEditKeyDown',
      'blur .edit': 'onEditBlur'
    },

    initialize: function () {
      this.value = this.model.get('title');
      this.listenTo(this.model, 'change', this.render, this);
      this.keyNavigation = new KeyResponder({
          el: this.$el,
          insertNewline: this._keyNavigationReturn,
          cancelOperation: this._keyNavigationEscape,
       });
    },

    _keyNavigationReturn: function(e) {
        this.ui.edit.trigger('blur');
    },

    _keyNavigationEscape: function(e) {
        this.ui.edit.val(this.model.get('title'));
        this.ui.edit.trigger('blur');
    },

    onRender: function () {
      this.$el
        .removeClass('active completed')
        .addClass(this.model.get('completed') ? 'completed' : 'active');
    },

    destroy: function () {
      this.model.destroy();
    },

    toggle: function () {
      this.model.toggle().save();
    },

    toggleEditingMode: function () {
      this.$el.toggleClass('editing');
    },

    onEditDblclick: function () {
      this.toggleEditingMode();
      this.ui.edit.focus().val(this.value);
    },

    onEditBlur: function (event) {
      this.value = event.target.value.trim();

      if (this.value) {
        this.model.set('title', this.value).save();
      } else {
        this.destroy();
      }

      this.toggleEditingMode();
    }

});

exports.TodoItemView = TodoItemView;

});
