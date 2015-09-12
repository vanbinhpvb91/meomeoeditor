/*
 * Declare cons
 */
var APPEAR = {
	TRANSPARENCY : 1,
	RESIZE: 2,
	TRANSPARENCY_RESIZE: 3
};

var HIDE = {
	TRANSPARENCY : 1,
	RESIZE: 2,
	TRANSPARENCY_RESIZE: 3
};

var FLY_DIRECTION = {
	LEFT_RIGHT: 1,
	RIGHT_LEFT: 2,
	TOP_DOWN : 3,
	DOWN_TOP : 4
};

var FLY_TYPE = {
	STRAINGT: 5,
	INCLINED: 6,
	SIN: 7
};

var TEXT_SIZE = {
	SMALL : 1,
	MEDIUM : 2,
	BIG : 3,
	SUPER_BIG : 4
};

var TEXT_POSITION = {
	TOP_LEFT : 'top_left',
	TOP_CENTER : 'top_center',
	TOP_RIGHT : 'top_right',
	MIDDLE_LEFT : 'middle_left',
	MIDDLE_CENTER : 'middle_center',
	MIDDLE_RIGHT : 'middle_right',
	BOTTON_LEFT : 'botton_left',
	BOTTON_CENTER : 'botton_center',
	BOTTON_RIGHT : 'botton_right'
};

/*
 * contructer
 */
// -------------- Text ------------------------
function Text (contain, size, font, position, color) {
	this.contain = contain;
	this.size = size;
	this.font = font;
	this.postion = position;
	this.color = color;
};
// -------------- Background ------------------
function BackGround (url, preAnimation, posAnimation) {
	this.url = url;
	this.preAnimation = preAnimation;
	this.posAnimation = posAnimation;
}
// -------------- Plugin ----------------------
function Plugin (direction, type, number, imgs) {
	this.direction = direction;
	this.type = type;
	this.number = number;
	this.imgs = imgs;
}
// ------------- Frame -------------------------
function Frame (time, background, plugin, text) {
	this.time = time;
	this.background = background;
	this.plugin = plugin;
	this.text = text;
}
// ------------- Card --------------------------
function Card (frames, music, border) {
	this.frames = frames;
	this.music = music;
	this.border = border;
}