const models = require('../models/models');
const Event = models.Event;
const googleMaps = require('./../../utility/googleMaps');
const moment = require('moment');
const zone = require('moment-timezone');
const sequelize = require('../db.js');

const insertEvent = (data, userId) => {
  Event.findOrCreate({
    where: {
      googleCalendarEventId: data.id},
      defaults: {
        userId: userId,
        name: data.summary,
        eventUrl: data.htmlLink,
        startdatetime: data.start.dateTime,
        enddatetime: data.end.dateTime,
        // currently not checking for recurrence since the calendar events query has "single events: true" which lists every single event
        recurrence: JSON.stringify(data.recurrence),
        location: data.location,
        description: data.description
      }
  })
  .spread((event, created) => {
    console.log(created, ': event was created');

    // query Google Maps for initial travel time, see utility/googleMaps
    googleMaps.getInitialTravelTime(event);
  });
}

const retrieveEvent = (id) => {
  return Event.findOne({
    where: {id: id}
  });
};

const retrieveDayEvent = (req, res) => {
  var nowInUTC = moment().utcOffset(0000).subtract(7, 'hours').format('YYYY-MM-DD HH:mm') + ':00+00';
  var midnightInUTC = moment().add(1, 'days').format('YYYY-MM-DD') + ' 06:59:00+00';

  // Get all events for today (events in DB are in UTC time)
  var queryString = `SELECT * FROM events WHERE startdatetime BETWEEN '${nowInUTC}' AND '${midnightInUTC}'`;
  sequelize.query(queryString)
  .spread((datas, metadata) => {
    datas.forEach((data) => {
      data.startdatetime = moment(data.startdatetime).format('LT');
    });

    res.send(datas);
  });
};

module.exports = {
  insertEvent,
  retrieveEvent,
  retrieveDayEvent
};
