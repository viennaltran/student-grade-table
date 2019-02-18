<?php

if(empty ($LOCAL_ACCESS)){
    die('direct access not allowed');
}

$name = $_POST['name'];
$grade = $_POST['grade'];
$course = $_POST['course'];
$output = [
    'success' => false,
    'errors' => [],

];

$query = "INSERT INTO `students` SET
        `name`='$name',
        `grade`='$grade',
        `course`='$course'";

$result = mysqli_query($conn,$query);

if(!empty($result)){
    if(mysqli_affected_rows($conn)){
        $output['success']=true;
        $output['id'] = mysqli_insert_id($conn);
    } else {
        $output['errors'][] = 'Unable to insert data';
    }
} else {
    $output['errors'][]='invalid query';
}

// $json_output = json_encode($output);
// print($json_output);

?>