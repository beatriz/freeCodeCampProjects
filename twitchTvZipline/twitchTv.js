// $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?', function(data) {
//   $(".response").html(JSON.stringify(data));
// });

$(document).ready(function docReady() {
  var usersArray = ['freecodecamp', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'medrybw'];
  var baseUrl = 'f';
  var streamsUrl = 'streams/';
  var userUrl = 'users/'
  var callbackUrlParam = '?callback=?';
  var addUser;
  // var allResp = '';
  var onlineUsers = [];
  var offlineUsers = [];
  var usernames = '';
  var allUsers = [];
  usersArray.forEach(function getAllUsers(username) {
    var user = {};
    $.getJSON(baseUrl + userUrl + username + callbackUrlParam, function (userData) {
      user.name = username;
      user.dispName = userData.display_name;
      user.img = userData.logo;
      $.getJSON(baseUrl + streamsUrl + username + callbackUrlParam, function getUserData(streamData) {
        if (streamData.stream !== null) {
          // onlineUsers.push(username);
          user.online = true;
          user.game = streamData.stream.game;
          user.gameImg = streamData.stream.preview.medium;
          user.viewers = streamData.stream.viewers;
          // console.log(JSON.stringify(streamData));
        } else {
          // offlineUsers.push(username);
          user.online = false;
        }
        addUser(user);
      });
    });
  });
  addUser = function (user) {
    var div = '<div class="user"><div class="userMain"><span class="userLogo"><img src="' + user.img
    + '"></span><span class="username">' + user.dispName + '</span>';
    if (user.online) {
      div += '<span class="glyphicon glyphicon-ok status" aria-hidden="true"></span></div>'
      + '<div class="details"><div class="game">' + user.game
      + '</div><div class="gameImg"><img src="' + user.gameImg
      + '"></div><div class="viewers">' + user.viewers
      + 'viewers</div><a href="http://twitch.tv/' + user.name
      + '" class="btn btn-default" target="_blank">view</a><button class="btn btn-default close" type="button">hide</button></div>';
    } else {
      div += '<span class="glyphicon glyphicon-remove status" aria-hidden="true"></span></div>';
    }
    div += '</div>';
    $('#userList').append(div);
  };

  $('.user .userMain').click(function () {
    $(this).next('.details').show();
  });

  $('.close').click(function () {
    $(this).parent('.details').hide();
  });
});
