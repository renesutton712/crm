function myJQueryCode() {
    //Do stuff with jQuery
    let $ = jQuery,
        availableFromPlaces = ['.form-holder-place1', '.form-holder-place2', '.form-holder-place3', '.form-holder-place4', '.form-holder-place5'],
        formParams = {
            ci: 1,
            ni: 1,
            oi: 1,
            ap: 1,
        },
        fullUrlParams = [],
        urlParams = urlParamsQuery();

    loadScripts()
    // if (findFormElements()) {
    sendClick()
    // }
    formElements();

    function formElements() {

        let form = "<form>" +
            "<label for='First_Name'>First Name:</label>" +
            "<input type='text' class='form-control' id='First_Name' placeholder='First Name:' />" +
            "<label for='Last_Name'>Last Name:</label>" +
            "<input type='text' class='form-control' id='Last_Name' placeholder='Last Name:' />" +
            "<label for='Country'>Country:</label> " +
            "<select id='countries_phone1' class='form-control bfh-countries'></select>" +
            "<label for='Phone'>Phone:</label>" +
            "<input type='text' class='form-control bfh-phone' data-country='countries_phone1' />" +
            "<label for='Email'>Email:</label> " +
            "<input type='email' id='Email' class='form-control' placeholder='Email:' />" +
            "<label for='PWD'>Password:</label>" +
            "<input type='password' id='PWD' class='form-control'/>" +
            "<input type='submit' class='btn btn-default' value='Submit'/>" +
            "<input type='hidden' class='unique' value='' /> " +
            "<input type='hidden' class='ni' value='' /> " +
            "<input type='hidden' class='oi' value='' /> " +
            "<input type='hidden' class='ap' value='' /> " +
            "</form>" +
            "<div style='display:none;z-index: 999;position: fixed;width: 100%; height: 100%;background: rgb(0 0 0 / 0.6); top: 0;' class='form-layover'>" +
            "  <div class='spinner-border' style='width: 3rem; height: 3rem;' role='status'>" +
            "    <span class='sr-only'></span>" +
            "  </div>" +
            "</div>"
        $.each(availableFromPlaces, function (i, el) {
            $(el).append(form);
        })
    }

    function sendClick() {
        $.ajax({
            url: '/leadscrm/api/form/click',
            method: 'POST',
            crossDomain: true,
            data: {
                oi: urlParams.get('oi'),
                ni: urlParams.get('ni'),
                ci: urlParams.get('ci'),
                url_params: fullUrlParams,
            },
            dataType: 'json',
        }).done((response) => {
            console.log(response);
        }).fail((jqXHR, textStatus, errorThrown) => {
            alert(textStatus)
        })
    }

    function urlParamsQuery() {
        const queryString = window.location.search,
            urlParams = new URLSearchParams(queryString),
            entries = urlParams.entries();
        // this.offer_id = urlParams.get('oi');
        // this.ci = urlParams.get('ci');
        // this.ni = urlParams.get('ni');
        for (let entry of entries) {
            fullUrlParams.push(`${entry[0]}: ${entry[1]}`);
        }
        return urlParams;
    }

    // function findFormElements() {
    //     $.each(availableFromPlaces, (i, el) => {
    //         if ($(el).length === 0) {
    //             return false;
    //         }
    //     })
    //     return true;
    // }

    function setFormParams(formParams) {

    }
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
    headTag.appendChild(bootstrapCSS);
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
    myJQueryCode();
}