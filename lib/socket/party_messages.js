/*jslint node: true*/
'use strict';

var _ = require('underscore');
var Class = require('./bin/class');
var PartyMessages;

/**
 * SocketStream - Handles socket communication
 *
 * @module SocketStream
 */
module.exports = PartyMessages = Class.extend({

  emitPlayerJoin: function (recipient, target) {
    recipient.socket.emit('player joined party', _.pick(target.player, 'name', 'tag'));
  },

  emitPlayerLeft: function (recipient, target) {
    recipient.socket.emit('player left party', _.pick(target.player, 'name', 'tag'));
  }

});
