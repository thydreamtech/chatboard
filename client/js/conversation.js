Template.conversation.helpers({
  username: function () {
    if (Session.get('user') == null) {
      Router.go('login')
    } else {
      return Session.get('user')
    }
  },
  message: function () {
    var chats = Chat.find({},{sort: {createdAt: -1}});
    if(Session.get('chatCount') && Session.get('chatCount') < chats.count())
    {
      var lastChat=Chat.findOne({},{sort: {createdAt: -1}});
      if(lastChat.user != Session.get('user')) {
        Meteor.call('playSound');
      }
    }
    Session.setPersistent('chatCount',chats.count());
    chats.forEach(function (data) {
      var elm_position_datum = PositionLog.findOne({'id_no': data._id});
      if (elm_position_datum) {
        $('#' + data._id).css('top', elm_position_datum.top);
        $('#' + data._id).css('left', elm_position_datum.left);
      };
    });
    return chats
  }
});

Template.conversation.events({
  'click .post-button': function () {
    var message = $('#new-message');
    if (message.val() != '' && message.val().trim() != '') {
      Chat.insert({
       user: Session.get('user'),
        content: message.val(),
        top: null,
        left: null,
        createdAt: new Date()
      });
      message.val('');
    }
  },
  'click .edit-button': function () {
    $("#"+ this._id+" .edit-panel").slideToggle("slow");
  },
  'click .save-button': function () {
    var editMessage =$("#"+ this._id+" .edit-message");
    if (editMessage.val() != '' && editMessage.val().trim() != '') {
      Chat.update(this._id, {$set: {content: editMessage.val()}});
      $("#" + this._id + " .edit-panel").slideToggle("slow");
      editMessage.val('');
    }
  },
  'click .logout': function () {
    console.log('logout')
    Session.clearPersistent();
    Router.go('login');
  },
  'click .delete': function () {
    Chat.remove(this._id)
  },
  'dragstop .draggable.initialized': function () {
    var pos = {
      top: $('#' + this._id).css('top'),
      left: $('#' + this._id).css('left')
    };
    var datum = PositionLog.findOne({'id_no': this._id})
    if (datum) {
      PositionLog.update(datum._id, {$set: {'top': pos.top, 'left': pos.left}});
    } else {
      PositionLog.insert({'id_no': this._id, 'top': pos.top, 'left': pos.left});
    }
  }
});