//connect to mongo
import mongoose from "mongoose";

//track / change connection status
let isConnected = false
export const dbConnect = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        //notify if already connected
        console.log('MongoDb is currently connected')
        return
    }

    try {
        //connect and access db "petname" to post entries and name generation too
        /* Ideally would/will include google user authentication*/
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "petname",
        })

        isConnected = true
        //log good connect
        console.log('MongoDB connected!')
    } catch (error) {
        console.log(error)
    }
}
