'use strict';
$( document ).ready(init);

function init() {
    $('#searchform').keyup(searchCall);
    $(document).on('click', '#delete-contact', removeContact);
    $(document).on('click', '#save-new', addContact);
    $('div.results').on('click', '.name', sortListName);
    loadFromLocal(true);
}

var contactsArray = [];
var $hideNoResultDiv = [];
var sortToggle1 = false;
var sortToggle2 = false;
var sortToggle3 = false;
var sortToggle4 = false;
var sortToggle5 = false;
var sortToggle6 = false;



//LOCAL STORAGE
function loadFromLocal(reinit){
  if(!localStorage.contacts){
    localStorage.contacts = "[]";
  }
  if(reinit === true){
    contactsArray = JSON.parse(localStorage.contacts);
  }
  return JSON.parse(localStorage.contacts);
}


function searchCall(formdata) {
  formdata.preventDefault();
  var searchString = ($('#searchtext').val()).toLowerCase();
  var foundResults = [];

    for (var i = 0; i < contactsArray.length; i++) {
          var namesearch = (contactsArray[i].firstname).toLowerCase();
          var searchAllText = (contactsArray[i].firstname+" "+contactsArray[i].lastname+" "+contactsArray[i].company+" "+contactsArray[i].email+" "+contactsArray[i].phone+" "+contactsArray[i].address).toLowerCase();

          if (searchAllText.indexOf(searchString) > -1 && searchString !== "") {
              foundResults.push(i);
            }
    }

    if (foundResults.length > 0){
      $('div [data="noresults"]').attr("id", "showon-noresult");
    }
    else {
      $('.results').remove();
      $('#showon-noresult').removeAttr('id');
    }

  showResults(foundResults);
}


function removeContact(incomming){
  var nameToDelete = $(this).closest('.results').find('.name').text();

  for (var i = 0; i < contactsArray.length; i++) {
    var namesearch = (contactsArray[i].firstname+" "+contactsArray[i].lastname);
      if (namesearch == nameToDelete) {
          contactsArray.splice(i, 1);
        }
  }
  localStorage.setItem("contacts", "[]");
  localStorage.setItem("contacts", JSON.stringify(contactsArray));
  $(this).closest('div.results').remove();
}


function showResults(arrtoshow){

  var $newDOMresults = [];
  for (var i = 0; i < arrtoshow.length; i++) {
    var $newResult = $('#template').clone().removeAttr('id').addClass('results fadein');
    $newResult.find('div.name').text(contactsArray[i].firstname+" "+contactsArray[i].lastname);
    $newResult.find('#photo').attr('src', contactsArray[i].image);
    $newResult.find('.company').text(contactsArray[i].company);
    $newResult.find('.email').text(contactsArray[i].email);
    $newResult.find('.phone').text(contactsArray[i].phone);
    $newResult.find('.address').text(contactsArray[i].address);
    $newResult.find('.group').text(contactsArray[i].group);
    $newResult.on('click', '.name', sortListName);
    $newResult.on('click', '.company', sortListCompany);
    $newResult.on('click', '.email-addy', sortListEmail);
    $newResult.on('click', '.phone', sortListPhone);
    $newResult.on('click', '.address', sortListAddress);
    $newResult.on('click', '.group', sortListGroup);

    $newDOMresults.push($newResult);
  }
  // $('div.results').on('click', '.name', sortListName);
  $('div[data="filter"]').removeAttr('id');
  $('div[data="filter"]').addClass('fadein');
  $('.results').remove();
  $('#list-container').append($newDOMresults);
}


function addContact(newcontact) {
    var newContactOb = new Object();
    newContactOb.firstname = $(this).closest('#newcontact').find('#firstname').val();
    newContactOb.lastname = $(this).closest('#newcontact').find('#lastname').val();
    newContactOb.company = $(this).closest('#newcontact').find('#company').val();
    newContactOb.email = $(this).closest('#newcontact').find('#email').val();
    newContactOb.phone = $(this).closest('#newcontact').find('#phone').val();
    newContactOb.address = $(this).closest('#newcontact').find('#address').val();
    newContactOb.group = $(this).closest('#newcontact').find('#group').val();
    newContactOb.image = ("person.jpg");
    contactsArray.unshift(newContactOb);
    localStorage.setItem("contacts", JSON.stringify(contactsArray));
    showResults(contactsArray);
    $('#newcontactform').trigger("reset");
    $('div[data="noresults"]').attr('id', 'showon-noresult');
  }


function sortListName() {
  if (sortToggle1 === false){
    contactsArray = _.sortBy(contactsArray, ['firstname']);
    sortToggle1 = true;
    $('div[data="filter"] p').text('sort by Name A-Z');
  }
  else {
    contactsArray = _.reverse(contactsArray, ['firstname']);
    sortToggle1 = false;
    $('div[data="filter"] p').text('Name Z-A');
  }
  showResults(contactsArray);
}

function sortListCompany() {
  if (sortToggle2 === false){
    contactsArray = _.sortBy(contactsArray, ['company']);
    sortToggle2 = true;
    $('div[data="filter"] p').text('Co. A-Z');
  }
  else {
    contactsArray = _.reverse(contactsArray, ['company']);
    sortToggle2 = false;
    $('div[data="filter"] p').text('Co. Z-A');
  }
  showResults(contactsArray);
}

function sortListEmail() {
  if (sortToggle3 === false){
    contactsArray = _.sortBy(contactsArray, ['email']);
    sortToggle3 = true;
    $('div[data="filter"] p').text('email A-Z');
  }
  else {
    contactsArray = _.reverse(contactsArray, ['email']);
    sortToggle3 = false;
    $('div[data="filter"] p').text('email Z-A');
  }
  showResults(contactsArray);
}

function sortListPhone() {
  if (sortToggle4 === false){
    contactsArray = _.sortBy(contactsArray, ['phone']);
    sortToggle4 = true;
    $('div[data="filter"] p').text('phone A-Z');
  }
  else {
    contactsArray = _.reverse(contactsArray, ['phone']);
    sortToggle4 = false;
    $('div[data="filter"] p').text('phone Z-A');
  }
  showResults(contactsArray);
}

function sortListAddress() {
  if (sortToggle5 === false){
    contactsArray = _.sortBy(contactsArray, ['address']);
    sortToggle5 = true;
    $('div[data="filter"] p').text('address A-Z');
  }
  else {
    contactsArray = _.reverse(contactsArray, ['address']);
    sortToggle5 = false;
    $('div[data="filter"] p').text('address Z-A');
  }
  showResults(contactsArray);
}


function sortListGroup() {
  if (sortToggle6 === false){
    contactsArray = _.sortBy(contactsArray, ['group']);
    sortToggle6 = true;
  }
  else {
    contactsArray = _.reverse(contactsArray, ['group']);
    sortToggle6 = false;
  }
  showResults(contactsArray);
}
