/*-----------------Utils----------------------*/
/*
 * Holder function to execute general function and use common
 */
SUPPORT = {
	/**
	 * Check browser is ie or not
	 * @returns {Boolean} return if browser is ie
	 */
	isIE : function () {
		 var ua = window.navigator.userAgent;
         var msie = ua.indexOf("MSIE");
         if (msie > 0) {
        	 return true; 
         } else {
        	 return false; 
         }
	},
	/**
	 * Create animation when change tab or frame (not use)
	 * @param $selector seletor change
	 */
	changeAnimation : function ($selector) {
		$selector.removeClass("change-background-animation").addClass("change-background-animation");
	},
	/**
	 * disable click common item holder
	 * @param $selector
	 */
	enableCommonItemHolder : function ($selector) {
		var $activeHolder = $selector.parent().find('.common-item-holder-active');
		$activeHolder.removeClass('common-item-holder-active');
		$selector.toggleClass('common-item-holder-active');
	},
	/**
	 * Enable interfact with seletor
	 * @param $selector is seletor want to effect
	 */
	enable : function($selector) {
		if ($selector.is('input') || $selector.is('select') || $selector.hasClass('common-button-css')) {
			if ($selector.is('input') || $selector.is('select')) {
				$selector.prop('disabled', false);
			} else {
				$selector.removeClass('hover');
				$selector.html('');
			}
			return;
		}
		$selector.find('input').prop('disabled', false);
		$selector.find('.common-button-css').removeClass('hover');
		$selector.find('.common-button-css').html('');
	},
	/**
	 * Disable interfact with seletor
	 * @param $selector is seletor want to effect
	 */
	disable : function($selector) {
		if ($selector.is('input') || $selector.is('select') || $selector.hasClass('common-button-css')) {
			if ($selector.is('input') || $selector.is('select')) {
				$selector.prop('disabled', true);
			} else {
				$selector.addClass('hover');
				$selector.html('<div style="width: 100%; height: 100%; opacity: 0; background: white; cursor: default;" onclick="SUPPORT.stopAll(event)"></div>');
			}
			return;
		}
		$selector.find('input').prop('disabled', true);
		$selector.find('.common-button-css').addClass('hover');
		$selector.find('.common-button-css').html('<div style="width: 100%; height: 100%; opacity: 0; background: white;" onclick="SUPPORT.stopAll(event)"></div>');
	},
	/**
	 * Stop execute next bind function
	 * @param event is top
	 * @returns {Boolean} null
	 */
	stopAll :  function(event) {
		event.stopPropagation();
		event.preventDefault();
		return false;
	},
	/**
	 * Important function use to bind data to tab
	 * @param bindUi
	 * @param index if index == undefined then bind view else bind show
	 */
	bindEdit : function(bindUi) {
		$('#' + bindUi.tab).find('[property*="_prop"]').each(function() {
			var $this = $(this);
			var option = SUPPORT.createOption($this, bindUi);
			var value = option.val;
			// Detect type of ui for bind data
			if ($this.is('select') || $this.is('input[type="text"]')) {
				$this.val(value);
			}
			if ($this.is('img')) {
				$this.attr('src', value);
			}
			if ($this.is('div')) {
				if ($this.hasClass('tab-content')) {
					$(this).find('.common-item-holder').removeClass('common-item-holder-active');
					$(this).find('img.item[src="' + value + '"]').parent().addClass('common-item-holder-active');
				}
				if ($this.hasClass('select-picture-group')) {
					$this.find('img').removeClass('selected');
					var $slectedImg = $this.find('img[val="' + value + '"]');
					$slectedImg.addClass('selected');
					option.selectedImg = $slectedImg.attr('src');
				}
				if ($this.hasClass('plugin-imgs')) {
					$this.find('div.plugin-item').not('#plugin-item-sample').remove();
					for (var idx =0 ; idx < value.length; idx++) {
						var $cloneItem = $this.find('#plugin-item-sample').clone(true);
						$cloneItem.attr('id','');
						$cloneItem.css('display', 'block');
						$cloneItem.find('img.item').attr('src', value[idx]);
						$this.append($cloneItem);
					}
				}
				if ($this.hasClass('color-picker')) {
					$this.find('div.selected-color').css('background', value);
				}
			}
			// bind data
			bindUi.bind_view(option);
		});
	},
	/**
	 * Important function use to bind data to tab
	 * @param bindUi
	 * @param index if index == undefined then bind view else bind show
	 */
	bindShow : function(bindUi, index) {
		$('#' + bindUi.tab).find('[property*="_prop"]').each(function() {
			var $this = $(this);
			var option = SUPPORT.createOption($this, bindUi, index);
			// Bind show
			bindUi.bind_show(option);
		});
	},
	/**
	 * Function using to create option and value
	 * @param $select ui need to bind ui
	 * @param bindUi tab
	 * @param index index of value in array
	 */
	createOption : function($select, bindUi, index) {
		// get prop
		var prop1 = bindUi.tab.substring(0, bindUi.tab.length - 4);
		var prop2 = $select.attr('property');
		prop2 = prop2.substring(0, prop2.length - 5);
		var value = null;
		var option = {prop1 : prop1, prop2: prop2}
		// get bind ui
		if (bindUi.getData(index) == undefined) {
			throw -1;
		}
		if (index != undefined) {
			value = bindUi.getData(index)[prop2];
			option.index = index;
		} else {
			value = bindUi.getData()[prop2];
		}
		option.val = value;
		return option;
	},
	/**
	 * Important function to bind change data from tab to database
	 * @param bindUi tab controller
	 * @param $srcInput input change data
	 * @param option otion for change data
	 */
	bindDataChange : function(bindUi, $srcInput, option) {
		var prop2 = $srcInput.attr('property');
		prop2 = prop2.substring(0, prop2.length - 5);
		// set value
		var prop1 = bindUi.tab.substring(0, bindUi.tab.length - 4);
		if (bindUi == Text_Bind_UI) {
			ACTION.selectedFrame[prop1][Text_Bind_UI.clickedIndex][prop2] = option.val;
			option.index = Text_Bind_UI.clickedIndex;
		} else {
			ACTION.selectedFrame[prop1][prop2] = option.val;
		}
		option.prop1 = prop1;
		option.prop2 = prop2;
		// rebind
		bindUi.bind_view(option);
		bindUi.bind_show(option);
	},
	/**
	 * Bind change data event for simple element is input or select
	 * @param bindUi tab controller
	 */
	simpleBindData : function(bindUi) {
		$('#' + bindUi.tab).find('[property*="_prop"]').each(function() {
			var $this = $(this);
			if ($this.is('select') || $this.is('input[type="text"]')) {
				$this.change(function() {
					var $srcInput = $(this);
					var option = {};
					option.val = $srcInput.val();
					SUPPORT.bindDataChange(bindUi, $srcInput, option);
				});
			}
		});
	},
	/**
	 * Disable click element
	 * @param ui tab controller
	 * @param clickId clicked element id
	 */
	disableClick : function(ui, clickId) {
		var clickIndex = 0;
		if (clickId != undefined) {
			var clickIndex = $.inArray(clickId, ui.clicks);
		}
		var inActiveCss = ui.inActiveCss[clickIndex];
		var $click = $('#' + ui.clicks[clickIndex]);
		$click.css(inActiveCss);
		$click.attr('disabled','disabled');
		$click.css('cursor','auto');
		$click.children().css('cursor','auto');
		if ($click.hasClass('common-item-holder')) {
			$click.find('img.button').hide();
		}
	},
	/**
	 * Enable click element
	 * @param ui tab controller
	 * @param clickId clicked element id
	 */
	enableClick : function(ui, clickId) {
		var clickIndex = 0;
		if (clickId != undefined) {
			var clickIndex = $.inArray(clickId, ui.clicks);
		}
		var inActiveCss = ui.inActiveCss[clickIndex];
		var $click = $('#' + ui.clicks[clickIndex]);
		for (var key in inActiveCss) {
			$click.css(key,'')
		}
		$click.css('cursor','pointer');
		$click.children().css('cursor','pointer');
		$click.removeAttr('disabled','disabled');
	},
	/**
	 * Find object value by key
	 * @param object
	 * @param key
	 */
	findValueByKey : function(object, key) {
		for(var prop in object) {
		    var value = object[prop];
		    if (key == value.key) {
		    	return value.value;
		    }
		}
	}
};

