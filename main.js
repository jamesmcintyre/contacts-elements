'use strict';
$( document ).ready(init);

function init() {
    loadFromLocal(true);
    $('#searchtext').keyup(searchCall);


    // initList();
    // $('.listclass').on('dblclick', 'li', removeName);
}

var contactsArray = [];

//LOCAL STORAGE


function loadFromLocal(reinit){
  if(!localStorage.contacts){
    localStorage.contacts = "[]";
  }
  if(reinit === true){
    contactsArray = JSON.parse(localStorage.contacts);
    console.log(contactsArray);
  }
  return JSON.parse(localStorage.contacts);
}

function saveToLocal(newName){
  var namesArray = JSON.parse(localStorage.names);
  namesArray.push(newName);
  localStorage.setItem("names", JSON.stringify(namesArray));
}

function deleteFromLocal(index) {
  var namesArray = JSON.parse(localStorage.names);
  namesArray.splice(index, 1);
  localStorage.setItem("names", JSON.stringify(namesArray));
}











//DOM INTERACTION


function searchCall(formdata) {
  formdata.preventDefault();
  //console.log($('#searchtext').val());



}



function addNewName (formdata){
  formdata.preventDefault();
  var nameIncomming = $('#namein').val();
  saveToLocal(nameIncomming);
  $('ul.listclass').append($('<li>').text(nameIncomming));
  $('#namein').val('');
}

function removeName (){
  var index = $(this).index();
  deleteFromLocal(index);
  $(this).remove();
}

function initList() {
  var namesArray = loadFromLocal();
  var $namesToAppend = namesArray.map(function(name) {
    return $('<li>').text(name);
  })
  var $newElement = $('<ul>').addClass('listclass').append($namesToAppend);
  $('.listarea').append($newElement);

}

// function updateList() {
//   var $nameList = $('#namelist');
//   $nameList.empty();
//   var $names = names.map(function(name) {
//     return $('<li>').text(name);
//   });
//   $nameList.append($names);
// }
