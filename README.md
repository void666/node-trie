## node-trie 
#### [npm : trie-d](https://www.npmjs.com/package/trie-d)
[![npm version](https://badge.fury.io/js/trie-d.svg)](https://badge.fury.io/js/trie-d)
[![coverage status](https://coveralls.io/repos/github/void666/node-trie/badge.svg)](https://coveralls.io/github/void666/node-trie)
[![build status](https://travis-ci.org/void666/request-promise-retry.svg?branch=master)](https://travis-ci.org/void666/node-trie)
[![downloads](https://img.shields.io/npm/dt/trie-d.svg)](https://www.npmjs.com/package/trie-d)
[![downloads monthly](https://img.shields.io/npm/dm/trie-d.svg)](https://www.npmjs.com/package/trie-d)

##### Simple trie data structure representation in javascript. Perfect for search on key-press.

### Features
- Provides near match result for strings only.
- Delimiter supports positive integer (count of characters), a regex or string.
- Supports add all feature, accepts array of strings. 

### Usage
#### Instantiation
 Following ways can be used to instantiate a Trie. 
``` const Trie = require('trie-d');
 const trie = new Trie(); // Without delimiter, splits string by each character.
 const trieWithRegDelimiter = new Trie ({delimiter : '/n'}); // Regex delimiter (should split string by new line)
 const trieWithCountDelimiter = new Trie({delimiter : 10}); // Count delimiter, splits string by number of 10 characters from start index.
 const trieWithCharacterDelimiter = new Trie({delimiter : 'c'}); // splits string at every instance of character `c`

```

#### Addition of Elements
```

```


### Installation
`npm install trie-d`

### Test
`npm test`
