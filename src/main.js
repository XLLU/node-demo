const express = require("express");
const app = express();
const port = 3000;

const data = [
    {
        id: 1, 
        name: "lucas", 
        gender: "male"
    }, 
    {
        id:2, 
        name: "nancy", 
        gender: "female"
    }
];

app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
    res.send(data);
});

app.get("/:id", (req, res) => {
    const {id} = req.params;
    res.send(data.filter(item => item.id==id));
});