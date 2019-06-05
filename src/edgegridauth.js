const EdgeGrid = require("edgegrid");

class EdgeGridAuth {
    /**
     * Create a new EdgeGridAuth instance.
     * 
     * @param {object} edgeGridConfig Edge grid configuration object.
     */
    constructor(edgeGridConfig){
        this.eg = new EdgeGrid(edgeGridConfig);
    }

    /**
     * Get EdgeGridAuth instance.
     * 
     * @returns EdgeGridAuth instance.
     */
    getEdgeGrid(){
        return this.eg;
    }
}

module.exports = EdgeGridAuth;