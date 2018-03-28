'use strict';
const CONSTANT = require('../constants/trie');
const ErrorClass = require('../errors/trie');
const Error = new ErrorClass();
class Trie {
    /**
     * Delimiter supports String, Positive Integer and undefined.
     * Positive Integer : delimits provided data by number of character count.
     * String(s) : sets up as the that string or regex as the delimiter
     * undefined : treats '' as delimiter.
     * @param delimiter
     */
    constructor(delimiter) {
        if (delimiter) {
            this.has_delimiter = true;
            if (typeof delimiter === 'Number') {
                delimiter = parseInt(delimiter);
                if (delimiter >= 1) {
                    this.delimeter_type = CONSTANT.COUNT_MATCH;
                }
                Error.invalidDelimiter(delimiter);
            }
            else if (typeof delimiter === 'String') {
                this.delimeter_type = CONSTANT.STR_MATCH;
            }
        }
        else {
            this.has_delimiter = false;
        }
        this.first_level_map = {};
    }

    hasDelimiter() {
        return this.has_delimiter;
    }

    getDelimiteType() {
        return this.delimeter_type;
    }

    add(value) {
        if(this.has_delimiter){
            const delimiterType = this.getDelimiteType();
            if(delimiterType === CONSTANT.COUNT_MATCH){

            }
        }

    }



    search(value) {
        //todo
    }
}

module.exports = Trie;