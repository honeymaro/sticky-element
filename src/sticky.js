var Maro;
Maro = !Maro ? {} : Maro;
Maro.sticky = !Maro.sticky ? {} : Maro.sticky;
Maro.sticky = (function () {

    var _stickies = [];
    var _add = function (data) {
        data.element = data.element;
        data.parent = data.parent ? data.parent : $(element).parent();
        // data.from = data.from ? data.from : $(data.parent).offset().top;
        // data.to = data.to ? data.to : $(data.parent).offset().top + $(data.parent).height();
        // TODO Callback before, during, after로 나누기
        data.callback = data.callback ? data.callback : function () { };
        console.log(data);
        _stickies.push(data);
    }
    var _remove = _stickies.splice;



    var initStickies = $(".m-sticky");
    var i = 0;
    for (i = 0; i < initStickies.length; i++) {
        var element = initStickies[i];
        var parent = $(initStickies[i]).parent();
        var callback = function (e) {
            // e.element
            // e.parent
            // e.currentScroll
            // e.from
            // e.to
            // e.percent = (currentScroll - from) / (to - from);
            // e.status = "before", "during", "after"
            if (e.status == "during") {
                $(e.element).css("position", "fixed");
                $(e.element).css("margin-top", "");
            }
            else if (e.status == "after") {
                $(e.element).css("position", "absolute");
                $(e.element).css("margin-top", $(e.parent).height() + "px");
            }
            else if (e.status == "before") {
                $(e.element).css("position", "absolute");
                $(e.element).css("margin-top", "");
            }
        }

        _stickies.push({
            element,
            parent,
            callback
        });
    }

    $(document).ready(function () {
        $(window).on("scroll", function (e) {
            var currentScroll = $(window).scrollTop();
            var i = 0;


            for (i = 0; i < _stickies.length; i++) {
                var parent = $(_stickies[i].parent);
                var sticky = $(_stickies[i].element);

                var from = $(parent).offset().top;
                var to = $(parent).offset().top + $(parent).height();

                var status = "";
                if ($(parent).offset().top <= currentScroll &&
                    $(parent).offset().top + $(parent).height() > currentScroll) {
                    status = "during";
                }
                else if ($(parent).offset().top + $(parent).height() <= currentScroll) {
                    status = "after";
                }
                else {
                    status = "before";
                }


                _stickies[i].callback({
                    element,
                    parent,
                    currentScroll,
                    from,
                    to,
                    percent: (currentScroll - from) / (to - from),
                    status
                })
            }
        });
        $(window).scroll();
    });

    return {
        add: _add,
        remove: _remove
    }
});


new Maro.sticky();