import mongoose from 'mongoose';
import { config } from 'dotenv'; 

config();

const DATABASE = process.env.DATABASE || '';

const connect = async () => {
    try {
        await mongoose.connect(DATABASE);
        console.log('Base de datos conectada exitosamente')
    } catch (error) {
        console.log(error)
    }
}

export default connect;