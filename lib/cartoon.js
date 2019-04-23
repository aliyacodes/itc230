'use strict'

let cartoons = [
	{show: "south park", orignetwork: "comedy central", airdate: 1997},
	{show: "family guy", orignetwork: "fox", airdate: 1998},
	{show: "bob's burgers", orignetwork: "fox", airdate: 2011},
	{show: "rick and morty", orignetwork: "adult swim", airdate: 2013},
	{show: "american dad", orignetwork: "fox", airdate: 2005},
];

exports.getAll = () => {
	return cartoons;
};

exports.get = (show) => {
	return cartoons.find((item) => {
		return item.show === show;
	});
};
