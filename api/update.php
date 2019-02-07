<?php
if(empty ($LOCAL_ACCESS)){
    die('direct access not allowed');
}

$output = [
    'success' => false,
    'errors' => [],
];

$id = $_POST['id']; 
$name = $_POST['name'];
$course = $_POST['course'];
$grade = $_POST['grade'];

$query = "UPDATE `students` SET `name`='$name',`course`='$course',`grade`='$grade' WHERE id = $id";
$result = mysqli_query($conn,$query);

if ($result){
    $output['success'] = true;
} else {
    $output['message'] = 'Error updating student info';
}


?>