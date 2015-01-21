// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var stockMarketCell = module.exports = angular.module("stockMarketCell", []);

stockMarketCell.directive("stockMarketCell", function() {
	return {
		restrict: "A",
		scope: {
			value: '=*'
		},
		replace: true,
		template: '<td ng-class="{\'negative\': vals.negative }" title="{{getTitle()}}">' +
			'<span ng-show="!vals.invalid">{{vals.text}}</span>' + 
			'<img ng-src="/invalid_dollars.png" ng-if="vals.invalid"/>' + 
		'</td>',
		link: function(scope/*, element, attrs*/ ) {
			
			scope.vals = {};
			
			scope.value.renderTo({
				render: function ( values ) {
					scope.vals = angular.copy(values);
				}
			});
			
			scope.getTitle = function ( ) {
				return scope.vals.invalid ? scope.vals.tooltip : '';
			};
			
		}
	};
});
