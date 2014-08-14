define(function (require, exports, module) {

var backbone = require('backbone');
var marionette = require('marionette');
var template = require('hbs!../templates/footer');

var ActiveCountView = require('./activecount').ActiveCountView;
var CompletedCountView = require('./completedcount').CompletedCountView;

var FooterView = marionette.Layout.extend({

    template: template,

    regions: {
        activeCount: '#todo-count',
        completedCount: '#clear-completed'
    },

    ui: {
        filters: '#filters a'
    },

    events: {
        'click #clear-completed' : 'onClearClick'
    },

    onRender: function () {
        this.activeCount.show(new ActiveCountView({ collection: this.collection }));
        this.completedCount.show(new CompletedCountView({ collection: this.collection }));
    },

    updateFilterSelection: function (filter) {
        this.ui.filters
            .removeClass('selected')
            .filter('[href="#/' + filter + '"]')
            .addClass('selected');
    },

    onClearClick: function () {
        window.app.vent.trigger('todoList:clear:completed');
    }

});

exports.FooterView = FooterView;

});
