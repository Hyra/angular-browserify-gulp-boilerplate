var angular = require('angular');

module.exports = function($compile) {
  var template = '<div>Just a {{placeholder}}</div>';
  return {
    scope: {
      list: '='
    },
    restrict: 'E',
    template: template,
    controller: function($scope) {
    	$scope.placeholder = 'Example Value';
    },
    link: function (scope, element) {
      var el = angular.element(template);
      el = $compile(el)(scope);
      angular.element(element[0]).append(el);
    }
  };
};
