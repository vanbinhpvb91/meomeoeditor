/**
 * 
 */

Editor = {
	selectElement : null,
	loadActive : function() {
		$(".active_editor").click(
			function() {
				if(Editor.selectElement != this){
					Editor.selectElement = this;
					Editor.loadUI(this);
				}
			}
		);
	},
	
	loadUI : function(element) {
		var requestElement = $(element).attr("uitype");
		var requester = $.ajax({
			url : "http://localhost/meomeow/ui/service/cssui.php?uitype="+requestElement,
			type : "GET"
		});
		
		requester.done(
			function (data){
				$("#ui_css").html(data);
				Editor.loadInput();
			}
		);
	},
	
	loadInput : function(){
		$("#ui_css input, #ui_css select").change(
			function(){
				Editor.changeCss(this);
			}
		);
	},
	
	changeCss : function(input){
		var cssName = $(input).attr("cssname");
		var cssValue = Editor.getCss(cssName);
		
		$(Editor.selectElement).css(cssName, cssValue);
	},
	
	getCss : function(cssName){
		var cssValue = "";
		
		$("#ui_css input, #ui_css select").each(
			function(){
				var tempCssName = $(this).attr("cssname");
				if(tempCssName == cssName){
					cssValue += " " + $(this).val();
				}
			}
		);
		
		return cssValue;
	},
	
	setSelectedValue : function(cssName){
		
	}
};