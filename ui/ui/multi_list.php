<label><?php echo $prop->name?></label>
<?php
	foreach ($prop->listValue as $value){
		echo "<input type=\"checkbox\" cssname=\"".$css->name."\" propname=\"".$prop->name."\" value=\"".$value."\"/>".$value;
	}
?>