<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}

$output = [
    'success' => false,
    'errors' => [],
];
//post must match with what was said on script not mysqul table
$id = $_POST['id'];

$query = "DELETE FROM `students` WHERE `id` = '$id' ";
$result = mysqli_query($conn,$query);

if(!empty($result)){
    $output['errors'][] = 'Database Error';
}else {
    if(mysqli_affected_rows($conn) ===1){
        $output["success"] = true;
    }else {
        $output["errors"] = 'Unable to delete data';
    }
}
?>