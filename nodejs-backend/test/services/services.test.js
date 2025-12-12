const assert = require("assert");
const app = require("../../src/app");

describe("services service", () => {
  let thisService;
  let serviceCreated;

  beforeEach(async () => {
    thisService = await app.service("services");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (services)");
  });

  describe("#create", () => {
    const options = {"serviceName":"new value","description":"new value","price":23,"duration":23};

    beforeEach(async () => {
      serviceCreated = await thisService.create(options);
    });

    it("should create a new service", () => {
      assert.strictEqual(serviceCreated.serviceName, options.serviceName);
assert.strictEqual(serviceCreated.description, options.description);
assert.strictEqual(serviceCreated.price, options.price);
assert.strictEqual(serviceCreated.duration, options.duration);
    });
  });

  describe("#get", () => {
    it("should retrieve a service by ID", async () => {
      const retrieved = await thisService.get(serviceCreated._id);
      assert.strictEqual(retrieved._id, serviceCreated._id);
    });
  });

  describe("#update", () => {
    let serviceUpdated;
    const options = {"serviceName":"updated value","description":"updated value","price":100,"duration":100};

    beforeEach(async () => {
      serviceUpdated = await thisService.update(serviceCreated._id, options);
    });

    it("should update an existing service ", async () => {
      assert.strictEqual(serviceUpdated.serviceName, options.serviceName);
assert.strictEqual(serviceUpdated.description, options.description);
assert.strictEqual(serviceUpdated.price, options.price);
assert.strictEqual(serviceUpdated.duration, options.duration);
    });
  });

  describe("#delete", () => {
  let serviceDeleted;
    beforeEach(async () => {
      serviceDeleted = await thisService.remove(serviceCreated._id);
    });

    it("should delete a service", async () => {
      assert.strictEqual(serviceDeleted._id, serviceCreated._id);
    });
  });
});