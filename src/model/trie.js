'use strict';
const CONSTANT = require('../constants/trie');
const ErrorClass = require('../errors/trie');
const Node = require('./node');
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
            else if (typeof delimiter === 'String') {
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
            return;
        }
        if (node.getNode(values[0])) {
            return this._addValueToNode(node.getNode(values[0]), values.splice(1));
        }
        else {
            let n = new Node(values[0]);
            node.setNode(n);
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
                values = _.chunk(_.toArray(value), delimiter);
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

    /*getExactMatch(node, values) {
     if (_.isEmpty(values)) {
     return false;
     }
     let key = values[0];
     if (node.getNode(key)) {
     if (values.length === 1) {
     return true;
     }
     return this.getExactMatch(node.getNode(key), values.splice(1));
     }
     else {
     return false;
     }
     }

     /!**
     * returns if element is present or not.
     * @param value
     * @return {*}
     *!/
     exactSearch(value) {
     if (_.isEmpty(value)) {
     return false;
     }
     let values = [];
     let firstKey;
     if (this._hasDelimiter()) {
     const delimiterType = this._getDelimiterType();
     const delimiter = this._getDelimiter();
     if (delimiterType === CONSTANT.COUNT_MATCH) {
     values = _.chunk(_.toArray(value), delimiter);
     }
     else if (delimiterType === CONSTANT.STR_MATCH) {
     values = value.split(delimiter);
     }
     firstKey = values[0];
     if (this._getFirstLevelMap()[firstKey]) {
     return this.getExactMatch(this._getFirstLevelMap()[firstKey], values.splice(1));
     }
     else {
     return false;
     }
     }
     else {
     values = value.split('');
     firstKey = values[0];
     if (this._getFirstLevelMap()[firstKey]) {
     return this.getExactMatch(this._getFirstLevelMap()[firstKey], values.splice(1));
     }
     else {
     return false;
     }
     }
     }
     */
    getNearMatch(result, node, values, prefix) {
        if (node === null) {
            return result;
        }
        if (_.isEmpty(values)) {
            if (node.isLeaf()) {
                return result;
            }
            else {
                return this._getAllNextValues(result, node, prefix);
            }
        }
        let key = values[0];
        result.push(prefix + key);
        if (node.getNode(key)) {
            return this.getNearMatch(result, node.getNode(key), values.splice(1), prefix + key);
        }
        else {
            return result;
        }
    }

    _getAllNextValues(result, node, prefix) {
        if (node.isLeaf()) {
            return result;
        }
        const keys = _.keys(node.getMap());
        _.each(keys, (key) => {
            result.push(prefix + key);
            result = _.union(result, this._getAllNextValues(result, node.getNode(key), prefix + key));
        });
        return _.uniq(result);
    }

    nearMatch(value) {
        if (_.isEmpty(value)) {
            return;
        }
        let values = [];
        let firstKey;
        if (this._hasDelimiter()) {
            const delimiterType = this._getDelimiterType();
            const delimiter = this._getDelimiter();
            if (delimiterType === CONSTANT.COUNT_MATCH) {
                values = _.chunk(_.toArray(value), delimiter);
            }
            else if (delimiterType === CONSTANT.STR_MATCH) {
                values = value.split(delimiter);
            }
            firstKey = values[0];
            if (this._getFirstLevelMap()[firstKey]) {
                let result = this.getNearMatch([], this._getFirstLevelMap()[firstKey], values.splice(1), firstKey);
                return _.uniq(result);
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
                return _.uniq(result);
            }
            else {
                return [];
            }
        }

    }
}

module.exports = Trie;