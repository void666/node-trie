'use strict';
class TrieError {
    invalidDelimiter(delimiter) {
        throw new Error(`Invalid delimiter ${delimiter}`);
    }
}

module.exports = TrieError;