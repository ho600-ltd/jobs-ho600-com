function get_e_by_id (id) { return document.getElementById(id); }


function spark (obj, callback) {
    return function () {
        obj.animate({fill: obj.attr('stroke'), stroke: obj.attr('fill')},
            500, '', callback);
    }
}


function jog (obj, start, end, callback, jog_duration) {
    var delta_x = parseInt((end.x - start.x) / 4);
    var delta_y = parseInt((end.y - start.y) / 4);
    if (!jog_duration || !parseInt(jog_duration)){
        jog_duration = 1000;
    }
    var i = 0; // 0 => linear;
    obj.animate({
        "20%": {x: start.x, y: start.y, easing: EASINGS[i]},
        "40%": {x: start.x + delta_x, y: start.y + delta_y, easing: EASINGS[i]},
        "60%": {x: start.x + delta_x * 2, y: start.y + delta_y * 2, easing: EASINGS[i]},
        "80%": {x: start.x + delta_x * 3, y: start.y + delta_y * 3, easing: EASINGS[i]},
        "100%": {x: end.x, y: end.y, easing: EASINGS[i], callback: callback(obj)}
    }, jog_duration);
}


function init_block (id) {
    var b = blocks[id];
    var start = b.start;
    var end = b.end;
    var rect = R.rect(start.x, start.y, b.w-b.border, b.h-b.border, b.radius)
                        .attr({
                            //opacity: b.fill == COLORS[0] ? 1 : 0.9,
                            'stroke-width': b.border,
                            fill: b.stroke,
                            stroke: b.fill
                        });
    var jog_duration = parseInt(Math.random() * 1000) + 500;
    if (id == BLOCKS.length - 1) {
        jog_duration = 800;
        var callback = function (obj) {
            return spark(obj, function () {
                obj.rotate(45);
                var font_1 = R.getFont("2");
                var font_a = R.getFont("whoa");
                var ho600_h = R.print(50, 585, "H", font_a, 120).attr({fill: 'whitesmoke'});
                var ho600_o = R.print(175, 610, "o", font_a, 80).attr({fill: 'whitesmoke'});
                var ho600_6 = R.print(270, 600, "6", font_1, 80).attr({fill: 'whitesmoke'});
                var ho600_01 = R.print(370, 600, "0", font_1, 80).attr({fill: 'whitesmoke'});
                var ho600_02 = R.print(470, 600, "0", font_1, 80).attr({fill: 'whitesmoke'});

                var dot = R.text(560, 555, ".").attr({font: "100px Helvetica", fill: 'whitesmoke'});
                var c = R.text(600, 575, "c").attr({font: "50px Helvetica", fill: 'whitesmoke'});
                var o = R.text(560, 615, "o").attr({font: "50px Helvetica", fill: 'whitesmoke'});
                var m = R.text(600, 615, "m").attr({font: "50px Helvetica", fill: 'whitesmoke'});

                var ho600_2h = R.print(555, 85, "H", font_a, 120).attr({fill: '#f00'});
                ho600_2h.rotate(90);
                var ho600_2o = R.print(555, 195, "o", font_a, 80).attr({fill: '#f00'});
                ho600_2o.rotate(90);
                var ho600_26 = R.print(570, 290, "6", font_1, 80).attr({fill: '#f00'});
                ho600_26.rotate(90);
                var ho600_201 = R.print(570, 390, "0", font_1, 80).attr({fill: '#f00'});
                ho600_201.rotate(90);
                var ho600_202 = R.print(570, 490, "0", font_1, 80).attr({fill: '#f00'});
                ho600_202.rotate(90);
//                for (var i=0; i<BLOCKS.length; i++) {
//                    var b = BLOCKS[i];
//                    var rect = R.rect(b.x, HEIGHT - b.y - b.h, b.w-b.border, b.h-b.border, b.radius)
//                                        .attr({
//                                            'stroke-width': b.border,
//                                            fill: b.fill,
//                                            stroke: b.stroke
//                                        });
//                    if (i==BLOCKS.length-1){
//                        rect.attr({opacity: 0.9}).rotate(45);
//                    }
//                }
//                R.rect(0, 550, 600, 550).attr({
//                    fill: "90-#333-#333",
//                    stroke: "none",
//                    opacity: 0.6
//                });
            });
        }
    } else {
        var callback = spark;
    }
    jog(rect, start, end, callback, jog_duration);
}

