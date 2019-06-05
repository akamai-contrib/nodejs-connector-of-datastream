
class Api {
    /**
     * Create a new Api instance. 
     * 
     * @param {EdgeGridAuth} edgeGrid EdgeGridAuth instance.
     */
    constructor(edgeGrid){
        this.edgeGrid = edgeGrid;
    }

    /**
     * Issue a GET request to an API endpoint.
     * 
     * @param {string} path Relative path to the API endpoint.
     * @param {function} callback Callback function that will be executed once the API request is done. The callback recieves 3 props (err, response, body).
     */
    get(path, callback){
        this.edgeGrid.auth({
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': "application/json"
            }
        });

        this.__execute(callback);
    }

    /**
     * Internal method for executing the API requests.
     * 
     * @param {function} callback 
     */
    __execute(callback){
        this.edgeGrid.send((err, response, body)=>{
            callback(err, response, body);
        });
    }
}

module.exports = Api;