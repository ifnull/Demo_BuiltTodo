define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/todo-layout');

var Todos = require('../collections/todos').Todos;

var HeaderView = require('../views/header-view').HeaderView;
var FooterView = require('../views/footer-view').FooterView;
var TodoListView = require('../views/todo-list-view').TodoListView;

var TodoLayoutView = marionette.Layout.extend({

    template : template,
    regions: {
        header: '#header',
        main: '#main',
        footer: '#footer'
    },

    initialize: function(options){
        this.todos = new Todos();
    },

    onShow: function() {
        var viewOptions = {
            collection: this.todos
        };

        this.header.show(new HeaderView(viewOptions));
        this.main.show(new FooterView(viewOptions));
        this.footer.show(new TodoListView(viewOptions));
        
        this.todos.fetch();
    }

});

exports.TodoLayoutView = TodoLayoutView;

});
