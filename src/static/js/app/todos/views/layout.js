define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/todolayout');

var todoList = require('../collections/todolist').TodoList;

var HeaderView = require('../views/header').HeaderView;
var FooterView = require('../views/footer').FooterView;
var ListCompositeView = require('../views/listcomposite').ListCompositeView;

var TodoLayoutView = marionette.Layout.extend({

    template : template,
    regions: {
        header: '#header',
        main: '#main',
        footer: '#footer'
    }

});

var viewOptions = {
    collection: todoList
};

var header = new HeaderView(viewOptions);
var footer = new FooterView(viewOptions);
var main = new ListCompositeView(viewOptions);

TodoLayoutView.addInitializer(function () {
    TodoLayoutView.header.show(header);
    TodoLayoutView.main.show(main);
    TodoLayoutView.footer.show(footer);

    todoList.fetch();
});

exports.TodoLayoutView = TodoLayoutView;

});
