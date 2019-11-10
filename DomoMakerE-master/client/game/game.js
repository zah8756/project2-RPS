import { Script } from "vm";

let socket = io();

const handleText = (e) =>{
  e.preventDefault(); // prevents page reloading
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
}

 const chatter = () => {
  socket.on ('chat message', (msg) => {
    console.log('activated');
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
 }


const GameForm = (props) => {
  return (
      <form id='messageForm'
      onSubmit={handleText}
      name='messageForm'
      action=''
      method='POST'>
          <input id="m" type='text' autocomplete="off" />
          <input type='hidden' name='_csrf' value={props.csrf} />
          <input className='buttonSend' type='submit' value='Send' />
      </form>
  );
};

// const gameListList = function(props) {
//   if(props.domos.length === 0) {
//       return (
//           <div className='domosList'>
//               <h3 className='emptyDomo'>No Domos Yet</h3>
//           </div>
//       );
//   }

//   const domoNodes = props.domos.map(function(domo) {
//       return (
//           <div key={domo._id} className='domo'>
//               <img src='/assets/img/domoFace.jpeg' alt='domo face' className='domoFace'/>
//               <h3 className='domoName'> Name: {domo.name} </h3>
//               <h3 className='domoAge'> Age: {domo.age} </h3>
//               <h3 className='domoLevel'> Level: {domo.level} </h3>
//           </div>
//       );
//   });

//   return (
//       <div className='domoList'>
//           {domoNodes}
//       </div>
//   );
// };
// const GameListP = (props) => {
//   if(props.gList.length === 0) {
//       return (
//         <h3 className='emptyList'>No messages Yet</h3>
//     );
//   }

//   else{
//     return(
//       <ul id="messages"></ul>
//     );
//   };
// };

const setup = function(csrf) {
  ReactDOM.render(
      <GameForm csrf={csrf}/>, document.querySelector('#sender')
  );

  // ReactDOM.render(
  //     <GameListP gList={[]}/>, document.querySelector('#mesages')
  // );
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});