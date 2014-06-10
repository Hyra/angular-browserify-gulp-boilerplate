require('angular');
var uiRouter = require('ui-router');

var app = angular.module('myApp', [uiRouter]);

// var $ = jQuery = require('jquery');
// console.log($(document));
// var a = require('bootstrap-sass/vendor/assets/javascripts/bootstrap');
// console.log(a);

app
	.config(require('./states'))
	.constant('CONFIG', require('./config'))
	.service('ExampleService', require('./services/ExampleService'))
	.directive('sampleComponent', require('./directives/SampleDirective'))
