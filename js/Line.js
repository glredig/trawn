var Line = (function() {
	function Line(config) {
		this.startpoint = config.startpoint;
		this.endpoint = config.startpoint;
		this.color = config.color;
	}

	Line.prototype = {
		init: function() {

		},

		setEndpoint: function(x_in, y_in) {
			this.endpoint = {
				x: x_in,
				y: y_in
			}
		},

		draw: function(ctx) {
			ctx.strokeStyle = this.color;
			ctx.beginPath();
			ctx.moveTo(this.startpoint.x, this.startpoint.y);
			ctx.lineJoin = 'bevel';
			ctx.lineWidth = 2;
			ctx.lineTo(this.endpoint.x, this.endpoint.y);
			ctx.stroke();	
		}
	}

	return Line
})();