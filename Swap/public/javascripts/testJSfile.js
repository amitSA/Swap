$(document).ready(function () {
    $("li").click(function () {
        $("li").removeClass("active");
        $(this).addClass("active");
        var id = $(this).find("a").attr("href");
        
        //does the jquery function return an array
        

        id = id.substring(1);
        $("div.tab-content").find("div").removeClass("active");
        $("div#" + id).addClass("active");
    });
});

/*alert(id);
$("div[id=login]").removeClass("active");
$("div[id=signup]").addClass("active");*/