
    module.exports = function (app) {
        const modelName = "vehicles";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerId: { type: Number, max: 99999999, comment: "CustomerID, p_number, false, true, true, true, true, true, true, , , , ," },
make: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Make, p, false, true, true, true, true, true, true, , , , ," },
model: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Model, p, false, true, true, true, true, true, true, , , , ," },
year: { type: Number, max: 99999999, comment: "Year, p_number, false, true, true, true, true, true, true, , , , ," },
licensePlate: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "LicensePlate, p, false, true, true, true, true, true, true, , , , ," },
vin: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "VIN, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };