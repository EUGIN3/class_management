const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    {id: 1, lastName:`casanada`, firstName:`eugine`, section:`BSIT 4A`, status:`p`},
    {id: 2, lastName:`mascarina`, firstName:`mark`, section:`BSIT 4A`, status:`a`},
];

app.get("/users", (req, res) => {
    const {lastName, firstName, section, status} = req.body;

    const userIndex = users.findIndex(
        user => 
            user.firstName === firstName &&
            user.lastName === lastName 
    );

    if (userIndex !== -1) {
        users[userIndex].status = status;
        console.log(`Updated attendance for ${lastName} ${firstName} to: ${status}`);
        res.status(200).json({message: `Attendance for ${lastName} ${firstName} has been updated to: ${status}`});
    } else {
        const newUser = {
            id: users.length + 1,
            lastName,
            firstName,
            section,
            status
        };
        users.push(newUser);
        console.log(`New stdudent ${lastName} ${firstName} has been added with status ${status}`);
        res.status(201).json({message: `Attendance for ${lastName} ${firstName} has been updated to: ${status}`});
    };
})


app.get("/users", (res, req) => {
    res.status(200).json(users);
});

app.get("/", (res, req) => {
    res.send(`Server is up and running!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;