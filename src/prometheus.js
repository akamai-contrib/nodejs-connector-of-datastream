const client = require('prom-client');

class Prometheus {
    constructor(prometheusConfig){
        // init prometheus registry
        this.registry = new client.Registry();

        // register number_of_req
        const number_of_req = new client.Gauge({ name: 'number_of_req', help: 'total_num_of_requests' });
        this.registry.registerMetric(number_of_req);

        // register number_of_2xx
        const number_of_2xx = new client.Gauge({ name: 'number_of_2xx', help: 'number_of_2xx_requests' });
        this.registry.registerMetric(number_of_2xx);

        // register number_of_3xx
        const number_of_3xx = new client.Gauge({ name: 'number_of_3xx', help: 'number_of_3xx_requests' });
        this.registry.registerMetric(number_of_3xx);

        // register number_of_4xx
        const number_of_4xx = new client.Gauge({ name: 'number_of_4xx', help: 'number_of_4xx_requests' });
        this.registry.registerMetric(number_of_4xx);

        // register number_of_5xx
        const number_of_5xx = new client.Gauge({ name: 'number_of_5xx', help: 'number_of_5xx_requests' });
        this.registry.registerMetric(number_of_5xx);

        // register requests_per_second
        const requests_per_second = new client.Gauge({ name: 'requests_per_second', help: 'requests_per_second' });
        this.registry.registerMetric(requests_per_second);

        // register bytes_per_second
        const bytes_per_second = new client.Gauge({ name: 'bytes_per_second', help: 'bytes_per_second' });
        this.registry.registerMetric(bytes_per_second);

        // register edge_response_time
        const edge_response_time = new client.Gauge({ name: 'edge_response_time', help: 'edge_response_time' });
        this.registry.registerMetric(edge_response_time);

        // register origin_response_time
        const origin_response_time = new client.Gauge({ name: 'origin_response_time', help: 'origin_response_time' });
        this.registry.registerMetric(origin_response_time);

        // register num_cache_hit
        const num_cache_hit = new client.Gauge({ name: 'num_cache_hit', help: 'num_cache_hit' });
        this.registry.registerMetric(num_cache_hit);

        // register num_cache_miss
        const num_cache_miss = new client.Gauge({ name: 'num_cache_miss', help: 'num_cache_miss' });
        this.registry.registerMetric(num_cache_miss);

        // register offload_rate
        const offload_rate = new client.Gauge({ name: 'offload_rate', help: 'offload_rate' });
        this.registry.registerMetric(offload_rate);

        // init the gateway with the custom metrics registry
        this.gateway = new client.Pushgateway(prometheusConfig.pushGateway, null, this.registry);
    }

    pushData(data){
        // register number_of_req
        this.registry.getSingleMetric('number_of_req').set(data['2xx']+data['3xx']+data['4xx']+data['5xx']);

        // register number_of_2xx
        this.registry.getSingleMetric('number_of_2xx').set(data['2xx']);

        // register number_of_3xx
        this.registry.getSingleMetric('number_of_3xx').set(data['3xx']);

        // register number_of_4xx
        this.registry.getSingleMetric('number_of_4xx').set(data['4xx']);

        // register number_of_5xx
        this.registry.getSingleMetric('number_of_5xx').set(data['5xx']);

        // register requests_per_second
        this.registry.getSingleMetric('requests_per_second').set(data['requestsPerSecond']);
        
        // register bytes_per_second
        this.registry.getSingleMetric('bytes_per_second').set(data['bytesPerSecond']);

        // register edge_response_time
        this.registry.getSingleMetric('edge_response_time').set(data['edgeResponseTime']);

        // register origin_response_time
        this.registry.getSingleMetric('origin_response_time').set(data['originResponseTime']);

        // register num_cache_hit
        this.registry.getSingleMetric('num_cache_hit').set(data['numCacheHit']);

        // register num_cache_miss
        this.registry.getSingleMetric('num_cache_miss').set(data['numCacheMiss']);

        // register offload_rate
        this.registry.getSingleMetric('offload_rate').set(data['offloadRate']);
        
        // push the data
        this.gateway.pushAdd({"jobName": "pushgateway"}, (err, resp, body)=>{
            console.log('- prometheus: data pushed');
            //console.log(body);
            //console.log(err);
        });
    }
}

module.exports = Prometheus;