/*---------------------------------------*/
/*
 * Declare background user interface controller
 */

Background_Bind_UI = {
	clicks : ['background_change'],
	getData : function(index) {return ACTION.selectedFrame.background} ,
	tab : 'background-tab',
	getClick : function() {
		return Background_Bind_UI.clicks[0];
	},
	setClick : function(click) {
		
	},
	inActiveCss : [{
		'opacity': '0.6'
	}],
	getInActiveCss : function() {
		return this.inActiveCss[0];
	},
	disable : function(clikedId) {
		SUPPORT.disableClick(this);
	},
	enable : function(clickId) {
		SUPPORT.enableClick(this);
	},
	changeTab : function(clickedId) {
	},
	bind_edit : function (option) {
		SUPPORT.bindEdit(this);
	},
	bind_view : function (option) {
		if (option.prop2 == 'url') {
			$('#background_change').find('img.item').attr('src', ACTION.selectedFrame[option.prop1][option.prop2]);
			if (Frame_Bind_UI.selectedFrameUI != null) {
				Frame_Bind_UI.selectedFrameUI.find('img.item').attr('src', ACTION.selectedFrame[option.prop1][option.prop2]);
			}
		}
	},
	bind_show : function(option) {
		var $show = $('#player_' + ACTION.selectedIndex);
		if (option.prop2 == 'url') {
			var width = $show.width() + 'px';
			var height = $show.height() + 'px';
			var $backgroundImg = $show.find('img.background');
			if ($backgroundImg.length == 0) {
				$show.append('<img src="" class="background" width="' + width + '" height="' + height + '" />');
				$backgroundImg = $show.find('img.background');
			}
			$backgroundImg.attr('src', option.val);
		}
	},
	bind_view_init : function() {
		
	},
	bind_show_init : function() {
		SUPPORT.bindShow(Background_Bind_UI);
	},
	changeFrame : function(isSelected) {
		this.bind_edit(null);
	},
	bind : function () {
		SUPPORT.simpleBindData(Background_Bind_UI);
		$('#background-item-holder .common-item-holder').click(
			function (event) {
				var $img = $(this).find('img.item');
				SUPPORT.enableCommonItemHolder($(this));
				var $srcInput = $('#background-item-holder');
				var option = {};
				option.val = $img.attr('src');
				SUPPORT.bindDataChange(Background_Bind_UI, $srcInput, option);
			}
		);
		$('#background-item-holder .add-btn').click(function() {
			var $dialogDiv = $('#download-dialog');
			var option = {
				onShow : function() {
					$file = $('#file');
					$file.unbind().change(function() {
						val = $file.val();
						$('#file-patch').val(val);
						if (val != '') {
							SUPPORT.enable($dialog.find('.upload-button'));
						} else {
							SUPPORT.disable($dialog.find('.upload-button'));
						}
					});
					$file.trigger('change');
					$dialog.find('.file-button').unbind().click(function() {
						$file.trigger('click');
					});
				},
				onApply : function() {
					SUPPORT.disableButton($dialog);
				}
			};
			Diaglog_Bind_UI.showDialog($dialogDiv, option);
		});
	},
};

