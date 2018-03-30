'use strict';
const CONSTANT = require('./src/constants/trie');
const ErrorClass = require('./src/errors/trie');
const Node = require('./src/model/node');
const _ = require('lodash');
const Error = new ErrorClass();

class Trie {
    /**
     * Delimiter supports String, Positive Integer and undefined.
     * Positive Integer : delimits provided data by number of character count.
     * String(s) : sets up as the that string or regex as the delimiter
     * undefined : treats '' as delimiter.
     * @param delimiter
     */

    _splitByCount(str, count) {
        if (_.isEmpty(str) || !count || count <= 0) {
            return [];
        }
        let res = [];
        let start = 0;
        while (start < str.length) {
            let temp = str.substr(start, count);
            res.push(temp);
            start += count;
        }
        return res;
    }

    constructor(delimiter) {
        if (delimiter) {
            this.has_delimiter = true;
            if (typeof delimiter === 'Number') {
                delimiter = parseInt(delimiter);
                if (delimiter >= 1) {
                    this.delimeter_type = CONSTANT.COUNT_MATCH;
                    this.delimiter = delimiter;
                }
                Error.invalidDelimiter(delimiter);
            }
            else if (typeof delimiter === 'string') {
                this.delimiter = delimiter.toString();
                this.delimeter_type = CONSTANT.STR_MATCH;
            }
        }
        else {
            this.has_delimiter = false;
        }
        this.first_level_map = {};
    }

    _getFirstLevelMap() {
        return this.first_level_map;
    }


    _hasDelimiter() {
        return this.has_delimiter;
    }

    _getDelimiterType() {
        return this.delimeter_type;
    }

    _getDelimiter() {
        return this.delimiter;
    }

    _addValueToNode(node, values) {
        if (_.isEmpty(values)) {
            node.markWord();
            return;
        }
        if (node.getNode(values[0])) {
            if (values.length === 1) {
                node.getNode(values[0]).markWord();
            }
            return this._addValueToNode(node.getNode(values[0]), values.splice(1));
        }
        else {
            let n = new Node(values[0]);
            node.setNode(n);
            if (values.length === 1) {
                n.markWord();
            }
            return this._addValueToNode(n, values.splice(1));
        }
    }

    add(value) {
        if (_.isEmpty(value)) {
            return;
        }
        value = _.toLower(value);
        let values = [];
        let firstKey;
        if (this._hasDelimiter()) {
            const delimiterType = this._getDelimiterType();
            const delimiter = this._getDelimiter();
            if (delimiterType === CONSTANT.COUNT_MATCH) {
                values = this._splitByCount(value, delimiter);
            }
            else if (delimiterType === CONSTANT.STR_MATCH) {
                values = value.split(delimiter);
            }
            firstKey = values[0];
            if (this._getFirstLevelMap()[firstKey]) {
                let firstNode = this.first_level_map[firstKey];
                return this._addValueToNode(firstNode, values.splice(1));
            }
            else {
                let n = new Node(firstKey);
                this.first_level_map[n.getKey()] = n;
                return this._addValueToNode(n, values.splice(1));
            }
        }
        else {
            values = value.split('');
            firstKey = values[0];
            if (this._getFirstLevelMap()[firstKey]) {
                let firstNode = this.first_level_map[firstKey];
                return this._addValueToNode(firstNode, values.splice(1));
            }
            else {
                let n = new Node(firstKey);
                this._getFirstLevelMap()[n.getKey()] = n;
                return this._addValueToNode(n, values.splice(1));
            }
        }
    }

    _getText(prefix, key) {
        let delimiter = this._getDelimiter();
        key = key || '';
        if (delimiter) {
            if (this._getDelimiterType() === CONSTANT.COUNT_MATCH) {
                /**
                 * ignoring in case of count delimeter
                 */
                delimiter = '';
            }
        }
        else {
            delimiter = '';
        }
        return _.trim(prefix + delimiter + key);
    }

    _getAllNextValues(result, node, prefix) {
        // console.log('_getAllNextValues', result, node, prefix);
        if (node.isLeaf()) {
            return result;
        }
        const keys = _.keys(node.getMap());
        _.each(keys, (key) => {
            if (node.getNode(key).getWordMark()) {
                result.push(this._getText(prefix, key));
            }
            result = _.union(result, this._getAllNextValues(result, node.getNode(key), this._getText(prefix, key)));
        });
        return result;
    }

    getNearMatch(result, node, values, prefix) {
        // console.log('getNearMatch', result, node, values, prefix);
        if (_.isEmpty(values)) {
            if (node.getWordMark()) {
                result.push(this._getText(prefix));
            }
            return this._getAllNextValues(result, node, prefix);
        }
        let key = values[0];
        let nextNode = node.getNode(key);
        if (nextNode) {
            if (nextNode.isLeaf()) {
                result.push(this._getText(prefix, key));
                return result;
            }
            else {
                return this.getNearMatch(result, nextNode, values.splice(1), this._getText(prefix, key));
            }
        }
        else {
            return result;
        }
    }

    nearMatch(value) {
        if (_.isEmpty(value)) {
            return [];
        }
        let values = [];
        let firstKey;
        if (this._hasDelimiter()) {
            const delimiterType = this._getDelimiterType();
            const delimiter = this._getDelimiter();
            if (delimiterType === CONSTANT.COUNT_MATCH) {
                values = this._splitByCount(value, delimiter);
            }
            else if (delimiterType === CONSTANT.STR_MATCH) {
                values = value.split(delimiter);
            }
            firstKey = values[0];
            if (this._getFirstLevelMap()[firstKey]) {
                let result = this.getNearMatch([], this._getFirstLevelMap()[firstKey], values.splice(1), firstKey);
                return result.sort(this._lexi);
            }
            else {
                return [];
            }
        }
        else {
            values = value.split('');
            firstKey = values[0];
            if (this._getFirstLevelMap()[firstKey]) {
                let result = this.getNearMatch([], this._getFirstLevelMap()[firstKey], values.splice(1), firstKey);
                return result.sort(this._lexi);
            }
            else {
                return [];
            }
        }
    }

    /**
     * expects array of strings to be added to trie
     * @param ele
     */
    addAll(ele) {
        if (_.isEmpty(ele)) {
            return;
        }
        _.each(ele, (e) => {
            this.add(e);
        });
    }

    _lexi(a, b) {
        return a.toString().localeCompare(b);
    }
}

module.exports = Trie;