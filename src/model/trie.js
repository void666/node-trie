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

    getFirstLevelMap() {
        return this.first_level_map;
    }


    hasDelimiter() {
        return this.has_delimiter;
    }

    getDelimiterType() {
        return this.delimeter_type;
    }

    getDelimiter() {
        return this.delimiter;
    }

    addValueToNode(node, values) {
        if (_.isEmpty(values)) {
            return;
        }
        if (node.getNode(values[0])) {
            return this.addValueToNode(node.getNode(values[0]), values.splice(1));
        }
        else {
            let n = new Node(values[0]);
            node.setNode(n);
            return this.addValueToNode(n, values.splice(1));
        }
    }

    add(value) {
        if (_.isEmpty(value)) {
            return;
        }
        let values = [];
        let firstKey;
        if (this.hasDelimiter()) {
            const delimiterType = this.getDelimiterType();
            const delimiter = this.getDelimiter();
            if (delimiterType === CONSTANT.COUNT_MATCH) {
                values = _.chunk(_.toArray(value), delimiter);
            }
            else if (delimiterType === CONSTANT.STR_MATCH) {
                values = value.split(delimiter);
            }
            firstKey = values[0];
            if (this.getFirstLevelMap()[firstKey]) {
                let firstNode = this.first_level_map[firstKey];
                return this.addValueToNode(firstNode, values.splice(1));
            }
            else {
                let n = new Node(firstKey);
                this.first_level_map[n.getKey()] = n;
                return this.addValueToNode(n, values.splice(1));
            }
        }
        else {
            values = value.split('');
            firstKey = values[0];
            if (this.getFirstLevelMap()[firstKey]) {
                let firstNode = this.first_level_map[firstKey];
                return this.addValueToNode(firstNode, values.splice(1));
            }
            else {
                let n = new Node(firstKey);
                this.getFirstLevelMap()[n.getKey()] = n;
                return this.addValueToNode(n, values.splice(1));
            }
        }
    }

    getExactMatch(node, values) {
        if (_.isEmpty(values)) {
            return true;
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

    /**
     * returns if element is present or not.
     * @param value
     * @return {*}
     */
    exactSearch(value) {
        if (_.isEmpty(value)) {
            return false;
        }
        let values = [];
        let firstKey;
        if (this.hasDelimiter()) {
            const delimiterType = this.getDelimiterType();
            const delimiter = this.getDelimiter();
            if (delimiterType === CONSTANT.COUNT_MATCH) {
                values = _.chunk(_.toArray(value), delimiter);
            }
            else if (delimiterType === CONSTANT.STR_MATCH) {
                values = value.split(delimiter);
            }
            firstKey = values[0];
            if (this.getFirstLevelMap()[firstKey]) {
                return this.getExactMatch(this.getFirstLevelMap()[firstKey], values.splice(1));
            }
            else {
                return false;
            }
        }
        else {
            values = value.split('');
            firstKey = values[0];
            if (this.getFirstLevelMap()[firstKey]) {
                return this.getExactMatch(this.getFirstLevelMap()[firstKey], values.splice(1));
            }
            else {
                return false;
            }
        }
    }

    getNearMatch(result, node, values, prefix) {
        if (_.isEmpty(values) || node === null) {
            return result;
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

    nearMatch(value) {
        if (_.isEmpty(value)) {
            return;
        }
        let values = [];
        let firstKey;
        if (this.hasDelimiter()) {
            const delimiterType = this.getDelimiterType();
            const delimiter = this.getDelimiter();
            if (delimiterType === CONSTANT.COUNT_MATCH) {
                values = _.chunk(_.toArray(value), delimiter);
            }
            else if (delimiterType === CONSTANT.STR_MATCH) {
                values = value.split(delimiter);
            }
            firstKey = values[0];
            if (this.getFirstLevelMap()[firstKey]) {
                let result = this.getNearMatch([], this.getFirstLevelMap()[firstKey], values.splice(1), firstKey);
                return _.uniq(result);
            }
            else {
                return [];
            }
        }
        else {
            values = value.split('');
            firstKey = values[0];
            if (this.getFirstLevelMap()[firstKey]) {
                let result = this.getNearMatch([], this.getFirstLevelMap()[firstKey], values.splice(1), firstKey);
                return _.uniq(result);
            }
            else {
                return [];
            }
        }

    }
}

module.exports = Trie;