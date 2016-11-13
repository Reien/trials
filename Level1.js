Project.Level1 = function(game) {};

var player;
var platforms;
var cursors;
var score=0;
var scoreText;
var facing = 'left';
var spike;
var coins;
var counter = 0;
var text = 0;
var start = 99;
var score = 0;
var counter1 = 0;
var items;
var orb;
var music;

Project.Level1.prototype = {
	create: function(game) {
		// Game BGM
		music = this.sound.play("first");

		// Game Physics, Bounds and Background
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.stage.backgroundColor = "#636363";
		this.add.tileSprite(0, 0, 640, 4000, "background");
		this.world.setBounds(0, 0, 640, 4000);
		
		// Platforms
		platforms = this.add.group();
		platforms.enableBody = true;

		// Coins and Goal Orb
		items = this.add.group();
		items.enableBody = true;
		orb = this.add.group();
		orb.enableBody = true;
		
		// Bottom Ground
		ground = platforms.create(0, this.world.height - 50, "ground2");
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;

		// Generating Ledges
		ledge = platforms.create(0,this.world.height - 104, "ground2");
		ledge.body.immovable = true;
		ledge.scale.setTo(3,4);
		
			
		for (var i=0; i < 50; i++) {
			ledH = this.world.height - (120	* 2) * i;
			ledW = (Math.random() * 4) * 130;
			ledge = platforms.create(ledW, ledH, "ground2");
			ledge.body.checkCollision.down = false;
			ledge.body.checkCollision.left = false;
			ledge.body.checkCollision.right = false;
			ledge.body.immovable = true;
			ledge.scale.setTo(0.3,1);

			// Generating Coins
			j = Math.random() * 2;
			if (j < 1) {
		    	coins = items.create(ledW + 80, ledH + 80, "coin");
			    coins.animations.add("round", [ 0, 1, 2, 3, 4, 5, 6, 7]);
			    coins.animations.play("round", 10, true);
			    coins.body.gravity.y = 300;
				coins.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
		}

		// Secondary Ledges
		for (var i = 0; i < 50; i++) {
			ledH = this.world.height - (120	* 2) * i;
			ledW = (Math.random() * 4) * 130;
			ledge = platforms.create(ledW, ledH, 'ground2');
			ledge.body.checkCollision.down = false;
			ledge.body.checkCollision.left = false;
			ledge.body.checkCollision.right = false;
			ledge.body.immovable = true;
			ledge.scale.setTo(0.3,1);
		}

		for (var i = 0; i < 50; i++) {
			ledH = this.world.height - (120	* 2) * i;
			ledW = (Math.random() * 4) * 130;
			ledge = platforms.create(ledW, ledH, 'ground2');
			ledge.body.checkCollision.down = false;
			ledge.body.checkCollision.left = false;
			ledge.body.checkCollision.right = false;
			ledge.body.immovable = true;
			ledge.scale.setTo(0.3,1);
		}

        // Generating Walls
	    ledge = platforms.create(0,0, 'ground2');
		ledge.body.immovable = true;
		ledge.scale.setTo(0.1,500);
		ledge = platforms.create(600,0, 'ground2');
		ledge.body.immovable = true;
		ledge.scale.setTo(0.1,500);

		// Generating Goal Orb
		goal = orb.create(275, 50, 'orb');
		goal.scale.setTo(3, 3);			
		goal.animations.add('orbing', [ 0, 1, 2, 3, 4, 5, 6]);
		goal.animations.play('orbing', 10, true);

		// Generating Spikes
		spike = this.add.group();
		spike.enableBody = true;

		for (var i=0; i<150; i++){
			var rand = Math.random() * 3;
			hazzard = spike.create(40,(20*rand)*i, 'spikes');
			hazzard.body.immovable = true;
		}
			
		for (var i=0; i<100; i++){
			var rand = Math.random() * 3;
			hazzard = spike.create(585,(30*rand)*i, 'spikes2');		
			hazzard.body.immovable = true;
		}
		
		// Player Settings
		player = this.add.sprite(300, this.world.height - 200, "barbaric");
		this.physics.arcade.enable(player);
		
		// Player Physics
		player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;
		player.scale.setTo(1, 1);
		
		// Animations: Left and Right
		player.animations.add('left', [3, 2, 1], 10, true);
		player.animations.add('turn', [4], 10, true);
		player.animations.add('right', [5, 6, 7], 10, true);
		player.animations.add('jumpLeft', [0], 10, false);
		player.animations.add('jumpRight', [8], 10, false);
		player.animations.add('fallLeft', [0], 10, false);
		player.animations.add('fallRight', [8], 10, false);
		
		// Controls
		cursors = this.input.keyboard.createCursorKeys();
		
		// Camera
		this.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		// Timer and Score
		text = this.add.text(0, 0, 'Timer: 99', { font: "32px Arial", fill: "#ffffff", align: "center" });
        text.fixedToCamera = true;
        text.cameraOffset.setTo(50, 50);
	
	    this.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
	
	    text1 = this.add.text(0, 0, 'Score: 0', { font: "32px Arial", fill: "#ffffff", align: "center" });
        text1.fixedToCamera = true;
        text1.cameraOffset.setTo(50, 20	);
	},

	update: function() {
		// Collision
		this.physics.arcade.collide(player, platforms);
		this.physics.arcade.collide(items, platforms);
		this.physics.arcade.collide(player, spike, spikeCollide, null, this);
		this.physics.arcade.collide(player, goal, nextLevel, null, this);
		this.physics.arcade.overlap(player, items, collectCoin, null, this);

		// Player Velocity
		player.body.velocity.x = 0;

		// Jumping Animation Logic		
		if(cursors.left.isDown) {
			c = 1;
		}
		else {
		    c = 0;
		}

		if(cursors.right.isDown) {
			d = 1;
		}
		else {
			d = 0;
		}

		if(c == 1) {
			player.body.velocity.x = -350;

			if(facing != 'left') {
			    player.animations.play('left');
				facing = 'left';
				a = 1;
				b = 0;
			}
		}
		else if(d == 1) {
			player.body.velocity.x = 350;

			if(facing != 'right') {
                player.animations.play('right');
                facing = 'right';
			    a = 0;
			    b = 1;
        	}
		}
		else {

            if(facing != 'idle' && player.body.touching.down) {
                player.animations.stop();

                if (facing == 'left') {
                    player.frame = 4;
                }
                else {
                    player.frame = 4;
                }

            facing = 'idle';
            }

		    else {
			}
        }
	
		if(cursors.up.isDown && player.body.touching.down) {
			player.body.velocity.y = -800;
		}

		if(player.body.velocity.y < 0 && player.body.velocity.x >= 0 && facing == 'right') {
			player.animations.play('jumpRight');				
		}
			
		if(player.body.velocity.y > 0 && player.body.velocity.x > 0 && facing == 'right') {
			player.animations.play('fallRight');
			player.animations.stop();
		}

		if(player.body.velocity.y < 0 && player.body.velocity.x <= 0 && facing == 'left') {
			player.animations.play('jumpLeft');		
		}
			
		if(player.body.velocity.y > 0 && player.body.velocity.x < 0 && facing == 'left') {
			player.animations.play('fallLeft');
			player.animations.stop();
		}
			
		if(player.body.velocity.x > 0 && player.body.touching.down) {
			player.animations.play('right');
		}

		if(player.body.velocity.x < 0 && player.body.touching.down) {
			player.animations.play('left');
		}
			
		if(player.body.velocity.x == 0 && player.body.velocity.y < 0) {
			if(a == 1) {
				player.animations.play('jumpLeft');
			}
		}

		if(player.body.velocity.x == 0 && player.body.velocity.y < 0) {
			if(b == 1) {
				player.animations.play('jumpRight');
			}
		}
			
		if(player.body.velocity.x == 0 && player.body.velocity.y > 0) {
			if(a = 1 && facing == 'left') {
			    player.frame = 0;
			}
		}

		if(player.body.velocity.x == 0 && player.body.velocity.y > 0) {
			if(b = 1 && facing == 'right'){
			    player.frame = 8;
			}
		}

		/*
		// Spear Logic
		if(Math.random() < 0.02) {
			spear = new Object();
			spear.x = Math.floor((Math.random() * stage width - ))
		}
		*/
	},
}

function spikeCollide(player,hazzard) {
	player.kill();
}

function updateCounter() {
    counter--;

    text.setText('Timer: ' + (start + counter));
}

function collectCoin(player,items) {
	items.kill();
			
	counter1++;
			
	text1.setText('Score: '+ counter1 +'0');
}

function nextLevel(player,goal){
	if(goal.kill()) {
		this.state.start('Level2');
	}
}