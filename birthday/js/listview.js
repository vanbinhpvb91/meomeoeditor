/**
 * 
 */
ListView = function(listId, listItemName, onClick){
	this.listId = listId;
	this.listItemName = listItemName;
	this.onClick = onClick;
	this.loadView = function(){
		$(this.listId + " " + this.listItemName).click(function(){
			this.onClick(this);
		});
	};
}