'use strict';
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
        return this.map[node.getKey()];
    }
}