const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/practice4';


const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    })
}

mongoose.connect(dbURI);

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    })
})

process.once('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0)
    })
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
})

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
})

