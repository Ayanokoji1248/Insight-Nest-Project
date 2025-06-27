import express from "express"
import { dbConnection } from "./config/dbConnection"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route";
import blogRouter from "./routes/blog.route";
import commentRouter from "./routes/comment.route";
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/auth', authRouter)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)

async function main() {
    await dbConnection();

    app.listen(process.env.PORT || 3000, () => {
        console.log("Server running on port 3000")

    })
}

main()