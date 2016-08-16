const path = require('path');
const router = require('express').Router();
const User = require('./db/controllers/userController.js');
const GoogleAuthUrl = require('./setup/googleOAuth').url;
const getAllEventsFromCalendar = require('./utility/getAllEventsFromCalendar');
const addEvent = require('./utility/addEvent');
const addTravel = require('./utility/addTravel');
const getUserGeolocation = require('./utility/getUserGeoLocation');
const updateGeolocation = require('./utility/updateGeolocation');
const getDayEvents = require('./utility/getDayEvents');
const queryTraffic = require('./workers/queryTraffic');

// put this parent function elsewhere later, but for now keep it here to understand what is happening. 
// first add event, then add travel, then set up queryTraffic worker
var addEventAndAddTravel = function(req, res) {
  addEvent(req, res)
  .spread((event, created) => {
    console.log('event was added, now adding travel');
    return addTravel(event); 
  })
  .then(travel => {
    console.log('travel was added, now scheduling queryTraffic worker');
    queryTraffic(travel);
  })
}

router.get('/test', function(req, res) {
  res.sendStatus(200);
});
// Authorization Routes

router.get('/auth', function(req, res) {
  res.redirect(GoogleAuthUrl);
});

router.get('/authCallback', User.createUser);
// this is tricky to fix, probably want to serve up a static page

// Calendar Routes
router.post('/calendar/addEvent', addEventAndAddTravel);
router.get('/calendar/getEvent', getDayEvents);
router.get('/calendar/getAllEvents', getAllEventsFromCalendar);

// User Routes
router.get('/users/getGeolocation', getUserGeolocation);
router.post('/users/updateGeolocation', updateGeolocation);

module.exports = router;