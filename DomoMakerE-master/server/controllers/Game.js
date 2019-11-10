const models = require('../models');
const Message = models.Message;

const message = (request, response) => {
  const req = request;
  const res = response;

  Message.find({}, (err, messages) => res.send(messages));
};

const messageUser = (request, response) => {
  const req = request;
  const res = response;

  const user = req.params.user;
  Message.find({ name: user }, (err, messages) => {
    res.send(messages);
  });
};

const postMessage = async (request, response) => {
    const req = request;
    const res = response;
    try{
        var message = new Message(req.body);
    
        var savedMessage = await message.save()
          console.log('saved');
    
        var censored = await Message.findOne({message:'badword'});
          if(censored)
            await Message.remove({_id: censored.id})
          else
            io.emit('message', req.body);
          res.sendStatus(200);
      }
      catch (error){
        res.sendStatus(500);
        return console.log('error',error);
      }
      finally{
        console.log('Message Posted')
      }
}