var Tron = (function() {
	var board,
		player1,
		player2,
		game_over = false;

	function loop() {
		board.draw();

		player1.move();
		player2.move();

		game_over = (player1.lines.length > 0 && player2.lines.length && hasCollisions());

		if (!game_over) {
			player1.draw(board.ctx);
			player2.draw(board.ctx);

			window.requestAnimationFrame(loop);
		}
	}	

	function setupListeners() {
		document.addEventListener('keydown', function(e) {
			if (e.keyCode === 39) {
				// right
				player1.turn(1);
			}
			else if (e.keyCode === 37) {
				// left
				player1.turn(-1);
			}
			else if (e.keyCode === 68) {
				// right
				player2.turn(1);
			}
			else if (e.keyCode === 65) {
				// left 
				player2.turn(-1);
			}
		})
	}

	function hasCollisions() {
		return player1.collisions(player2.lines.concat(player1.lines)) || 
				player2.collisions(player1.lines.concat(player2.lines));
	}

	return {
		init: function(config) {
			board = new Board.Board({
				canvas_el: config.canvas_el
			});

			board.init();

			player1 = new Player({
				x: 10,
				y: board.height / 2,
				track_color: 'rgb(255, 0, 0)',
				direction: 1
			});

			player1.init();

			player2 = new Player({
				x: 590,
				y: board.height / 2,
				track_color: 'rgb(0, 0, 255)',
				direction: 3
			});

			player2.init();

			setupListeners();

			loop();
		},

		loop: function() {
			var this_obj = this;

			player1.draw(board.ctx);
			player2.draw(board.ctx);
			console.log(this_obj.loop);
			window.requestAnimationFrame(this_obj.loop)
		}
	}
})();

(function() {
	var canvas_el = document.getElementById('board');

	Tron.init({
		canvas_el: canvas_el
	});
})()