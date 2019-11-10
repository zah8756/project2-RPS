'use strict';

var socket = io();

var handleText = function handleText(e) {
  e.preventDefault(); // prevents page reloading
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
};

// const chatter = () => {
socket.on('chat message', function (msg) {
  console.log('activated');
  $('#messages').append($('<li>').text(msg));
  window.scrollTo(0, document.body.scrollHeight);
});
// }


var GameForm = function GameForm(props) {
  return React.createElement(
    'form',
    { id: 'messageForm',
      onSubmit: handleText,
      name: 'messageForm',
      action: '',
      method: 'POST' },
    React.createElement('input', { id: 'm', type: 'text', autocomplete: 'off' }),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
    React.createElement('input', { className: 'buttonSend', type: 'submit', value: 'Send' })
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

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(GameForm, { csrf: csrf }), document.querySelector('#sender'));

  // ReactDOM.render(
  //     <GameListP gList={[]}/>, document.querySelector('#mesages')
  // );
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
'use strict';

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
  $('#domoMessage').animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $('#domoMessage').animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
