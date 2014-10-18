SampleText = new Meteor.Collection('demo2');
UserLog = new Meteor.Collection('login');
if (Meteor.isClient) {
  // counter starts at 0

  Router.map(function () {
    this.route('conversation',{
    });
    this.route('newuser');
    this.route('login',{
      path:'/'

    });
  });

  Template.conversation.helpers({

    username: function () {
      return Session.get('user')
    },
    addText:function () {
      return SampleText.find({})
    }
  });

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

  Template.login.events({
    'click #sign-in': function () {
     var user =$('.user');
     var password =$('.password');
     var userdata = UserLog.findOne({user:user.val(),password:password.val()});
     if(!(userdata== null) && !(userdata._id == null)){
       Session.set('user',user.val());
       Router.go('conversation')
     }else{
       alert("Invalid username and password");
     }
    },
    'click #sign-up': function () {
        Router.go('newuser')
    }
  });

  Template.conversation.events({
    'click button': function () {
      // increment the counter when button is clicked
       SampleText.insert({
         from: Session.get('user'),
         message: $('#message').val()
       });
      $('#message').val('');
    },
    'click #delete': function () {
      SampleText.remove(this._id)
    }
   });
  Meteor.startup(function () {
    console.log("user :"+Session.keys['user'])
  });
}

