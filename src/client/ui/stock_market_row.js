// Copyright (c) 2014-2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var StockMarketCell = require("./stock_market_cell.js");

	var stockMarketRow = module.exports = angular.module("stockMarketRow", [StockMarketCell.name]);

	stockMarketRow.directive("stockMarketRow", function() {
		return {
			restrict: "A",
			scope: {
				value: "="
			},
			template:
				'<tr>' +
					'<td stock-market-cell ng-repeat="val in values" value="val"></td>' + 
				'</tr>',
			replace: true,
			link: function ( scope, element, attrs ) {
				
				scope.values = [
					scope.value.year(),
					scope.value.startingBalance(),
					scope.value.startingCostBasis(),
					scope.value.totalSellOrders().flipSign(),
					scope.value.capitalGainsTaxIncurred().flipSign(),
					scope.value.growth(),
					scope.value.endingBalance()
				];
				
			}
		};
	});
})();

