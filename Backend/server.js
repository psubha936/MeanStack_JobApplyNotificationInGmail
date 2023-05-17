const express = require('express');
const appRoute = require('./routes/route.js')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

/** routes */
app.use('/api', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
