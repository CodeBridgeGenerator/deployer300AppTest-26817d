const assert = require("assert");
const app = require("../../src/app");

describe("servicerecords service", () => {
  let thisService;
  let servicerecordCreated;

  beforeEach(async () => {
    thisService = await app.service("servicerecords");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (servicerecords)");
  });

  describe("#create", () => {
    const options = {"invoiceId":23,"serviceId":23,"vehicleId":23,"technicianId":23,"serviceDate":23};

    beforeEach(async () => {
      servicerecordCreated = await thisService.create(options);
    });

    it("should create a new servicerecord", () => {
      assert.strictEqual(servicerecordCreated.invoiceId, options.invoiceId);
assert.strictEqual(servicerecordCreated.serviceId, options.serviceId);
assert.strictEqual(servicerecordCreated.vehicleId, options.vehicleId);
assert.strictEqual(servicerecordCreated.technicianId, options.technicianId);
assert.strictEqual(servicerecordCreated.serviceDate, options.serviceDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a servicerecord by ID", async () => {
      const retrieved = await thisService.get(servicerecordCreated._id);
      assert.strictEqual(retrieved._id, servicerecordCreated._id);
    });
  });

  describe("#update", () => {
    let servicerecordUpdated;
    const options = {"invoiceId":100,"serviceId":100,"vehicleId":100,"technicianId":100,"serviceDate":100};

    beforeEach(async () => {
      servicerecordUpdated = await thisService.update(servicerecordCreated._id, options);
    });

    it("should update an existing servicerecord ", async () => {
      assert.strictEqual(servicerecordUpdated.invoiceId, options.invoiceId);
assert.strictEqual(servicerecordUpdated.serviceId, options.serviceId);
assert.strictEqual(servicerecordUpdated.vehicleId, options.vehicleId);
assert.strictEqual(servicerecordUpdated.technicianId, options.technicianId);
assert.strictEqual(servicerecordUpdated.serviceDate, options.serviceDate);
    });
  });

  describe("#delete", () => {
  let servicerecordDeleted;
    beforeEach(async () => {
      servicerecordDeleted = await thisService.remove(servicerecordCreated._id);
    });

    it("should delete a servicerecord", async () => {
      assert.strictEqual(servicerecordDeleted._id, servicerecordCreated._id);
    });
  });
});