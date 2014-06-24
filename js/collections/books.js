/*global define*/
define([
    'underscore',
    'backbone',
    'models/book'
], function (_, Backbone, Book) {
    'use strict';

    var BooksCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Book,

        url: 'data/books.json'
    });

    return BooksCollection;
});