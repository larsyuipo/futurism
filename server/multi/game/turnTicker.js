(function() {
	'use strict';


	var TurnTicker = function(players, timePerTurn) {
		var self = this;
		var intervalId;
		var callback;
		var startTime;
		var turn = 0;

		self.activePlayers = [];


		/**
		 * Move a turn to the next player in line
		 * @param {function} [cb] callback - to be called when this turn is over
		 */
		self.nextTurn = function(cb) {
			self.endTurn();
			callback = cb;
			turn++;
			self.startTurn();
		};


		/**
		 * Mark a player as active, and start a timer
		 */
		self.startTurn = function() {
			startTime = +new Date();
			var index = (turn+1) % (players.length);
			var player = players[index];
			self.activePlayers.push(player);

			clearInterval(intervalId);
			intervalId = setTimeout(self.endTurn, timePerTurn);
		};


		/**
		 * Clean up after a turn
		 */
		self.endTurn = function() {
			clearInterval(intervalId);
			self.activePlayers = [];
			if(callback) {
				var cb = callback;
				callback = null;
				cb(self.getElapsed());
			}
		};


		/**
		 * Return how long this turn has lasted
		 * @returns {number}
		 */
		self.getElapsed = function() {
			return (+new Date()) - startTime;
		};
	};


	module.exports = TurnTicker;

}());