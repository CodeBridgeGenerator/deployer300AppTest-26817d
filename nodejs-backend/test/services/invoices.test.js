const assert = require("assert");
const app = require("../../src/app");

describe("invoices service", () => {
  let thisService;
  let invoiceCreated;

  beforeEach(async () => {
    thisService = await app.service("invoices");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (invoices)");
  });

  describe("#create", () => {
    const options = {"customerId":23,"vehicleId":23,"serviceDate":23,"totalAmount":23,"paymentStatus":"new value","paymentMethod":"new value","notes":"new value"};

    beforeEach(async () => {
      invoiceCreated = await thisService.create(options);
    });

    it("should create a new invoice", () => {
      assert.strictEqual(invoiceCreated.customerId, options.customerId);
assert.strictEqual(invoiceCreated.vehicleId, options.vehicleId);
assert.strictEqual(invoiceCreated.serviceDate, options.serviceDate);
assert.strictEqual(invoiceCreated.totalAmount, options.totalAmount);
assert.strictEqual(invoiceCreated.paymentStatus, options.paymentStatus);
assert.strictEqual(invoiceCreated.paymentMethod, options.paymentMethod);
assert.strictEqual(invoiceCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a invoice by ID", async () => {
      const retrieved = await thisService.get(invoiceCreated._id);
      assert.strictEqual(retrieved._id, invoiceCreated._id);
    });
  });

  describe("#update", () => {
    let invoiceUpdated;
    const options = {"customerId":100,"vehicleId":100,"serviceDate":100,"totalAmount":100,"paymentStatus":"updated value","paymentMethod":"updated value","notes":"updated value"};

    beforeEach(async () => {
      invoiceUpdated = await thisService.update(invoiceCreated._id, options);
    });

    it("should update an existing invoice ", async () => {
      assert.strictEqual(invoiceUpdated.customerId, options.customerId);
assert.strictEqual(invoiceUpdated.vehicleId, options.vehicleId);
assert.strictEqual(invoiceUpdated.serviceDate, options.serviceDate);
assert.strictEqual(invoiceUpdated.totalAmount, options.totalAmount);
assert.strictEqual(invoiceUpdated.paymentStatus, options.paymentStatus);
assert.strictEqual(invoiceUpdated.paymentMethod, options.paymentMethod);
assert.strictEqual(invoiceUpdated.notes, options.notes);
    });
  });

  describe("#delete", () => {
  let invoiceDeleted;
    beforeEach(async () => {
      invoiceDeleted = await thisService.remove(invoiceCreated._id);
    });

    it("should delete a invoice", async () => {
      assert.strictEqual(invoiceDeleted._id, invoiceCreated._id);
    });
  });
});