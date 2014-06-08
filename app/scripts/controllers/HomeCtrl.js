'use strict';

module.exports = function($scope, ExampleService, CONFIG) {
	
		$scope.pageTitle = 'Home Page';

		$scope.serviceVar = ExampleService.getVar();

		$scope.version = CONFIG.APP_VERSION;

		$scope.clickHandler = function() {
			ExampleService.setVar('New Value');
		};

};
