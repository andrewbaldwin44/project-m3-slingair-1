function findCustomer(id) {
  return reservations.find(customer => customer.id == id);
}

function handleHomepage(req, res) {
  res.render('./pages/homepage.ejs', { title: 'Sling Air' });
}

function handleSeatSelection(req, res) {
  res.render('./pages/seat-select', { title: 'Seat Selection', allFlights });
}

function handleFlight(req, res) {
  console.log(req.params.flightNumber)
  const { flightNumber } = req.params;
  const flight = flights[flightNumber];

  if (flight) {
    res.status(200).json({ status: 200, flight });
  } else {
    res.status(401).json({ status: 401, message: 'Flight not found' });
  }
}

function newFlightPurchase(req, res) {
  const customerInfo = req.body;

  customerInfo.id = uuidv4();

  reservations.push(customerInfo);

  res.status(201).json({ status: 201, message: 'cool', confirmation: customerInfo.id });
}

function confirmedFlightPurchase(req, res, next) {
  const { id } = req.params;
  const customer = findCustomer(id);

  if (customer) {
    res.render('./pages/flight-confirmed', { title: 'Take to the Skies!', customer })
  } else next();
}

function findFlight(req, res) {
  res.render('./pages/find-flight', { title: 'Find your Flight!' });
}

function handleFourOhFour(req, res) {
  res.status(404).send('Page not Found!')
}

const { v4: uuidv4 } = require('uuid');
const { flights } = require('./test-data/flightSeating');
const { reservations } = require('./test-data/reservations');
const allFlights = Object.keys(flights);

module.exports = { handleHomepage, handleSeatSelection, handleFlight,
                   newFlightPurchase, confirmedFlightPurchase,
                   findFlight, handleFourOhFour }