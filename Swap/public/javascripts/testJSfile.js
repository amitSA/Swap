$(document).ready(function () {
    $("li").click(function () {
        $("li").removeClass("active");
        $(this).addClass("active");
        var id = $(this).find("a").attr("href");
        

        

        id = id.substring(1);
        $("div[class=tab-content]").find("div").removeClass("active");
        $("div[id="+id+"]").addClass("active");
    });
});

/*alert(id);
$("div[id=login]").removeClass("active");
$("div[id=signup]").addClass("active");*/