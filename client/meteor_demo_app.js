Chat = new Meteor.Collection('chats');
UserLog = new Meteor.Collection('login');
PositionLog = new Meteor.Collection('position');

if (Meteor.isClient) {

  Router.map(function () {
    this.route('conversation', {
    });
    this.route('newuser');
    this.route('login', {
      path: '/'

    });
  });

  Template.conversation.helpers({

    username: function () {
      if (Session.get('user') == null) {
        Router.go('login')
      } else {
        return Session.get('user')
      }
    },
    message: function () {
      var chats = Chat.find({});
      chats.forEach(function (data) {
        var elm_position_datum = PositionLog.findOne({'id_no': data._id});
        if (elm_position_datum) {
          $('#' + data._id).css('top', elm_position_datum.top);
          $('#' + data._id).css('left', elm_position_datum.left);
        }
        ;

      });
      return chats
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
      var user = $('.user');
      var password = $('.password');
      var userdata = UserLog.findOne({user: user.val(), password: password.val()});
      if (!(userdata == null) && !(userdata._id == null)) {
        Session.set('user', user.val());
        Router.go('conversation')
      } else {
        alert("Invalid username and password");
      }
    },
    'click #sign-up': function () {
      Router.go('newuser')
    }
  });

  Template.conversation.events({
    'click .add': function () {
      Chat.insert({
        user: Session.get('user'),
        content: $('#message').val(),
        top: null,
        left: null
      });
      $('#message').val('');
    },
    'click .logout': function () {
      Router.go('login');
      Session.set('user', null);
    },
    'click .delete': function () {
      Chat.remove(this._id)
    },
    'dragstop .draggable.initialized': function () {
      var pos = {
        top: $('#' + this._id).css('top'),
        left: $('#' + this._id).css('left')
      };
      console.log(pos);
      var datum = PositionLog.findOne({'id_no': this._id})
      if (datum) {
        PositionLog.update(datum._id, {$set: {'top': pos.top, 'left': pos.left}});
      } else {
        PositionLog.insert({'id_no': this._id, 'top': pos.top, 'left': pos.left});
      }
    }
  });
}

