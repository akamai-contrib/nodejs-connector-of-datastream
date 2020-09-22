const EdgeGrid = require("edgegrid");

class EdgeGridAuth {
    /**
     * Create a new EdgeGridAuth instance.
     *
     * @param {object} edgeGridConfig Edge grid configuration object.
     * @param {clientToken} edgeGrid clientToken
     * @param {clientSecret} edgeGrid clientSecret
     * @param {accessToken} edgeGrid accessToken
     * @param {baseUri} edgeGrid baseUri
     */
    constructor(clientToken, clientSecret, accessToken, baseUri){
        this.eg = new EdgeGrid(clientToken, clientSecret, accessToken, baseUri);
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