/*------------------Plugin----------------------*/
Plugin_Bind_UI = {
	clicks : ['plugin_change'],
	getData : function(index) {return ACTION.selectedFrame.plugin},
	tab : 'plugin-tab',
	getClick : function() {
		return Plugin_Bind_UI.clicks[0];
	},
	setClick : function(click) {
		
	},
	inActiveCss : [{
		'background' : '#639ba7'
	}],
	getInActiveCss : function() {
		return this.inActiveCss[0];
	},
	disable : function(clickedId) {
		SUPPORT.disableClick(this);
	},
	enable  : function(clickedId) {
		SUPPORT.enableClick(this);
	},
	changeTab : function(clickedId) {
	},
	bind_edit : function (option) {
		SUPPORT.bindEdit(this);
	},
	changeFrame : function(isSelected) {
		this.bind_edit(null);
	},
	bind_view : function (option) {
		if (option.prop2 == 'direction' || option.prop2 == 'type') {
			$('.'+ option.prop2).attr('src', option.selectedImg);
		}
		if (option.prop2 == 'imgs') {
			$('.plugin .icon-contain img').remove();
			for(var i = 0 ; i < option.val.length; i++) {
				$('.plugin .icon-contain').append('<img class="item" src="' + option.val[i] + '" />');
			}
		}
	},
	bind_view_init : function() {
		
	},
	bind_show_init : function() {
		SUPPORT.bindShow(Plugin_Bind_UI);
	},
	bind_show : function(option) {
		var $show = $('#player_' + ACTION.selectedIndex);
	},
	bind : function () {
		$('.select-picture-group img').click ( function () {
			Plugin_Bind_UI.changSelectDirect(this);
		});
		$('#plugin-item-selected .plugin-item').click ( function () {
			Plugin_Bind_UI.removeImg(this);
		});
		$('#plugin-item-holder .plugin-item').click ( function () {
			Plugin_Bind_UI.addImg(this);
		});
	},
	changSelectDirect : function (selectImg) {
		var $selectImg = $(selectImg);
		var $inputProp = $selectImg.parent();
		$inputProp.find('img').removeClass('selected');
		$selectImg.addClass('selected');
		$selectImg.fadeTo(300, 0.5, function (){
			$selectImg.fadeTo(300, 1);
		});
		option = {};
		option.val = parseInt($selectImg.attr('val'));
		option.selectedImg = $selectImg.attr('src');
		SUPPORT.bindDataChange(Plugin_Bind_UI, $inputProp, option);
	},
	removeImg : function (removeDiv) {
		$(removeDiv).hide(200, function() {
			var $removeParent = $(removeDiv).parent();
			$(removeDiv).remove();
			option = {};
			option.val = Plugin_Bind_UI.getImgsData();
			SUPPORT.bindDataChange(Plugin_Bind_UI, $removeParent, option);
		});
	},
	addImg : function (addDiv) {
		$addDiv = $(addDiv).clone(true);
		$addDiv.css('display','none');
		$addDiv.attr('id','');
		$addDiv.appendTo($('#plugin-item-selected')).unbind('click').click( function () {
			Plugin_Bind_UI.removeImg(this);
		});
		$addDiv.find('.button').attr('src','img/editor/icon/tool/remove.png');
		$addDiv.show(300);
		option = {};
		option.val = Plugin_Bind_UI.getImgsData();
		SUPPORT.bindDataChange(Plugin_Bind_UI, $(addDiv).parent(), option);
	},
	changeCategory : function (selectedCategory) {
		
	},
	getImgsData : function () {
		var imgs = [];
		$('#plugin-item-selected .plugin-item img.item').each(function(index) {
			if ($(this).parent().css('display') != 'none') {
				imgs[index-1] = $(this).attr('src');
			}
		});
		return imgs;
	}
};
/*------------------------Text--------------------------*/
Text_Bind_UI = {
	clicks : ['text_change', 'text_add'],
	tab : 'text-tab',
	clickedIndex : 0,
	bind : function() {
		$('div.text-item div.removeText').click(function() {
			var index = $(this).parent().index();
			ACTION.removeText(index);
			Text_Bind_UI.changeFrame(false);
			Text_Bind_UI.bind_show_init();
			return;
		});
	},
	getData : function(index) {
		if (index == undefined) {
			return ACTION.selectedFrame.text[Text_Bind_UI.clickedIndex];
		} else {
			return ACTION.selectedFrame.text[index]
		}
	},
	getClick : function() {
		return Text_Bind_UI.clicks[Text_Bind_UI.clickedIndex];
	},
	setClick : function(click) {
	},
	changeTab : function(clickedId) {
		if (clickedId != this.clicks[this.clickedIndex]) {
			this.clickedIndex = $.inArray(clickedId, this.clicks);
			if (this.getData() == undefined) {
				ACTION.addText();
			}
		}
		SUPPORT.bindEdit(this);
		Text_Bind_UI.changeFrame(true);
		Text_Bind_UI.bind_show_init();
	},
	getInActiveCss : function() {
		return Text_Bind_UI.inActiveCss[Text_Bind_UI.clickedIndex];
	},
	inActiveCss : [{
		'background' : '#639ba7',
		'background-image' : 'url("img/editor/icon/tool/edit-hover.png")',
		'background-position' : 'center',
	 	'background-size' : '12px 12px',
	 	'background-repeat' : 'no-repeat'
	},
	{
		'background' : '#639ba7',
		'background-image' : 'url("img/editor/icon/tool/edit-hover.png")',
		'background-position' : 'center',
	 	'background-size' : '12px 12px',
	 	'background-repeat' : 'no-repeat'
	}],
	disable : function(clickedId) {
		if (clickedId == this.clicks[1]) {
			var $selectedClick = $('#' + this.clicks[1]);
			$selectedClick.text('');
			$selectedClick.addClass('edit-button');
		}
		SUPPORT.disableClick(this, clickedId);
	},
	enable  : function(clickedId) {
		SUPPORT.enableClick(this, clickedId);
	},
	bind_edit : function (option) {
		SUPPORT.bindEdit(this);
		SUPPORT.simpleBindData(this);
	},
	bind_show : function(option) {
		var $show = $('#player_' + ACTION.selectedIndex);
		var $textShow = $show.find('#text_dp_' + option.index);
		if (option.prop2 == 'contain') {
			$textShow.text(option.val);
		}
		if (option.prop2 == 'postion') {
			$textShow.removeClass('top');
			$textShow.removeClass('middle');
			$textShow.removeClass('botton');
			$textShow.removeClass('left');
			$textShow.removeClass('right');
			$textShow.removeClass('center');
			var classes = option.val.split('_');
			$textShow.addClass(classes[0]);
			$textShow.addClass(classes[1]);
		}
		if (option.prop2 == 'color') {
			$textShow.css('color', option.val);
		}
	},
	changeFrame : function(isSelected) {
		var setAddBT = function($select) {
			// change text_add to default status if new frame have 1
			$select.find('div.text-display').text('');
			$select.find('div.txtBtn').text('+');
			$select.find('div.txtBtn').removeClass('edit-button');
		};
		// Case cliecked index is out of index of text change clickid
		if (Text_Bind_UI.clickedIndex >= ACTION.selectedFrame.text.length) {
			Text_Bind_UI.clickedIndex = ACTION.selectedFrame.text.length - 1;
		}
		// loop to set disable click
		$('div.text-item').each(function(textIndex) {
			var $this = $(this);
			// Display edit able for button
			if (textIndex < ACTION.selectedFrame.text.length){
				var $txtBtn = $this.find('div.txtBtn');
				$txtBtn.text('');
				$txtBtn.addClass('edit-button');
				$this.find('div.removeText').show();
			}
			// Disable click button
			var clickId = $this.find('div.txtBtn').attr('id');
			if (textIndex == Text_Bind_UI.clickedIndex && Frame_Bind_UI.selectedUI == Text_Bind_UI) {
				Text_Bind_UI.disable(clickId);
			}
			// Display add button
			if (textIndex == ACTION.selectedFrame.text.length){
				setAddBT($this);
				Text_Bind_UI.enable(clickId);
				$this.find('div.removeText').hide();
			}
			// Displayed text block
			if (textIndex <= ACTION.selectedFrame.text.length){
				$this.show();
			}
			// Hide text block
			if (textIndex > ACTION.selectedFrame.text.length){
				$this.hide();
			}
		});
		this.bind_edit(null);
	},
	bind_view : function (option) {
		if (option.prop2 == 'contain') {
			$('#text' + this.clickedIndex + ' .text-display').text(option.val);
		}
		if (option.prop2 == 'color') {
			$('#text' + this.clickedIndex + ' .text-display').css('color', option.val);
		}
	},
	bind_view_init : function() {
		for (var int = 0; int < 2; int++) {
			$('#text' + int + ' .text-display').text(ACTION.selectedFrame.text[int] != undefined ? ACTION.selectedFrame.text[int].contain : '');
			$('#text' + int + ' .text-display').css('color', ACTION.selectedFrame.text[int] != undefined ? ACTION.selectedFrame.text[int].color : '');
		}
	},
	bind_show_init : function() {
		var $show = $('#player_' + ACTION.selectedIndex);
		for (var i = 0; i < 2; i++) {
			$show.find('#text_dp_' + i).remove();
		}
		for (var i = 0; i < ACTION.selectedFrame.text.length; i++) {
			var $textDp = $show.find('#text_dp_' + i);
			if ($textDp.length == 0) {
				$show.append('<div id="text_dp_' + i + '" class="text_show"></div>');
			}
			SUPPORT.bindShow(Text_Bind_UI, i);
		}
	},
	changeColor : function (color) {
		option = {val : color};
		SUPPORT.bindDataChange(Text_Bind_UI, $('#' + Text_Bind_UI.tab).find('.color-picker'), option);
	}
};
/*
 * Declare object to action click for frame
 */

FRAME_BIND_ARRAY = [Background_Bind_UI, Plugin_Bind_UI, Text_Bind_UI];