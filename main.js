'use strict';
$( document ).ready(init);

function init() {
    $('#searchtext').keyup(addNewName);


    initList();
    $('.listclass').on('dblclick', 'li', removeName);
}




//DOM INTERACTION

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




//LOCAL STORE

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

function loadFromLocal(){
  if(!localStorage.names){
    localStorage.names = "[]";
  }
  return JSON.parse(localStorage.names);
}
