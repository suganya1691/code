const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/api/employees", (req,res) => {
    const dataPath = path.join(__dirname,"sample-data.json");
    const data = fs.readFileSync(dataPath,"utf-8");
    res.json(JSON.parse(data));
});

app.listen(PORT,() => {
    console.log(`Server Running on ${PORT}`)
})