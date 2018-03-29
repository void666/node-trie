'use strict';
const _ = require('lodash');
class Node {
    constructor(key) {
        this.key = key;
        this.map = {};
    }

    getNode(key) {
        return this.map[key];
    }

    getKey() {
        return this.key;
    }

    setNode(node) {
        return this.map[node.getKey()] = node;
    }

    isLeaf() {
        return _.isEmpty(this.map);
    }

    getMap() {
        return this.map;
    }
}

module.exports = Node;