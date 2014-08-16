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

    initialize: function(filter){
        this.todos = new Todos();
        this.filter = filter.filter;
    },

    onShow: function() {
        var viewOptions = {
            collection: this.todos,
            filter: this.filter
        };

        var headerView = new HeaderView(viewOptions);
        var todoListView = new TodoListView(viewOptions);
        var footerView = new FooterView(viewOptions);

        this.header.show(headerView);
        this.main.show(todoListView);
        this.footer.show(footerView);

        if(typeof this.filter !== 'undefined'){
            footerView.updateFilterSelection(this.filter);
            // document.getElementById('todoapp').className = 'filter-' + (filter === '' ? 'all' : filter);
        } else {
            todoListView.$el.toggle(this.todos.length > 0);
            footerView.$el.toggle(this.todos.length > 0);
        }

        this.todos.fetch();
    }

});

exports.TodoLayoutView = TodoLayoutView;

});
