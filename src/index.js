const EdgegridAuth = require('./edgegridauth');
const Api = require('./api');
const DataStream = require('./datastream');
const DateRange = require('./date');
const InfluxDb = require('./influxdb');
const Prometheus = require('./prometheus');

// get the config
const config = require('./../config.json');

// initalize required objects
const eg = new EdgegridAuth(config.edgerc);
const api = new Api(eg.getEdgeGrid());
const influx = new InfluxDb(config.influxdb);
const prometheus = new Prometheus(config.prometheus);

// start the scraping interval
console.log('Scraping job starting ... (it will take 1 minute until the first scrape)');
setInterval(()=>{
    // create the date ranges
    const d = new DateRange();
    console.log('Pulling DataStream logs for the following time period (utc):');
    console.log('- start date:' + d.getStartDate());
    console.log('- end date:  '+ d.getEndDate());

    // get the data and resolve the promise
    const ds = new DataStream(api);
    ds.getAggregateLogs(config.datastream.streamId, encodeURIComponent(d.getStartDate()), encodeURIComponent(d.getEndDate())).then((result)=>{
        console.log('- fetched entries: '+result.length);
        result.forEach((val)=>{
            // we need to convert the startTime and endTime to epoch time
            val.startTime = new Date(val.startTime).valueOf()
            val.endTime = new Date(val.endTime).valueOf()
			val.offloadRate = Math.ceil((val.numCacheHit/(val.numCacheHit+val.numCacheMiss)*100))
            // push the data info influx
            if(config.influxdb && config.influxdb.active === true){
                influx.pushData(val);
            }

            // push data into prometheus
            if(config.prometheus && config.prometheus.active === true){
                prometheus.pushData(val);
            }
        })
    });
}, 60500)