const assert = require("assert");
const app = require("../../src/app");

describe("customers service", () => {
  let thisService;
  let customerCreated;

  beforeEach(async () => {
    thisService = await app.service("customers");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (customers)");
  });

  describe("#create", () => {
    const options = {"firstName":"new value","lastName":"new value","email":"new value","phoneNumber":"new value","address":"new value","joinDate":23,"loyaltyPoints":23};

    beforeEach(async () => {
      customerCreated = await thisService.create(options);
    });

    it("should create a new customer", () => {
      assert.strictEqual(customerCreated.firstName, options.firstName);
assert.strictEqual(customerCreated.lastName, options.lastName);
assert.strictEqual(customerCreated.email, options.email);
assert.strictEqual(customerCreated.phoneNumber, options.phoneNumber);
assert.strictEqual(customerCreated.address, options.address);
assert.strictEqual(customerCreated.joinDate, options.joinDate);
assert.strictEqual(customerCreated.loyaltyPoints, options.loyaltyPoints);
    });
  });

  describe("#get", () => {
    it("should retrieve a customer by ID", async () => {
      const retrieved = await thisService.get(customerCreated._id);
      assert.strictEqual(retrieved._id, customerCreated._id);
    });
  });

  describe("#update", () => {
    let customerUpdated;
    const options = {"firstName":"updated value","lastName":"updated value","email":"updated value","phoneNumber":"updated value","address":"updated value","joinDate":100,"loyaltyPoints":100};

    beforeEach(async () => {
      customerUpdated = await thisService.update(customerCreated._id, options);
    });

    it("should update an existing customer ", async () => {
      assert.strictEqual(customerUpdated.firstName, options.firstName);
assert.strictEqual(customerUpdated.lastName, options.lastName);
assert.strictEqual(customerUpdated.email, options.email);
assert.strictEqual(customerUpdated.phoneNumber, options.phoneNumber);
assert.strictEqual(customerUpdated.address, options.address);
assert.strictEqual(customerUpdated.joinDate, options.joinDate);
assert.strictEqual(customerUpdated.loyaltyPoints, options.loyaltyPoints);
    });
  });

  describe("#delete", () => {
  let customerDeleted;
    beforeEach(async () => {
      customerDeleted = await thisService.remove(customerCreated._id);
    });

    it("should delete a customer", async () => {
      assert.strictEqual(customerDeleted._id, customerCreated._id);
    });
  });
});