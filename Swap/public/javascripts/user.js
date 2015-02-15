
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
         "aTargets" : [-1],
         "mRender" : function (val, type, fullRow) {
            return getFullHtml(btnSave[0]) + getFullHtml(btnDelete[0])  ;  
         }
       }]
      }     
   );

   
   $("body").click(ifBodyClicked);   
});

   




function getFullHtml(obj) {
   var jqObj = $(obj).clone();
   return $("<div> </div>").append(jqObj).html();
}
//create buttons
var btnSave = $("#save-btn").detach().removeAttr("hidden");
var btnDelete = $("#delete-btn").detach().removeAttr("hidden");


