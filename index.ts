import express, { Express } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import moment from 'moment';
import clientRoutes from './routes/client/index.route';

dotenv.config(); // Load environment variables

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Middleware để phân tích dữ liệu form và JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Thiết lập session middleware
app.use(session({
  secret: process.env.SECRET_KEY || 'default-secret-key', // Sử dụng biến môi trường SECRET_KEY hoặc giá trị mặc định
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Đảm bảo bảo mật cho production, có thể set thành true khi dùng HTTPS
}));

// Thiết lập thư mục chứa các file tĩnh
app.use(express.static('public'));

// Thiết lập view engine
app.set('view engine', 'pug');
app.set('views', './views/client'); // Đảm bảo đường dẫn views

// App Local Variables
app.locals.moment = moment; // Sử dụng moment cho view

// Client Routes
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
