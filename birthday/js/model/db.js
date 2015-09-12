DB = {
	card : null,
	init: function() {
		var sampleText = new Text(message.newText, TEXT_SIZE.MEDIUM, 'Arial', TEXT_POSITION.BOTTON_LEFT, '#ff0000');
		var sampleTexts = [sampleText];
		var sampleBackGround = new BackGround('img/birthdate/bg5.jpg', APPEAR.RESIZE, HIDE.TRANSPARENCY);
		var samplePlugin = new Plugin(FLY_DIRECTION.RIGHT_LEFT, FLY_TYPE.STRAINGT, 10, ['img/birthdate/cake-1.png', 'img/birthdate/cake-2.png', 'img/birthdate/cake-3.png']);
		var sampleFrame = new Frame(20, sampleBackGround, samplePlugin, sampleTexts);
		var sampleFrames = [sampleFrame];
		DB.card = new Card(sampleFrames, null, null);
	}
};