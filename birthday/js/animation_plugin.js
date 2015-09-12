/**
 * @opion
 * 		imgSize
 * 		action_array
 * 		time
 *  	
 */

var LOCAL_INTERVAl;

var PLUGIN_RUN_ABLE = [];

function pluginRunAble(divNode, option, plugin) {
	this.divNode = divNode;
	this.option = option;
	this.plugin = plugin;
}

var ELEMENT_FLY =  {
	
	name : 'elementfly',
	
	createOption : function(divNode) {
		var $divNode = $(divNode);
		var option = {};
		option.removeAfterRun = $divNode.attr('remove_after_run');
		option.imgArray = $divNode.attr('img_array').split(',');
		option.maxElement = parseInt($divNode.attr('max_element'));
		option.imgSize = parseInt($divNode.attr('img_size'));
		option.preIdName = $divNode.attr('id');
		option.appearWhenShow = $divNode.attr('appear_when_show');
		option.regisAt = parseInt($divNode.attr('regis_at'));
		option.endAt = parseInt($divNode.attr('end_at'));
		option.animationTime = parseInt($divNode.attr('animation_time'));
		option.regisAfter = Math.floor((option.endAt - option.regisAt - option.animationTime)* 1.0 / option.maxElement);
		option.id = 0;
		option.disableRandomRotate = $(divNode).attr('disable_random_rotate');
		if(option.disableRandomRotate == 'true') {
			option.disableRandomRotate = true;
		} else {
			option.disableRandomRotate = false;
		}
		return option;
	},
	
	replaceString : function(map, string) {
		for (var int = 0; int < map.length; int++) {
			var re = new RegExp(map[int].key, 'g');
			string = string.replace(re, map[int].value +'');
		}
		return string;
	},
	
	createAnimationData : function(divNode, option) {
		var animationArray = [];
		var min_x = 0;
		var max_x = SHOW_WIDTH - option.imgSize;
		var min_y = 0;
		var max_y = SHOW_HEIGHT - option.imgSize;
		var random_x = Math.floor((Math.random() * max_x));
		var random_y = Math.floor((Math.random() * max_y));
		var after_current = option.regisAt + option.regisAfter * option.id;//TIME_COUNTER + 100;
		var mapKey = [{key:'min-x',value:min_x}, {key:'min-y',value:min_y}, {key:'max-x',value:max_x}, {key:'max-y',value:max_y}, {key:'random-x',value:random_x}, {key:'random-y',value:random_y}, {key:'after-current',value:after_current}];
		for(var i = 1 ; i <= MAX_ANIMATION; i++){
			animationString = $(divNode).attr('animation_'+i);
			if(animationString != null && animationString != undefined) {
				animationArray[animationArray.length] = ELEMENT_FLY.replaceString(mapKey, animationString);
			} else {
				break;
			}
		}
		option.style = $(divNode).attr('style');
		option.style = ELEMENT_FLY.replaceString(mapKey, option.style);
		option.animationArray = animationArray;
	},
	
	createRandomDivNode : function(option) {
		var idString = option.preIdName+option.id++;
		var img = option.imgArray[Math.floor((Math.random() * option.imgArray.length))];
		var divNode = '<div id="'+idString+'"';
		for (var i = 1; i <= option.animationArray.length; i++) {
			divNode += ' animation_'+i+' = "'+option.animationArray[i-1]+'"';
		}
		divNode += ' removeAfterRun="'+option.removeAfterRun+'" ';
		divNode += ' appearWhenShow="'+option.appearWhenShow+'" ';
		divNode += ' style="'+option.style+'">';
		divNode += '<img src="'+img+'" width="'+option.imgSize+'px" />';
		divNode += '</div>';
		
		$('#show-block').append(divNode);
		divNode = $('#'+idString);

		if (!option.disableRandomRotate){
			var radius = Math.floor((Math.random() * 60));
			if(option.id % 2 == 1){
				radius = 360 - radius;
			}
			divNode.get(0).style.transform = 'rotate('+radius+'deg)';
		}
		
		return divNode;
	},
	
	doRegisPluginDirect : function(regNode, option) {
		ELEMENT_FLY.createAnimationData(regNode, option);
		var $divNode = ELEMENT_FLY.createRandomDivNode(option, option.id);
		regisdiv($divNode.get(0));
	}
};

var PLUGIN_ARRAY = [ELEMENT_FLY];

function findPlugin(pluginName) {
	for (var int = 0; int < PLUGIN_ARRAY.length; int++) {
		if(PLUGIN_ARRAY[int].name == pluginName){
			return PLUGIN_ARRAY[int];
		}
	}
	return null;
}

$(document).ready(
	function() {
		$('.animation_plugin').each(
			function(int, currentDiv){
				var plugin = findPlugin($(currentDiv).attr('plugin'));
				if(plugin != null){
					var option = plugin.createOption(currentDiv);
					PLUGIN_RUN_ABLE[int] = new pluginRunAble(currentDiv, option, plugin);
				}
			}
		);
		
		LOCAL_INTERVAl = setInterval(function() {
			for (var i = 0; i < PLUGIN_RUN_ABLE.length; i++) {
				if(PLUGIN_RUN_ABLE[i].option.regisAt <= TIME_COUNTER) {
					for(var j = 0; j < PLUGIN_RUN_ABLE[i].option.maxElement; j++) {
						PLUGIN_RUN_ABLE[i].plugin.doRegisPluginDirect(PLUGIN_RUN_ABLE[i].divNode, PLUGIN_RUN_ABLE[i].option);
					}
					PLUGIN_RUN_ABLE.splice(i, 1);
					break;
				}
			}
		}, 100);
	}
);