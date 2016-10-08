var Player = (function() {
	var MOVE_SPEED = 1;

	function Player(config) {
		this.x = this.default_x = config.x;
		this.y = this.default_y = config.y;
		this.color = 'rgb(255, 255, 255)';
		this.track_color = config.track_color;
		this.direction = this.default_direction = config.direction;
		this.radius = 2;

	}

	Player.prototype = {
		init: function() {
			var line = new Line({
				startpoint: {
					x: this.x,
					y: this.y
				},
				color: this.track_color
			});

			this.lines = [line];

		},

		move: function() {
			if (this.direction === 0) {
				this.y -= MOVE_SPEED;
			}
			else if (this.direction === 1) {
				this.x += MOVE_SPEED;
			}
			else if (this.direction === 2) {
				this.y += MOVE_SPEED;
			}
			else if (this.direction === 3) {
				this.x -= MOVE_SPEED;
			}
			else {
				console.log("You're not moving!");
			}

			this.lines[this.lines.length - 1].setEndpoint(this.x, this.y);
		},

		turn: function(dir) {
			if (dir > 0) {
				this.direction += 1;
			}
			else {
				this.direction -= 1;
			}

			if (this.direction === -1) {
				this.direction = 3;
			}
			else {
				this.direction = this.direction % 4				
			}
			var line = new Line({
				startpoint: {
					x: this.x,
					y: this.y
				},
				color: this.track_color
			});

			this.lines.push(line);
		},

		draw: function(ctx) {
			ctx.fillStyle = this.color;

			for (var i = 0; i < this.lines.length; i++) {
				this.lines[i].draw(ctx);
			}
			
			ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
		},

		collisions: function(lines) {
			for (var i = 0; i < lines.length - 1; i++) {
				if (this.x === lines[i].startpoint.x && 
					(this.y >= Math.min(lines[i].startpoint.y, lines[i].endpoint.y) &&
						this.y <= Math.max(lines[i].startpoint.y, lines[i].endpoint.y)) ||
					this.y === lines[i].startpoint.y && 
					(this.x > Math.min(lines[i].startpoint.x, lines[i].endpoint.x) &&
						this.x < Math.max(lines[i].startpoint.x, lines[i].endpoint.x))

					) {

					return true;
				}
			}
			return false;
		},

		reset: function() {
			this.x = this.default_x;
			this.y = this.default_y;
			this.direction = this.default_direction;
			this.init();
		}
	}

	return Player
})();