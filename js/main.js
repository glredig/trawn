var Tron = (function() {
	var board,
		player1,
		player2,
		game_over = false,
		winner_message;

	function loop() {
		board.draw();

		player1.move();
		player2.move();

		game_over = (player1.lines.length > 0 && player2.lines.length && hasCollisions());

		if (game_over) {
			popup.endGame({
				message: winner_message,
				callback: resetGame,
				color: 'rgb(50, 50, 50)'
			})
		}
		else {
			player1.draw(board.ctx);
			player2.draw(board.ctx);

			window.requestAnimationFrame(loop);
		}
	}	

	function setupListeners() {
		document.addEventListener('keydown', function(e) {
			if (e.keyCode === 68) {
				// right
				player1.turn(1);
			}
			else if (e.keyCode === 65) {
				// left
				player1.turn(-1);
			}
			else if (e.keyCode === 39) {
				// right
				player2.turn(1);
			}
			else if (e.keyCode === 37) {
				// left 
				player2.turn(-1);
			}
		})
	}

	function hasCollisions() {
		var player1_collision = player1.collisions(player2.lines.concat(player1.lines));
		var player2_collision = player2.collisions(player1.lines.concat(player2.lines))
		
		if (player1_collision && player2_collision) {
			winner_message = 'Tie Game!';
		}
		else if (player1_collision) {
			winner_message = 'Player 2 (blue) wins!';
		}
		else if (player2_collision) {
			winner_message = 'Player 1 (red) wins!';
		}
		else {
			winner_message = undefined;
		}
		
		return  player1_collision || player2_collision
	}

	function resetGame() {
		player1.reset();
		player2.reset();
	}

	return {
		init: function(config) {
			board = new Board.Board({
				canvas_el: config.canvas_el
			});

			board.init();

			player1 = new Player({
				x: 0,
				y: board.height / 2,
				track_color: 'rgb(255, 0, 0)',
				direction: 1
			});

			player1.init(board.height, board.width);

			player2 = new Player({
				x: 600,
				y: board.height / 2,
				track_color: 'rgb(0, 0, 255)',
				direction: 3
			});

			player2.init(board.height, board.width);

			setupListeners();

			popup = new Popup.Popup({
				board: board
			});

			popup.init(loop);
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