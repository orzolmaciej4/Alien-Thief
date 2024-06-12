class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'})
    }

	preload() {
		this.load.spritesheet('alien', 'images/alien.png', {frameWidth: 11, frameHeight: 9});
		this.load.image('lArrow', 'images/lArrow.png');
		this.load.image('mArrow', 'images/mArrow.png');
		this.load.image('sArrow', 'images/sArrow.png');
		this.load.image('shield', 'images/shield.png');
		this.load.image('potion', 'images/potion.png');
		this.load.image('platform', 'images/platform.png');
		this.load.image('coin', 'images/coin.png');
		this.load.image('background', 'images/background.png');
		this.load.audio('song', ['sounds/Music.wav']);
	}

	create() {
		//adding music
    	const music = this.sound.add('song');
		music.play();

		//adding a background image
		this.add.image(320, 225, 'background');

		//adding platforms
		const platforms = this.physics.add.staticGroup();
 		platforms.create(320, 400, 'platform').refreshBody();

		//adding score and highscore
		const style = { fontSize: '20px', fill: '#000' };
		gameState.scoreText = this.add.text(170, 435, 'Score: 0', { fontSize: '15px', fill: '#000' })
		gameState.highscoreText = this.add.text(380, 435, `Highscore: ${gameState.highscore}`, { fontSize: '15px', fill: '#000' })

		//adding the character
		gameState.player = this.physics.add.sprite(320, 300, 'alien').setScale(2, 2);
		gameState.player.setCollideWorldBounds(true);
		this.physics.add.collider(gameState.player, platforms);

		//adding character animations
		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('alien', { start: 2, end: 5 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('alien', {start: 0, end: 1}),
			frameRate: 5,
			repeat: -1,
		});

		//adding coins as collectibles for extra points
		const coins = this.physics.add.staticGroup();
		function coinGen() {
			const xCoord = Math.random() * 640;
			coins.create(xCoord, 340, 'coin').setScale(2, 2);
		};
		const coinGenLoop = this.time.addEvent({
			delay: 5000,
			callback: coinGen,
			callbackScope: this, 
			loop: true,
		});
		function collectCoin(player, coin) {
			coin.disableBody(true, true);
			gameState.score += 75;
			gameState.scoreText.setText(`Score: ${gameState.score}`);
		}
		this.physics.add.overlap(gameState.player, coins, collectCoin, null, this);
		

		//adding potions which provide the player with a shield
		const potions = this.physics.add.staticGroup();
		gameState.shields;
		function potionGen() {
			const xCoord = Math.random() * 640;
			potions.create(xCoord, 340, 'potion').setScale(2, 2);
		};
		const potionGenLoop = this.time.addEvent({
			delay: 10000,
			callback: potionGen,
			callbackScope: this, 
			loop: true,
		});
		function collectPotion(player, potion) {
			potion.disableBody(true, true);
			gameState.shields = this.physics.add.sprite(player.x, player.y, 'shield').setScale(3, 3).setGravity(0, -200);
			gameState.shields.setCollideWorldBounds(true);
			this.physics.add.overlap(gameState.shields, sArrows, function (shield, arrow){
				arrow.disableBody(true, true)
			}, null, this);
			this.physics.add.overlap(gameState.shields, mArrows, function (shield, arrow){
				arrow.disableBody(true, true)
			}, null, this);
			this.physics.add.overlap(gameState.shields, lArrows, function (shield, arrow){
				arrow.disableBody(true, true)
			}, null, this);
			this.time.addEvent({
				delay: 7500,
				callback: () => {
					gameState.shields.disableBody(true, true);
				}
			});
		};
		this.physics.add.overlap(gameState.player, potions, collectPotion, null, this);

		const sArrows = this.physics.add.group();
		const mArrows = this.physics.add.group();
		const lArrows = this.physics.add.group();

		//functions to generate small arrows
		function sArrowGen() {
			const xCoord = Math.random() * 640;
			sArrows.create(xCoord, 10, 'sArrow').setScale(2, 1.5).setGravity(0, 200);
		};
		const sArrowGenLoop = this.time.addEvent({
			delay: 100,
			callback: sArrowGen,
			callbackScope: this,
			loop: true,
		});
		//functions to generate medium arrows
		const mArrowGen = () => {
			const xCoord = Math.random() * 640;
			mArrows.create(xCoord, 10, 'mArrow').setScale(2, 1.5).setGravity(0, 400);
		}
		const mArrowGenLoop = this.time.addEvent({
			delay: 500,
			callback: mArrowGen,
			callbackScope: this,
			loop: true,
		});
		//functions to generate large arrows
		const lArrowGen = () => {
			const xCoord = Math.random() * 640;
			lArrows.create(xCoord, 10, 'lArrow').setScale(2, 1.5).setGravity(0, 600);
		}
		const lArrowGenLoop = this.time.addEvent({
			delay: 1000,
			callback: lArrowGen,
			callbackScope: this,
			loop: true,
		}); 

		//Scoring system using collisions between platform and arrows
		this.physics.add.collider(sArrows, platforms, function (arrow){
			arrow.destroy();
			gameState.score += 10;
			gameState.scoreText.setText(`Score: ${gameState.score}`)		
		})
		this.physics.add.collider(mArrows, platforms, function (arrow){
			arrow.destroy();
			gameState.score += 50;
			gameState.scoreText.setText(`Score: ${gameState.score}`)		
		})
		this.physics.add.collider(lArrows, platforms, function (arrow){
			arrow.destroy();
			gameState.score += 100;
			gameState.scoreText.setText(`Score: ${gameState.score}`)		
		})

		//function which stops the game
		const end = () => {
			music.stop();
			sArrowGenLoop.destroy();
			mArrowGenLoop.destroy();
			lArrowGenLoop.destroy();
			coinGenLoop.destroy();
			potionGenLoop.destroy();
			this.anims.pauseAll();
			this.physics.pause();
			if (gameState.score > gameState.highscore) {
				gameState.highscore = gameState.score;
				this.add.text(175, 110, `Your new highscore is ${gameState.highscore}!`, style);
				gameState.highscoreText.setText(`Highscore: ${gameState.highscore}`);
			} else {
				this.add.text(220, 90, `Your score was ${gameState.score}`, style);
				this.add.text(200, 110, `Your highscore is ${gameState.highscore}`, style);
			}
			this.add.text(260, 150, 'Game Over!', style);
			this.add.text(230, 175, 'Click to restart', style);
			gameState.score = 0
			this.input.on('pointerdown', () => {
				this.scene.stop('GameScene');
				this.scene.start('GameScene');
			})
		}

		//Collision functions between the player and different arrows
		this.physics.add.collider(gameState.player, sArrows, () => {
			end();
		})
		this.physics.add.collider(gameState.player, mArrows, () => {
			end();
		})
		this.physics.add.collider(gameState.player, lArrows, () => {
			end();
		}) 

	}

	update() {

		const cursors = this.input.keyboard.createCursorKeys();

		if(cursors.left.isDown){
			gameState.player.setVelocityX(-200);
			gameState.player.anims.play('run', true);
			gameState.player.flipX = true;
			if (gameState.shields) {
				gameState.shields.setVelocityX(-200);
			}
		} else if (cursors.right.isDown) {
			gameState.player.setVelocityX(200);
			gameState.player.anims.play('run', true);
			gameState.player.flipX = false;
			if (gameState.shields) {
				gameState.shields.setVelocityX(200);
			}
		} else {
			gameState.player.setVelocityX(0);
			gameState.player.anims.play('idle', true);
			if (gameState.shields) {
				gameState.shields.setVelocityX(0);
			}
		}

	}
}