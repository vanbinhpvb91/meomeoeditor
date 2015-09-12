/**
 * Interact with server and local db
 */
ACTION = {
	selectedFrame : null,
	selectedIndex : -1,
	createDB : function(json) {
		if (!json) {
			DB.init();
		}
	},
	/**
	 * Change selected frame
	 * @param index new selected index
	 */
	changeSelectedFrame : function(index) {
		ACTION.selectedFrame = DB.card.frames[index];
		ACTION.selectedIndex = index;
	},
	/**
	 * Save frame to page
	 * @param bindUI is ui
	 */
	saveFrameProp : function(bindUI) {
		var object = bindUI.getObject();
		var propName = bindUI.tab.substring(0, bindUI.tab.length - 4);
		ACTION.setProp(propName, object, ACTION.selectedFrame);
	},
	/**
	 * Set porperty in data
	 * @param prop name of pop
	 * @param value changed value
	 * @param obj object need to change
	 */
	setProp : function(prop, value, obj) {
	    if (typeof prop === 'string') {
	    	prop = prop.split('.');
	    }
	    if (prop.length > 1) {
	        var e = prop.shift();
	        setProp(prop, value, obj[e] =
	                 Object.prototype.toString.call(obj[e]) === '[object Object]'
	                 ? obj[e]
	                 : {});
	    } else {
	    	obj[prop[0]] = value;
	    }
	},
	/**
	 * creae an default text
	 */
	addText : function() {
		ACTION.selectedFrame.text[ACTION.selectedFrame.text.length] = new Text(message.newText, TEXT_SIZE.MEDIUM, 'Arial', TEXT_POSITION.TOP_LEFT, '#000000');
	},
	/**
	 * Revmove an index
	 */
	removeText : function(index) {
		ACTION.selectedFrame.text.splice(index, 1);
	},
	/**
	 * add new frame to page
	 * @returns {Number} is new value
	 */
	addFrame : function() {
		DB.card.frames[DB.card.frames.length] = ACTION.createSampleFrame();
		return DB.card.frames.length - 1;
	},
	/**
	 * commit to server
	 */
	commit : function() {
		// submit to server
		// get result
		// ok do nothing
		// fail rebind
	},
	/**
	 * upload an img
	 */
	upload : function() {
		// sent to server
		// get process and do it
	},
	/**
	 * create new frame
	 * @returns {Frame} created frame
	 */
	createSampleFrame : function() {
		// create new a sample frame
		var sampleText = new Text(message.newText, TEXT_SIZE.MEDIUM, 'Arial', TEXT_POSITION.BOTTON_LEFT, '#ff0000');
		var sampleTexts = [sampleText];
		var sampleBackGround = new BackGround('img/birthdate/bg/bg3.jpg', APPEAR.RESIZE, HIDE.TRANSPARENCY);
		var samplePlugin = new Plugin(FLY_DIRECTION.RIGHT_LEFT, FLY_TYPE.STRAINGT, 10, ['img/birthdate/cake-1.png', 'img/birthdate/cake-2.png', 'img/birthdate/cake-3.png']);
		var sampleFrame = new Frame(20, sampleBackGround, samplePlugin, sampleTexts);
		return sampleFrame;
	},
	/**
	 * Remove a frame by index
	 * @param index removed frame
	 * @return number of frame deleted
	 */
	removeFrame : function(index) {
		DB.card.frames.splice(index, 1);
	},
	/**
	 * Change frame order
	 * @param oldIndex current index of value
	 * @param newIndex new index of value
	 */
	changeOrder : function(oldIndex, newIndex) {
		// re order frame
		var changeFrame = DB.card.frames[oldIndex];
		// Remove frame need to change order
		DB.card.frames.splice(oldIndex, 1);
		// Insert frame to new index
		DB.card.frames.splice(newIndex, 0, changeFrame);
	},
	/**
	 * Get list img from server
	 * @return list of img
	 */
	getCategory : function() {
		return [];
	},
	/**
	 * Get number of frames in db
	 * @returns number of frame
	 */
	count : function() {
		return DB.card.frames.length;
	}
};