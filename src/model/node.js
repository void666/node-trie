'use strict';
const _ = require('lodash');
class Node {
    constructor(key) {
        this.key = key;
        this.mark_word = false;
        this.map = {};
        this.dependency = 0;
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

    markWord() {
        this.mark_word = true;
    }

    unMarkWord() {
        this.mark_word = false;
    }

    getWordMark() {
        return this.mark_word;
    }

    getMap() {
        return this.map;
    }

    increaseDependency() {
        this.dependency += 1;
    }

    decreaseDependency() {
        this.dependency -= 1;
    }

    getDependency() {
        return this.dependency;
    }

}

module.exports = Node;