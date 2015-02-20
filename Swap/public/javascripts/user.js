﻿var marketTable = $("table#marketTable");
$(document).ready(function () {
   marketTable.dataTable({  //WE MIGHT HAVE TO USE MDATA WHEN DOING SERVER SIDE PROCESSING
      "aaData" : [["Today","Happy's", "4/4/23", "4 pm", "5", "John","Controls"],   //SHOULD NUMBER OF GUESTS BE A NUMBER OR STRING
                  ["Tomrrw","Lucky's", "2/12/23", "6 am", "1", "ImComing","Controls"],
                  ["Yestday","FeelGoodHere", "12/7/23", "1 am", "10", "Not Sketch","Controls"],
                  ["dybfore","FeelBetterthanAbove", "11/6/22", "11 pm", "3", "ImNotSketch","Controls"],
                  ["Today","Adventures of Nugget in a Biscuit", "2/1/23", "10 pm", "3", "AchmeddaBeast","Controls"]],
      "aoColumnDefs" : [
         {  "bSortable" : false,
            "aTargets" : ["controls-col"],
            "mRender" : function (val, type, fullRow) {
               return getHtml(btnSave[0]) + getHtml(btnDelete[0]);  
               }
         },{
            "sWidth" : "15%",
            "bSortable" : false,
            "aTargets" : ["name-col"],
         },{
            "sWidth" : "30%",
            "aTargets" : ["res-col"]
         },{
            "sWidth" : "7%",
            "aTargets" : ["guests-col","dt-added-col","time-col","date-col"]
         },{
            
         }
      ]
  });   
   marketTable.css({ "width" : "100%" });

   //This is for adding today's date
   var dNow = new Date();
   var dd = dNow.getDate(), mm = dNow.getMonth() + 1, yyyy = dNow.getFullYear();
   if (dd < 10)
      dd = "0" + d;
   if (mm < 10)
      mm = "0" + mm;
   $("#new-now-date").val(mm + '/' + dd + '/' + yyyy);
 
   //This is for creating multiple option elements for guests
   var select = $("select#new-guests");
   var toClone = select.children();
   for(var i = 2;i<11;i++){
      var newOpt = toClone.clone().val(i).html(i);
      select.append(newOpt);
   }

});

function newResLinkClicked() {
   $("#newResDiv").show(1000);    
}

//YOUR OPTIONS : either redraw the table now...or modify it clientside with the same data being pushed to database
function addResButtonClicked() {
   var dataToPush = {
      "postalCode" : $("#new-rest-pcode").val(),
      "restName" : $("#new-rest-name").val(), 
      "date" : $("#new-date").val(),
      "guestNum" : $("select#new-guests option:selected").val(),
      "time" : $("#new-time").val(),
      "makerEmail" : insData.email
      //"takerID" - this field is handled by route(initialized to be an empty object)
   };
  
   $.ajax({
      type: "POST",
      url: "/user/newres",
      data: dataToPush,
      success: function (data) {
         alert(data);
      }
   }).fail(function () {
      alert("Ajax post in user.js failed");
   });
   $("#newResDiv").hide(500);
   
   //defaulting values for the input and select tags
   $("div.my-inner").find("input:not(#new-now-date)").each(function (index,ele) {
      $(ele).val("");
   });
   $("select#new-guests").val("1");
}


function getHtml(obj) {
   var jqObj = $(obj).clone();
   return $("<div> </div>").append(jqObj).html();
}
//create buttons
var btnSave = $("#save-btn").detach().removeAttr("hidden");
var btnDelete = $("#delete-btn").detach().removeAttr("hidden");


