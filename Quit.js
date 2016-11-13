Project.Quit = function(game) {
	var titlescreen;
	var text;
};

Project.Quit.prototype = {
	create: function(game) {
		titlescreen = game.add.sprite(0, 0, 'titlescreen');
		titlescreen.scale.setTo(1, 1.05);

		// Text Settings
		text = this.add.text(this.world.centerX, this.world.centerY + 50, "Click here to restart game", {font: "30px Arial", fill: "#ff0044", align: "center"});
		text.anchor.set(0.5);
		text.inputEnabled = true;
		text.events.onInputOver.add(over, this);
		text.events.onInputOut.add(out, this);

		this.input.onDown.addOnce(restart, this);
	},

	update: function(game) {

	},

}

function over(item) {
	item.fontSize = "45px";
	item.text = "Are you sure you want to restart?";
}

function out(item) {
	item.fontSize = "30px";
	item.text = "Click here to restart";
}

function restart() {
	this.state.start('Boot');
}