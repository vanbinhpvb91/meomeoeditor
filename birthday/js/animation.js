/**
 * Coding rule
 * 1 JQuery selector variable start with $.
 * 2 Dom object end with node.
 * 3 declare variable have to use var.
 * 4 using '' for String object.
 * 5 method start with lower case.
 * 6 contructor start with upper case.
 * 7 pre { is space.
 * 8 Don't use coppy.
 * 9 Constrans declare as upper case and using _ replace space character.
 * 10 if variable declare need end with ;
 */
/*------------------ contain ---------------------------------------*/
var MIN_TIME = 15;
var MAX_ANIMATION = 30;
var TIME_COUNTER = MIN_TIME;
var SCREEN_WIDTH = 0;
var SCREEN_HEIGHT = 0;
var SHOW_WIDTH = 1024;
var SHOW_HEIGHT = 600;
var ANIMATION_INTERVAL = null;
/*--------------------- declare class -------------------------------*/

/*
 * create an Affect object.
 * this is class using to manage a div and animation for this div.
 * div is dom object using aniamtion 
 * status are
 * * 0 is pedding
 * * 1 is runing
 * * 2 is stoped
 * * 3 is removed
 * actions is an list of  animation
 */
function Effect(divNode, anmations, removeAble, appearWhenShow) {
	this.divNode = divNode;
	this.animations = anmations;
	var thisObject = this;
	this.removeAble = removeAble;
	this.appearWhenShow = appearWhenShow;
	
	this.getTime = function() {
		return 0;
	};
	
	this.getStatus = function() {
		var status = 0;
		var countStoped = 0;
		for(var i = 0 ; i < this.animations.length; i++) {
			if(this.animations[i].getStatus() == 1) {
				status = 1;
			}
			if(this.animations[i].getStatus() == 2) {
				countStoped++;
			}
		}
		var maxTimeAnimation = this.getMaxTimeAnimation();
		if(maxTimeAnimation != null) {
			if(maxTimeAnimation.getStatus() == 2){
				if(this.removeAble) {
					return 3;
				}
			}
		}
		if(countStoped == this.animations.length) {
			return 2;
		}
		return status;
	};
	
	this.getMaxTimeAnimation = function() {
		var maxTime = 0;
		var maxTimeIndex = -1;
		for (var j = 0; j < this.animations.length; j++) {
			if(maxTime < this.animations[j].getEndTime()) {
				maxTime = this.animations[j].getEndTime();
				maxTimeIndex = j;
			}
			
		}
		if (maxTimeIndex == -1){
			return null;
		}
		return this.animations[maxTimeIndex];
	};
	
	this.findMinStartAtAnimation = function() {
		var minStartAt = 9000000;
		var minStartAtIndex = -1;
		for (var j = 0; j < this.animations.length; j++) {
			if(minStartAt > this.animations[j].option.startAt) {
				minStartAt = this.animations[j].getEndTime();
				minStartAtIndex = j;
			}
			
		}
		if (minStartAtIndex == -1){
			return null;
		}
		return this.animations[minStartAtIndex];
	}
}

/*
 * create an animation object.
 */
function Animation(option) {
	this.option = option;
	
	var thisObj = this;
	
	this.getEndTime = function() {
		return thisObj.option.time + thisObj.option.startAt;
	};
	
	this.getStatus = function() {
		if(thisObj.option.step == 0) {
			return 0;
		}
		if(thisObj.option.step < thisObj.option.maxStep) {
			return 1;
		}
		if(thisObj.option.step >= thisObj.option.maxStep) {
			if(thisObj.option.repeat){
				thisObj.option.step = 0;
				return 0;
			}
			return 2;
		}
	};
}

/*--------------------- animation function --------------------------*/

/*
 * do animation effect
 */
function doEffect (effect) {
	for (var i = 0; i < effect.animations.length; i++) {
		if(effect.getStatus() <= 2) {
			doAnimation(effect.divNode, effect.animations[i]);
		}
		if(effect.getStatus() == 3) {
			$(effect.divNode).remove();
			effect.divNode = null;
			effect.animations = null;
			var index = EFFECT_ARRAY.indexOf(effect);
			if (index != -1){
				EFFECT_ARRAY.splice(index, 1);
			}
			return;
		}
	}
}

/*
 * do animation
 */
function doAnimation(divNode, animation){
	if(animation.getStatus() < 2 && animation.option.startAt <= TIME_COUNTER) {
		var action = findAction(animation.option.action);
		var result = action.run.doCal(animation.option);
		action.run.doSetStyle(divNode, result);
		animation.option.step++;
	}
}

/*-------------------------- declare animation -------------------------------------*/

