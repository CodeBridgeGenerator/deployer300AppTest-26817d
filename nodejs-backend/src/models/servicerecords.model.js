
    module.exports = function (app) {
        const modelName = "servicerecords";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceId: { type: Number, max: 99999999, comment: "InvoiceID, p_number, false, true, true, true, true, true, true, , , , ," },
serviceId: { type: Number, max: 99999999, comment: "ServiceID, p_number, false, true, true, true, true, true, true, , , , ," },
vehicleId: { type: Number, max: 99999999, comment: "VehicleID, p_number, false, true, true, true, true, true, true, , , , ," },
technicianId: { type: Number, max: 99999999, comment: "TechnicianID, p_number, false, true, true, true, true, true, true, , , , ," },
serviceDate: { type: Number, max: 99999999, comment: "ServiceDate, p_number, false, true, true, true, true, true, true, , , , ," },

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