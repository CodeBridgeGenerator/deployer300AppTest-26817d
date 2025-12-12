const assert = require("assert");
const app = require("../../src/app");

describe("paymentmethods service", () => {
  let thisService;
  let paymentmethodCreated;

  beforeEach(async () => {
    thisService = await app.service("paymentmethods");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (paymentmethods)");
  });

  describe("#create", () => {
    const options = {"methodName":"new value","description":"new value"};

    beforeEach(async () => {
      paymentmethodCreated = await thisService.create(options);
    });

    it("should create a new paymentmethod", () => {
      assert.strictEqual(paymentmethodCreated.methodName, options.methodName);
assert.strictEqual(paymentmethodCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a paymentmethod by ID", async () => {
      const retrieved = await thisService.get(paymentmethodCreated._id);
      assert.strictEqual(retrieved._id, paymentmethodCreated._id);
    });
  });

  describe("#update", () => {
    let paymentmethodUpdated;
    const options = {"methodName":"updated value","description":"updated value"};

    beforeEach(async () => {
      paymentmethodUpdated = await thisService.update(paymentmethodCreated._id, options);
    });

    it("should update an existing paymentmethod ", async () => {
      assert.strictEqual(paymentmethodUpdated.methodName, options.methodName);
assert.strictEqual(paymentmethodUpdated.description, options.description);
    });
  });

  describe("#delete", () => {
  let paymentmethodDeleted;
    beforeEach(async () => {
      paymentmethodDeleted = await thisService.remove(paymentmethodCreated._id);
    });

    it("should delete a paymentmethod", async () => {
      assert.strictEqual(paymentmethodDeleted._id, paymentmethodCreated._id);
    });
  });
});