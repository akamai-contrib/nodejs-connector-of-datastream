# nodejs-connector-of-datastream
Nodes js program will connect to  Akamai datastream using Aggregate logs endpoint and integrates data with Prometheus and Graphana for data visualization

# Setup

## 1. Initialize your environment

To initialize your environment you need to have Docker and NodeJs installed.

Once docker is installed, run: `docker-compose create` and then `docker-compose start`

Once docker environment is initialized, you will have the following components available:
1. Prometheus: http://localhost:9090
2. Pushgateway: http://localhost:9091
3. Grafana: http://localhost:3000

After that install the required node dependencies by running `npm install`.

## 2. Configuration

There is a config file `config.js` in the root of the project. Make sure you update the config information to match your setup.

## 3. Run the scraping job

The scraping job is a node application that fetches new logs from Akamai DataStream every minute, and then pushes the data into  Prometheus.

To start the scraping job, run `npm start`

## 4. View your data

Point your browser to `http://localhost:3000` to open Grafana. If Grafana is freshly installed, the default credentials are set to username: `admin` and password: `admin`. 

Once inside Grafana, create a new data source, select Prometheus and use `http://localhost:9090` and `browser` as the configuration details.

Once the data source is configured, create a new dashboard by importing `grafana-prometheus.json` file. 

After a few minutes once your scraping job is running, and you have traffic on your website, the graphs should show up.
