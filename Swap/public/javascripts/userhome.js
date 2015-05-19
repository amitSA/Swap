var myResTable = $("table#myResTable");
$(document).ready(function () {
   myResTable.dataTable({  //WE MIGHT HAVE TO USE MDATA WHEN DOING SERVER SIDE PROCESSING
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
   myResTable.css({ "width" : "100%" });

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
   //IMPLEMENT A WAY TO CHECK IF THESE ENTRIES ARE ATLEAST FILLED IN ANO NOT EMPTY
   var uInputs = $(".my-inner").find("input:not(#new-now-date)");
   $(".my-inner").find(".error-message").remove();
   for (var i = 0; i < uInputs.length; i++) {
      var inp = $(uInputs[i]);
      if (inp.val() === "") {
         var p = $("<p>This field must be filled in!</p>").css({ "color" : "red", "display": "inline-block" }).
         addClass("error-message");
         inp.after(p);
         return;
      }
   }
   var dataToPush = {
      "PartitionKey" : { "_" : $("#new-rest-pcode").val() },
      "RowKey" : {"_" : ""}, //handled by the route
      "restName" : {"_" : $("#new-rest-name").val()}, 
      "dateEnd" : { "_" : $("#new-end-date").val() },
      "guestNum" : {"_" : $("select#new-guests option:selected").val()},
      "time" : { "_" : $("#new-time").val() },
      "makerID" : {"_" : insData.userID},
      "takerID" : "" //WORK HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //"dateAdded" - property automatically added as the "TimeStamp"
   };
   
   $.ajax({
      type: "POST",
      url: "/user/newres",
      data: dataToPush,
      error : function (jq) {
         alert(jq.responseText);
      }
   });
   $("#newResDiv").hide(500);
   
   //defaulting values for the input and select tags
   uInputs.each(function (index,ele) {
      $(ele).val("");
   });
   $("select#new-guests").val("1");

   //adding data into Table
      //makerUserName can be pased into the jade
      //dateAdded can be an actual date object
}


function getHtml(obj) {
   var jqObj = $(obj).clone();
   return $("<div> </div>").append(jqObj).html();
}
//create buttons
var btnSave = $("#save-btn").detach().removeAttr("hidden");
var btnDelete = $("#delete-btn").detach().removeAttr("hidden");