/*---------------Dialog------------------------*/
/**
 * Dialog controller
 */
Diaglog_Bind_UI = {
	/**
	 * Bind event to element
	 */
	bind : function () {
		$('#frame-tb').click( function () {
			Diaglog_Bind_UI.showDialog('#border-dialog');
		});
		$('#music-tb').click( function () {
			Diaglog_Bind_UI.showDialog('#music-dialog');
		});
		$('.dialog-select .music-item').click( function () {
			$(this).parent().find('.active').removeClass('active');
			$(this).toggleClass('active');
		});
		$('#border-dialog .common-item-holder').click( function () {
			var $selectedFrame = $(this).parent().find('.common-item-holder-active');
			$selectedFrame.removeClass('common-item-holder-active');
			$selectedFrame.find('.button').css('display', 'none');
			$(this).toggleClass('common-item-holder-active');
		});
	},
	/**
	 * Handle show dialog
	 * @param dialog selected dom dialog
	 * @param option declare function to close or show dialog
	 */
	showDialog : function (dialog, option) {
		$dialog = $(dialog);
		option = Diaglog_Bind_UI.setExecute($dialog, option);
		option.onShow();
		$('#disable').show();
		$dialog.find('div.dialog-select').css('overflow-y', 'visible');
		$dialog.show(500, function() {
			$dialog.css('display', 'flex');
			$dialog.find('div.dialog-select').css('overflow-y', 'auto');
		});
	},
	/**
	 * Handle close dialog function
	 * @param $dialog current dialog
	 */
	closeDialog : function ($dialog) {
		$dialog.hide(500);
		$('#disable').hide();
	},
	/**
	 * 
	 * @param question
	 * @param option
	 */
	showConfirm : function (question, option) {
		$dialog = $('#confirm-dialog');
		$dialog.find('.dialog-select').text(question);
		Diaglog_Bind_UI.showDialog($dialog, option);
	},
	setExecute : function($dialog, option) {
		var extendOption = {
			$dialog : $dialog,
			onShow : function() {
				
			},
			onCancle : function () {
				Diaglog_Bind_UI.closeDialog($dialog);
			},
			onApply : function () {
				
			}
		};
		if (option) {
			$.extend( extendOption, option );
		};
		$dialog.find('.close-button').unbind().click(extendOption.onCancle);
		$dialog.find('.apply-button').unbind().click(extendOption.onApply);
		return extendOption;
	},
	showToast : function(text, time) {
		if (!time) {
			time = 200;
		}
		var $toast = $('#toast');
		$toast.text(text);
		$toast.css('margin-left', '-' + $toast.width() / 2 + 'px');
		$toast.css('margin-top', '-' + $toast.height() / 2 + 'px');
		$toast.fadeIn(500);
		setTimeout(function() {
			$toast.fadeOut(500)
		}, time)
	}
}
