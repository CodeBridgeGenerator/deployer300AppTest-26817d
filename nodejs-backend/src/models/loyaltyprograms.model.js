
    module.exports = function (app) {
        const modelName = "loyaltyprograms";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partId: { type: Number, max: 99999999, comment: "PartID, p_number, false, true, true, true, true, true, true, , , , ," },
partName: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "PartName, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
quantityInStock: { type: Number, max: 99999999, comment: "QuantityInStock, p_number, false, true, true, true, true, true, true, , , , ," },
price: { type: Number, max: 99999999, comment: "Price, p_number, false, true, true, true, true, true, true, , , , ," },
supplierId: { type: Number, max: 99999999, comment: "SupplierID, p_number, false, true, true, true, true, true, true, , , , ," },

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