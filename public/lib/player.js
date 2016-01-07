import $ from 'jquery';

const Player;

Player.prototype.generate => () {
  $.get({
    url: 'http://api.randomuser.me/'
  }).success(() => {
    // return player data
  });
};