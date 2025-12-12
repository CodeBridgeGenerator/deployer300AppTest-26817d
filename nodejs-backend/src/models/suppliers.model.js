
    module.exports = function (app) {
        const modelName = "suppliers";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            supplierName: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "SupplierName, p, false, true, true, true, true, true, true, , , , ," },
contactPerson: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "ContactPerson, p, false, true, true, true, true, true, true, , , , ," },
phoneNumber: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "PhoneNumber, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
address: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Address, p, false, true, true, true, true, true, true, , , , ," },

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