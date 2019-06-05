
class DataStream {
    /**
     * Create a DataStream instance.
     * 
     * @param {Api} api Api instance.
     */
    constructor(api){
        this.api = api;
    }

    /**
     * Retrieve aggregated logs for the given stream and time period.
     * 
     * @param {number} streamId Stream ID from the DataStream Luna Interface
     * @param {string} startDate Date string in the following format YYYY-MM-DD
     * @param {string} endDate Date string in the following format YYYY-MM-DD
     */
    async getAggregateLogs(streamId, startDate, endDate){
        let dsApiPath = '/datastream-pull-api/v1/streams/'+streamId+'/aggregate-logs';

        // append start date
        dsApiPath+='?start='+startDate;

        // append end date
        dsApiPath+='&end='+endDate;

        // append record size
        //&page=0&size=10
        dsApiPath+='&size=10';


        // Datastream can return multiple pages, so we want to 
        // join the results from all the pages before return the complete output.
        const result = await this._getRecordsForPage(dsApiPath, 0, []);

        return result;
    }

    _getRecordsForPage(path, page, result){
        return new Promise((resolve, reject)=>{
            //console.log('DS API: '+path+'&page='+page);
            this.api.get(path+'&page='+page, (err, response, body)=>{
                if(err){
                    console.log(err);
                    reject()
                    return;
                }

                // check if we found and results
                if(body.length === 0){
                    resolve([]);
                    return;
                }
    
                // append the results
                const data = JSON.parse(body);
                console.log(data);
                result = result.concat(data.data);
                
                // check if there are more pages
                if(data.metadata.page+1 < data.metadata.pageCount){
                    this._getRecordsForPage(path, data.metadata.page+1, result).then((val)=>{
                        resolve(val)
                    })
                }else{
                    resolve(result)
                }
            })    
        });
    }
}

module.exports = DataStream;