var MoveABD  = {
	doSetStyle : function(divNode, result) {
		divNode.style.display = '';
		divNode.style.top = result.top + "px";
		divNode.style.left = result.left + "px";
		if(result.top < 0 || ($(divNode).height() + result.top) >= SHOW_HEIGHT){
			divNode.style.display = 'none';
		}
		if(result.left < 0 || ($(divNode).width() + result.left) >= SHOW_WIDTH){
			divNode.style.display = 'none';
		}
	}
}

var MOVE = {
	name : 'moveline',
	run : {
		doCal : function(option){
			var left = (option.from.x + Math.round((option.step/option.maxStep)*(option.to.x - option.from.x)));
			var top = (option.from.y + Math.round((option.step/option.maxStep)*(option.to.y - option.from.y)));
			return {top: top, left: left};
		},
		doSetStyle : function(divNode, result) {
			MoveABD.doSetStyle(divNode, result);
		}
	},
	initValue : function(option, divNode) {
		
	}
};

var SIN_MOVE = {
	name : 'sinmove',
	run : {
		doCal : function(option) {
			var top = option.from.y + Math.round((option.step/option.maxStep)*(option.to.y - option.from.y));
			var left = option.from.x + 100*Math.sin(top/100);
			return {top: top, left: left};
		},
		doSetStyle : function(divNode, result) {
			MoveABD.doSetStyle(divNode, result);
		}
	},
	initValue : function(option, divNode) {
		
	}
};

var SIN_MOVE_X = {
		name : 'sinmovex',
		run : {
			doCal : function(option) {
				var left = option.from.x + Math.round((option.step/option.maxStep)*(option.to.x - option.from.x));
				var top = option.from.y + 100*Math.sin(left/100);
				return {top: top, left: left};
			},
			doSetStyle : function(divNode, result) {
				MoveABD.doSetStyle(divNode, result);
			}
		},
		initValue : function(option, divNode) {
			
		}
	};

var MOVEX = {
	name: 'movelinex',
	run : {
		doCal : function(option) {
			var left = (option.from.x + Math.round((option.step/option.maxStep)*(option.to.x - option.from.x)));
			return {top: -1, left: left};
		},
		doetStyle : function(divNode, result) {
			result.top = parseInt(divNode.style.top);
			MoveABD.doSetStyle(divNode, result);
		}
	},
	initValue : function(option, divNode) {
		
	}
}

var TRANSPERENTCY = {
	name : 'transper',
	run : {
		doCal : function(option) {
			var trans = Math.abs(option.from + (option.step/option.maxStep)*(option.to - option.from));
			return trans;
		},
		doSetStyle : function(divNode, result) {
			var opacityValue = result;
			divNode.style.opacity = opacityValue;
		}
	},
	initValue : function(option, divNode) {
		
	}
}; 

var ROTATE = {
	name : 'rotate',
	run : {
		doCal : function(option) {
			var radius = (option.step/option.maxStep)*(option.to - option.from);
			return radius;
		},
		doSetStyle : function(divNode, result) {
			var rotateValue = 'rotate('+result+'deg)';
			divNode.style.transform = rotateValue;
		}
	},
	initValue : function(option, divNode) {
		
	}
};

var RESIZE = {
	name : 'resize',
	run : {
		doCal : function(option) {
			var width = (option.step/option.maxStep)*(option.to.width - option.from.width);
			var height = (option.step/option.maxStep)*(option.to.height - option.from.height);
			var fontSize = option.fontSize + option.fontSize * (option.step/option.maxStep)*(option.to.width/option.from.width);
			return {width: width, height: height, fontSize : fontSize};
		},
		doSetStyle : function(divNode, result) {
			$(divNode).css('width', result.width + 'px');
			$(divNode).css('height', result.height + 'px');
			$(divNode).children().css('width', result.width + 'px');
			$(divNode).children().css('hieght', result.height + 'px');
			$(divNode).css('font-size', result.fontSize + 'px');
		}
	},
	initValue : function(option, divNode) {
		var style = window.getComputedStyle(divNode, null).getPropertyValue('font-size');
		option.fontSize = parseFloat(style);
	}
};

var RESIZEP = {
	name : 'resizep',
	run : {
		doCal : function(option) {
			var persent = (option.step/option.maxStep)*(option.to - 1);
			var width = option.width + option.width * persent;
			var height = option.height + option.height * persent;
			var fontSize = option.fontSize + option.fontSize * persent;
			return {width: width, height: height, fontSize : fontSize};
		},
		doSetStyle : function(divNode, result) {
			$(divNode).css('width', result.width);
			$(divNode).css('height', result.height);
			$(divNode).children().css('width', result.width);
			$(divNode).children().css('height', result.height);
			$(divNode).css('font-size', result.fontSize + 'px');
		}
	},
	initValue : function(option, divNode) {
		option.width = $(divNode).width();
		option.height = $(divNode).height();
		var style = window.getComputedStyle(divNode, null).getPropertyValue('font-size');
		option.fontSize = parseFloat(style);
	}
};

