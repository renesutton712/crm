(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/@babel/runtime/core-js/get-iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/core-js/get-iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/get-iterator */ "./node_modules/core-js/library/fn/get-iterator.js");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/core-js/get-iterator */ "./node_modules/@babel/runtime/core-js/get-iterator.js");
/* harmony import */ var _babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__);

//
//
//
//
//
//
// import axios from "../../../axios";
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "formComponent",
  data: function data() {
    return {};
  }
});

function myJQueryCode() {
  //Do stuff with jQuery
  var $ = jQuery,
      availableFromPlaces = ['.form-holder-place1', '.form-holder-place2', '.form-holder-place3', '.form-holder-place4', '.form-holder-place5'],
      formParams = {
    ci: 0,
    ri: 0,
    oi: 0,
    ap: 0,
    rt: 0
  },
      form_errors = {
    first_name: 'First name is required',
    last_name: 'Last name is required',
    country: 'Country is required',
    phone: 'Please enter valid phone number',
    email: 'Please enter valid email',
    password: 'Password must contain 1 lowercase 1 uppercase and be at least 8 characters long'
  },
      fullUrlParams = [],
      country = '',
      ip = '',
      urlParams = urlParamsQuery(),
      name = /^[a-z-A-Z^. ]+$/,
      phone_regex = /[2-9]{1}\d{2}/,
      password_regex = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Utilities

  loadScripts();
  formElements();
  setUserClientCountry();
  sendClick();
  loadCustomCss(); //inputs validation before submit

  $('#user-form-lp .fn').on('keyup', function () {
    if (!name.test($(this).val())) {
      $(this).parent().find('.fn-error').text('First name is not valid!').show();
      return;
    }

    if ($(this).val().length < 3) {
      $(this).parent().find('.fn-error').text('First name must be at least 3 characters long').show();
      return;
    }

    if ($(this).val().length === 0 || $(this).val().length > 3) {
      $(this).parent().find('.fn-error').hide();
    }
  });
  $('#user-form-lp .ln').on('keyup', function () {
    if (!name.test($(this).val())) {
      $(this).parent().find('.ln-error').text('Last name is not valid!').show();
      return;
    }

    if ($(this).val().length < 3) {
      $(this).parent().find('.ln-error').text('Last name must be at least 3 characters long').show();
      return;
    }

    if ($(this).val().length === 0 || $(this).val().length > 3) {
      $(this).parent().find('.ln-error').hide();
    }
  });
  $('#user-form-lp .phone').on('keyup', function () {
    if (!phone_regex.test($(this).val())) {
      $(this).parent().find('.phone-error').text('Phone is not valid!').show();
      return;
    }

    if ($(this).val().length < 6) {
      $(this).parent().find('.phone-error').text('Please enter a valid phone number').show();
      return;
    }

    if ($(this).val().length === 0 || $(this).val().length > 6) {
      $(this).parent().find('.phone-error').hide();
    }
  });
  $('#user-form-lp .email').on('keyup', function () {
    if (!email_regex.test($(this).val())) {
      $(this).parent().find('.email-error').text('Email is not valid!').show();
      return;
    }

    if ($(this).val().length < 6) {
      $(this).parent().find('.email-error').text('Please enter a valid email address').show();
      return;
    }

    if ($(this).val().length === 0 || $(this).val().length > 6) {
      $(this).parent().find('.email-error').hide();
    }
  });
  $('#user-form-lp .pwd').on('keyup', function () {
    if (!password_regex.test($(this).val())) {
      $(this).parent().find('.pwd-error').text('Password must contain 1 lowercase 1 uppercase and be at least 8 characters long').show();
      return;
    }

    if ($(this).val().length === 0 || $(this).val().length > 8) {
      $(this).parent().find('.pwd-error').hide();
    }
  }); //Submit form + Final validation

  $('#user-form-lp').on('submit', function (e) {
    e.preventDefault();
    var fn = $(this).find('.fn').val(),
        ln = $(this).find('.ln').val(),
        country = $(this).find('.country').val(),
        phone = $(this).find('.phone').val(),
        email = $(this).find('.email').val(),
        pwd = $(this).find('.pwd').val(),
        unique_id = $(this).find('.user').val(),
        ri = urlParams.has('ri') ? urlParams.get('ri') : $(this).find('.ri').val(),
        oi = $(this).find('.oi').val(),
        ap = $(this).find('.ap').val(),
        ci = urlParams.has('ci') ? urlParams.get('ci') : $(this).find('.ci').val();

    if (!validateFormInputs($(this), fn, ln, country, phone, email, pwd, unique_id)) {
      return;
    }

    $.ajax({
      url: 'api/form/lead',
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
        ri: ri
      } // dataType: 'json',

    }).done(function (response) {
      console.log(response);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert(textStatus);
    });
  });

  function formElements() {
    var form = "<form id='user-form-lp'>" + "<label for='First_Name'>First Name:</label>" + "<input value='' type='text' class='form-control fn' id='First_Name' placeholder='First Name:' />" + "<span class='error-block fn-error'></span>" + "<label for='Last_Name'>Last Name:</label>" + "<input value='' type='text' class='form-control ln' id='Last_Name' placeholder='Last Name:' />" + "<span class='error-block ln-error'></span>" + "<label for='Country'>Country:</label> " + "<select id='countries_phone1' class='form-control bfh-countries country'></select>" + "<span class='error-block country-error'></span>" + "<label for='Phone'>Phone:</label>" + "<input value='' type='text' class='form-control bfh-phone phone' data-country='countries_phone1' />" + "<span class='error-block phone-error'></span>" + "<label for='Email'>Email:</label> " + "<input value='' type='email' id='Email' class='form-control email' placeholder='Email:' />" + "<span class='error-block email-error'></span>" + "<label for='PWD'>Password:</label>" + "<input value='' type='password' id='PWD' class='form-control pwd'/>" + "<span class='error-block pwd-error'></span>" + "<input type='submit' class='btn btn-default mt-4' value='Submit'/>" + "<input type='hidden' class='user' value='' /> " + "<input type='hidden' class='ri' value='' /> " + "<input type='hidden' class='oi' value='' /> " + "<input type='hidden' class='ap' value='' /> " + "<input type='hidden' class='ci' value='' /> " + "<input type='hidden' class='client_ip' value='' /> " + "</form>" + "<div style='display:none;z-index: 999;position: fixed;width: 100%; height: 100%;background: rgb(0 0 0 / 0.6); top: 0;' class='form-layover'>" + "  <div class='spinner-border' style='width: 3rem; height: 3rem;' role='status'>" + "    <span class='sr-only'></span>" + "  </div>" + "</div>";
    $.each(availableFromPlaces, function (i, el) {
      $(el).append(form);
    });
  }

  function loadCustomCss() {
    $('.error-block').css({
      'color': 'red',
      'display': 'block',
      'font-weight': '500',
      'font-size': '12px'
    });
  }

  function sendClick() {
    if (getCookie('user') !== '') {
      $('.user').val(getCookie('user'));
      return;
    }

    $.ajax({
      url: 'api/form/click',
      method: 'POST',
      async: false,
      crossDomain: true,
      data: {
        oi: urlParams.has('oi') ? urlParams.get('oi') : formParams.oi,
        ri: urlParams.has('ri') ? urlParams.get('ri') : formParams.ri,
        ci: urlParams.has('ci') ? urlParams.get('ci') : formParams.ci,
        ap: urlParams.has('ap') ? urlParams.get('ap') : formParams.ap,
        client_country: country,
        client_ip: ip,
        ua: window.navigator.userAgent,
        url_params: fullUrlParams
      } // dataType: 'json',

    }).done(function (response) {
      var data = JSON.parse(atob(response));
      setCookie('user', data.unique_id, 1);
      $('.user').val(data.unique_id);
      $('.ri').val(data.ri);
      $('.oi').val(data.oi);
      $('.ci').val(data.ci);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert(textStatus);
    });
  }

  function validateFormInputs(form, fn, ln, country, phone, email, pwd, unique_id) {
    if (unique_id == undefined || unique_id.length === '') {
      return false;
    }

    var validateCounter = 0;

    if (!name.test(fn) || fn == undefined || fn === '') {
      form.find('.fn-error').text(form_errors.first_name).show();
      validateCounter++;
    }

    if (!name.test(ln) || ln == undefined || ln === '') {
      form.find('.ln-error').text(form_errors.last_name).show();
      validateCounter++;
    }

    if (country == undefined || country === '') {
      form.find('.country-error').text(form_errors.country).show();
      validateCounter++;
    }

    if (!phone_regex.test(phone) || phone == undefined || phone === '') {
      form.find('.phone-error').text(form_errors.phone).show();
      validateCounter++;
    }

    if (!email_regex.test(email) || email == undefined || email === '') {
      form.find('.email-error').text(form_errors.email).show();
      validateCounter++;
    }

    if (!password_regex.test(pwd) || pwd == undefined || pwd === '') {
      form.find('.pwd-error').text(form_errors.password).show();
      validateCounter++;
    }

    return validateCounter === 0;
  }

  function urlParamsQuery() {
    var queryString = window.location.search,
        urlParams = new URLSearchParams(queryString),
        entries = urlParams.entries();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _babel_runtime_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(entries), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var entry = _step.value;
        fullUrlParams.push("".concat(entry[0], ": ").concat(entry[1]));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return urlParams;
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }

  function firePixel() {}

  function setFormParams(formParams) {}

  function setUserClientCountry() {
    $.ajax({
      url: 'https://ipinfo.io',
      method: 'get',
      async: false,
      dataType: 'json'
    }).done(function (response) {
      country = response.country;
      $('.bfh-countries').attr('data-country', response.country);
      ip = response.ip;
      $('.client_ip').val(ip);
    });
  }
}

