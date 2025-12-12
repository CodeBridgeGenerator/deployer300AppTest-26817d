const assert = require("assert");
const app = require("../../src/app");

describe("maintenanceschedules service", () => {
  let thisService;
  let maintenancescheduleCreated;

  beforeEach(async () => {
    thisService = await app.service("maintenanceschedules");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (maintenanceschedules)");
  });

  describe("#create", () => {
    const options = {"vehicleId":23,"serviceId":23,"nextServiceDate":23,"notes":"new value"};

    beforeEach(async () => {
      maintenancescheduleCreated = await thisService.create(options);
    });

    it("should create a new maintenanceschedule", () => {
      assert.strictEqual(maintenancescheduleCreated.vehicleId, options.vehicleId);
assert.strictEqual(maintenancescheduleCreated.serviceId, options.serviceId);
assert.strictEqual(maintenancescheduleCreated.nextServiceDate, options.nextServiceDate);
assert.strictEqual(maintenancescheduleCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a maintenanceschedule by ID", async () => {
      const retrieved = await thisService.get(maintenancescheduleCreated._id);
      assert.strictEqual(retrieved._id, maintenancescheduleCreated._id);
    });
  });

  describe("#update", () => {
    let maintenancescheduleUpdated;
    const options = {"vehicleId":100,"serviceId":100,"nextServiceDate":100,"notes":"updated value"};

    beforeEach(async () => {
      maintenancescheduleUpdated = await thisService.update(maintenancescheduleCreated._id, options);
    });

    it("should update an existing maintenanceschedule ", async () => {
      assert.strictEqual(maintenancescheduleUpdated.vehicleId, options.vehicleId);
assert.strictEqual(maintenancescheduleUpdated.serviceId, options.serviceId);
assert.strictEqual(maintenancescheduleUpdated.nextServiceDate, options.nextServiceDate);
assert.strictEqual(maintenancescheduleUpdated.notes, options.notes);
    });
  });

  describe("#delete", () => {
  let maintenancescheduleDeleted;
    beforeEach(async () => {
      maintenancescheduleDeleted = await thisService.remove(maintenancescheduleCreated._id);
    });

    it("should delete a maintenanceschedule", async () => {
      assert.strictEqual(maintenancescheduleDeleted._id, maintenancescheduleCreated._id);
    });
  });
});