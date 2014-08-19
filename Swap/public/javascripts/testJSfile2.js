$(document).ready(function () {
    
    var entriess = !{JSON.stringify(entries)};  
    var list = $("ol");
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var li = $("<li></li>");
        var nest = $("<ul></ul>");
        nest.append("<li>email: " + entry.email._ + "</li>")
            .append("<li>name: " + entry.name._ + "</li>");
        li.append(nest);
        list.append(li);
            
    }
    alert(entries.length);

   
});



/*
 var list = $("ol");
    for(var i = 0;i<entries.length;i++){
        var entry = entries[i];
        var li = $("<li></li>");
        var nest = $("<ul></ul>");
        nest.append("<li>email: " + entry.email._ + "</li>")
            .append("<li>name: " + entry.name._ + "</li>"); 
        li.append(nest);
        list.append(li);        
            
    }
alert(entries.length);
*/

/*  var entry = entries[i];
            var li = $("<li></li>");
            var nest = $("<ul></ul>");
            nest.append("<li>email: " + entry.email._ + "</li>")
                .append("<li>name: " + entry.name._ + "</li>");
            li.append(nest);
            list.append(li);    */