import mongoose from 'mongoose';

const connectDB = async () => {
    // Allow CI or local dev without a DB by setting SKIP_DB=1
    if (process.env.SKIP_DB === '1') {
        console.log('SKIP_DB=1 set, skipping Mongo connection');
        return;
    }

    const base = process.env.MONGODB_URI;
    if (!base) {
        console.warn('MONGODB_URI not set – skipping Mongo connection');
        return;
    }
    if (!/^mongodb(\+srv)?:\/\//.test(base)) {
        console.warn('MONGODB_URI has invalid scheme. Expected mongodb:// or mongodb+srv:// — skipping connect in this environment');
        return;
    }

    mongoose.connection.on('connected', () => {
        console.log('DB Connected!');
    });

    const dbName = base.endsWith('/') ? `${base}e-commerce` : `${base}/e-commerce`;
    try {
        await mongoose.connect(dbName, {
            serverSelectionTimeoutMS: 5000,
        });
    } catch (err) {
        console.error('Mongo connection failed (non-fatal for CI):', err.message);
    }
};

export default connectDB;