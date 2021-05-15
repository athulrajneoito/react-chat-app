import mongoose from 'mongoose';


const url = 'mongodb+srv://admin:athulraj@6k@chatapp.8ka2r.mongodb.net/chatRoom?retryWrites=true&w=majority';
const localurl = 'mongodb://127.0.0.1:27017/chatRoom'
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log('db connected')
})