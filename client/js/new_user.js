Template.newuser.events({
  'click #submit': function () {
    UserLog.insert({
      user: $('.user').val(),
      password: $('.password').val(),
      email: $('.email').val()
    });
    alert("New user added");
    Router.go('login')
  }
});