const app = require("./src/app.js");
const connectToDB = require("./src/configs/database.js");

connectToDB();

const port = 3000;
app.listen(port, () => {
    console.log(`Server on ${port}`);
});