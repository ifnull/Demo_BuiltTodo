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
    },

    initialize: function(options){
        this.todoList = new TodoList();
    },

    onShow: function() {
        var viewOptions = {
            collection: this.todoList
        };

        this.header.show(new HeaderView(viewOptions));
        this.main.show(new FooterView(viewOptions));
        this.footer.show(new ListCompositeView(viewOptions));
        
        this.todoList.fetch();
    }

});


exports.LayoutView = LayoutView;

});
