const assert = require("assert");
const app = require("../../src/app");

describe("vehicles service", () => {
  let thisService;
  let vehicleCreated;

  beforeEach(async () => {
    thisService = await app.service("vehicles");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (vehicles)");
  });

  describe("#create", () => {
    const options = {"customerId":23,"make":"new value","model":"new value","year":23,"licensePlate":"new value","vin":"new value"};

    beforeEach(async () => {
      vehicleCreated = await thisService.create(options);
    });

    it("should create a new vehicle", () => {
      assert.strictEqual(vehicleCreated.customerId, options.customerId);
assert.strictEqual(vehicleCreated.make, options.make);
assert.strictEqual(vehicleCreated.model, options.model);
assert.strictEqual(vehicleCreated.year, options.year);
assert.strictEqual(vehicleCreated.licensePlate, options.licensePlate);
assert.strictEqual(vehicleCreated.vin, options.vin);
    });
  });

  describe("#get", () => {
    it("should retrieve a vehicle by ID", async () => {
      const retrieved = await thisService.get(vehicleCreated._id);
      assert.strictEqual(retrieved._id, vehicleCreated._id);
    });
  });

  describe("#update", () => {
    let vehicleUpdated;
    const options = {"customerId":100,"make":"updated value","model":"updated value","year":100,"licensePlate":"updated value","vin":"updated value"};

    beforeEach(async () => {
      vehicleUpdated = await thisService.update(vehicleCreated._id, options);
    });

    it("should update an existing vehicle ", async () => {
      assert.strictEqual(vehicleUpdated.customerId, options.customerId);
assert.strictEqual(vehicleUpdated.make, options.make);
assert.strictEqual(vehicleUpdated.model, options.model);
assert.strictEqual(vehicleUpdated.year, options.year);
assert.strictEqual(vehicleUpdated.licensePlate, options.licensePlate);
assert.strictEqual(vehicleUpdated.vin, options.vin);
    });
  });

  describe("#delete", () => {
  let vehicleDeleted;
    beforeEach(async () => {
      vehicleDeleted = await thisService.remove(vehicleCreated._id);
    });

    it("should delete a vehicle", async () => {
      assert.strictEqual(vehicleDeleted._id, vehicleCreated._id);
    });
  });
});