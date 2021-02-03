var shanmugaJs = {
    pageInit: function () {
        $(".navbar-toggler").off().on("click", function () {
            $("#navbarSupportedContent").addClass("menu-expand show");
        });
        $(".close-icon span").off().on("click", function () {
            $("#navbarSupportedContent").removeClass("menu-expand show");
        });

        if ($(window).width() <= 991) {
            $(".collapse:not(.show)").css("left", -$(window).width());
            $("ul.navbar-nav").height($(window).height() - ($(".logo-block").height() + $("nav").height()));
        }
        else {
            $(".collapse:not(.show)").css("left", "0px");
            $("ul.navbar-nav").removeAttr("style");
        }

        $(window).resize(function () {
            shanmugaJs.pageInit();
        });

        shanmugaJs.activeMenu();
    },

    activeMenu: function () {
        let pathName = location.pathname.split("/");
        pathName = pathName[pathName.length - 1].split(".")[0];

        $("#navbarSupportedContent li").removeClass("active");

        if (pathName != "" && pathName != "index")
            $("#" + pathName).addClass("active");
        else if (pathName == "" || pathName == "index")
            $("#home").addClass("active");
    },

    academicsMenuActive: function () {
        $("#academics").addClass("active");
    },


    placementImages: function () {
        let temp = '', count = 1, imgcount = 1;

        $.getJSON("js/placement.json", function (data) {
            $.each(data, function (key, val) {
                temp += `<div key=` + key + ` class="panel-group` + (count == 1 ? ' active' : '') + `">
                            <div class="card-header" id="heading`+ count + `"  data-toggle="collapse" data-target="#collapse` + count + `" aria-controls="collapse` + count + `">
                                <div class="right-heading">`+ val.year + `</div>
                                <span class="fas caret-awesome"></span>
                            </div>
                
                            <div id="collapse`+ count + `" class="panel-collapse collapse` + (count == 1 ? ' show' : '') + `" aria-labelledby="heading` + count + `" data-parent="#placement-images">
                                <div class="card-body row">`;
                for (let i = 0; i < val.name.length; i++) {
                    temp += `<div class="col-sm-3">
                                                        <div class="spotlight image" data-src="images/placement/`+ val.name[i] + `" style="background-image:url(images/placement/` + val.name[i] + `)"></div>
                                                </div>`;
                    imgcount++;
                }
                count++;
                temp += `</div></div></div>`;
            });

            $("#placement-images").html(temp);

            shanmugaJs.panelCaretActive();
        });
    },

    pressImages: function () {
        let temp = '', count = 1;

        $.getJSON("js/press.json", function (data) {

            $.each(data, function (key, val) {
                temp += `<div key=` + key + ` class="panel-group` + (count == 1 ? ' active' : '') + `">
                            <div class="card-header" id="heading`+ count + `"  data-toggle="collapse" data-target="#collapse` + count + `" aria-controls="collapse` + count + `">
                                <div class="right-heading">`+ val.year + `</div>
                                <span class="fas caret-awesome"></span>
                            </div>
                
                            <div id="collapse`+ count + `" class="panel-collapse collapse` + (count == 1 ? ' show' : '') + `" aria-labelledby="heading` + count + `" data-parent="#press-images">
                                <div class="card-body row">`;
                for (let i = 0; i < val.imgcount; i++) {
                    temp += `<div class="col-sm-3">
                                    <div class="spotlight image" data-src="images/press/press-`+ count + `.jpg" style="background-image:url(images/press/press-` + count + `.jpg)"></div>
                            </div>`;
                    count++;
                }
                temp += `</div></div></div>`;
            });

            $("#press-images").html(temp);

            shanmugaJs.panelCaretActive();
        });
    },

    panelCaretActive: function () {
        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).parent().addClass('active');
        });

        $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).parent().removeClass('active');
        });
    },

    owlCarasouel: function () {
        $('#programs-slider').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            margin: 15,
            nav: true,
            autoHeight: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
        $(".owl-prev,.owl-next").empty();
        $(".owl-prev").after($(".owl-dots"));
    },

    naacviewModal: function (self) {
        var criterian = $(self).attr("criterian");
        var tData = '';

        $("#naac-view-modal").show(function () {
            $.getJSON("js/naacJson/criteria.json", function (data) {
                $.each(data, function (key, val) {
                    if (val.id === Number(criterian)) {
                        $("#criteriaSpan").html(val.id);
                        val.tabValues.map((item) => {
                            return (
                                tData += `
        <tr>
        <td>${item.sno}</td>
        <td><a href="${item.link}" target="blank">${item.value}</a></td>
        </tr>`
                            );
                        })
                    }
                });
                $("#naac-view-modal table tbody").html(tData);
                $("#naac-view-modal").modal('show');
            });
        });

        $("#naac-view-modal").on('hide.bs.modal', function () {
            $("#naac-view-modal table tbody").empty();
        });

    },

}