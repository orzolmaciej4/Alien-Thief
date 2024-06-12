const gameState = {
	score: 0,
	highscore: 0,
};

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 450,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 200},
      enableBody: true,
      debug: false,
    }
  },
  scene: [StartScene, GameScene]
};
  
const game = new Phaser.Game(config);