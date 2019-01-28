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
 * itemArray - global array to hold item objects
 * @type {Array}
 * example of itemArray after input: 
 * itemArray = [
 *  { place:"Japan", amountSpent: "4.00", expenseCategory: "Food", description:"Takoyaki", id: "1", transactionDate: "2019-1-27" },
 *  { place:"Santa Barbara", amountSpent: "9.00", expenseCategory: "Goods", id: "2", description: "Dress", transactionDate: "2019-2-14" }
 * ];
 * today - global string to hold today date, month, year, etc.
 * @type {String}
 * dd - global string to hold today date of the month
 * @type {String}
 * mm - global string to hold today month
 * @type {String}
 * yyyy - global string to hold current year
 * @type {String}
 * todayDate - global string to hold today date in yyyy-mm-dd format
 * @type {String}
 * categories - global array to hold options for expense category
 * @type {Array}
 */
var itemArray = [];
var today = null;
var dd = null;
var mm = null;
var monthInText = '';
var yyyy = null;
var todayDate = getTodayDate();
var categories = ['Food','Souvenirs','Good','Accomodation','Transportation','Activity', 'Other']

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();
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
    
}