Template.login.events({
  'click #sign-in': function () {
    var user = $('.user');
    var password = $('.password');
    var userdata = UserLog.findOne({user: user.val(), password: password.val()});
    if (!(userdata == null) && !(userdata._id == null)) {
      Session.setPersistent('user', user.val());
      Router.go('conversation')
    } else {
      alert("Invalid username and password");
    }
  },
  'click #sign-up': function () {
    Router.go('newuser')
  }
});