
import mongoose from "mongoose";

const schema =new mongoose.Schema({
    eventname :{
        type: String,
        required:[true,"Event name is required"]
    },
    date :{
        type: String,
        default:new Date().toLocaleDateString()
    },
    time:{
        type: String,
        default:new Date().toLocaleTimeString()
    },
    location: {
        type : String,
        required:[true,"Event location is required"]
    },
    menuItems:[{
        itemName: {
           type: String,
        },
        quantity:{
            type: Number,
        },
        specialRequirements:{
            type: String
        }
}],
    clientDetails:[{
        clientName:{
            type: String,
            required :[true,"client name is required"]
        },
        contactNumber:{
            type: Number,
            required :[true,"client contact number is required"]
        },
        email:{
            type: String,
            required :[true,"client email is required"]
        }
    }]
})

// const Eventmodel = mongoose.model("Event",schema)

export default mongoose.models.Event || mongoose.model("Event",schema)