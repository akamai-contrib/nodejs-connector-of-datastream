const Influx  = require('influx');

class InfluxDb {
    constructor(influxConfig){
        this.influx = new Influx.InfluxDB({
            host: influxConfig.host,
            port: influxConfig.port,
            username: influxConfig.username,
            password: influxConfig.password,
            database: influxConfig.database,
            schema: [
              {
                measurement: 'datastream',
                fields: {
                    '2xx': Influx.FieldType.INTEGER,
                    '3xx': Influx.FieldType.INTEGER,
                    '4xx': Influx.FieldType.INTEGER,
                    '5xx': Influx.FieldType.INTEGER,
                    'edgeResponseTime': Influx.FieldType.FLOAT,
                    'originResponseTime': Influx.FieldType.FLOAT,
                    'requestsPerSecond': Influx.FieldType.FLOAT,
                    'bytesPerSecond': Influx.FieldType.FLOAT,
                    'numCacheHit': Influx.FieldType.INTEGER,
                    'numCacheMiss': Influx.FieldType.INTEGER,
                    'offloadRate': Influx.FieldType.FLOAT,
                    'startTime': Influx.FieldType.FLOAT,
                    'endTime': Influx.FieldType.FLOAT,
                },
                tags:['datastream']
              }
            ]
        })
    }

    pushData(data){
        this.influx.writePoints([
            {
              measurement: 'datastream',
              fields: data,
            }
          ]).then(() => {
            console.log('- InfluxDb: data pushed');
        });
    }
}

module.exports = InfluxDb;