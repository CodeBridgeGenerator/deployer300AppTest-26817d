const assert = require("assert");
const app = require("../../src/app");

describe("technicians service", () => {
  let thisService;
  let technicianCreated;

  beforeEach(async () => {
    thisService = await app.service("technicians");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (technicians)");
  });

  describe("#create", () => {
    const options = {"firstName":"new value","lastName":"new value","email":"new value","phoneNumber":"new value","specialization":"new value"};

    beforeEach(async () => {
      technicianCreated = await thisService.create(options);
    });

    it("should create a new technician", () => {
      assert.strictEqual(technicianCreated.firstName, options.firstName);
assert.strictEqual(technicianCreated.lastName, options.lastName);
assert.strictEqual(technicianCreated.email, options.email);
assert.strictEqual(technicianCreated.phoneNumber, options.phoneNumber);
assert.strictEqual(technicianCreated.specialization, options.specialization);
    });
  });

  describe("#get", () => {
    it("should retrieve a technician by ID", async () => {
      const retrieved = await thisService.get(technicianCreated._id);
      assert.strictEqual(retrieved._id, technicianCreated._id);
    });
  });

  describe("#update", () => {
    let technicianUpdated;
    const options = {"firstName":"updated value","lastName":"updated value","email":"updated value","phoneNumber":"updated value","specialization":"updated value"};

    beforeEach(async () => {
      technicianUpdated = await thisService.update(technicianCreated._id, options);
    });

    it("should update an existing technician ", async () => {
      assert.strictEqual(technicianUpdated.firstName, options.firstName);
assert.strictEqual(technicianUpdated.lastName, options.lastName);
assert.strictEqual(technicianUpdated.email, options.email);
assert.strictEqual(technicianUpdated.phoneNumber, options.phoneNumber);
assert.strictEqual(technicianUpdated.specialization, options.specialization);
    });
  });

  describe("#delete", () => {
  let technicianDeleted;
    beforeEach(async () => {
      technicianDeleted = await thisService.remove(technicianCreated._id);
    });

    it("should delete a technician", async () => {
      assert.strictEqual(technicianDeleted._id, technicianCreated._id);
    });
  });
});