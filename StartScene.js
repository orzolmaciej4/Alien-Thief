class StartScene extends Phaser.Scene {
    constructor() {
        super({key: 'StartScene'})
    }

    preload() {
        this.load.image('character', 'images/character.png');
        this.load.image('background', 'images/background.png');
        this.load.image('potion', 'images/potion.png');
        this.load.image('coin', 'images/coin.png');
        this.load.image('sArrow', 'images/sArrow.png');
        this.load.image('mArrow', 'images/mArrow.png');
        this.load.image('lArrow', 'images/lArrow.png');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0,0);
        this.add.image(615, 160, 'character').setScale(2,2);
        this.add.image(455, 210, 'sArrow');
        this.add.image(475, 210, 'mArrow');
        this.add.image(500, 210, 'lArrow');
        this.add.image(340, 255, 'potion').setScale(2,2);
        this.add.image(350, 308, 'coin').setScale(2,2);

        const style = {fontSize: '17px', fill: '#000'};
        this.add.text(230, 50, 'Alien Thief', {fontSize: '30px', fill: '#000'});
        this.add.text(30, 150, 'Use the arrow keys to move the character left and right', style);
        this.add.text(30, 200, 'Dodge the arrows for as long as possible', style);
        this.add.text(30, 250, 'Collect potions for a shield', style);
        this.add.text(30, 300, 'Collect coins for bonus points', style);
        this.add.text(230, 400, 'Click to start', {fontSize: '25px', fill: '#000'});
        this.input.on('pointerdown', () => {
            this.scene.stop('StartScene');
            this.scene.start('GameScene');
        })
    }
}