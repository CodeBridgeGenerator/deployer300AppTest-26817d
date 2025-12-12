
    module.exports = function (app) {
        const modelName = "maintenanceschedules";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            vehicleId: { type: Number, max: 99999999, comment: "VehicleID, p_number, false, true, true, true, true, true, true, , , , ," },
serviceId: { type: Number, max: 99999999, comment: "ServiceID, p_number, false, true, true, true, true, true, true, , , , ," },
nextServiceDate: { type: Number, max: 99999999, comment: "NextServiceDate, p_number, false, true, true, true, true, true, true, , , , ," },
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