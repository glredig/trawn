var Popup = (function() {
	
	function Popup(config) {
		this.board = config.board;
		this.ctx = this.board.ctx;
	}	

	Popup.prototype = {
		init: function(callback) {
			this.ctx.fillStyle = 'rgb(135, 135, 150)';
			this.ctx.fillRect(50, 50, 500, 300);
			this.ctx.fillStyle = 'rgb(50, 50, 100)';
			this.ctx.font = 'bold 60px Verdana';
			this.ctx.fillText('TRAWN', 170, 120);

			this.ctx.font = '20px Verdana';
			this.ctx.fillText('Click anywhere to play', 180, 300);

			this.board.el.addEventListener('click', function() {
				callback();
			});
		},

		endGame: function(config) {
			this.ctx.fillStyle = 'rgb(135, 135, 150)';
			this.ctx.fillRect(50, 50, 500, 300);
			this.ctx.fillStyle = config.color;
			this.ctx.font = 'bold 30px Verdana';
			this.ctx.fillText(config.message, 130, 120);

			this.ctx.font = '20px Verdana';
			this.ctx.fillText('Click anywhere to play again', 160, 300);

			config.callback();
		}
	}

	return {
		Popup: Popup
	}
})();