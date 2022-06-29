import mongoose from 'mongoose';

const disconnectFromDb = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    process.exit(1);
  }
};

export default disconnectFromDb;
