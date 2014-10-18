Chat = new Meteor.Collection('chats');
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
      if(Session.get('user') == null){
        Router.go('login')
      }else {
        return Session.get('user')
      }
    },
    message:function () {
      return Chat.find({})
    }
  });

//  Template.conversation.rendered = function(){
//     console.log("Test" + $(".draggable").size());
//    $(".draggable").draggable();
//  }
//
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
    'click .add': function () {
      // increment the counter when button is clicked
       Chat.insert({
         user: Session.get('user'),
         content: $('#message').val()
       });
      $('#message').val('');
    },
    'click .logout': function () {
      Router.go('login');
      Session.set('user',null);
    },
    'click .delete': function () {
      Chat.remove(this._id)
    }
   });
}

