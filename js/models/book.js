/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var Book = Backbone.Model.extend({
        defaults: {
            title: '',
            isbn: '',
            buy_time: '',
            status: 'unread',
            bookStatus: function() {
                if (this.status === 'read') {
                    return '已读';
                }
                if (this.status === 'reading') {
                    return '在读';
                }
                return '未读';
            }
        }
    });

    return Book;
});