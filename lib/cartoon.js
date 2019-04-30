'use strict'

let cartoons = [
	{show: "south park", network: "comedy central", airdate: 1997},
	{show: "family guy", network: "fox", airdate: 1998},
	{show: "bob's burgers", network: "fox", airdate: 2011},
	{show: "rick and morty", network: "adult swim", airdate: 2013},
	{show: "american dad", network: "fox", airdate: 2005},
];

exports.getAll = () => {
	return cartoons;
};

exports.get = (show) => {
	return cartoons.find((item) => {
		return item.show === show;
	});
};

exports.delete = (show) => {
	const oldLength = cartoons.length;
	cartoons = cartoons.filter((item) => {
		return item.show !== show;
	});
	return {deleted: oldLength !== cartoons.length, total: cartoons.length };
};