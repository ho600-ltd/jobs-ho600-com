function get_e_by_id (id) { return document.getElementById(id); }


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
        if (!email || !EMAIL_RE.test(email)) {
            show_modal($('#danger_modal'), 'E-mail 錯誤', '請填寫正確格式的 E-mail !');
            return false;
        } else {
            var type = $('input[name=type]', $form).val();
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
                        if (type == 'employee') {
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
        if($('.modal.in').length > 0) {
            $('#id_body').addClass('modal-open');
        } else {
            $('#id_body').removeClass('modal-open');
        }
    });
});