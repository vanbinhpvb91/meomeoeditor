<?php
	include 'ttfInfo.class.php';
	$fontFiles = scandir('../../../fonts');
	$realpath = realpath('../../../fonts');

	echo '<select>';
	foreach ($fontFiles as $fontFile) {
		if (strpos($fontFile, '.ttf') !== false) {
			$ttfInfo = new ttfInfo;
			$ttfInfo->setFontFile($realpath.'\\'.$fontFile);
			echo '<option value="'.$fontFile.'">'.$ttfInfo->getFontFamily().'</option>';
		}
	}
	echo '</select>';
?>