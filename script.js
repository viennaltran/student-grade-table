/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */ 
// create modal

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
      $('body').on('click', '#updateModal', function(event) {
        if ($(event.target).attr('id') === 'updateModal') {
              handleUpdateModal();
        }
  });
  $('body').on('click', '#deleteModal', function(event) {
        if ($(event.target).attr('id') === 'deleteModal') {
              handleUpdateModal();
        }
  });
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
      // $("#serverButton").click(getStudentArray);
      
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
      student.course=$("#course").val();
      student.grade=$("#studentGrade").val();
      createStudentAjax(student)
      // student_array.push(student);

      // updateStudentList(student_array);
      // clearAddStudentFormInputs();
      
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
     
      $("#studentName").val("");
      $("#course").val("");
      $("#studentGrade").val("");

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
            click:function (){
                  console.log("id", id)
                  deleteStudentAjax(id);
                  // $(newTR).remove();
                  // var index=student_array.indexOf(studentObj);
                  // student_array.splice(index,1);
                  
            }
            

      });
      var operation=$("<td>").append(deleteButton);
      var newTR=$("<tr>").addClass("delete")


      var updateButton=$("<button>",{
        class: 'btn btn-success',
        id:"updateButton",
        text:"Update",
        studentID:id,
        'data-toggle': 'modal',
        'data-target': '#updateModal',
        click:function (student){
              console.log("id", id);
              handleUpdateModal();
              handleEditClick(student);

            //   updateStudentAjax(id);
              // $(newTR).remove();
              // var index=student_array.indexOf(studentObj);
              // student_array.splice(index,1);
              
        }
        

  });
  var operation=$("<td>").append(deleteButton,updateButton);
  var newTR=$("<tr>").addClass("delete","update");

      var newData=$(newTR).append(name, course, grade, operation);
      
      $("tbody").append(newData);

}

function handleUpdateModal(){
    $(".container").removeClass("sgt-main-blur");
      update_student_id = null;
      resetErrors();
}

function resetErrors(){
    $('.error-name').text('');
    $('.error-course').text('');
    $('.error-grade').text('');
    $('.error-updateName').text('');
    $('.error-updateCourse').text('');
    $('.error-updateGrade').text('');
}

function handleEditClick( student ){
    // $("#updateModal").modal({backdrop: "static"});
    $(".container").addClass("sgt-main-blur");
    $("#update-modal-name").text(`${student.name}`);
    $('#updateName').val(student.name);
    $('#updateCourse').val(student.course);
    $('#updateGrade').val(student.grade);
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
      

function deleteStudentAjax(studentID){
      console.log('studentID:',studentID);
      var the_data={
            action:'delete',
            id:studentID
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

// function updateStudentAjax(studentID){
//     console.log('studentID:',studentID);
//     var the_data={
//         action:'update',
//         id:studentID,
//         name: student.name,
//         course: student.course,
//         grade:student.grade
// }
// $.ajax({
//     data:the_data,
//     dataType:'json',
//     method:'post',
//     url:'api/access.php',
//     success: function (response){
//           getDataFromServer();
//           console.log(response);
//     },
//     error: function (err) {
//           console.log(err);

//     }
    
// });
// }


  
// server dictates/control the information
// this is still front-end (ajax) calling backend