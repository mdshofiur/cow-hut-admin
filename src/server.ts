import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';

let server: Server;

async function run() {
  try {
    await mongoose.connect("mongodb+srv://testingDatabase:LmlkuPM6zWk6hdW5@cluster0.e7yhr.mongodb.net/cow-hurt?retryWrites=true&w=majority" as string);
    console.log(`Database is connected successfully`);

    server = app.listen(2000, () => {
      console.log(`Application  listening on port 2000`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

run();