const EdgegridAuth = require('./edgegridauth');
const Api = require('./api');
const DataStream = require('./datastream');
const DateRange = require('./date');
const Prometheus = require('./prometheus');

// Get EdgeGrid credentials from environment
const clientToken = process.env.EDGE_GRID_CLIENT_TOKEN;
const clientSecret = process.env.EDGE_GRID_CLIENT_SECRET;
const accessToken = process.env.EDGE_GRID_ACCESS_TOKEN;
const baseUri = process.env.EDGE_GRID_BASE_URI;
const streamId = process.env.DATASTREAM_ID;
const prometheusActive = process.env.PROMETHEUS_ACTIVE;
const prometheusPushGateway = process.env.PROMETHEUS_PUSH_GATEWAY;

// initalize required objects
const eg = new EdgegridAuth(clientToken, clientSecret, accessToken, baseUri);

const api = new Api(eg.getEdgeGrid());
const prometheus = new Prometheus(prometheusPushGateway);

// start the scraping interval
console.log('Scraping job starting ... (it will take 1 minute until the first scrape)');
// create the date ranges
const d = new DateRange();
console.log('Pulling DataStream logs for the following time period (utc):');
console.log('- start date:' + d.getStartDate());
console.log('- end date:  '+ d.getEndDate());

// get the data and resolve the promise
const ds = new DataStream(api);
ds.getAggregateLogs(streamId, encodeURIComponent(d.getStartDate()), encodeURIComponent(d.getEndDate())).then((result)=>{
    console.log('- fetched entries: '+result.length);
    result.forEach((val)=>{
        // we need to convert the startTime and endTime to epoch time
        val.startTime = new Date(val.startTime).valueOf()
        val.endTime = new Date(val.endTime).valueOf()
		val.offloadRate = Math.ceil((val.numCacheHit/(val.numCacheHit+val.numCacheMiss)*100))

        // push data into prometheus
        if(prometheusActive && prometheusActive === true){
            prometheus.pushData(val);
        }
    })
});
