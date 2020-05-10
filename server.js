const express = require('express');
const app = express();


const port = 1337;

app.get('/',(req,res)=> res.send("test"));
app.use(express.json());
//Content of the GET  request
const messages =[

{
    id:1,
    name:"Marc",
    content: "Prepare the content",
    read:false,

},
 {
    id:2,
    name:"Marc2",
    content: "Prepare the content2",
    read:false,
    
},
{
    id:3,
    name:"Marc3",
    content: "Prepare the content3",
    read:true,
    
},
{
    id:4,
    name:"Marc4",
    content: "Prepare the content4",
    read:true,
    
}
];


console.log(messages.length);
app.get('/messages',(rea,res)=> res.json(messages));
app.get('/messages/:id',(req,res) => {
   let {id:IdMessage} = req.params;
    const message= messages.find(msg => msg.id === parseInt(IdMessage));
    if(!message){
        res.status(404).json({
            error_message :" Message cannot be found",
        });
    }
   res.json(message);
})

app.post('/messages',(req,res) => {
    const { name, content, read} = req.body;

    if(!name || !content){
         return res.status(422).json({
            error_message:`one of the required fields is missing ${req.body}`,
            
        })
    }

    const new_message= {
       name,
       content,
       id : messages.length+1,
       read: Boolean(read),
    }

    messages.push(new_message);
    res.status(200).json({
          note_message:'the message has been sent successfully',
          messages,

    })
})

app.delete('/messages/:id',(req,res) => {
    const {id:messageId} = req.params;
       let IdMessage = parseInt(messageId);
    let index = messages.findIndex(msg => msg.id === IdMessage);
    if(!messages.includes(messages[index])){
        res.status(404).json({
            error_message:'Cannot find the message to be deleted',
        })
    }
    let messageDeleted = messages[index];
    //Deleting the message 
    messages.splice(index,1);
    res.status(200).json({
        note:'the message has been deleted successfully',
        messageDeleted,
    })
})


app.listen(port,()=>{
    console.log(`Server is running on port :${port} `);
});