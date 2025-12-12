const assert = require("assert");
const app = require("../../src/app");

describe("partsinventory service", () => {
  let thisService;
  let partsinventoryCreated;

  beforeEach(async () => {
    thisService = await app.service("partsinventory");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (partsinventory)");
  });

  describe("#create", () => {
    const options = {"partName":"new value","description":"new value","quantityInStock":23,"price":23,"supplierId":23};

    beforeEach(async () => {
      partsinventoryCreated = await thisService.create(options);
    });

    it("should create a new partsinventory", () => {
      assert.strictEqual(partsinventoryCreated.partName, options.partName);
assert.strictEqual(partsinventoryCreated.description, options.description);
assert.strictEqual(partsinventoryCreated.quantityInStock, options.quantityInStock);
assert.strictEqual(partsinventoryCreated.price, options.price);
assert.strictEqual(partsinventoryCreated.supplierId, options.supplierId);
    });
  });

  describe("#get", () => {
    it("should retrieve a partsinventory by ID", async () => {
      const retrieved = await thisService.get(partsinventoryCreated._id);
      assert.strictEqual(retrieved._id, partsinventoryCreated._id);
    });
  });

  describe("#update", () => {
    let partsinventoryUpdated;
    const options = {"partName":"updated value","description":"updated value","quantityInStock":100,"price":100,"supplierId":100};

    beforeEach(async () => {
      partsinventoryUpdated = await thisService.update(partsinventoryCreated._id, options);
    });

    it("should update an existing partsinventory ", async () => {
      assert.strictEqual(partsinventoryUpdated.partName, options.partName);
assert.strictEqual(partsinventoryUpdated.description, options.description);
assert.strictEqual(partsinventoryUpdated.quantityInStock, options.quantityInStock);
assert.strictEqual(partsinventoryUpdated.price, options.price);
assert.strictEqual(partsinventoryUpdated.supplierId, options.supplierId);
    });
  });

  describe("#delete", () => {
  let partsinventoryDeleted;
    beforeEach(async () => {
      partsinventoryDeleted = await thisService.remove(partsinventoryCreated._id);
    });

    it("should delete a partsinventory", async () => {
      assert.strictEqual(partsinventoryDeleted._id, partsinventoryCreated._id);
    });
  });
});