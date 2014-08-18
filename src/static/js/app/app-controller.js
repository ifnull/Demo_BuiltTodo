define(function(require, exports, module) {

var $ = require('jquery');
var backbone = require('backbone');
var marionette = require('marionette');
var vent = require('built/app/vent').vent;
var modals = require('built/app/modals');
var activity = require('built/app/activity');
var keys = require('built/app/keys');
var app = require('app/app');

var TodoLayoutView = require('app/todos/views/todo-layout-view').TodoLayoutView;

var AppController = marionette.Controller.extend({

    initialize: function(options){
        this.BUILT();
        this.app = app;
    },

    index: function(filter){
        this.todoLayoutView = new TodoLayoutView({filter: filter});
        this.app.window.show(this.todoLayoutView);
    },

    BUILT: function(){

        keys.initialize({modals: modals});

        keys.registerInResponderChain(this);

        this.listenTo(vent, modals.events.PRESENT, this._presentModal);
        this.listenTo(vent, modals.events.DISMISS, this._dismissModal);

        this.listenTo(vent, activity.events.PRESENT, this._presentNetworkActivityIndicator);
        this.listenTo(vent, activity.events.DISMISS, this._dismissNetworkActivityIndicator);
    },

    _presentNetworkActivityIndicator: function(){
        throw new Error('No Activity Indicator View Specified');
        //this.app.activity.show(new YourActivityView);
    },

    _dismissNetworkActivityIndicator: function(modalView){
        this.app.activity.close();
    },

    _presentModal: function(modalView){
        this.app.modal.show(modalView);
    },

    _dismissModal: function(modalView){
        this.app.modal.close();
        modals.nextModal();
    }
});

exports.AppController = AppController;
});
