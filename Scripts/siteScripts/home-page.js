$(function () {
    $("#btn-check").click(function () {
        window.location.replace("/Rooms/");
    });
    //
    $(".feature-tab").click(function () {
        //format markup
        $(".feature-tab").removeClass("activate-tab");
        $(".tab-content").removeClass("not-display");
        //format markup
        $(this).addClass("activate-tab");
        var id = $(this).attr("id");
        switch (id) {
            case "li-services":
                $("#posts-tab").addClass("not-display");
                break;
            case "li-posts":
                $("#services-tab").addClass("not-display");
                break;
        };
    });

    var tourAlbums = {
        imgs: ["/Images/tours/Tour00.jpg", "/Images/tours/Tour01.jpg", "/Images/tours/Tour02.jpg", "/Images/tours/Tour03.jpg"],
        title: ["Về miền hoang dã", "Phố núi Ban mê - Hồ Lăk", "Khám phá bản Đôn", "Phố núi Ban mê"],
        link: ["/Shared/tours/VeMienHoangDa.cshtml", "/Shared/tours/PhoNuiBanMe.cshtml", "/Shared/tours/KhamPhaBanDon.cshtml", "/Shared/tours/PhoNuiBanMe.cshtml"]
    };
    var index = 1;
    setInterval(function () {
        touralbum();
        index++;
    }, 3000);

    function touralbum() {
        if (index < 0) {
            index = 3;
        } else if (index > 3) {
            index = 0;
        };
        $("#tour-img").attr("src", tourAlbums.imgs[index]);
        $("#tour-anchor").attr("href", tourAlbums.link[index]);
        $("#tour-anchor").text(tourAlbums.title[index]);
    };
    $(".nav-tour").click(function (e) {
        e.preventDefault();
        switch ($(this).attr("id")) {
            case "prev-tour":
                index--;
                break;
            case "next-tour":
                index++;
                break;
        };
        //console.log(index);
        touralbum();
    });
});