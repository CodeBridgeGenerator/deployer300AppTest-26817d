
    module.exports = function (app) {
        const modelName = "oilchangerecords";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            vehicleId: { type: Number, max: 99999999, comment: "VehicleID, p_number, false, true, true, true, true, true, true, , , , ," },
serviceRecordId: { type: Number, max: 99999999, comment: "ServiceRecordID, p_number, false, true, true, true, true, true, true, , , , ," },
oilType: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "OilType, p, false, true, true, true, true, true, true, , , , ," },
mileage: { type: Number, max: 99999999, comment: "Mileage, p_number, false, true, true, true, true, true, true, , , , ," },
technicianId: { type: Number, max: 99999999, comment: "TechnicianID, p_number, false, true, true, true, true, true, true, , , , ," },
dateOfChange: { type: Number, max: 99999999, comment: "DateOfChange, p_number, false, true, true, true, true, true, true, , , , ," },

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