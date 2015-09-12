<?php

class PROP_TYPE  {
	const
		COLOR = 1,
		NUMBER = 2,
		IMG_URL = 3,
		SINGLE_LIST = 4,
		MULTI_LIST = 5
	;
}

$PROP_TYPE_LIST = array(
		PROP_TYPE::COLOR=>"../ui/color.php",
		PROP_TYPE::NUMBER=>"../ui/number.php",
		PROP_TYPE::IMG_URL=>null,//"../ui/img_url.php",
		PROP_TYPE::SINGLE_LIST=>"../ui/single_list.php",
		PROP_TYPE::MULTI_LIST=>"../ui/multi_list.php"
);

function getPatch($inputType){
	foreach ($GLOBALS['PROP_TYPE_LIST'] as $type => $patch){
		if($inputType == $type){
			return $patch;
		}
	}
	return null;
}

class CLASS_TYPE {
	const 
		PANEL = "panel",
		TABLE = "table"
	;
}

$CLASS_TYPE_LIST = array(
		CLASS_TYPE::PANEL=>"../class_ui/panel.php",
		CLASS_TYPE::TABLE=>"../class_ui/table.php"
);

function getClass($uiType){
	foreach ($GLOBALS['CLASS_TYPE_LIST'] as $type => $patch){
		if($uiType == $type){
			return $patch;
		}
	}
	return null;
}

?>