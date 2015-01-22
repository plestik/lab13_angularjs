// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationField = module.exports = angular.module("configurationField", []);
	var UserEnteredDollars = require("../values/user_entered_dollars.js");

	configurationField.directive("configurationField", function() {

		return {
			restrict: "E",
			transclude: true,
			scope: {
				value: "="
			},
			link: function ( scope, element, attrs ) {
				
				scope.values = {};
				scope.input = '';
				
				scope.$watch('value', function ( ) {
					scope.value.renderTo({
						render: function ( values ) {
							scope.values = angular.copy(values);
						}
					});	
					scope.input = scope.value.getUserText();
				});
				
				scope.onInputChange = function ( ) {
					scope.value = new UserEnteredDollars(scope.input);	
				};
				
			},
			template:
				'<div class="config">' +
				' <label ng-transclude></label>' +
				' <input type="text" ng-class="{ invalid: values.invalid }" ng-model="input" ng-change="onInputChange()" title="{{values.tooltip}}">' +
				'</div>',
			replace: true
		};

	});

})();
