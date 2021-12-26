var backgroundimg
var player;
var playerImage;
var rock, rockImg, rocksGroup;
var marine, marineImg, marinesGroup;
var score = 0;
var gameState = "play";

function preload() {
	backgroundimg = loadImage("background.png")
	playerImage = loadImage("plswork.png")
	rockImg = loadImage("rock.png")
	marineImg = loadImage("FINALLY.png")
}

function setup() {
	createCanvas(windowWidth - 10, windowHeight - 10);


	var background = createSprite(width / 2, height / 2, width, height);
	background.addImage(backgroundimg)

	//Create the Bodies Here.
	player = createSprite(200, height - 400, 30, 30)
	player.addImage("image", playerImage);
	//image(playerImage, 300, 400, 30, 30)
	player.scale = 0.5;
	//player.debug = true;
	player.setCollider('circle', 0, 0, 100)
	rocksGroup = new Group();
	marinesGroup = new Group();



}


function draw() {

	if (gameState === "play") {
		if (frameCount % 10 == 0) {
			score += 10
		}

		if (keyIsDown(DOWN_ARROW) && player.y < height - 30) {
			player.y += 15
		}
		if (keyIsDown(UP_ARROW) && player.y > 50) {
			player.y -= 15
		}

		createRock(rocksGroup);
		createMarine(marinesGroup);
		drawSprites();
		textSize(30);
		fill("#e5fc7c");
		text("Score: " + score, 20, 50);

		if (rocksGroup.collide(player) || marinesGroup.collide(player)) {
			gameState = "end";
			//console.log("Game Over");
			//console.log(gameState);
		}
	}

	if (gameState === "end") {
		fill("red");
		text("Game Over", width / 2 - 50, height / 2);
		text("Press f5 to restart", width / 2 - 80, height / 2 + 40);
	}



}

function createRock(rockGroup) {
	if (frameCount % 100 == 0) {
		y = Math.round(random(50, height - 50))
		var rock = createSprite(width, y, 30, 30);
		rock.addImage(rockImg);
		rock.velocityX = -(5 + score / 1000);
		rockGroup.add(rock);
		rock.scale = 0.5;
		//rock.debug = true;
		rock.setCollider("circle", 0, 0, 5)
		rock.bounceOff(player);
		if (rock.x < 0) {
			rock.remove();
		}
	}
}

function createMarine(marineGroup) {
	if (frameCount % 100 == 0) {
		y = Math.round(random(50, height - 50))
		var marine = createSprite(width, y, 30, 30);
		marine.addImage(marineImg);
		marine.velocityX = -(7 + score / 1000);
		marineGroup.add(marine);
		marine.scale = 0.5;
		//marine.debug = true;
		marine.setCollider("circle", 0, 10, 100)
		marine.bounceOff(player);
		if (marine.x < 0) {
			marine.remove();
		}
	}
}



