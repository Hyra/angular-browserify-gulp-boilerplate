require('angular');
var uiRouter = require('ui-router');

var app = angular.module('myApp', [uiRouter]);

app
	.config(require('./states'))
	.constant('CONFIG', require('./config'))
	.service('ExampleService', require('./services/ExampleService'))
	.directive('sampleComponent', require('./directives/SampleDirective'))