function animate_logo (ratio, WIDTH, HEIGHT) {
    Raphael(function () {
        if (R) {
            R.clear();
        } else {
            R = Raphael("logo_div", WIDTH, HEIGHT);
        }
        var rects = [];
        for (var i=0; i<BLOCKS.length; i++) {
            var b = BLOCKS[i];
            if (!b) {continue}
            var x = parseInt(b.x * ratio);
            var y = parseInt(b.y * ratio);
            var w = parseInt(b.w * ratio);
            var h = parseInt(b.h * ratio);
            var radius = parseInt(b.radius * ratio);
            var border = parseInt(b.border * ratio);
            var end = {x: x, y: y};
            var delay = parseInt(Math.random() * 1000);
            if (delay > 500) {
                var start = {x: x, y: y <= WIDTH /2 ? WIDTH + y : 0};
            } else {
                var start = {y: y, x: x <= WIDTH /2 ? WIDTH + x: 0};
            }
            if (i == (BLOCKS.length - 1)) {
                delay = 1500;
            }
            blocks[i].x = x;
            blocks[i].y = y;
            blocks[i].w = w;
            blocks[i].h = h;
            blocks[i].radius = radius;
            blocks[i].border = border;
            blocks[i].start = start;
            blocks[i].end = end;
            blocks[i].delay = (delay + 200 * i);
            setTimeout('init_block('+i+')', blocks[i].delay);
        }
    });
}

