"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
async function run() {
    try {
        await mongoose_1.default.connect("mongodb+srv://testingDatabase:LmlkuPM6zWk6hdW5@cluster0.e7yhr.mongodb.net/cow-hurt?retryWrites=true&w=majority");
        console.log(`Database is connected successfully`);
        server = app_1.default.listen(2000, () => {
            console.log(`Application  listening on port 2000`);
        });
    }
    catch (err) {
        console.log('Failed to connect database', err);
    }
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
}
run();
//# sourceMappingURL=server.js.map