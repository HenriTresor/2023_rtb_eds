import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './routes/auth.route'
import employeeRouter from './routes/employee.route'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './swagger'

const app = express();


app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: false,
    allowedHeaders: ['Authorization', 'Content-Type']
}))
app.use(morgan('dev'))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/employees', employeeRouter)

app.use(/(.*)/, (req, res) => {
    res.status(404).json({ status: false, message: "route not found" });
});

app.use(errorHandler);

export default app;  