/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/books',
    'views/books',
    'text!templates/info.html',
    'bootstrap',
    'ellipsis',
    'raty'
], function ($, _, Backbone, Books, BooksView, infoTemplate) {
    'use strict';

    // Our overall **AppView** is the top-level piece of UI.
    var AppView = Backbone.View.extend({

        el: '#app',

        template: _.template(infoTemplate),

        info: {
            all: 0,
            read: 0,
            reading: 0,
            unread: 0
        },

        books: new Books(),

        initialize: function() {
            this.$info = this.$('#info');
            this.$list = this.$('#list');

            this.listenTo(this.books, 'reset', this.addAll);

            this.books.fetch({reset: true});
        },

        render: function() {
        },

        addAll: function() {
            this.$list.html('');
            this.books.each(this.addOne, this);

            this.$info.html(this.template(this.info));

            this.$list.find('.raty').each(function() {
                $(this).raty({
                    number: $(this).data('number'),
                    score: $(this).data('score'),
                    readOnly: true,
                    starHalf: 'bower_components/raty/images/star-half.png',
                    starOff: 'bower_components/raty/images/star-off.png',
                    starOn: 'bower_components/raty/images/star-on.png'
                });
            });
            this.$list.find('.ellipsis').each(function() {
                $(this).attr('title', $(this).text()).ellipsis({row: $(this).data('row')});
            });
        },

        addOne: function(book) {
            var view = new BooksView({model: book});
            this.$list.append(view.render().el);
            this.info.all += book.get('count');
            this.info[book.get('status')] += book.get('count');
        }
    });

    return AppView;
});