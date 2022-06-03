var config = {
	type:Phaser.AUTO,
	//width:1120,
	//height:640,
	scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        width: 1120,
        height: 640
    },
	physics: {
    default: 'arcade'
	},
	scene: [Home]
};

var game = new Phaser.Game(config);