var ratio, WIDTH, HEIGHT, R;
var EASINGS = ['', '>', '<', '<>', 'bounce', 'elastic', 'backIn', 'backOut'];
var COLORS = ['red', 'whitesmoke', 'whitesmoke'];
var BLOCKS = [
    {x: 50, y: 50, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
    {x: 50, y: 150, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 50, y: 250, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
    {x: 50, y: 350, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 50, y: 450, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},

    {x: 250, y: 50, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
    {x: 250, y: 150, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 250, y: 250, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
    {x: 250, y: 350, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 250, y: 450, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},

    {x: 350, y: 50, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 450, y: 50, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},

    {x: 350, y: 250, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 450, y: 250, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},

    {x: 350, y: 450, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 450, y: 450, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},

    {x: 450, y: 350, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},

    /*
    {x: 350, y: 50, w: 100, h: 50, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 450, y: 50, w: 100, h: 50, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},

    {x: 350, y: 250, w: 100, h: 50, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 450, y: 250, w: 100, h: 50, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},

    {x: 350, y: 500, w: 100, h: 50, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    {x: 450, y: 500, w: 100, h: 50, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},

    {x: 500, y: 300, w: 50, h: 200, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]},
    */

//    {x: 50, y: 550, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//    {x: 150, y: 550, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//    {x: 250, y: 550, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//    {x: 350, y: 550, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//    {x: 450, y: 550, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//
//    {x: 550, y: 550, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//
//    {x: 550, y: 50, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//    {x: 550, y: 150, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//    {x: 550, y: 250, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//    {x: 550, y: 350, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},
//    {x: 550, y: 450, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[0], stroke: COLORS[2]},

    // must be the last one
    {x: 150, y: 250, w: 100, h: 100, radius: 5, border: 6, fill: COLORS[1], stroke: COLORS[0]}
];
var blocks;

/*
$(window).resize(function(){
    ratio = (window.innerWidth >= 960 ? 960 : window.innerWidth) / 960;
    WIDTH = parseInt(600 * ratio);
    HEIGHT = parseInt(600 * ratio);
    blocks = [];
    for (var i=0; i<BLOCKS.length; i++) {
        blocks.push(BLOCKS[i]);
    }
    animate_logo(ratio, WIDTH, HEIGHT);
});
*/


function show_modal ($modal, title, body) {
    $('.modal-title', $modal).html(title);
    $('.modal-body', $modal).html(body);
    $modal.modal({keyboard: true});
};


function post_email ($self) {
    return function() {
        var EMAIL_RE = /^[\w\+_-]+(\.[\w\+_-]+)*@[\w-]+(\.[\w-]+)*\.\w+$/;
        var $form = $self.parents('form');
        var email = $('input[name="email"]', $form).val();
        var type = $('input[name=type]', $form).val();
        if (type != "apply-account-at-exam.yueh-cake.com" && (!email || !EMAIL_RE.test(email))) {
            show_modal($('#danger_modal'), 'E-mail 錯誤', '請填寫正確格式的 E-mail !');
            return false;
        } else if ("apply-account-at-exam.yueh-cake.com" == type) {
            show_modal($('#danger_modal'),
                       '職缺關閉',
                       '十分抱歉，目前沒有徵才需要，可使用上方「註冊信箱收通知信」'
                       +'按鈕註冊你的信箱，待職缺開放後，立即通知。謝謝。');
        } else {
            var pathname = Cookies.get('pathname');
            var data = {email: email, type: type, pathname: pathname};
            $('input[name="email"]', $form).val("");
            $.ajax({
                url: "https://pqpmeji6f4.execute-api.us-west-2.amazonaws.com/prod/LambdaJobsHo600Com/",
                data: JSON.stringify(data),
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                complete: function (xhr, text) {
                    if (/\b200\b/.test(xhr.responseText)) {
                        if (type == 'apply-account-at-exam.yueh-cake.com') {
                            var json = $.parseJSON(xhr.responseText);
                            var message = "請製作<div class='text-danger'>applicants (applicants) &lt;"+json['message']+"&gt; </div>的 PGP 公私錀，<span class='text-danger'>姓名、註釋須設為 applicants ，格式為 RSA 支援加密及簽章</span>，並於 24 小時內上傳公錀及 14 位驗證碼至筆試網站。";
                        } else if (type == 'employee') {
                            var message = '感謝您的資料，我們等不及要在第一時間通知您!!!過幾天，會寄發考題給您過目，請先拭目以待。';
                        } else {
                            var message = '感謝您的資料，我們等不及要在第一時間通知您!!!';
                        }
                        show_modal($('#primary_modal'), '執行成功', message);
                    } else {
                        $('input[name="email"]', $form).val(email);
                        show_modal($('#danger_modal'), '執行錯誤', '目前系統有誤，請稍候再登記，感謝您的耐心。');
                    }
                }
            });
        }
    };
};

$(document).ajaxStart(function() {
    var $loading_image = $('#loading');
    $loading_image.css({
        position: 'fixed',
        top: '50%', left: '50%'
    });
    if($loading_image.attr('status') != 'disable'){
        $.blockUI({ baseZ: 9000, message: null });
        $loading_image.css('z-index', 10000).show();
    }
}).ajaxStop(function() {
    var $loading_image = $('#loading');
    if($loading_image.attr('status') != 'disable'){
        $.unblockUI();
        $loading_image.hide();
    }
});


$(document).ready(function() {
    ratio = (window.innerWidth >= 960 ? 960 : window.innerWidth) / 960;
    WIDTH = parseInt(600 * ratio) + 100;
    HEIGHT = parseInt(600 * ratio) + 100;
    blocks = [];
    for (var i=0; i<BLOCKS.length; i++) {
        blocks.push(BLOCKS[i]);
    }
    animate_logo(ratio, WIDTH, HEIGHT);


    var d = new Date();
    var s = '2015 ~ ' + d.getFullYear();
    $('#copyright_year').text(s);

    $('form.my_form').submit(false);

    $('.click-trigger').click(function(){
        var $btn = $(this);
        var function_name = $btn.attr('function_name');
        if(window[function_name]) {
            return window[function_name]($btn)();
        }
    }).show();

    $('.modal').on('hidden.bs.modal', function (e) {
        //INFO 在 modal 上，再 show #search_zipcode_modal ，並關掉 #search_zipcode_modal 後，原 modal 就無法 scroll 了。
        if($('.modal.in').length > 0) {
            $('#id_body').addClass('modal-open');
        } else {
            $('#id_body').removeClass('modal-open');
        }
    });
});