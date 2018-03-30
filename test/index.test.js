'use strict';
const Trie = require('../index');
const _ = require('lodash');
const CONSTANT = require('../src/constants/trie');

describe('node-trie', function () {
    it('should instantiate Trie', () => {
        const trie1 = new Trie();
        expect(_.isEmpty(trie1._getFirstLevelMap())).equal(true);
        expect((trie1._hasDelimiter())).equal(false);
    });
    it('should instantiate Trie with count delimiter', () => {
        const trie2 = new Trie({ delimiter: 2 });
        expect(_.isEmpty(trie2._getFirstLevelMap())).equal(true);
        expect((trie2._hasDelimiter())).equal(true);
        expect((trie2._getDelimiterType())).equal(CONSTANT.COUNT_MATCH);
    });
    it('should instantiate Trie with string delimiter', () => {
        const trie3 = new Trie({ delimiter: ' ' });
        expect(_.isEmpty(trie3._getFirstLevelMap())).equal(true);
        expect((trie3._hasDelimiter())).equal(true);
        expect((trie3._getDelimiterType())).equal(CONSTANT.STR_MATCH);
    });
    it('should add strings without delimiter', () => {
        const input = ['abc', 'abcd', 'abcdef', 'abcdefgh', 'abcdefg', 'abcf', 'abcaad', 'ab', 'Sushim', 'sus', 'N', 'nabc',
            'afg', 'naa', 'de', 'z'];
        const trie1 = new Trie();
        trie1.addAll(input);
        expect(_.isEmpty(trie1._getFirstLevelMap())).equal(false);
        expect((trie1._hasDelimiter())).equal(false);
        expect(trie1.nearMatch('abc').length).equal(7);
        expect(trie1.nearMatch('su').length).equal(2);
        expect(trie1.nearMatch('n').length).equal(3);
        expect(trie1.nearMatch('xyz').length).equal(0);
        expect(trie1.nearMatch('de').length).equal(1);
        expect(trie1.nearMatch('z').length).equal(1);
    });
    it('should add strings with string delimiter', () => {
        const input = ['this', 'this is', 'this is expected'];
        const trie3 = new Trie({ delimiter: ' ' });
        trie3.addAll(input);
        expect(_.isEmpty(trie3._getFirstLevelMap())).equal(false);
        expect((trie3._hasDelimiter())).equal(true);
        expect((trie3._getDelimiterType())).equal(CONSTANT.STR_MATCH);
        expect(trie3.nearMatch('this').length).equal(input.length);
        expect(trie3.nearMatch('xyz').length).equal(0);
    });
    it('should add strings with count delimiter', () => {
        const input = ['hello', 'hell', 'he', 'ab', 'abcd', 'abcdefg'];
        const trie2 = new Trie({ delimiter: 2 });
        trie2.addAll(input);
        trie2.add();
        expect(_.isEmpty(trie2._getFirstLevelMap())).equal(false);
        expect((trie2._hasDelimiter())).equal(true);
        expect((trie2._getDelimiterType())).equal(CONSTANT.COUNT_MATCH);
        expect(trie2.nearMatch('he').length).equal(3);
        expect(trie2.nearMatch('ab').length).equal(3);
        expect(trie2.nearMatch('abcd').length).equal(2);
        expect(trie2.nearMatch('xyz').length).equal(0);
        expect(trie2.nearMatch().length).equal(0);

    });
    /**
     * utility test
     */
    it('should not add empty strings', () => {
        const input = [];
        const trie2 = new Trie({ delimiter: 2 });
        trie2.addAll(input);
        expect(_.isEmpty(trie2._getFirstLevelMap())).equal(true);
    });
    it('should not add bad delimiter', () => {
        try {
            new Trie({ delimiter: -1 });
        } catch (error) {
            expect(error.message).equal('Invalid delimiter -1');
        }
    });
    it('should not split empty strings', () => {
        const trie2 = new Trie({ delimiter: 2 });
        const str = trie2._splitByCount('', 0);
        expect(_.isEmpty(str)).equal(true);
    });
});
