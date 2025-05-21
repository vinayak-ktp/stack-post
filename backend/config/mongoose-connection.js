import mongoose from 'mongoose'
import config from 'config'

mongoose
.connect(`${config.MONGODB_URI}/blog-app`)
.then(() => console.log("db connected!"))
.catch(err => console.error(err))

export default mongoose.connection;