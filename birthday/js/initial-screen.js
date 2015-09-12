/*
 * auto calsize for div
 */
function changeSize() {
	var max_width = $(window).width();
	var max_height = $(window).height() - 100;
	$('.fullWidth').css('width', max_width + 'px');
	$('.fullHeight').css('height', max_height + 'px');
	$('.screenHeight').css('height', $(window).height() + 'px');
	var playerHeight = 400;
	var playerWidth = 533;
	var marginTop = ($('#player-controller').height() - playerHeight)/2 - 15;
	$('#player').css({'width': playerWidth + 'px', 'height' : playerHeight + 'px', 'margin' : marginTop+'px auto'});
}

/*
 * bind enter action for css
 */
function enterItem() {
}

var COLOR_LIST = ['#000000','#FFFFFF','#683226','#94710B',
                  '#AB0061','#F191CE','#D52B1E','#C9005E',
                  '#441460','#E27000','#777B00','#8FCBE7',
                  '#017BC8','#39870F','#F9E11D','#275936'];

BINDUI = {
	// color ui
	colorUIBind : function () {
		$('.color-picker').append(
				'<div class="color-select-box" style="width:100%;position:absolute;display:none;z-index:30;background-color:#ffffff;">'+
				'<table class="color-select-tb" style="width: 100%;">'+
				'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
				'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
				'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
				'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
				'</table>'+
				'</div>'
		);
		$('.color-picker').css('position','relative');
		$('.color-select-tb td').css('border', '1px solid');
		$('.color-select-tb td').each(
			function (index) {
				$(this).css('background-color', COLOR_LIST[index]);
				$(this).css('cursor', 'pointer');
			}
		);
		$('.color-select-tb td').click(
			function () {
				var $selectedDiv = $(this).parents('.color-picker').find('.selected-color');
				$selectedDiv.css('background-color',$(this).css('background-color'));
				var $colorPicker = $(this).parents('.color-picker');
				$colorPicker.find('.color-select-box').css('display','none');
				if ($colorPicker.attr('change')) {
					var funcNames = $colorPicker.attr('change').split('.');
					var fun = window;
					for (var int = 0; int < funcNames.length; int++) {
						fun = fun[funcNames[int]];
					}
					fun($(this).css('background-color'));
				}
			}
		);
		$('.selected-color').click(
			function (event) {
				var $showSelectTB = $(this).parent().find('.color-select-box');
				var display = $showSelectTB.css('display');
				if (display == 'none') {
					$showSelectTB.css('display','block');
				} else {
					$showSelectTB.css('display','none');
				}
				event.stopPropagation();
			}
		);
		$(document).click(function (event) {
			var $showSelectTB = $('.color-select-box');
			$showSelectTB.hide();
		});
	},
};

/*
 * bind action to ready action and resize action
 */
$(document).ready(function() {
	changeSize();
	enterItem();
	BINDUI.colorUIBind();
});

if (window.attachEvent) {
    window.attachEvent('onresize', function() {
        changeSize();
    });
}
else if (window.addEventListener) {
    window.addEventListener('resize', function() {
        changeSize();
    }, true);
}