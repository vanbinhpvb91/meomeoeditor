/*
 * Frame controller
 */

$(document).ready(
	function () {
		Frame_Bind_UI.bind();
		Background_Bind_UI.bind();
		Plugin_Bind_UI.bind();
		Text_Bind_UI.bind();
		Diaglog_Bind_UI.bind();
	}
);
/**
 * Frame controller
 */
Frame_Bind_UI = {
	selectedUI : FRAME_BIND_ARRAY[0],// Current view tab controller
	selectedFrameUI : null,// Curent selected frame selecter
	/**
	 * Bind action for execute funtion
	 * Cotroller
	 */
	bind : function() {
		this.selectedUI.disable();
		for (var i = 0; i < FRAME_BIND_ARRAY.length; i++) {
			for (var j = 0; j < FRAME_BIND_ARRAY[i].clicks.length; j++) {
				var click = FRAME_BIND_ARRAY[i].clicks[j];
				$('#' + click).click(function(event) {
					Frame_Bind_UI.tabChange(event);
				});
			}
		}
		// Bind drag and drop event
		Frame_Bind_UI.frameDragBind();
		// Bind delete event
		$('#frames-controller .item-contain .button').click ( function (event) {
			var $parent = $(this).parents('.item-contain');
			var option = {
				onApply : function() {
					var index = Frame_Bind_UI.deleteFrame($parent);
					if (index != -1) {
						$parent.hide(500, function() {
							// remove action
							$('#player #player_' + index).remove();
							for (var i = index+1; i <= ACTION.count(); i++) {
								$('#player #player_' + i).attr('id', 'player_' + (i - 1));
							}
							// remove frame
							$parent.remove();
						});
					} else {
						Diaglog_Bind_UI.showToast(message.errorDelete, 2000);
					}
					Diaglog_Bind_UI.closeDialog($dialog);
				}
			};
			Diaglog_Bind_UI.showConfirm(message.comfignDelete, option);
			event.stopPropagation();
		});
		// change frame
		$('#frames-controller .item-contain').click(function() {
			$('#frames-edit').fadeTo(300, 0, function() {
				$(this).fadeTo(300, 1);
			});
			var index = Frame_Bind_UI._findFrameIndex($(this));//listItem.index(this);
			Frame_Bind_UI.bind_data(index);
		});
		for (var i = 0; i < DB.card.frames.length; i++) {
			Frame_Bind_UI.createFrame(DB.card.frames[i]);
		}
		Frame_Bind_UI.bind_data(0);
		// add new frame
		$('#frames-controller .add-frame').click(function() {
			Frame_Bind_UI.addFrame();
		});
	},
	/**
	 * Action when change tab
	 * @param event tab change
	 */
	tabChange : function(event) {
		var clickId = event.currentTarget.getAttribute('id');
		var changeUi = Frame_Bind_UI._findUI(clickId);
		if (clickId == this.selectedUI.getClick()){
			return;
		}
		// disable nut duoc nhan
		changeUi.disable(clickId);
		// enable nut hien tai
		Frame_Bind_UI.selectedUI.enable(Frame_Bind_UI.selectedUI.getClick());
		if (changeUi != Frame_Bind_UI.selectedUI) {
			// show tab
			Frame_Bind_UI._viewTab(clickId);
			Frame_Bind_UI.selectedUI = changeUi;
		}
		// do after change tab
		changeUi.changeTab(clickId);
	},
	/**
	 * Add new frame
	 */
	addFrame : function() {
		var index = ACTION.addFrame();
		Frame_Bind_UI.createFrame(DB.card.frames[index]);
		Frame_Bind_UI.bind_data(index);
	},
	/**
	 * Hien tab len
	 * @param clickId id cua element duoc click
	 */
	_viewTab : function(clickId) {
		var frameHeight = '';
		var changeUi = Frame_Bind_UI._findUI(clickId);
		var $changeTab = $('#' + changeUi.tab);
		var $currentTab = $('#' + Frame_Bind_UI.selectedUI.tab);
		$currentTab.css('display', 'none');
		var frameHeight = $currentTab.height() + 'px';
		$changeTab.css('display', 'flex');
		$changeTab.css('height', frameHeight);
		SUPPORT.changeAnimation($changeTab);
	},
	/**
	 * Find ui by click id
	 * @param clickId id cua element duoc click
	 */
	_findUI : function(clickId) {
		for (var i = 0; i < FRAME_BIND_ARRAY.length; i++) {
			if ($.inArray(clickId, FRAME_BIND_ARRAY[i].clicks) != -1) {
				return FRAME_BIND_ARRAY[i];
			}
		}
	},
	/**
	 * Bind drag and drop function
	 */
	frameDragBind : function () {
		//$('#frames-controller .item-contain').attr('ondrop', 'Frame_Bind_UI.FrameDrag.dropFrame(event)');
		//$('#frames-controller .item-contain').attr('ondragover', 'Frame_Bind_UI.FrameDrag.overDrag(event)');
		$('#frames-controller .drop_able').attr('ondrop', 'Frame_Bind_UI.FrameDrag.dropFrame(event)');
		$('#frames-controller .drop_able').attr('ondragover', 'Frame_Bind_UI.FrameDrag.overDrag(event)');
		$('#frames-controller .drop_able').attr('ondragleave', 'Frame_Bind_UI.FrameDrag.leaveDrag(event)');
		$('#frames-controller .item-contain .item').attr('ondragstart', 'Frame_Bind_UI.FrameDrag.startDragFrame(event)');
		$('#frames-controller .item-contain .item').attr('ondrag', 'Frame_Bind_UI.FrameDrag.dragFrame(event)');
		$('#frames-controller .item-contain .item').attr('draggable', 'true');
	},
	/**
	 * Cotain function to change position of frame
	 */
	FrameDrag : {
		/**
		 * Do start drag a frame
		 */
		startDragFrame : function (ev) {
			ev.dataTransfer.setData('text', ev.srcElement.id);
			var imgId = ev.srcElement.id;
			$('#frames-controller div.drop_able').each(function(index) {
				var $dropAble = $(this);
				if ($dropAble.next().find('img.item').attr('id') != imgId && $dropAble.prev().find('img.item').attr('id') != imgId) {
					$dropAble.addClass('drop_able_hover');
				};
			});
			var img = document.getElementById('ghost_img');
			try {
				ev.dataTransfer.setDragImage(img, 0, 0);
			} catch (e) {
				
			}
		},
		/**
		 * Do drop a frame
		 */
		dropFrame : function (ev) {
			ev.preventDefault();
			var $dropAble = $(ev.target).css('border', '');
			var $dragFrame = $('#' + ev.dataTransfer.getData('text')).closest('div');
			// Do change order
			var dropIndex = $('#frames-controller .drop_able').index($dropAble);
			var dragIndex = Frame_Bind_UI._findFrameIndex($dragFrame);
			if (dropIndex > dragIndex) {
				dropIndex--;
			}
			// Change order in database
			ACTION.changeOrder(dragIndex, dropIndex);
			// Change order in player
			var $selectedPlayer = $('#player #player_' + dragIndex);
			var $clonePlayer = $selectedPlayer.clone(true);
			$selectedPlayer.remove();
			if (dropIndex > dragIndex) {
				$('#player #player_' + dropIndex).after($clonePlayer);
			} else {
				$('#player #player_' + dropIndex).before($clonePlayer);
			}
			$('#player div[id*=player_]').each(function(index) {
				$(this).attr('id', 'player_' + index);
			});
			// clone new drag and drop
			var $cloneFrame = $dragFrame.clone(true);
			// set current frame if change order of slected frame
			if ($dragFrame.is(Frame_Bind_UI.selectedFrameUI)) {
				Frame_Bind_UI.selectedFrameUI = $cloneFrame;
			} 
			var $cloneDrop = $dragFrame.prev().clone(true);
			// append prev
			$dropAble.after($cloneDrop);
			$dropAble.after($cloneFrame);
			// remove
			$dragFrame.prev().remove();
			$dragFrame.remove();
			// hide
			$cloneFrame.hide();
			$cloneFrame.show(100);
			// disable drop
			$('#frames-controller div.drop_able').removeClass('drop_able_hover');
		},
		/**
		 * don't execute
		 */
		overDrag : function (ev) {
			var imgId = ev.dataTransfer.getData('text');
			var $dropAble = $(ev.target);
			if ($dropAble.hasClass('drop_able_hover')) {
				ev.preventDefault();
				$dropAble.css('border', '1px dotted #000000');
			}
			return false;
		},
		/**
		 * don't execute
		 */
		leaveDrag : function (ev) {
			ev.preventDefault();
			var $dropAble = $(ev.target);
			$dropAble.css('border', '');
			return false;
		},
		/**
		 * Do when drag
		 */
		dragFrame : function (ev) {
			if (!SUPPORT.isIE()){
				var x = ev.clientX + 3;
				var y = ev.clientY - 35;
				$('#ghost-div').css('left', x + 'px');
				$('#ghost-div').css('top',  y + 'px');
			}
		}
	},
	/**
	 * Do delete a frame
	 * @param index is index of selected frame
	 * @return index of selected value
	 */
	deleteFrame : function ($frame) {
		var index = Frame_Bind_UI._findFrameIndex($frame);
		var newSelectedIndex = index;
		if (index == ACTION.selectedIndex) {
			if (index == 0) {
				newSelectedIndex = 0;
			} else {
				newSelectedIndex = index - 1;
			}
		} else {
			newSelectedIndex = -1;
		}
		if (ACTION.count() > 1) {
			ACTION.removeFrame(index);
			if (newSelectedIndex != -1) {
				Frame_Bind_UI.bind_data(newSelectedIndex);
			}
			return index;
		} else {
			return -1;
		}
	},
	/**
	 * Bind data when change tab
	 */
	bind_data : function(index) {
		ACTION.changeSelectedFrame(index);
		// Set frame ui
		this.selectedFrameUI = $($('#frames-controller .item-contain').removeClass('common-item-holder-enable').get(index + 1));
		this.selectedFrameUI.addClass('common-item-holder-enable');
		// Create new bind_show and active it
		$('#player div.active').removeClass('active');
		var $changedPlayer = $('#player #player_' + index);
		if ($changedPlayer.length == 0) {
			var newPlayer = '<div id="player_' + index + '" class="active player"></div>';
			$('#player').append(newPlayer);
		} else {
			$changedPlayer.addClass('active');
		}
		// Bind data
		for (var idx = 0; idx < FRAME_BIND_ARRAY.length; idx++) {
			FRAME_BIND_ARRAY[idx].changeFrame(FRAME_BIND_ARRAY[idx] == this.selectedUI);
			FRAME_BIND_ARRAY[idx].bind_view_init();
			FRAME_BIND_ARRAY[idx].bind_show_init();
		}
	},
	/**
	 * Tao moi frame
	 * @param frame la frame duoc tao moi
	 */
	createFrame : function(frame){
		var id = 'frame_' + (new Date()).getTime();
		var $newFrame = $('#sample').clone(true);
		$newFrame.attr('id' , '');
		var dropArea = '<div class="drop_able"></div>';
		var $img = $newFrame.find('img.item');
		$img.attr('id', id);
		$img.attr('src', frame.background.url);
		$newFrame.css('display', 'block');
		$('#frames-controller #lasted_drop').before(dropArea);
		$('#frames-controller #lasted_drop').before($newFrame);
		Frame_Bind_UI.frameDragBind();
	},
	/**
	 * Find index of frame
	 * @param $frame need to find index
	 * @returns {Number} index of frame
	 */
	_findFrameIndex : function($frame) {
		var index = $("#frames-controller div.item-contain").index($frame) - 1;
		return index;
	}
};