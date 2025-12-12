const assert = require("assert");
const app = require("../../src/app");

describe("oilchangerecords service", () => {
  let thisService;
  let oilchangerecordCreated;

  beforeEach(async () => {
    thisService = await app.service("oilchangerecords");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (oilchangerecords)");
  });

  describe("#create", () => {
    const options = {"vehicleId":23,"serviceRecordId":23,"oilType":"new value","mileage":23,"technicianId":23,"dateOfChange":23};

    beforeEach(async () => {
      oilchangerecordCreated = await thisService.create(options);
    });

    it("should create a new oilchangerecord", () => {
      assert.strictEqual(oilchangerecordCreated.vehicleId, options.vehicleId);
assert.strictEqual(oilchangerecordCreated.serviceRecordId, options.serviceRecordId);
assert.strictEqual(oilchangerecordCreated.oilType, options.oilType);
assert.strictEqual(oilchangerecordCreated.mileage, options.mileage);
assert.strictEqual(oilchangerecordCreated.technicianId, options.technicianId);
assert.strictEqual(oilchangerecordCreated.dateOfChange, options.dateOfChange);
    });
  });

  describe("#get", () => {
    it("should retrieve a oilchangerecord by ID", async () => {
      const retrieved = await thisService.get(oilchangerecordCreated._id);
      assert.strictEqual(retrieved._id, oilchangerecordCreated._id);
    });
  });

  describe("#update", () => {
    let oilchangerecordUpdated;
    const options = {"vehicleId":100,"serviceRecordId":100,"oilType":"updated value","mileage":100,"technicianId":100,"dateOfChange":100};

    beforeEach(async () => {
      oilchangerecordUpdated = await thisService.update(oilchangerecordCreated._id, options);
    });

    it("should update an existing oilchangerecord ", async () => {
      assert.strictEqual(oilchangerecordUpdated.vehicleId, options.vehicleId);
assert.strictEqual(oilchangerecordUpdated.serviceRecordId, options.serviceRecordId);
assert.strictEqual(oilchangerecordUpdated.oilType, options.oilType);
assert.strictEqual(oilchangerecordUpdated.mileage, options.mileage);
assert.strictEqual(oilchangerecordUpdated.technicianId, options.technicianId);
assert.strictEqual(oilchangerecordUpdated.dateOfChange, options.dateOfChange);
    });
  });

  describe("#delete", () => {
  let oilchangerecordDeleted;
    beforeEach(async () => {
      oilchangerecordDeleted = await thisService.remove(oilchangerecordCreated._id);
    });

    it("should delete a oilchangerecord", async () => {
      assert.strictEqual(oilchangerecordDeleted._id, oilchangerecordCreated._id);
    });
  });
});