/*
    LittleJS Hello World Starter Game
*/
// import Enemy from "./enemy";

'use strict';

// popup errors if there are any (help diagnose issues on mobile devices)
if (debug)
    onerror = (...parameters)=> alert(parameters);

// game variables
let context = 0;
let clickCount, e  = 0;

// sound effects
const sound_click = new Sound([.5,.5]);

// medals
const medal_example    = new Medal(0, 'Example Medal', 'Medal description goes here.');
medalsInit('Hello World');

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // create tile collision and visible tile layer
    initTileCollision(vec2(32,16));
    const tileLayer = new TileLayer(vec2(), tileCollisionSize);
    const pos = vec2();

    // get level data from the tiles image
    const imageLevelDataRow = 1;
    mainContext.drawImage(tileImage,0,0);
    for (pos.x = tileCollisionSize.x; pos.x--;)
    for (pos.y = tileCollisionSize.y; pos.y--;)
    {
        const data = mainContext.getImageData(pos.x, 16*(imageLevelDataRow+1)-pos.y-1, 1, 1).data;
        if (data[0])
        {
            setTileCollisionData(pos, 1);

            const tileIndex = 1;
            const direction = randInt(4)
            const mirror = randInt(2);
            const color = randColor();
            const data = new TileLayerData(tileIndex, direction, mirror, color);
            tileLayer.setData(pos, data);
        }
    }
    tileLayer.redraw();

    // move camera to center of collision
    cameraPos = tileCollisionSize.scale(.5);
    cameraScale = 32;

    // enable gravity
    gravity = -.01;

    // create particle emitter
    const center = tileCollisionSize.scale(.5).add(vec2(0,9));

    context = new GameContext();
    context.ship = new Ship();
    context.enemies.push(new Enemy());
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // if(navigator.getGamepads()) {
    //     if(stickData[0]) {
    //         context.gameStick = gamepadStick(0,0);
    //     }
    // }
    // else {
        if(keyIsDown(37)) {
            context.gameStick = vec2(-1, 0);
        }
        else if(keyIsDown(38)) {
            context.gameStick = vec2(0, 1);
        }
        else if(keyIsDown(39)) {
            context.gameStick = vec2(1, 0);
        }
        else if(keyIsDown(40)) {
            context.gameStick = vec2(0, -1);
        }
        else {
            context.gameStick = vec2(0, 0);
        }
    

    context.update();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{

}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // draw a grey square in the background without using webgl
    // drawRect(cameraPos, tileCollisionSize.add(vec2(5)), new Color(.2,.2,.2), 0, 0);
    // drawRect(vec2(0,0), vec2(20,10), new Color(1,.2,.2), 0, 0);
    context.draw();
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, 'tiles.png');