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
        return this.map[node.getKey()] = node;
    }

    nodeStatus() {
        const keys = keys(this.map);
        return keys.forEach((key) => {
            console.log(`Key ${key}`);
        });
    }
}

module.exports = Node;