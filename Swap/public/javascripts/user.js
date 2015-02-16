﻿
var marketTable = $("table#marketTable");
$(document).ready(function () {
   marketTable.dataTable({  //WE MIGHT HAVE TO USE MDATA WHEN DOING SERVER SIDE PROCESSING
      "aaData" : [["Happy's", "4/4/23", "4 pm", "5", "John","Controls"],   //SHOULD NUMBER OF GUESTS BE A NUMBER OR STRING
                  ["Lucky's", "2/12/23", "6 am", "1", "ImComing","Controls"],
                  ["FeelGoodHere", "12/7/23", "1 am", "10", "Not Sketch","Controls"],
                  ["FeelBetterthanAbove", "11/6/22", "11 pm", "3", "ImNotSketch","Controls"],
                  ["Adventures of Nugget in a Biscuit", "2/1/23", "10 pm", "3", "AchmeddaBeast","Controls"]],
      "aoColumnDefs" : [
         {
            "bSortable" : false,
            "aTargets" : ["controls-col"],
            "mRender" : function (val, type, fullRow) {
               return getHtml(btnSave[0]) + getHtml(btnDelete[0]);  
               }
         },
         {
            "sWidth" : "20%",
            "bSortable" : false,
            "aTargets" : ["name-col"]
         },
         {
            "sWidth" : "20%",
            "aTargets" : ["res-col"]
         },
         {
            "sWidth" : "10%",
            "aTargets" : ["guests-col"]
         }
      ]
  });

   $("body").click(ifBodyClicked);   
});

//delete later
var state = { isNewBeingCreated : false };
function change() {
   var opt = $("#selectID option:selected");
   alert(opt.attr("value"));
}
function makeNewRes() {
   //$("#table_id tbody").prepend('<tr role="row" class="odd">      <td class="sorting_1"></td>      <td contenteditable="true">&nbsp;</td>      <td></td>      <td></td>      <td></td>      <td></td>     </tr>');
   
   if (!state.isNewBeingCreated) {
      var tr = $('<tr id="#newItem" role="row" class="odd">      <td class="sorting_1"></td>      <td contenteditable="true">&nbsp;</td>      <td></td>      <td></td>      <td></td>      <td></td>     </tr>');
      tr.click(ifRowClicked);
      tr.addClass("newRes");
      var arry = tr.children();
      for (var i = 0; i < arry.length; i++) {
         var d = $(arry[i]);
         d.attr("contentEditable", true);
         d.addClass("newCellRes");
      }
      $("table#marketTable tbody").prepend(tr);
      state.isNewBeingCreated = true;
        
   }
}
var ifRowClicked = function (e) {
   e.stopPropagation();
}
var ifBodyClicked = function () {
   var toPost = $(".newRes");
   var toEdit = $(".editedRes");
   if (toPost.length > 0) {
      $.post("/createReservation", function (data) {
         //if(data is not bad)
         //alert(data);
         state.isNewBeingCreated = true;
      });
   } else if (toEdit.length > 0) {
           // do stuff
           //state of edited row should be turned to false
   }
      
}
//delete later

   




function getHtml(obj) {
   var jqObj = $(obj).clone();
   return $("<div> </div>").append(jqObj).html();
}
//create buttons
var btnSave = $("#save-btn").detach().removeAttr("hidden");
var btnDelete = $("#delete-btn").detach().removeAttr("hidden");


