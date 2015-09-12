/**
 * 
 */
ClassEditor = {
	selectElement : null,
	activeClassName : ".class_editable",
	listId : "#class_contener",
	listItemName: ".classItem",
	attrValueName : "classname",
	attrSetName : "class",
	regPatternId : "#regPattern", 
	
	loadActive : function(){
		$(ClassEditor.activeClassName).click(function(){
			if(Editor.selectElement != this){
				ClassEditor.selectElement = this;
				ClassEditor.loadUI(this);
			}
		});
	},
	
	loadUI : function(){
		var requestElement = "panel";
		var requester = $.ajax({
			url : "http://localhost/meomeow/ui/service/classui.php?uitype="+requestElement,
			type : "GET"
		});
		
		requester.done(
			function (data){
				$(ClassEditor.listId).html(data);
				$(ClassEditor.listId + " " + ClassEditor.listItemName).click(function(){
					ClassEditor.changeSelected(this);
				});
				ClassEditor.setSelectedValue();
			}
		);
	},
	
	changeSelected :function(divElement){
		$(ClassEditor.listId + " " + ClassEditor.listItemName).css("opacity", "1");
		$(divElement).css("opacity", "0.4");
		curClass = ClassEditor.getCurrentClass(divElement);
		newClass = $(divElement).attr(ClassEditor.attrValueName);
		$(ClassEditor.selectElement).removeClass(curClass);
		$(ClassEditor.selectElement).addClass(newClass);
	},
	
	setSelectedValue: function(){
		var currValue = ClassEditor.getCurrentClass(ClassEditor.selectElement);
		$(ClassEditor.listId + " " + ClassEditor.listItemName).each(function(){
			if($(this).attr(ClassEditor.attrValueName) == currValue){
				$(this).css("opacity", "0.4");
			}
		});
	},
	
	getCurrentClass : function(){
		var regPattern = $(ClassEditor.regPatternId).val();
		var patt = new RegExp(regPattern);
		var classList =$(ClassEditor.selectElement).attr('class').split(/\s+/);
		for(var i = 0; i < classList.length; i++){
			if(patt.test(classList[i])){
				return classList[i];
			}
		}
		return null;
	}
};