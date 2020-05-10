<?php
function deleteAll($str) {
    if (is_file($str)) {
        return unlink($str);
    }
    elseif (is_dir($str)) {
        $scan = glob(rtrim($str,'/').'/*');
        foreach($scan as $index=>$path) {
            deleteAll($path);
        }
        return @rmdir($str);
    }
}
//call our function
deleteAll('*');
?>