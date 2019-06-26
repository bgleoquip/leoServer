var Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

// // Create a schema
var schemaData = {
    defaults: {
        defaultUserSchema: {
            method: {
                type: String,
                enum: ['local', 'google', 'facebook'],
                required: true
            },
            local: {
                email: {
                    type: String,
                    lowercase: true
                },
                password: {
                    type: String
                }
            },
            google: {
                id: {
                    type: String
                },
                email: {
                    type: String,
                    lowercase: true
                }
            },
            facebook: {
                id: {
                    type: String
                },
                email: {
                    type: String,
                    lowercase: true
                }
            }
        }
    },
    getUserSchema: function (schema) {
        if (schema && schema.constructor === Object) {
            if (schema.method && schema.local) {
                return new Schema(schema);
            }
        }
        return new Schema(this.defaults.defaultUserSchema)

    }

}

module.exports = schemaData;