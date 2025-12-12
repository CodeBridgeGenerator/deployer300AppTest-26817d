const assert = require("assert");
const app = require("../../src/app");

describe("suppliers service", () => {
  let thisService;
  let supplierCreated;

  beforeEach(async () => {
    thisService = await app.service("suppliers");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (suppliers)");
  });

  describe("#create", () => {
    const options = {"supplierName":"new value","contactPerson":"new value","phoneNumber":"new value","email":"new value","address":"new value"};

    beforeEach(async () => {
      supplierCreated = await thisService.create(options);
    });

    it("should create a new supplier", () => {
      assert.strictEqual(supplierCreated.supplierName, options.supplierName);
assert.strictEqual(supplierCreated.contactPerson, options.contactPerson);
assert.strictEqual(supplierCreated.phoneNumber, options.phoneNumber);
assert.strictEqual(supplierCreated.email, options.email);
assert.strictEqual(supplierCreated.address, options.address);
    });
  });

  describe("#get", () => {
    it("should retrieve a supplier by ID", async () => {
      const retrieved = await thisService.get(supplierCreated._id);
      assert.strictEqual(retrieved._id, supplierCreated._id);
    });
  });

  describe("#update", () => {
    let supplierUpdated;
    const options = {"supplierName":"updated value","contactPerson":"updated value","phoneNumber":"updated value","email":"updated value","address":"updated value"};

    beforeEach(async () => {
      supplierUpdated = await thisService.update(supplierCreated._id, options);
    });

    it("should update an existing supplier ", async () => {
      assert.strictEqual(supplierUpdated.supplierName, options.supplierName);
assert.strictEqual(supplierUpdated.contactPerson, options.contactPerson);
assert.strictEqual(supplierUpdated.phoneNumber, options.phoneNumber);
assert.strictEqual(supplierUpdated.email, options.email);
assert.strictEqual(supplierUpdated.address, options.address);
    });
  });

  describe("#delete", () => {
  let supplierDeleted;
    beforeEach(async () => {
      supplierDeleted = await thisService.remove(supplierCreated._id);
    });

    it("should delete a supplier", async () => {
      assert.strictEqual(supplierDeleted._id, supplierCreated._id);
    });
  });
});