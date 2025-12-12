const customers = require("./customers/customers.service.js");
const vehicles = require("./vehicles/vehicles.service.js");
const loyaltyprograms = require("./loyaltyprograms/loyaltyprograms.service.js");
const invoices = require("./invoices/invoices.service.js");
const services = require("./services/services.service.js");
const servicerecords = require("./servicerecords/servicerecords.service.js");
const maintenanceschedules = require("./maintenanceschedules/maintenanceschedules.service.js");
const oilchangerecords = require("./oilchangerecords/oilchangerecords.service.js");
const technicians = require("./technicians/technicians.service.js");
const partsinventory = require("./partsinventory/partsinventory.service.js");
const suppliers = require("./suppliers/suppliers.service.js");
const paymentmethods = require("./paymentmethods/paymentmethods.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customers);
  app.configure(vehicles);
  app.configure(loyaltyprograms);
  app.configure(invoices);
  app.configure(services);
  app.configure(servicerecords);
  app.configure(maintenanceschedules);
  app.configure(oilchangerecords);
  app.configure(technicians);
  app.configure(partsinventory);
  app.configure(suppliers);
  app.configure(paymentmethods);
  // ~cb-add-configure-service-name~
};
