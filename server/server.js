require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
, cors = require('cors')
var twilio = require('twilio')
const ctrl = require('./controller')
const parseString = require('xml2js').parseString;
const socket = require('socket.io');
const axios = require('axios')


const app = express();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const port = 3336;
const io = socket(app.listen(port, () => console.log(`bruuuuuh ${port} `)));



app.use(cors())
app.use(bodyParser.json());
app.use( express.static( `${__dirname}/../build` ) );

   // Your Auth Token from www.twilio.com/console


var messages = []
var count = 0

app.post('/send', (req, res) => {
    console.log(req.body)
    let {message, number} = req.body
    
    ctrl.sendSms(number, message)
    
})

io.on('connection', onConnect)

function onConnect(socket){
    console.log('connected')

    

    
        socket.emit('deliverMessage', messages)
        count++
    
        
 
        
    
    
}

app.post('/incoming', (req, res) => {

    var mess = {'message': req.body.Body, 'number': req.body.From}
    io.on('connection', onConnect)
    messages.push(mess)
    
    
    res.status(200)

   


    // res.json({message: req.body.Body, number: req.body.From})
    // const twiml = new MessagingResponse();
    
    //   if (req.body.Body == 'hello') {
    //     twiml.message('Hi!');
    //   } else if(req.body.Body == 'bye') {
    //     twiml.message('Goodbye');
    //   } else {
    //     twiml.message('custom message');
    //   }
    
    //  parseString(twiml, function (err, result) {
    //     res.send(result)
    //   })

      
    });







const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })