<?php
require "../base/css_properties.php";
require "../base/element_html.php";

$uiType = $_GET['uitype'];

if($uiType != null){
	
	$element = new DivElementHTML("div");
	
	foreach ($element->listCss as $css){
		echo "<div cssname=\"".$css->name."\">";
		foreach ($css->listProperties as $prop){
			$patch = getPatch($prop->type);
			if($patch != null){
				include $patch;
			}
		}
		echo '</div>';
	}
}

?>