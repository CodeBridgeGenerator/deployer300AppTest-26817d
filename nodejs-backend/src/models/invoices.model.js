
    module.exports = function (app) {
        const modelName = "invoices";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerId: { type: Number, max: 99999999, comment: "CustomerID, p_number, false, true, true, true, true, true, true, , , , ," },
vehicleId: { type: Number, max: 99999999, comment: "VehicleID, p_number, false, true, true, true, true, true, true, , , , ," },
serviceDate: { type: Number, max: 99999999, comment: "ServiceDate, p_number, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type: Number, max: 99999999, comment: "TotalAmount, p_number, false, true, true, true, true, true, true, , , , ," },
paymentStatus: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "PaymentStatus, p, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "PaymentMethod, p, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Notes, p, false, true, true, true, true, true, true, , , , ," },

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