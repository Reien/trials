Project.Menu = function(game) {
	var titlescreen;
	var play;
	var quit;
};

Project.Menu.prototype = {
	create: function(game) {
		titlescreen = game.add.sprite(0, 0, 'titlescreen');
		titlescreen.scale.setTo(1, 1.05);
		play = game.add.button(this.world.centerX - 75, this.world.centerY + 50, 'playbutton', onClick, this, 2, 1, 0);
		quit = game.add.button(this.world.centerX - 75, this.world.centerY + 150, 'quitbutton', quitGame, this, 2, 1, 0);
	},

	update: function(game) {

	},

}

function onClick() {
	this.state.start('Level1');
}

function quitGame() {
	this.state.start('Quit');
}