var Project = {};
Project.Boot = function(game) {
	
};

Project.Boot.prototype = {
	init:function() {
		this.input.Maxpointers = 1;
		this.stage.disableVisibilityChange = true;
	},
	preload: function() {

		// Image Load
		this.load.image('preloaderBar', 'assets/preloadbar/preloadbar.png');

		// Stage Objects Load
		this.load.image('background','assets/background/level1bg.png');
		this.load.image('background2','assets/background/expo.png');
		this.load.image('background3','assets/background/futuristic.png');
	    this.load.image('ledge', 'assets/platforms/ledge.png');
	    this.load.image('ground', 'assets/platforms/ground.png');
	    this.load.image('ground2', 'assets/platforms/ground2.png');
	    this.load.image('wallL', 'assets/platforms/wallLeft.png');
	    this.load.image('wallR', 'assets/platforms/wallRight.png');

	    // Character Load
	    this.load.spritesheet('barbaric', 'assets/sprites/barbaric.png', 40, 100, 9);
	    this.load.spritesheet('medieval', 'assets/sprites/medieval.png', 40, 100, 9);
	    this.load.spritesheet('future', 'assets/sprites/future.png', 40, 100, 9);

	    // Title Screen Load
	    this.load.image('titlescreen', 'assets/background/titlescreen.png');
	    this.load.image('playbutton', 'assets/buttons/play.png');
	    this.load.image('quitbutton', 'assets/buttons/quit.png');

	    // Items Load
	    this.load.spritesheet('coin', 'assets/sprites/coin.png', 24, 22, 7);
	    this.load.spritesheet('gem', 'assets/sprites/gem.png', 24, 22, 7);
	    this.load.spritesheet('orb', 'assets/sprites/orb.png', 24.25, 22, 7);
	    this.load.image('spikes', 'assets/sprites/spikes.png');
	    this.load.image('spikes2', 'assets/sprites/spikes2.png');

	    /*// Audio Load
	    this.load.audio('first', 'assets/bgm/Actraiser Fillmore 8-Bit remix.wav');
	    this.load.audio('second', 'assets/bgm/castle.wav');
	    this.load.audio('third', 'assets/bgm/Dark Pit Theme 8 Bit - Kid Icarus Uprising.wav');*/
	},
	create: function() {
		this.state.start('Preloader');
	}
}