/*global require*/
'use strict';

require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        },
        ellipsis: {
            deps: ['jquery']
        },
        raty: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        text: '../bower_components/requirejs-text/text',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        ellipsis: '../bower_components/ellipsis/jquery.ellipsis',
        raty: '../bower_components/raty/jquery.raty'
    }
});

require([
    'backbone',
    'views/app',
    'routers/router'
], function (Backbone, AppView, Workspace) {
    // Initialize routing and start Backbone.history()
    new Workspace();
    Backbone.history.start();

    // Initialize the application view
    new AppView();
});