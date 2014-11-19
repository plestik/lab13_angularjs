// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var stockMarketTable = require("./stock_market_table.js");
var StockMarketProjection = require("../domain/stock_market_projection.js");
var StockMarketYear = require("../domain/stock_market_year.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var GrowthRate = require("../values/growth_rate.js");
var TaxRate = require("../values/tax_rate.js");

describe("StockMarketTable", function() {

	var $compile;
	var $rootScope;
	var firstYear;
	var parentScope;
	var rows;

	beforeEach(angular.mock.module(stockMarketTable.name));

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;

		firstYear = new StockMarketYear(
			new Year(2010),
			new ValidDollars(10000),
			new ValidDollars(3000),
			new GrowthRate(10),
			new TaxRate(25)
		);
		var projection = new StockMarketProjection(firstYear, new Year(2050), new ValidDollars(36));

		parentScope = $rootScope.$new();
		parentScope.projection = projection;
		rows = createTable("projection");
	}));

	it("renders first year", function() {
		checkDirective(
			rows[0],
			'<tr stock-market-row value="firstYear"></tr>',
			"firstYear",
			firstYear
		);
	});

	// test that it changes when projection changes

	function checkDirective(actual, expectedHtml, propertyName, expectedValue) {
		var expectedRendering = renderRow(expectedHtml, propertyName, expectedValue);
		var actualRendering = actual.outerHTML;
		expect(actualRendering).to.equal(expectedRendering);
	}

	function createTable(property) {
		var html = "<stock-market-table projection='" + property + "'></stock-market-table>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();
		return element.find("tbody").find("tr");
	}

	function renderRow(html, propertyName, expectedValue) {
		var expectedScope = $rootScope.$new();
		expectedScope[propertyName] = expectedValue;
		var element = $compile("<table><tbody>" + html + "</tbody></table>")(expectedScope);
		expectedScope.$digest();
		return element.find("tr")[0].outerHTML;
	}
});