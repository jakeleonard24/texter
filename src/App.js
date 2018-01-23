import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'
import io from 'socket.io-client';

const socket = io();



class App extends Component {
  constructor(){
  super()

  this.state = {message: '', number:'', convo: []}
this.sendIt = this.sendIt.bind(this)
}

componentDidMount(){
  socket.on('deliverMessage', newMessage => {
    console.log(newMessage)

    var obj = {'person': 'mobile', 'message': newMessage.message, 'number': newMessage.number}  

    this.state.convo.push(obj)

    var arr = this.state.convo
    this.setState({
      convo: arr
    })
  })
}



sendIt(){
  console.log('send')
  axios.post('/send', {
    message: this.state.message,
    number: '+' + this.state.number
  })

  this.setState({message: '', number:''})
}

textarea = {
  
    height: 'auto',
    maxWidth: '600px',
    color:'#999',
    fontWeight:'400',
    fontSize:'30px',
    fontFamily:'Ubuntu, Helvetica, Arial, sans-serif',
    width:'100%',
    background:'#fff',
    borderRadius:'3px',
    lineHeight:'2em',
    border:'none',
    boxShadow:'0px 0px 5px 1px rgba(0,0,0,0.1)',
    padding:'30px',
    resize: 'both',
    overflow: 'auto',
    
  transition: 'height 1s ease'
  
}

textarea2 = {
  
    height: 'auto',
    maxWidth: '600px',
    color:'#999',
    fontWeight:'400',
    fontSize:'30px',
    fontFamily:'Ubuntu, Helvetica, Arial, sans-serif',
    width:'100%',
    background:'#fff',
    borderRadius:'3px',
    lineHeight:'2em',
    border:'none',
    boxShadow:'0px 0px 5px 1px rgba(0,0,0,0.1)',
    paddingTop:'10px',
    paddingBottom: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    resize: 'both',
    overflow: 'auto',
    
  transition: 'height 1s ease'
  
}

handleData(data) {
  let result = JSON.parse(data);
  console.log(result)
}

  

  render() {
    console.log(this.state)
    return (
      <div className="body">
        <textarea value={this.state.message} placeholder={'Your message...'} style={this.textarea} onChange={(e)=>{this.setState({message: e.target.value})}}></textarea>
        <input value={this.state.number} style={this.textarea2} placeholder='Number...' onChange={(e)=>{this.setState({number: e.target.value})}}/>
        <button onClick={this.sendIt}>Send Text</button>

        
 
      </div>
    );
  }
}

export default App;
