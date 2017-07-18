<?php

	define('JFDI', true);
	
	$INC_DIR = 'inc/';
	require_once($INC_DIR.'bootstrap.php'); 
	require_once "pages/comic_util.php";
	
	if (isset($_REQUEST['nav'])){ // return file for ajax requests
	
		$chapters = Array();
	
		$chapters = get_suitable_chapter_list();
		$nchapters = count($chapters);
		$is_std = has_student_access();
		$is_staff = has_staff_access();
	
		if ($nchapters == 0) return null;
		if (!isset($_REQUEST['cur'])) return null;
		$current = $_REQUEST['cur'];
		$current_chapter = (int)($current / BASE);	
		$cur_chap = get_chapter_index($chapters, $current_chapter);
		if ($cur_chap < 0) return null;
		$cur_file = $current%BASE;		
		$ret = Array();
		if ($_REQUEST['nav'] == "next"){
			$ret = get_next_image($chapters, $cur_chap, $cur_file);
			if ($is_std){
				update_latest_comic( current_uid(), $current );
			}
		} else
		if ($_REQUEST['nav'] == "prev"){
			$ret = get_prev_image($chapters, $cur_chap, $cur_file);
		}
		echo json_encode($ret); // return: chapter id, image index, & actual link
	}
?>