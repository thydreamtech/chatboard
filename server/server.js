SampleText = new Meteor.Collection('demo2');
UserLog = new Meteor.Collection('login');
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
