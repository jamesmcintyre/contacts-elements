'use strict';
$( document ).ready(init);

function init() {
    $('#searchform').keyup(searchCall);
    $(document).on('click', '#delete-contact', removeContact);
    $(document).on('click', '#save-new', addContact);
    loadFromLocal(true);
}

var contactsArray = [];
var $hideNoResultDiv = [];



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

    $newDOMresults.push($newResult);
  }

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
    newContactOb.image = ("/prof0"+Math.floor(Math.random()*9)+".jpg");
    contactsArray.unshift(newContactOb);
    localStorage.setItem("contacts", JSON.stringify(contactsArray));
    showResults(contactsArray);
    $('#newcontactform').trigger("reset");
    $('div[data="noresults"]').attr('id', 'showon-noresult');
  }
