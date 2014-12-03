Chat = new Meteor.Collection('chats');
UserLog = new Meteor.Collection('login');
PositionLog = new Meteor.Collection('position');

if (Meteor.isClient) {

}

Meteor.methods({
  playSound: function () {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'http://www.oringz.com/oringz-uploads/sounds-969-isnt-it.mp3');
    audioElement.play();
  },
  addChat:function(chatDetails){
   Chat.insert(chatDetails)
  }
});


