SampleText = new Meteor.Collection('chats');
UserLog = new Meteor.Collection('login');
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
