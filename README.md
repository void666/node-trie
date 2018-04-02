## node-trie 

#### [npm : trie-d](https://www.npmjs.com/package/trie-d)
[![npm version](https://badge.fury.io/js/trie-d.svg)](https://badge.fury.io/js/trie-d)
[![coverage](https://coveralls.io/repos/github/void666/node-trie/badge.svg?branch=master)](https://coveralls.io/github/void666/node-trie?branch=master)
[![build status](https://travis-ci.org/void666/node-trie.svg?branch=master)](https://travis-ci.org/void666/node-trie)
[![downloads](https://img.shields.io/npm/dt/trie-d.svg)](https://www.npmjs.com/package/trie-d)
[![downloads monthly](https://img.shields.io/npm/dm/trie-d.svg)](https://www.npmjs.com/package/trie-d)

#### Simple trie data structure representation in javascript. Perfect for search on key-press.

### Features

- Provides near match result for strings only.
- Delimiter supports positive integer (count of characters), a regex or string.
- Supports soft delete of strings (will not appear in the search result)
- Supports add all , remove all and near match all. Accepts array of strings for processing the stated functionality.

### Usage
#### Instantiation
 Following ways can be used to instantiate a Trie. 
 
``` 
 const Trie = require('trie-d');
 const trie = new Trie(); // Without delimiter, splits string by each character.
 const trieWithRegDelimiter = new Trie ({delimiter : '/n'}); // Regex delimiter (should split string by new line)
 const trieWithCountDelimiter = new Trie({delimiter : 10}); // Count delimiter, splits string by number of 10 characters from start index.
 const trieWithCharacterDelimiter = new Trie({delimiter : 'c'}); // splits string at every instance of character `c`
```


#### Addition of Elements
Following ways can be used to add elements to a Trie
```
// from previous referrences
const inputs = ['abc', 'abcd', 'abcdef', 'abcdefgh', 'abcdefg', 'abcf', 'abcaad', 'ab', 'nabc','afg', 'naa', 'de', 'z'];
trie.addAll(inputs); // add all functionality
trieWithRegDelimiter.add("This is amazing.\n I am so happy!\n"); //single element addition.

```

#### Searching of Elements
Following methods can be used to search elements.
Each element is delimited based on the trie's delimiter definition.
The result is lexicographically sorted.
```
// from previous referrences
const result = trie.nearMatch('abc'); 
// result = ['abc', 'abcd', 'abcdef', 'abcdefgh', 'abcdefg', 'abcf', 'abcaad'];

const resultAll = trie.nearMatch(['abc', 'na']); // multi string search. The result is union of all key word's result. 
// resultAll = ['abc', 'abcd', 'abcdef', 'abcdefgh', 'abcdefg', 'abcf', 'abcaad', 'naa', 'nabc'];
```

#### Removal (soft delete) of Elements
Soft-delete of strings, does not delete the string, but disables it from search.
```
// from previous referrences

const result = trie.nearMatch('abc'); 
// result = ['abc', 'abcd', 'abcdef', 'abcdefgh', 'abcdefg', 'abcf', 'abcaad'];
trie.remove('abc');
const resultAfterRemoval = trie.nearMatch('abc');
// resultAfterRemoval = ['abcd', 'abcdef', 'abcdefgh', 'abcdefg', 'abcf', 'abcaad']; // no word `abc`

trie.removeAll(['abcd', 'abcf']); // multi removal.
const resultPostMultiRemoval = trie.nearMatch('abc');
// resultPostMultiRemoval = ['abcdef', 'abcdefgh', 'abcdefg', 'abcaad']; // no word `abcd` and `abcf`

```

### Installation
`npm install trie-d`

### Test
`npm test`
