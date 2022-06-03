class Home extends Phaser.Scene {
	constructor() {
		super({key:"Home"});
	}
	
	preload(){
		this.load.image('tiles', 'assets/Art/Template_work/map_1_assets.png');
		this.load.tilemapTiledJSON('level', 'assets/Art/Template_work/map_1.json');
		
		this.load.spritesheet('hero', 'https://cdn.glitch.com/59aa1c5f-c16d-41a1-bfd2-09072e84a538%2Fhero.png?1551136698770', {
        frameWidth: 32,
        frameHeight: 32,
      });
	}
	
	create() {
		const map = this.make.tilemap({ key: 'level', tileWidth: 32, tileHeight: 32});
		const tileset = map.addTilesetImage("map", 'tiles');
		const groundLayer = map.createLayer('ground', tileset, 0, 0);
		const wallLayer = map.createLayer('walls', tileset, 0, 0);
		const roofLayer = map.createLayer('roof', tileset, 0, 0);
		
		this.keys = this.input.keyboard.createCursorKeys();
      
		this.hero = this.physics.add.sprite(200, 150, 'hero', 0);
		this.hero.setScale(2);
		this.hero.direction = 'down';
		  
		// The state machine managing the hero
		this.stateMachine = new StateMachine('idle', {
			idle: new IdleState(),
			move: new MoveState(),
		}, [this, this.hero]);
		  
		this.anims.create({
			key: 'walk-down',
			frameRate: 8,
			repeat: -1,
			frames: this.anims.generateFrameNumbers('hero', {start: 0, end: 3}),
		});
		this.anims.create({
			key: 'walk-right',
			frameRate: 8,
			repeat: -1,
			frames: this.anims.generateFrameNumbers('hero', {start: 4, end: 7}),
		});
		this.anims.create({
			key: 'walk-up',
			frameRate: 8,
			repeat: -1,
			frames: this.anims.generateFrameNumbers('hero', {start: 8, end: 11}),
		});
		this.anims.create({
			key: 'walk-left',
			frameRate: 8,
			repeat: -1,
			frames: this.anims.generateFrameNumbers('hero', {start: 12, end: 15}),
		});
    }
    
    update() {
      this.stateMachine.step();
    }
}

class IdleState extends State {
  enter(scene, hero) {
    hero.anims.play(`walk-${hero.direction}`, true);
    hero.anims.stop();
  }
  
  execute(scene, hero) {
    const {left, right, up, down} = scene.keys;
    
    // Transition to move if pressing a movement key
    if (left.isDown || right.isDown || up.isDown || down.isDown) {
      this.stateMachine.transition('move');
      return;
    }
  }
}

class MoveState extends State {
  execute(scene, hero) {
    const {left, right, up, down} = scene.keys;
    
    // Transition to idle if not pressing movement keys
    if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
      this.stateMachine.transition('idle');
      return;
    }
    
    hero.setVelocity(0);
    if (up.isDown) {
      hero.direction = 'up';
    } else if (down.isDown) { 
      hero.direction = 'down';
    }
    if (left.isDown) {
      hero.direction = 'left';
    } else if (right.isDown) {
      hero.direction = 'right';
    }
    
    hero.anims.play(`walk-${hero.direction}`, true);
  }
}