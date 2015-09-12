<?php

abstract class ElementHTML {
	
	public $elementID;
	public $listCss;
	public $parent;
	public $preElement;
	public $content;
	public $classList;
	
	public function __construct($elementID){
		$this->elementID = $elementID;
		$this->initValues();
	}
	
	public abstract function initValues();
}

class DivElementHTML extends ElementHTML {
	
	public $borderCss;
	public $fontCss;
	public $backGroundCss;
	
	public function __construct($elementID){
		parent::__construct($elementID);
	}
	
	public function initValues(){
		$this->borderCss = new BorderCss();
		$this->fontCss = new FontFamilyCss();
		$this->backGroundCss = new BackgroundCss();
		$this->listCss = array($this->borderCss, $this->fontCss, $this->backGroundCss);
	}
	
}

?>