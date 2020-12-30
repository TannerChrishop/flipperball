/* eslint-disable no-unused-vars */

//Globals
//----------Drawing and Canvas---------//
let canvas;
let canvasContext;

let DEBUG = false;
let CHEATS_ACTIVE = false;

const GAME_SCALE = 4;

const canvasClearColor = "black";

const Color = {
	Red:"red",
	Blue:"blue",
	Green:"green",
	White:"white",
	Black:"black",
	Yellow:"yellow",
	Purple:"purple",
	Aqua:"aqua"
};

//---------------Persistence-----------//
const localStorageKey = {
	MusicVolume:"flipperball_musicVolume",
	SFXVolume:"flipperball_effectsVolume",
    FirstLoad:"flipperball_firstLoad"
}

//----------State Management----------//
const SCENE = {
	LOADING:"loading",
	TITLE:"title",
	SETTINGS:"settings",
	CREDITS:"credits",
	HELP:"help",
	PAUSE:"pause",
	GAME:"game",
	ENDING:"ending"
}

let firstLoad = localStorage.getItem(localStorageKey.FirstLoad);
let timer;
let worldSpeed = 1;

//------------Tables----------//
const TABLES = {
	Prototype: 'prototype'
}

const TABLE_LAYERS = {
	Collision: 'Collision',
	Dynamic: 'Dynamic',
	Fixed: 'Fixed'
}

//------------Asset Management----------//
const assetPath = {
	Audio:"./audio/",
	Image:"./img/"
}

//---------------Audio------------------//
let isMuted = false;

//------------Text------------------//
let fontRenderer;
const CHAR_WIDTH = 6;
const CHAR_HEIGHT = 9;

const TextAlignment = {
	Left:"left",
	Right:"right",
	Center:"center"
};

const Fonts = {
	MainTitle:"40px Tahoma",
	Subtitle:"30px Tahoma",
	ButtonTitle:"20px Tahoma",
	CreditsText:"16px Tahoma"
};

const fontOverhangRatio = 4/5; // Currently 4/5 is correct for "Tahoma" font. Change if font changes