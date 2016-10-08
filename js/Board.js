var Board = (function() {
	function Board(config) {
		this.el = config.canvas_el;
		this.ctx = this.el.getContext('2d');
		this.width = 600;
		this.height = 400;
	}

	Board.prototype = {
		init: function() {
			this.el.width = this.width;
			this.el.height = this.height;

			console.log(this.ctx);
			this.draw();
		},

		draw: function() {
			this.ctx.fillStyle = 'rgb(0, 0, 0)';
			this.ctx.fillRect(0, 0, 600, 400);

			// this.ctx.fillStyle = 'rgb(255, 255, 255)';
			// this.ctx.strokeStyle = 'rgb(255, 255, 255)';
			// this.ctx.lineWidth = 8;
			// this.ctx.beginPath();
			// this.ctx.moveTo(200, 200);
			// this.ctx.lineTo(400, 400);
			// this.ctx.closePath();
		}
	}

	return {
		Board: Board
	}
})();