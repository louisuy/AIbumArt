const path = require('path');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended:false }));


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`));
