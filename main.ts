controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    blockMenu.showMenu(["store", ""], MenuStyle.Grid, MenuLocation.BottomHalf)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 5 5 5 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Spaceships, 0, -44)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    if (!(blockMenu.isMenuOpen())) {
        sprite.destroy()
        info.changeLifeBy(-1)
    }
})
blockMenu.onMenuOptionSelected(function (option, index) {
    if (blockMenu.selectedMenuOption() == "store") {
        blockMenu.showMenu(["1 life for 3 points", "2 lives for 5 points", "3 lives for 7 points"], MenuStyle.Grid, MenuLocation.FullScreen)
    } else {
        if (blockMenu.isMenuOpen()) {
            if (index == 0 && info.score() >= 3) {
                info.changeLifeBy(index + 1)
                info.changeScoreBy(-3)
            } else if (index == 1 && info.score() >= 5) {
                info.changeLifeBy(index + 1)
                info.changeScoreBy(-5)
            } else if (index == 2 && info.score() >= 7) {
                info.changeLifeBy(index + 1)
                info.changeScoreBy(-7)
            }
        }
        blockMenu.closeMenu()
    }
})
let invaders: Sprite = null
let projectile: Sprite = null
let Spaceships: Sprite = null
Spaceships = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 2 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . e 2 . . . . . . . 
    . . . . . . e e 4 e . . . . . . 
    . . . . . . e 2 4 e . . . . . . 
    . . . . . c c c e e e . . . . . 
    . . . . e e 2 2 2 4 e e . . . . 
    . . c f f f c c e e f f e e . . 
    . c c c c e e 2 2 2 2 4 2 e e . 
    c c c c c c e e 2 2 2 4 2 2 e e 
    c c c c c c e e 2 2 2 2 4 2 e e 
    `, SpriteKind.Player)
controller.moveSprite(Spaceships)
Spaceships.setStayInScreen(true)
Spaceships.y = 120
let list = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 5 . . 5 . . . . . . . . 
    . . . . 5 . . 5 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . f 7 7 f . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 5 . . 5 . . . . . . . . 
    . . . . 5 . . 5 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . f 7 7 f . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 5 . . 5 . . . . . . . . 
    . . . . 5 . . 5 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . f 7 7 f . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . 7 7 7 7 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
info.setLife(5)
game.onUpdateInterval(2000, function () {
    invaders = sprites.createProjectileFromSide(list[randint(0, 2)], 0, 50)
    invaders.setPosition(randint(20, 140), 0)
    invaders.setKind(SpriteKind.Enemy)
})
