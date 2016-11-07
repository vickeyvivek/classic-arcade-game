// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 100 + 150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -5;
    }

    //If the player comes within 60px of an enemy's x and y coordinates, reset the game
    if (player.x >= this.x - 60 && player.x <= this.x + 60) {
        if (player.y >= this.y - 60 && player.y <= this.y + 60) {
            player.lives--;
            if (player.lives == 0) {
                player.reset();
            }
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.score = 0;
    this.lives = 3;
    this.sprite = 'images/char-horn-girl.png';

}

//displays score
Player.prototype.score = function() {
    console.log(this.score);
};

//displays life of player
Player.prototype.lives = function() {
    console.log(this.lives);
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 0 || this.x > 400) {
        if (this.x < 0) {
            this.x = 0;
        } else {
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 410) {
        if (this.y < 0) {
            this.reset();
        } else {
            this.y = 410;
        }
    }

    if (this.lives == 0) {
        this.reset();
    }

    if (this.x >= rock.x - 10 && this.x <= rock.x + 10) {
        if (this.y >= rock.y - 10 && this.y <= rock.y + 10) {
            this.x = -50;
            this.y = -50;
        }
    }

};

Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        this.x -= 100;
    }

    if (direction == 'right') {
        this.x += 100;
    }

    if (direction == 'up') {
        this.y -= 83;
    }

    if (direction == 'down') {
        this.y += 83;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var player = new Player(200, 410);
Player.prototype.reset = function() {
    this.y = 410;
    this.x = 200;

};

//after reduction of life of player only heart can be collectable
if (player.lives > 0 || player.lives < 3) {
    var Heart = function(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/Heart.png';
    };

    Heart.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        if (player.x >= this.x - 60 && player.x <= this.x + 60) {
            if (player.y >= this.y - 60 && player.y <= this.y + 60) {
                player.lives++;
            }
        }
    };


    var heart = new Heart(Math.random() * (400 - 60) + 60, Math.random() * (200 - 60) + 60);

}

//on colliding with rock the player does not move
var Rock = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Rock.png';
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


var rock = new Rock(Math.random() * (300 - 60) + 60, Math.random() * (300 - 60) + 60);

//on clollecting gem score increses by 10
var Gem = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/GemBlue.png';
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (player.x >= this.x - 60 && player.x <= this.x + 60) {
        if (player.y >= this.y - 60 && player.y <= this.y + 60) {
            player.score = +10;
        }
    }
};


var gem = new Gem(Math.random() * (400 - 10) + 10, Math.random() * (260 - 60) + 60);

//on collecting key score increses by 50
var Key = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png';
};

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    player.score = +50;

};


var key = new Key(100, -5);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-5, 60);
var enemy2 = new Enemy(-5, 145);
var enemy3 = new Enemy(-5, 230);
var enemy4 = new Enemy(-2, 135);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

