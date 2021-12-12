function myJQueryCode() {
    $(function () {
        'use strict'
        //Do stuff with jQuery
        let $ = jQuery,
            availableFromPlaces = ['.form-holder-place1', '.form-holder-place2', '.form-holder-place3', '.form-holder-place4', '.form-holder-place5'],
            formParams = {
                ci: 0,
                ri: 0,
                oi: 0,
                ap: 0,
                rt: 0,
            },
            form_vals = {
                user_id: '',
                ri: '',
                oi: '',
                ci: '',
            },
            form_errors = {
                first_name: 'First name is required',
                last_name: 'Last name is required',
                country: 'Country is required',
                phone: 'Please enter valid phone number',
                email: 'Please enter valid email',
                password: 'Password must contain 1 lowercase 1 uppercase and be at least 8 characters long',
            },
            form_settings = '',
            form_fields = {
                first_name: 'First Name:',
                last_name: 'Last Name:',
                country: 'Country',
                phone: 'Phone',
                email: 'Email',
                password: 'Password',
                submit_btn: 'Open Account'
            },
            country_code = '',
            ip = '',
            urlParams = urlParamsQuery(),
            name = /^[a-z-A-Z^. ]+$/,
            phone_regex = /[2-9]{1}\d{2}/,
            password_regex = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
            email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //Utilities
        loadScripts()
        setUserClientCountry();
        if ((getCookie('lang') !== '' && getCookie('lang') !== 'undefined')) {
            getFormLang()
        }
        sendClick();
        formElements();
        appendReturnedValues(form_vals);
        loadCustomCss();

        //inputs validation before submit
        $('#user-form-lp .fn').on('focusout', function () {
            if (!name.test($(this).val())) {
                $(this).parent().find('.fn-error').text('First name is not valid!').show();
                $(this).parent().parent().parent().parent().parent().find('input[type="submit"]').attr('disabled', true);
                return;
            }
            if ($(this).val().length < 3) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', true);
                $(this).parent().find('.fn-error').text('First name must be at least 3 characters long').show();
                return;
            }
            if ($(this).val().length === 0 || $(this).val().length >= 3) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', false);
                $(this).parent().find('.fn-error').hide();
            }
        });
        $('#user-form-lp .ln').on('focusout', function () {
            if (!name.test($(this).val())) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', true);
                $(this).parent().find('.ln-error').text('Last name is not valid!').show();
                return;
            }
            if ($(this).val().length <= 3) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', true);
                $(this).parent().find('.ln-error').text('Last name must be at least 3 characters long').show();
                return;
            }
            if ($(this).val().length === 0 || $(this).val().length >= 3) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', false);
                $(this).parent().find('.ln-error').hide();
            }
        });
        $('#user-form-lp .phone').on('keyup', function () {
            if (($(this).val().match(/ /g) || []).length === 1) {
                if ($(this).val().charAt($(this).val().indexOf(" ") + 1) === "0") {
                    document.querySelector("#user-form-lp .phone").value = $(this).val().replace(' 0', ' ');
                }
            }
        });
        $('#user-form-lp .phone').on('focusout', function () {
            if (!phone_regex.test($(this).val())) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', true);
                $(this).parent().find('.phone-error').text('Phone is not valid!').show();
                return;
            }
            if ($(this).val().length <= 6) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', true);
                $(this).parent().find('.phone-error').text('Please enter a valid phone number').show();
                return;
            }
            if ($(this).val().length === 0 || $(this).val().length >= 6) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', false);
                $(this).parent().find('.phone-error').hide();
            }
        });
        $('#user-form-lp .email').on('focusout', function () {
            if (!email_regex.test($(this).val())) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', true);
                $(this).parent().find('.email-error').text('Email is not valid!').show();
                return;
            }
            if ($(this).val().length <= 6) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', true);
                $(this).parent().find('.email-error').text('Please enter a valid email address').show();
                return;
            }
            if ($(this).val().length === 0 || $(this).val().length >= 6) {
                $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', false);
                $(this).parent().find('.email-error').hide();
            }
        });
        // $('#user-form-lp .pwd').on('focusout', function () {
        //     if (!password_regex.test($(this).val())) {
        //         $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', true);
        //         $(this).parent().find('.pwd-error').text('Password must contain 1 lowercase 1 uppercase and be at least 8 characters long').show();
        //         return;
        //     }
        //     if ($(this).val().length === 0 || $(this).val().length >= 8) {
        //         $(this).parent().parent().parent().find('input[type="submit"]').attr('disabled', false);
        //         $(this).parent().find('.pwd-error').hide();
        //     }
        // });
        //Submit form + Final validation
        $.each(availableFromPlaces, function (index, val) {
            let btn = $(val).find('#submit-btn');
            $(btn).on('click', function (e) {
                e.preventDefault();
                let form = $(this).parent();
                $('.form-layover').show();
                let fn = $(form).find('.fn').val(),
                    ln = $(form).find('.ln').val(),
                    country = $(form).find('.country').val(),
                    phone = $(form).find('.phone').val(),
                    email = $(form).find('.email').val(),
                    pwd = $(form).find('.pwd').val(),
                    unique_id = $(form).find('.user').val(),
                    ri = urlParams.has('ri') ? urlParams.get('ri') : $(form).find('.ri').val(),
                    ci = urlParams.has('ci') ? urlParams.get('ci') : $(form).find('.ci').val();
                if (pwd === '') {
                    // $(pwd).val(random_password_generate(8, 8));
                    pwd = random_password_generate(8, 8);
                }
                if (!validateFormInputs($(form), fn, ln, country, phone, email, pwd, unique_id)) {
                    $(this).attr('disabled', true);
                    return;
                }
                $.ajax({
                    url: 'https://storsleads.club/api/form/lead',
                    method: 'POST',
                    data: {
                        fn: fn,
                        ln: ln,
                        country: country,
                        phone: phone,
                        email: email,
                        pwd: pwd,
                        user: unique_id,
                        ci: ci,
                        ri: ri,
                    },
                }).done((response) => {
                    let res = response;
                    if (IsJsonString(response)) {
                        res = JSON.parse(response);
                    }
                    if (!res.status) {
                        $(this).attr('disabled', true);
                        $('.form-layover').hide();
                        alert(res.msg);
                        return;
                    }
                    delete_cookie('user', '/', window.location.hostname)
                    if ('pixel' in res) {
                        // let rege = (/##(.*)##/g),
                        let rege = /##(.*?)##/gm,
                            res_pixel = '';

                        res_pixel = res.pixel.replace(rege, function ($0, $1) {
                            return getUrlParameter($1);
                        })
                        $("body").append(res_pixel);
                    }
                    setTimeout(function () {
                        window.location.href = res.msg;
                    }, 2500);
                }).fail((jqXHR, textStatus, errorThrown) => {
                    $('.form-layover').hide();
                    alert(textStatus)
                })
            })
        })

        function formElements() {
            let phone = form_settings.phone === 'off' ? '' : "<input value='' type='text' class='form-control bfh-phone phone' data-country='countries_phone1' />" +
                "<span class='error-block phone-error'></span>"
            if (country_code.toLowerCase() === "co") {
                phone = form_settings.phone === 'off' ? '' : "<input value='' type='text' data-format='+57 dddddddddd' class='form-control bfh-phone phone'/>" +
                    "<span class='error-block phone-error'></span>"
            }
            if (country_code.toLowerCase() === "in") {
                phone = form_settings.phone === 'off' ? '' : "<input value='' type='text' data-format='+91 dddddddddd' class='form-control bfh-phone phone'/>" +
                    "<span class='error-block phone-error'></span>"
            }
            if (country_code.toLowerCase() === "pe") {
                phone = form_settings.phone === 'off' ? '' : "<input value='' type='text' data-format='+51 ddddddddddd' class='form-control bfh-phone phone'/>" +
                    "<span class='error-block phone-error'></span>"
            }
            if (country_code.toLowerCase() === "it") {
                phone = form_settings.phone === 'off' ? '' : "<input value='' type='text' data-format='+39 ddddddddddd' class='form-control bfh-phone phone'/>" +
                    "<span class='error-block phone-error'></span>"
            }
            if (country_code.toLowerCase() === "au") {
                phone = form_settings.phone === 'off' ? '' : "<input value='' type='text' data-format='+61 ddddddddddddddd' class='form-control bfh-phone phone'/>" +
                    "<span class='error-block phone-error'></span>"
            }
            let fn = form_settings.first_name === 'off' ? '' : "<input value='' autocomplete='off' type='text' class='form-control fn' id='First_Name' placeholder='" + form_fields.first_name + "' />" +
                    "<span class='error-block fn-error'></span>",
                ln = form_settings.last_name === 'off' ? '' : "<input value='' autocomplete='off' type='text' class='form-control ln' id='Last_Name' placeholder='" + form_fields.last_name + "' />" +
                    "<span class='error-block ln-error'></span>",
                country = form_settings.country === 'off' ? '' : "<select id='countries_phone1' class='form-control bfh-countries country'></select>" +
                    "<span class='error-block country-error'></span>",
                email = form_settings.email === 'off' ? '' : "<input value='' autocomplete='off' type='email' id='Email' class='form-control email' placeholder='" + form_fields.email + "' />" +
                    "<span class='error-block email-error'></span>",
                password = form_settings.password === 'off' ? '' : "<input value='' type='password' id='PWD' placeholder='" + form_fields.password + "' class='form-control pwd'/>" +
                    "<span class='error-block pwd-error'></span>";
            let form = "<form id='user-form-lp'>" +
                    "<div class='full-name'>" + "<div class='fn-holder'>" + fn + "</div>" + "<div class='ln-holder'>" + ln + "</div>" + " </div>" +
                    "<div class='country-select'><div>" + country + "</div>" + "</div>" +
                    "<div class='phone-input'><div>" + phone + "</div>" + "</div>" +
                    "<div class='email-input'><div>" + email + "</div>" + "</div>" +
                    "<div class='password-input'><div>" + password + "</div>" + "</div>" +
                    "<input id='submit-btn' type='submit' class='btn btn-default mt-4' value='" + form_fields.submit_btn + "' disabled='disabled'/>" +
                    "<input type='hidden' class='user' value='' /> " +
                    "<input type='hidden' class='ri' value='' /> " +
                    "<input type='hidden' class='oi' value='' /> " +
                    "<input type='hidden' class='ap' value='' /> " +
                    "<input type='hidden' class='ci' value='' /> " +
                    "<input type='hidden' class='client_ip' value='' /> " +
                    "</form>",
                loader = "<div style='display:none;z-index: 99999;position: fixed;width: 100%; height: 100%;background: rgb(0 0 0 / 0.6); top: 0;' class='form-layover'>" +
                    "<img src='https://storsleads.club/images/loader.svg' width='150' height='150' alt=''>" +
                    "</div>";
            $.each(availableFromPlaces, function (i, el) {
                $(el).append(form);
            });
            if ($('.form-holder-place1').is(':empty')) {
                const oi = urlParams.has('oi') ? urlParams.get('oi') : formParams.oi,
                    ri = urlParams.has('ri') ? urlParams.get('ri') : formParams.ri,
                    ci = urlParams.has('ci') ? urlParams.get('ci') : formParams.ci;
                if (getCookie(oi + '_' + ri) !== '' && getCookie(oi + '_' + ri) !== 'undefined') {
                    form_vals.user_id = getCookie(oi + '_' + ri);
                    return;
                }
                let dataString = JSON.stringify({
                    oi: oi,
                    ri: ri,
                    ci: ci,
                    ap: urlParams.has('ap') ? urlParams.get('ap') : formParams.ap,
                    client_country: country_code,
                    client_ip: ip,
                    ua: window.navigator.userAgent,
                    url_params: URLToArray(window.location.search)
                });
                $.ajax({
                    url: 'https://storsleads.club/api/form/log',
                    method: 'POST',
                    async: false,
                    crossDomain: true,
                    data: {
                        message: "The form was not loaded. data: " + dataString,
                    },
                }).done((response) => {
                }).fail((jqXHR, textStatus, errorThrown) => {
                })
            }
            $('body').append(loader);
            $('.bfh-countries').attr('data-country', country_code);
            $('.client_ip').val(ip)
            $('#PWD').val(random_password_generate(8, 8));
        }

        function loadCustomCss() {
            $('#user-form-lp .error-block').css({
                'position': 'absolute',
                'color': '#fff',
                'display': 'none',
                'font-weight': '600',
                'font-size': '12px',
                'z-index': '99999',
                'background': 'red',
                'padding': '5px',
                'border-radius': '3px',
                'left': '15%',
                'bottom': '-30px',
            });
            $('#user-form-lp .error-block::after').css({
                'border-left': 'solid transparent 5px',
                'border-right': 'solid transparent 5px',
                'border-bottom': 'solid #ec2b00 10px',
                'top': '-10px',
                'content': " ",
                'height': '0',
                'left': '50%',
                'margin-left': '-13px',
                'position': 'absolute',
                'width': ' 0',
            });
            $('#user-form-lp').css({
                'max-width': '430px',
                'width': '100%',
                'margin': 'auto'
            });
            $('#user-form-lp div > div').css({
                'position': 'relative',
            });
            $('#user-form-lp  .fn-holder').css({
                'display': 'inline-block',
                'width': '45%',
                'margin-right': '5%'

            });
            $('#user-form-lp  .ln-holder').css({
                'display': 'inline-block',
                'width': '50%'

            });
            $('#user-form-lp input,select').css({
                "height": "45px",
                "width": "100%",
                "margin": "5px 0",
                "border": "1px solid #000",
                "border-radius": "3px",
                "padding": "0 0 0 10px",
            });
            $('#user-form-lp select').css({
                'background': '#fff',
                'width': '100%',
            });
            $('#user-form-lp input[type="submit"]').css({
                'cursor': 'pointer',
                'font-weight': 'bold',
                'width': '100%',
            })
            $('#user-form-lp input#Last_Name').css({
                'display': 'inline-block',
            });
            $('#user-form-lp input#First_Name').css({
                'display': 'inline-block',
            });

            $('.form-layover img').css({
                'position': 'absolute',
                'left': '0',
                'right': '0',
                'margin': ' auto',
                'top': '30%',
            });

            $('#user-form-lp #PWD').css({
                'display': 'none'
            })

        }

        function sendClick() {
            const oi = urlParams.has('oi') ? urlParams.get('oi') : formParams.oi,
                ri = urlParams.has('ri') ? urlParams.get('ri') : formParams.ri,
                ci = urlParams.has('ci') ? urlParams.get('ci') : formParams.ci;
            if (getCookie(oi + '_' + ri) !== '' && getCookie(oi + '_' + ri) !== 'undefined') {
                form_vals.user_id = getCookie(oi + '_' + ri);
                return;
            }
            let clickId = null;
            let mappedUrlParameters = URLToArray(window.location.search);
            if (typeof clickIdParam !== 'undefined') {
                clickId = {cid: clickIdParam};
            }
            console.log(clickId);
            if (!ip || !country_code) {
                $.getJSON('https://ipapi.co/json/', function (data) {
                    ip = data.ip;
                    country_code = data.country;
                    $('.client_ip').val(ip);
                    $.ajax({
                        url: 'https://storsleads.club/api/form/click',
                        method: 'POST',
                        async: false,
                        crossDomain: true,
                        data: {
                            oi: oi,
                            ri: ri,
                            ci: ci,
                            ap: urlParams.has('ap') ? urlParams.get('ap') : formParams.ap,
                            client_country: country_code,
                            client_ip: ip,
                            ua: window.navigator.userAgent,
                            url_params: {...mappedUrlParameters, ...clickId}
                        },
                    }).done((response) => {
                        const data = JSON.parse(atob(response));
                        if ('status' in data && !data.status) {
                            alert(data.msg);
                        }
                        setCookie(oi + '_' + ri, data.unique_id, 1);
                        if ('lang' in data && data.lang !== '') {
                            setCookie('lang', data.lang.lang, 1);
                            setFormLang(data.lang)
                            form_vals.user_id = data.unique_id;
                            form_vals.ci = data.ci;
                            form_vals.oi = data.oi;
                            form_vals.ri = data.ri;
                        }
                    }).fail((jqXHR, textStatus, errorThrown) => {
                        alert(textStatus)
                    })
                });
            } else {
                $.ajax({
                    url: 'https://storsleads.club/api/form/click',
                    method: 'POST',
                    async: false,
                    crossDomain: true,
                    data: {
                        oi: oi,
                        ri: ri,
                        ci: ci,
                        ap: urlParams.has('ap') ? urlParams.get('ap') : formParams.ap,
                        client_country: country_code,
                        client_ip: ip,
                        ua: window.navigator.userAgent,
                        url_params: {...mappedUrlParameters, ...clickId}
                    },
                }).done((response) => {
                    const data = JSON.parse(atob(response));
                    if ('status' in data && !data.status) {
                        alert(data.msg);
                    }
                    setCookie(oi + '_' + ri, data.unique_id, 1);
                    if ('lang' in data && data.lang !== '') {
                        setCookie('lang', data.lang.lang, 1);
                        setFormLang(data.lang)
                        form_vals.user_id = data.unique_id;
                        form_vals.ci = data.ci;
                        form_vals.oi = data.oi;
                        form_vals.ri = data.ri;
                    }
                }).fail((jqXHR, textStatus, errorThrown) => {
                    alert(textStatus)
                })
            }
        }

        function validateFormInputs(form, fn, ln, country, phone, email, pwd, unique_id) {
            // if (unique_id == undefined || unique_id.length === '') {
            //     $('.form-layover').hide();
            //     return false;
            // }
            if (!name.test(fn) || fn == undefined || fn === '') {
                form.find('.fn-error').text(form_errors.first_name).show();
                $('.form-layover').hide();
                return false;
            }
            if (!name.test(ln) || ln == undefined || ln === '') {
                form.find('.ln-error').text(form_errors.last_name).show();
                $('.form-layover').hide();
                return false;
            }
            if (country == undefined || country === '') {
                form.find('.country-error').text(form_errors.country).show();
                $('.form-layover').hide();
                return false;
            }
            if (!phone_regex.test(phone) || phone == undefined || phone === '') {
                form.find('.phone-error').text(form_errors.phone).show();
                $('.form-layover').hide();
                return false;
            }
            if (!email_regex.test(email) || email == undefined || email === '') {
                form.find('.email-error').text(form_errors.email).show();
                $('.form-layover').hide();
                return false;
            }
            if (!password_regex.test(pwd) || pwd == undefined || pwd === '') {
                form.find('.pwd-error').text(form_errors.password).show();
                $('.form-layover').hide();
                return false;
            }
            return true;
        }

        function appendReturnedValues(vals) {
            $('.user').val(vals.user_id);
            $('.ri').val(vals.ri);
            $('.oi').val(vals.oi);
            $('.ci').val(vals.ci);
        }

        function urlParamsQuery() {
            const queryString = window.location.search,
                urlParams = new URLSearchParams(queryString),
                entries = urlParams.entries();
            // for (let entry of entries) {
            //     fullUrlParams.push(`${entry[0]}: ${entry[1]}`);
            // }
            return urlParams;
        }

        function URLToArray(url) {
            let request = {};
            let pairs = url.substring(url.indexOf('?') + 1).split('&');
            for (let i = 0; i < pairs.length; i++) {
                if (!pairs[i])
                    continue;
                let pair = pairs[i].split('=');
                request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
            return request;
        }

        function setCookie(cname, cvalue, exdays) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function delete_cookie(name, path, domain) {
            if (getCookie(name)) {
                document.cookie = name + "=" +
                    ((path) ? ";path=" + path : "") +
                    ((domain) ? ";domain=" + domain : "") +
                    ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
            }
        }

        function IsJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        function setUserClientCountry() {
            $.ajax({
                url: 'https://ipinfo.io?token=7621e8725cfeb3',
                method: 'get',
                async: false,
                dataType: 'json',
            }).done((response) => {
                country_code = response.country;
                ip = response.ip;
            })
        }

        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            let results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };

        function getFormLang() {
            $.ajax({
                url: 'https://storsleads.club/api/form/lang',
                method: 'POST',
                data: {lang: getCookie('lang')},
                async: false,
                dataType: 'json',
            }).done((response) => {
                if ('status' in response && !response.status) {
                    alert(response.msg);
                    return;
                }
                return setFormLang(response);
            }).fail((jqXHR, textStatus, errorThrown) => {
                alert(textStatus)
            })
        }

        function setFormLang(fields) {
            form_fields.first_name = fields.first_name;
            form_fields.last_name = fields.last_name;
            form_fields.country = fields.country;
            form_fields.phone = fields.phone;
            form_fields.email = fields.email;
            form_fields.password = fields.password;
            form_fields.submit_btn = fields.submit_btn;
        }

        function random_password_generate(max, min) {
            let passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                randPwLen = Math.floor(Math.random() * (max - min + 1)) + min,
                randPassword = Array(randPwLen).fill(passwordChars).map(function (x) {
                    return x[Math.floor(Math.random() * x.length)]
                }).join('');
            while (!password_regex.test(randPassword)) {
                return random_password_generate(9, 9);
            }
            return randPassword;
        }
    });
}

