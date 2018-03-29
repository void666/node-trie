"use strict";
const Trie = require('./src/model/trie');

var run = function () {
    var t = new Trie();
    t.add('abc');
    t.add('abcd');
    t.add('abcdefgh');
    t.add('abcdef');
    t.add('abcdefgh');
    t.add('abcf');
    t.add('abcaad');
    t.add('ab');
    t.add('Sushim');
    t.add('sus');
    t.add('N');
    t.add('nabc');
    t.add('naa');
    console.log(JSON.stringify(t));
    console.log(t.nearMatch('abc'));
    console.log(t.nearMatch('nabc'));
    console.log(t.nearMatch('na'));

};

run();