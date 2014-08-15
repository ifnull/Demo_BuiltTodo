define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/todolayout');

var TodoList = require('../collections/todolist').TodoList;

var HeaderView = require('../views/header').HeaderView;
var FooterView = require('../views/footer').FooterView;
var ListCompositeView = require('../views/listcomposite').ListCompositeView;

var LayoutView = marionette.Layout.extend({

    template : template,
    regions: {
        header: '#header',
        main: '#main',
        footer: '#footer'
    }

});

todoList = new TodoList();

viewOptions = {
    collection: todoList
};

var layoutView = new LayoutView();

var header = new HeaderView(viewOptions);
var footer = new FooterView(viewOptions);
var main = new ListCompositeView(viewOptions);

layoutView.header.show(header);
layoutView.main.show(main);
layoutView.footer.show(footer);
todoList.fetch();

exports.LayoutView = LayoutView;

});
