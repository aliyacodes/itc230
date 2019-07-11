'use strict'
const expect = require("chai").expect;
const cartoon = require("../lib/cartoon");

describe("Cartoon", () => {

    it("returns requested cartoon", () => {
        let result = cartoon.get("south park");
        expect(result).to.deep.equal({show: "south park", network: "comedy central", airdate: 1997});
    });

    it("fails to return an w/ invalid cartoon", () => {
        let result = cartoon.get("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new cartoon", () => {
        let result = cartoon.add({show: "the office", network: "nbc", airdate: 2005});
        expect(result.added).to.be.true;
    });

    it("fails to add an existing cartoon", () => {
        let result = cartoon.add({show: "south park", network: "comedy central", airdate: 1997});
        expect(result.added).to.be.false;
    });

    it("deletes an existing cartoon", () => {
        let result = cartoon.delete("south park");
        expect(result.deleted).to.be.true;
    });
    it("fails to delete an invalid cartoon", () => {
        let result = cartoon.delete("frasier");
        expect(result.deleted).to.be.false;
    });

});

/*
let cartoons = [
    {show: "south park", network: "comedy central", airdate: 1997},
    {show: "family guy", network: "fox", airdate: 1998},
    {show: "bob's burgers", network: "fox", airdate: 2011},
    {show: "rick and morty", network: "adult swim", airdate: 2013},
    {show: "american dad", network: "fox", airdate: 2005},
];
*/