import express from "express"
import { dbConnection } from "./config/dbConnection"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route";
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/auth', authRouter)

async function main() {
    await dbConnection();

    app.listen(process.env.PORT || 3000, () => {
        console.log("Server running on port 3000")

    })
}

main()