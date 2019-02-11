/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */ 

$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array=[];
// var gradeAverage=null;

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
      addClickHandlersToElements();
      getDataFromServer();
      

}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){

    $("#addButton").click(handleAddClicked);
    $("#cancelButton").click(handleCancelClick);
    $("#updateClick").click(function(){
      addInputValidationOnModal();
      // handleCancelClick();
    });
    $("#cancelModalButton").click(handleCancelClick);
    $("#deleteYesButton").click(function(){
        handleCancelClick();
        handleConfirmDeleteClick();
    })
    $("#deleteNoButton").click(handleCancelClick);

    $("input").on('click', function() {
      $('#name-error').addClass('hide'); 
      $('#course-error').addClass('hide');
      $('#grade-error').addClass('hide');
      $('#name-modal-error').addClass('hide'); 
      $('#course-modal-error').addClass('hide');
      $('#grade-modal-error').addClass('hide');
    });

//     $("body").click(removeErrorMessages);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(event){
    addStudent();
   
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
      clearAddStudentFormInputs();

      $('#name-error').addClass('hide');
      $('#course-error').addClass('hide');
      $('#grade-error').addClass('hide');

      $('#name-modal-error').addClass('hide'); 
      $('#course-modal-error').addClass('hide');
      $('#grade-modal-error').addClass('hide');
        

      $('#updateModal').modal('hide');
      $('#deleteModal').modal('hide');
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){

      student={};
      student.name=$("#studentName").val();
      student.course=$("#studentCourse").val();
      student.grade=$("#studentGrade").val();
      student_array.push(student);

      addInputValidation(student);
      
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
     
      $("#studentName").val("");
      $("#studentCourse").val("");
      $("#studentGrade").val("");
      $("#newStudentName").val("");
      $("#newCourse").val("");
      $("#newGrade").val("");

}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj){
      var name=$("<td>").text(studentObj.name);
      var course=$("<td>").text(studentObj.course);
      var grade=$("<td>").text(studentObj.grade);
      var id=studentObj.id;
      console.log("id", id)
      var deleteButton=$("<button>",{
            class: 'btn btn-danger',
            id:"deleteButton",
            text:"Delete",
            studentID:id,
            'data-toggle': 'modal',
            'data-target': '#deleteModal',
            click:function (){
                  console.log("delete id", id)
                //   deleteStudentAjax(id);
                  handleConfirmDelete(studentObj);
            }
            

      });
      var operation=$("<td>").append(deleteButton);
      var newTR=$("<tr>").addClass("delete")


    var updateButton=$("<button>",{
        class: 'btn btn-success',
        id:"updateButton",
        text:"Edit",
        studentID:id,
        'data-toggle': 'modal',
        'data-target': '#updateModal',
        click:function (){
              console.log("update id", id);
              //scope: passing the same object
              handleUpdateModal(studentObj);
              
        }
        

    });
  var operation=$("<td>").append(deleteButton,updateButton);
  var newTR=$("<tr>").addClass("delete","update");

      var newData=$(newTR).append(name, course, grade, operation);
      
      $("tbody").append(newData);

}

function handleConfirmDelete(studentObj){
    delete_student_id= studentObj.id;

}

function handleConfirmDeleteClick(studentObj){
    deleteStudentAjax(studentObj);
}


function handleUpdateModal(studentObj){
      update_student_id = studentObj.id;
    $('#newStudentName').val(studentObj.name);
    $('#newCourse').val(studentObj.course);
    $('#newGrade').val(studentObj.grade);      
}