function loadScripts() {
    let headTag = document.getElementsByTagName("head")[0];
    let bootstrapJS = document.createElement('script'),
        bootstrapCSS = document.createElement('link'),
        formHelpersCSS = document.createElement('link'),
        formHelpersJS = document.createElement('script');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.type = 'text/css';
    bootstrapCSS.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
    formHelpersCSS.rel = 'stylesheet';
    formHelpersCSS.type = 'text/css';
    formHelpersCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-formhelpers/2.3.0/css/bootstrap-formhelpers.min.css';
    formHelpersJS.type = 'text/javascript';
    formHelpersJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-formhelpers/2.3.0/js/bootstrap-formhelpers.min.js';
    bootstrapJS.type = 'text/javascript';
    bootstrapJS.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js';
    // headTag.appendChild(bootstrapCSS);
    headTag.appendChild(formHelpersCSS);
    headTag.appendChild(bootstrapJS);
    headTag.appendChild(formHelpersJS);
}

if (typeof jQuery == 'undefined') {
    let headTag = document.getElementsByTagName("head")[0];
    let jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    jqTag.onload = myJQueryCode;
    headTag.appendChild(jqTag);
} else {
    $.ajax({
        url: 'https://ipinfo.io?token=7621e8725cfeb3',
        method: 'get',
        async: false,
        dataType: 'json',
    }).done((response) => {
        if(response.country) {
            if(response.country.toLowerCase() !== "il" && response.country.toLowerCase() !== "us") {
                myJQueryCode();
            } else {
                alert('Unsupported Signup');
            }
        } else {
            myJQueryCode();
        }
    })
}