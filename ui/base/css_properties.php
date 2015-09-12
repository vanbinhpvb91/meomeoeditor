<?php

include "map_ui.php";

abstract class CssProperties {
	
	public $type;
	public $name;
	public $value;
	
	public function __construct($type, $name){
		$this->type = $type;
		$this->name = $name;
		$this->value = "";
	}
	
	public function setValue($value){
		$this->value = $value;
	}
	
	public function getValueString(){
		return $this->value;
	}
}

class ColorCssProperties extends CssProperties {
	
	public function __construct($name){
		parent::__construct(PROP_TYPE::COLOR, $name);
	}
}

class NumberCssProperties extends CssProperties {
	
	public function __construct($name){
		parent::__construct(PROP_TYPE::NUMBER, $name);
		$this->value = 0;
	}
	
	public function getValueString(){
		return $this->value . "px";
	}
	
}

class UrlCssProperties extends CssProperties {
	
	public function __construct($name){
		parent::__construct(PROP_TYPE::IMG_URL, $name);
	}
	
	public function getValueString(){
		return "url(" . $this->value . ")";
	}
}

class SingleListCssProperties extends CssProperties {
	
	public $listValue = null;
	
	public function __construct($name, $listValue){
		parent::__construct(PROP_TYPE::SINGLE_LIST, $name);
		$this->listValue = $listValue;
	}
}

class MultiListCssProperties extends CssProperties {

	public $listValue = null;
	
	public function __construct($name, $listValue){
		parent::__construct(PROP_TYPE::MULTI_LIST, $name);
		$this->listValue = $listValue;
	}
	
	public function getValueString(){
		$returnString = "";
		foreach($this->listValue as $selected){
			$returnString = $returnString . " " .$selected;
		}
		return $returnString;
	}

}

abstract class Css {
	
	public $name;
	public $listProperties;
	
	public function __construct($name){
		$this->name = $name;
		$this->initialValue();
	}
	
	public abstract function initialValue();
	
	public function getName(){
		return $this->name;
	}
	
	public function getCssString(){
		$propertiesString = '';
		
		foreach ($listProperties as $property) {
			$propertiesString = $propertiesString . " " . $property->getValueString();
		}
		$this->name . " : " + $propertiesString;
	}
}

class BorderCss extends Css {
	
	public function __construct(){
		parent::__construct("border");
	}
	
	public $styleProp;
	public $colorProp;
	public $widthProp;
	
	public function initialValue(){
		$listStyleValue = array("none","solid", "groove", "ridge", "inset", "outset", "dotted", "dashed", "double");
		$this->styleProp = new SingleListCssProperties("style",$listStyleValue);
		$this->colorProp = new ColorCssProperties("color");
		$this->widthProp = new NumberCssProperties("width");
		$this->listProperties = array($this->styleProp, $this->colorProp, $this->widthProp);
	}
}

class ColorCss extends Css {
	public function __construct(){
		parent::__construct("color");
	}
	
	public $colorProp;
	
	public function initialValue(){
		$this->colorProp = new ColorCssProperties("color");
		$this->listProperties = array($this->colorProp);
	}
	
	public function __toString(){
		return $this->name;
	}
}

class BackgroundCss extends Css {
	
	public $colorProp;
	public $urlProp;
	public $hozitalPositionList;
	public $verticalPositionList;
	
	public function __construct(){
		parent::__construct("background");
	}
	
	public function initialValue(){
		$this->urlProp = new UrlCssProperties("url");
		$this->colorProp = new ColorCssProperties("color");
		$this->verticalPositionList = new SingleListCssProperties("vertical", array("top","botton"));
		$this->hozitalPositionList = new SingleListCssProperties("hozital", array("left", "right"));
		$this->listProperties = array($this->urlProp, $this->colorProp, $this->verticalPositionList, $this->hozitalPositionList);
	}
}

class FontFamilyCss extends Css {
	
	public $fontListProp;
	
	public function __construct(){
		parent::__construct("font-family");
	}
	
	public function initialValue(){
		$this->fontListProp = new MultiListCssProperties("name", array("Times New Roman", "Times", "serif"));
		$this->listProperties = array($this->fontListProp);
	}
	
}

class FontSize extends Css {
	
	public $sizeProp;
	
	public function __construct(){
		parent::__construct("font-size");
	}
	
	public function initialValue(){
		$this->sizeProp = new NumberCssProperties("size");
		$this->listProperties = array($this->sizeProp);
	}

}

class FontWeight extends Css {
	
	public $weightProp;
	
	public function __construct() {
		parent::__construct("font-weight");
	}
	
	public function initialValue(){
		$this->weightProp = new SingleListCssProperties("weight", array("bold","nomal"));
		$this->listProperties = array($weightProp);
	}
	
}

?>