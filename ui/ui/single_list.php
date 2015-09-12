<label><?php echo $prop->name?></label>
<select cssname="<?php echo $css->name ?>" propname="<?php echo $prop->name ?>">
	<?php 
		foreach ($prop->listValue as $value){
			echo "<option value=\"".$value."\">".$value."</option>";
		}
	?>
</select>