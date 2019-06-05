const moment = require('moment');

class DateRange{
    getStartDate(){
        return this._format(moment.utc().subtract(2, 'minute').toDate());
    }

    getEndDate(){
        return this._format(moment.utc().subtract(1, 'minute').toDate());
    }

    _format(date){
        // the date format we need is unfortunatelly a custom one so we can't use any of the built in ISO standards
        // the format we need is YYYY-MM-DDTHH:MM:SSZ  // for example: 2017-10-23T08:30:00Z
        return moment.utc(date).format('YYYY-MM-DD')+"T"+moment.utc(date).format('HH:mm:00')+"Z"
    }
}

module.exports = DateRange;