function loadScripts() {
  var headTag = document.getElementsByTagName("head")[0];
  var bootstrapJS = document.createElement('script'),
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
  var headTag = document.getElementsByTagName("head")[0];
  var jqTag = document.createElement('script');
  jqTag.type = 'text/javascript';
  jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
  jqTag.onload = myJQueryCode;
  headTag.appendChild(jqTag);
} else {
  myJQueryCode();
}

/***/ }),

/***/ "./node_modules/core-js/library/fn/get-iterator.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/fn/get-iterator.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/library/modules/es6.string.iterator.js");
module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ "./node_modules/core-js/library/modules/core.get-iterator.js");


/***/ }),

/***/ "./node_modules/core-js/library/modules/core.get-iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/library/modules/_an-object.js");
var get = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/library/modules/core.get-iterator-method.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/library/modules/_core.js").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=template&id=5c136ac0&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=template&id=5c136ac0&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("div", { staticClass: "form-holder-place1" })])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/pages/leadsForm/formComponent.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/views/pages/leadsForm/formComponent.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _formComponent_vue_vue_type_template_id_5c136ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formComponent.vue?vue&type=template&id=5c136ac0&scoped=true& */ "./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=template&id=5c136ac0&scoped=true&");
/* harmony import */ var _formComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formComponent.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _formComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _formComponent_vue_vue_type_template_id_5c136ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _formComponent_vue_vue_type_template_id_5c136ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5c136ac0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/leadsForm/formComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_formComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./formComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_formComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=template&id=5c136ac0&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=template&id=5c136ac0&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_formComponent_vue_vue_type_template_id_5c136ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./formComponent.vue?vue&type=template&id=5c136ac0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/leadsForm/formComponent.vue?vue&type=template&id=5c136ac0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_formComponent_vue_vue_type_template_id_5c136ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_formComponent_vue_vue_type_template_id_5c136ac0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);