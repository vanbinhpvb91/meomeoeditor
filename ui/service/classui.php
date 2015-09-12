<?php
	require "../base/class_html.php";
	require "../base/map_ui.php";
	
	$uiType = $_GET['uitype'];
	$i = 0;
	
	if($uiType != null){
	
		foreach ($panel as $class){
			if ($i == 0) {
				echo '<input type="hidden" id="regPattern" value='.$class.' />';
			}else{
				echo "<div cssname=\"row\">";
				$patch = getClass($uiType);
				if($patch != null){
					include $patch;
				}
				echo '</div>';
			}
			$i++;
		}
	}
?>