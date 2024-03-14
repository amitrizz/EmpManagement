import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import EmployeeRoutes from "./routes/EmployeeRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();
// cors policy
app.use(cors());



// JSON 
app.use(express.json());//sort data into json format

app.use("/api/Employee", EmployeeRoutes);


app.get("/", (req, res) => {
    return res.send("running")
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


