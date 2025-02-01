"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./utils/index"));
const index_2 = __importDefault(require("./routes/index"));
const expenseroute_1 = __importDefault(require("./routes/expenseroute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 8000;
const corsOptions = {
    origin: ['https://expense-tracker-orcin-five.vercel.app', "http://localhost:5173",],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, index_1.default)();
app.get('/', (req, res) => {
    res.send('hello ');
});
app.get('/test', (req, res) => {
    res.send('hello test');
});
app.use('/api', index_2.default);
app.use('/api', expenseroute_1.default);
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
