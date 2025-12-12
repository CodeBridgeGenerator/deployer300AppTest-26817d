const assert = require("assert");
const app = require("../../src/app");

describe("loyaltyprograms service", () => {
  let thisService;
  let loyaltyprogramCreated;

  beforeEach(async () => {
    thisService = await app.service("loyaltyprograms");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (loyaltyprograms)");
  });

  describe("#create", () => {
    const options = {"partId":23,"partName":"new value","description":"new value","quantityInStock":23,"price":23,"supplierId":23};

    beforeEach(async () => {
      loyaltyprogramCreated = await thisService.create(options);
    });

    it("should create a new loyaltyprogram", () => {
      assert.strictEqual(loyaltyprogramCreated.partId, options.partId);
assert.strictEqual(loyaltyprogramCreated.partName, options.partName);
assert.strictEqual(loyaltyprogramCreated.description, options.description);
assert.strictEqual(loyaltyprogramCreated.quantityInStock, options.quantityInStock);
assert.strictEqual(loyaltyprogramCreated.price, options.price);
assert.strictEqual(loyaltyprogramCreated.supplierId, options.supplierId);
    });
  });

  describe("#get", () => {
    it("should retrieve a loyaltyprogram by ID", async () => {
      const retrieved = await thisService.get(loyaltyprogramCreated._id);
      assert.strictEqual(retrieved._id, loyaltyprogramCreated._id);
    });
  });

  describe("#update", () => {
    let loyaltyprogramUpdated;
    const options = {"partId":100,"partName":"updated value","description":"updated value","quantityInStock":100,"price":100,"supplierId":100};

    beforeEach(async () => {
      loyaltyprogramUpdated = await thisService.update(loyaltyprogramCreated._id, options);
    });

    it("should update an existing loyaltyprogram ", async () => {
      assert.strictEqual(loyaltyprogramUpdated.partId, options.partId);
assert.strictEqual(loyaltyprogramUpdated.partName, options.partName);
assert.strictEqual(loyaltyprogramUpdated.description, options.description);
assert.strictEqual(loyaltyprogramUpdated.quantityInStock, options.quantityInStock);
assert.strictEqual(loyaltyprogramUpdated.price, options.price);
assert.strictEqual(loyaltyprogramUpdated.supplierId, options.supplierId);
    });
  });

  describe("#delete", () => {
  let loyaltyprogramDeleted;
    beforeEach(async () => {
      loyaltyprogramDeleted = await thisService.remove(loyaltyprogramCreated._id);
    });

    it("should delete a loyaltyprogram", async () => {
      assert.strictEqual(loyaltyprogramDeleted._id, loyaltyprogramCreated._id);
    });
  });
});