var REPLACE_IMG = {
		name : "replaceImg",
		run : {
			doCal : function(option) {
				var minStep = (option.time / MIN_TIME) / option.to.length;
				var img = null;
				if (option.step % minStep == 0) {
					var changeStep = option.step / minStep;
					img = option.to[changeStep%option.to.length];
				}
				return {img: img};
			},
			doSetStyle : function(divNode, result) {
				if(result.img != null){
					$(divNode).children('img').attr('src',result.img);
				}
			}
		},
		initValue : function(option, divNode) {
			
		}
}

var ACTION_MAP = [MOVE, SIN_MOVE, SIN_MOVE_X, TRANSPERENTCY, ROTATE, RESIZE, RESIZEP, REPLACE_IMG];

function findAction(name) {
	for (var i = 0; i < ACTION_MAP.length; i++) {
		if( ACTION_MAP[i].name == name ){
			return ACTION_MAP[i];
		}
	}
	return null;
}

/*--------------------- load animation from element ----------------*/

/*
 * Gobal variable load exe aniamtion
 */

var EFFECT_ARRAY = []; 

/*
 * load and do execute animation
 */
$(document).ready(
	function() {
		SCREEN_WIDTH = $(document).width();
		SCREEN_HEIGHT = $(document).height();
		
		if($('#show-block').attr('auto_res') == 'true'){
			regisAllAnimation();
		} else {
			showPlayButton();
		}
		
		// set css for container
		$('#show-block').css('left', ((SCREEN_WIDTH - SHOW_WIDTH)/2)+'px');
		$('#show-block').css('top', ((SCREEN_HEIGHT - SHOW_HEIGHT)/2)+'px');
		$('#show-block').css('position', 'absolute');
		$('#show-block').css('background', '#ffffff');
	}
);

function showPlayButton() {
	var markDiv = '<div id="mark_layer" style="width:'+SHOW_WIDTH+'px; height:'+SHOW_HEIGHT+'px; position:absolute; background:#000000; z-index:2500"></div>';
	var playButton = '<img id="play_button" src="img/play_button.png" style="width:50px; hieght:50px; left:487px; top:275px; position:absolute; z-index:3000"/>';
	$('#show-block').append(markDiv);
	$('#show-block').append(playButton);
	$('#play_button').click(
		function() {
			regisAllAnimation();
			$('#play_button').remove();
			$('#mark_layer').remove();
		}
	);
}

function regisAllAnimation() {
	var $elementList = $('div.doAnimation');
	for (var i = 0; i < $elementList.size(); i++) {
		regisdiv($elementList.get(i));
	}
	
	ANIMATION_INTERVAL = setInterval(function() {
		for (var i = 0; i < EFFECT_ARRAY.length; i++) {
			if (EFFECT_ARRAY[i].appearWhenShow && EFFECT_ARRAY[i].divNode.style.display == 'none' && TIME_COUNTER >= EFFECT_ARRAY[i].findMinStartAtAnimation().option.startAt){
				EFFECT_ARRAY[i].divNode.style.display = '';
			}
			doEffect(EFFECT_ARRAY[i]);
		}
		TIME_COUNTER += MIN_TIME;
	}, MIN_TIME);
}

function regisdiv(divNode) {
	var animations = [];
	for (var j = 1; j <= MAX_ANIMATION; j++) {
		try {
			var option = eval('('+$(divNode).attr('animation_'+j)+')');
			if(option != undefined && option != null){
				animations[j-1] = new Animation(option);
				animations[j-1].option.step = 0;
				animations[j-1].option.maxStep = animations[j-1].option.time / MIN_TIME;
				var animation = findAction(option.action);
				animation.initValue(animations[j-1].option, divNode);
			} else {
				break;
			}
		}catch (e) {
			console.log(e);
			break;
		}
	}
	
	var removeAble = $(divNode).attr('removeAfterRun');
	if(removeAble == 'true') {
		removeAble = true;
	} else {
		removeAble = false;
	}
	
	var appearWhenShow = $(divNode).attr('appearWhenShow');
	if(appearWhenShow == 'true') {
		appearWhenShow = true;
		divNode.style.display = 'none';
	} else {
		appearWhenShow = false;
	}
	var effect = new Effect(divNode, animations, removeAble, appearWhenShow);
	
	EFFECT_ARRAY[EFFECT_ARRAY.length] = effect;
}