import mongoose from 'mongoose';

const  MongoDb = ()=> {
    const MONGO_URI = mongodb+srv://nayan111155:<db_password>@cluster0.dzkfaun.mongodb.net/";

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
    

}
export default MongoDb;                       
