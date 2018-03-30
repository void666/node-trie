'use strict';
const Trie = require('../index');

const run = function () {
    const t = new Trie({delimiter: 2});
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
    /*t.addAll(['abc', 'abcd', 'abcdef', 'abcdefgh', 'abcdefg', 'abcf', 'abcaad', 'ab', 'Sushim', 'sus', 'N', 'nabc',
     'afg', 'naa']);
     console.log(JSON.stringify(t));
     console.log(t.nearMatch('ab'));
     console.log(t.nearMatch('sushim'));
     console.log(t.nearMatch('na'));*/
   /* t.add('this');
    t.add('this is');
    t.add('this is fucked');
    t.add('this is fucked up');
    console.log(JSON.stringify(t));
    console.log(t.nearMatch('this is'));*/

    t.add('hello');
    t.add('abcdefg');
    console.log(JSON.stringify(t));
    console.log(t.nearMatch('ab'));
    console.log(t.nearMatch('he'));
};

run();


/*describe('request-promise-retry', function () {
 it('should  pass, with retry options', () => {
 return rp(optionsWithRetry)
 .then(data => {
 expect(data.error).equal(undefined);
 });
 });
 it('fail and retry 3 times', () => {
 return rp(optionsWithRetryFail)
 .catch(err => {
 expect(err.error.code).equal('ENOTFOUND');
 });
 });
 it('should pass, without retry options', () => {
 return rp(optionsWithoutRetry)
 .then(data => {
 expect(data.error).equal(undefined);
 });
 });
 it('should fail, without retry options', () => {
 return rp(optionsWithoutRetryFail)
 .catch(err => {
 expect(err.error.code).equal('ENOTFOUND');
 });
 });
 it('should fail, negative retry option', () => {
 return rp(optionsBadRetry1)
 .catch(err => {
 expect(err.message).equal('Retry count must be positive integer');
 });
 });
 it('should fail, bad retry option', () => {
 return rp(optionsBadRetry2)
 .catch(err => {
 expect(err.message).equal('Supports boolean or positive integer');
 });
 });
 it('should pass, boolean retry option', () => {
 return rp(optionsBooleanRetry)
 .then(data => {
 expect(data.error).equal(undefined);
 });
 });
 });*/