function removeErrorMessages(){
       $('#name-error').addClass('hide'); 
      $('#course-error').addClass('hide');
      $('#grade-error').addClass('hide');
      $('#name-modal-error').addClass('hide'); 
      $('#course-modal-error').addClass('hide');
      $('#grade-modal-error').addClass('hide');
}
/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(studentArray){

      $("tbody").text(" ");
      for (var i = 0; i < studentArray.length; i++) {
            console.log(studentArray[i]);
            var student = studentArray[i];
            renderStudentOnDom(student);
        }
      // calculateGradeAverage(studentArray);
                                    //71
      renderGradeAverage(calculateGradeAverage(studentArray));

}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(studentArray){
      var total=0;
      var gradeAverage=0;
      for(i=0;i<studentArray.length;i++){ 
          total= parseFloat(total)+parseFloat(studentArray[i].grade);
          gradeAverage=Math.ceil(total/studentArray.length);
      }

      return gradeAverage
           
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(totalAverage){
      $(".avgGrade").text(totalAverage);
}

//Regex Test to check the inputs

function addInputValidation(){
      
      var nameRegex = new RegExp("^[A-Za-z _-]{2,25}$"); 
      var courseRegex = new RegExp("^[A-Za-z0-9 _-]{2,100}$");
      var gradeRegex = new RegExp("^[0-9][0-9]?$|^100$");

      var nameInput = $("#studentName").val();
      var courseInput =$("#studentCourse").val();
      var gradeInput = $("#studentGrade").val();
      var inputField = nameInput,courseInput,gradeInput;

      if(inputField.length>0 && nameRegex.test(nameInput) && courseRegex.test(courseInput) && gradeRegex.test(gradeInput)){
            createStudentAjax(student);
                  
      }else if(inputField.length>=0){

            if (!nameRegex.test(nameInput)){
                  $('#name-error').removeClass('hide');
                  
            }else{
                  $('#name-error').addClass('hide');     
            }
            if(!courseRegex.test(courseInput)){
                  $('#course-error').removeClass('hide');
            }else{
                  $('#course-error').addClass('hide');    
            } 
            if(!gradeRegex.test(gradeInput)){
                  $('#grade-error').removeClass('hide');
            }else{
                  $('#grade-error').addClass('hide');
            }
      }else {
            console.log("fill in the information");
            $('#name-error').removeClass('hide');
            $('#course-error').removeClass('hide');
            $('#grade-error').removeClass('hide');
            
      }
      
}

function addInputValidationOnModal(){

      var nameRegex = new RegExp("^[A-Za-z _-]{2,25}$"); 
      var courseRegex = new RegExp("^[A-Za-z0-9 _-]{2,100}$")
      var gradeRegex = new RegExp("^[0-9][0-9]?$|^100$");

      var modalNameInput = $("#newStudentName").val();
      var modalCourseInput=$("#newCourse").val();
      var modalGradeInput = $("#newGrade").val();
      var modalInputField = modalNameInput,modalCourseInput,modalGradeInput;

      if(modalInputField.length>0 && nameRegex.test(modalNameInput) && courseRegex.test(modalCourseInput) && gradeRegex.test(modalGradeInput)){

            console.log("going to update this");
            updateStudentAjax();
            $('#updateModal').modal('hide');
                  
      }else if(modalInputField.length>=0){

            console.log("something is missing");
            if (!nameRegex.test(modalNameInput)){
                  $('#name-modal-error').removeClass('hide');
            }
            if(!courseRegex.test(modalCourseInput)){
                  $('#course-modal-error').removeClass('hide');
            }
            if(!gradeRegex.test(modalGradeInput)){
                  $('#grade-modal-error').removeClass('hide');
            }

      }else{
            console.log("fill in the information");
            $('#name-modal-error').removeClass('hide');
            $('#course-modal-error').removeClass('hide');
            $('#grade-modal-error').removeClass('hide');
            
      }
      
}




function getDataFromServer(){
var the_data={
    action: 'read'
}

$.ajax({
      data:the_data,
      dataType:'json',
      method:'post',
      url:'api/access.php',
      success: function (response){
            console.log(response);   
            var server_array=response['data'];
            updateStudentList(server_array);        
      },
      error: function (err) {
            console.log(err);

      }

}); 
}


function createStudentAjax(student){
      var the_data={
            action: 'create',
            name: student.name,
            course: student.course,
            grade:student.grade
}
      
      $.ajax({
            data:the_data,
            dataType:'json',
            method:'post',
            url:'api/access.php',
            success: function (response){
                  student.id = response.new_id;
                  getDataFromServer();
                  clearAddStudentFormInputs();
                  console.log(response);
            },
            error: function (err) {
                  console.log(err);
            }
      });
      } 
      

function deleteStudentAjax(){
    var the_data={
        action:'delete',
        id:delete_student_id
}
    $.ajax({
        data:the_data,
        dataType:'json',
        method:'post',
        url:'api/access.php',
        success: function (response){
                getDataFromServer();
                console.log(response);
        },
        error: function (err) {
                console.log(err);
        }
        
    });
}

function updateStudentAjax(){

    var name = $('#newStudentName').val();
    var grade = $('#newGrade').val();
    var course = $('#newCourse').val();

    var the_data={
        action:'update',
        id:update_student_id,
        name: name,
        course: course,
        grade: grade
}
$.ajax({
    data:the_data,
    dataType:'json',
    method:'post',
    url:'api/access.php',
    success: function (response){
          getDataFromServer();
          console.log(response);
          return(response);
    },
    error: function (err) {
          console.log("error message:",err);

    }
    
});
}



  