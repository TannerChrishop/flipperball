/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
//Image Loading
const TITLE_IMG_EXISTS = false;

//-----Global Img Objects-----//
let titlePic;

//-----Load the HTGD Logo-----//
let startTime;
const htgdLogoPic = document.createElement("img");//src set in Main.js
htgdLogoPic.onload = function() {
    if (TITLE_IMG_EXISTS) {
        //Begin loading the Title Image
        titlePic = document.createElement("img");
        titlePic.onload = function() {
            //Begin Loading remaining images
            loadImages();
            showTitleScreen();
        }
        titlePic.src = assetPath.Image + "screens/titlePic.png"
    }

    startTime = Date.now();
    animateHTGDLogo();
}


//-----Animate the HTGD Logo-----//
let htgdLogoScale = 0.5;
function animateHTGDLogo () {
    drawRect(0, 0, canvas.width, canvas.height, '#000000');

    //Draw the HTGD Logo Image
    canvasContext.drawImage(
        htgdLogoPic, 
        0, 0,
        htgdLogoPic.width, htgdLogoPic.height,
        canvas.width/2 - (htgdLogoScale * htgdLogoPic.width)/2, canvas.height/2 - (htgdLogoScale * htgdLogoPic.height)/2,
        (htgdLogoScale * htgdLogoPic.width), (htgdLogoScale * htgdLogoPic.height)
    );

    if(Date.now() - startTime < 1000) {
        htgdLogoScale += 0.003125;
        requestAnimationFrame(animateHTGDLogo);
    } else if (!TITLE_IMG_EXISTS) {
        loadImages();
    } else {
        showTitleScreen();
    }
}

//-----Show the Title Screen even though other images haven't loaded yet-----//
function showTitleScreen() {
    if (TITLE_IMG_EXISTS) {
        //draw the title image, no UI because images haven't finished loading yet
        canvasContext.drawImage(titlePic, 0, 0);
    } else {
        //draw black screen - terrible UI, but shouldn't happen once we have a title image
        drawRect(0, 0, canvas.width, canvas.height, '#000000');
    }
}

//------Actually do some image loading------//
let picsToLoad = 0;
function loadImages() {
    const imageList = [
        // List them here alphabetically to make it easier to find the one you're looking for
        {imgName: "angled_wall_1", theFile: "tables/angled_wall_1.png", image: {}},
        {imgName: "angled_wall_2", theFile: "tables/angled_wall_2.png"},
        {imgName: "angled_wall_3", theFile: "tables/angled_wall_3.png"},
        {imgName: "angled_wall_4", theFile: "tables/angled_wall_4.png"},

        {imgName: "ball", theFile: "tables/ball.png"},

        {imgName: "circle_bumper_blue", theFile: "tables/circle_bumper_blue.png"},
        {imgName: "circle_bumper_blue_anim", theFile: "animations/circle_bumper_blue_anim.png"},
        {imgName: "circle_bumper_green", theFile: "tables/circle_bumper_green.png"},
        {imgName: "circle_bumper_green_anim", theFile: "animations/circle_bumper_green_anim.png"},
        {imgName: "circle_bumper_red", theFile: "tables/circle_bumper_red.png"},
        {imgName: "circle_bumper_red_anim", theFile: "animations/circle_bumper_red_anim.png"},
        {imgName: "circle_bumper_yellow", theFile: "tables/circle_bumper_yellow.png"},
        {imgName: "circle_bumper_yellow_anim", theFile: "animations/circle_bumper_yellow_anim.png"},

        {imgName: "cloud_bg", theFile: "tables/cloud_bg.png"},

        {imgName: "drain_rail_left", theFile: "tables/drain_rail_left.png"},
        {imgName: "drain_rail_right", theFile: "tables/drain_rail_right.png"},

        {imgName: "drain_wall_left", theFile: "tables/drain_wall_left.png"},
        {imgName: "drain_wall_right", theFile: "tables/drain_wall_right.png"},

        {imgName: "flipper_bumper_left", theFile: "tables/flipper_bumper_left.png"},
        {imgName: "flipper_bumper_left_anim", theFile: "animations/flipper_bumper_left_anim.png"},
        {imgName: "flipper_bumper_right", theFile: "tables/flipper_bumper_right.png"},
        {imgName: "flipper_bumper_right_anim", theFile: "animations/flipper_bumper_right_anim.png"},

        {imgName: "flipper_left", theFile: "tables/flipper_left.png"},
        {imgName: "flipper_right", theFile: "tables/flipper_right.png"},

        {imgName: "plunger_chute", theFile: "tables/plunger_chute.png"},
        {imgName: "plunger", theFile: "tables/plunger.png"},
        {imgName: "plunger_anim", theFile: "animations/plunger_anim.png"},

        {imgName: "vertical_wall", theFile: "tables/vertical_wall.png"},
        {imgName: "horizontal_wall", theFile: "tables/horizontal_wall.png"},
        {imgName: "lane_trigger", theFile: "tables/lane_trigger.png"}
    ];

    picsToLoad = imageList.length;

    for (let i = 0; i < imageList.length; i++) {
        beginLoadingImage(imageList[i].imgName, imageList[i].theFile);
    }
}

function beginLoadingImage(imgName, fileName) {
    const newImg = document.createElement("img");
    newImg.onload = function() {
        images[imgName] = newImg;
        picsToLoad--;
        if (picsToLoad === 0) { // last image loaded?
            loadingDoneSoStartGame();
        }
    }
    newImg.src = assetPath.Image + fileName;
}