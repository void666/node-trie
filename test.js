"use strict";
const Trie = require('./index');

var run = function () {
    var t = new Trie();
  /*  t.add('abc');
    t.add('abcd');
    t.add('abcdef');
    t.add('abcdefgh');
    t.add('abcdefg');
    t.add('abcf');
    t.add('abcaad');
    t.add('ab');
    t.add('Sushim');
    t.add('sus');
    t.add('N');
    t.add('nabc');
    t.add('afg');
    t.add('naa');*/
    t.addAll(['abc', 'abcd', 'abcdef', 'abcdefgh', 'abcdefg', 'abcf', 'abcaad', 'ab', 'Sushim', 'sus', 'N', 'nabc',
    'afg', 'naa']);
    console.log(JSON.stringify(t));
    console.log(t.nearMatch('ab'));
    console.log(t.nearMatch('sushim'));
    console.log(t.nearMatch('na'));
    /*t.add('this');
    t.add('this is');
    t.add('this is fucked');
    t.add('this is fucked up');
    console.log(JSON.stringify(t));
    console.log(t.nearMatch('this is'));*/
};


run();