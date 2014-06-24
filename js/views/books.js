/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/books.html'
], function ($, _, Backbone, booksTemplate) {
    'use strict';

    var BooksView = Backbone.View.extend({

        template: _.template(booksTemplate),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return BooksView;
});