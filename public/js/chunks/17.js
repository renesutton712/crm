(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../axios */ "./resources/js/src/axios.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "AddNetworkComponent",
  data: function data() {
    return {
      submit: false,
      fields: {
        network_name: '',
        api_key: ''
      }
    };
  },
  methods: {
    save: function save() {
      var _this = this;

      this.submit = true;

      if (this.validateNetworkName && this.validateApiKey) {
        return;
      }

      _axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('networks/store', this.fields).then(function (response) {
        if (!response.data.status) {
          throw response.data;
        }

        location.reload();
      }).catch(function (error) {
        _this.$vs.notify({
          title: 'Error',
          text: error.msg,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        });
      });
    }
  },
  computed: {
    validateNetworkName: function validateNetworkName() {
      return this.fields.network_name === '';
    },
    validateApiKey: function validateApiKey() {
      return this.fields.api_key === '';
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=template&id=7c904b0a&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=template&id=7c904b0a&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    [
      _c(
        "vs-row",
        { attrs: { "vs-w": "12" } },
        [
          _c(
            "vs-col",
            [
              _c("vs-input", {
                staticClass: "w-full",
                attrs: { "label-placeholder": "Network Name" },
                model: {
                  value: _vm.fields.network_name,
                  callback: function($$v) {
                    _vm.$set(_vm.fields, "network_name", $$v)
                  },
                  expression: "fields.network_name"
                }
              }),
              _vm._v(" "),
              _vm.submit && _vm.validateNetworkName
                ? _c("span", { staticClass: "error" }, [
                    _vm._v("Network name is required!")
                  ])
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "vs-row",
        { attrs: { "vs-w": "12" } },
        [
          _c(
            "vs-col",
            [
              _c("vs-input", {
                staticClass: "w-full",
                attrs: { "label-placeholder": "API Key" },
                model: {
                  value: _vm.fields.api_key,
                  callback: function($$v) {
                    _vm.$set(_vm.fields, "api_key", $$v)
                  },
                  expression: "fields.api_key"
                }
              }),
              _vm._v(" "),
              _vm.submit && _vm.validateApiKey
                ? _c("span", { staticClass: "error" }, [
                    _vm._v("API key is required!")
                  ])
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "vs-row",
        { staticClass: "mt-5", attrs: { "vs-w": "12" } },
        [
          _c(
            "vs-col",
            [
              _c(
                "vs-button",
                {
                  attrs: { color: "success", type: "filled" },
                  on: { click: _vm.save }
                },
                [_vm._v("Save")]
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/pages/networks/AddNetworkComponent.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/views/pages/networks/AddNetworkComponent.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddNetworkComponent_vue_vue_type_template_id_7c904b0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddNetworkComponent.vue?vue&type=template&id=7c904b0a&scoped=true& */ "./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=template&id=7c904b0a&scoped=true&");
/* harmony import */ var _AddNetworkComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddNetworkComponent.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddNetworkComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddNetworkComponent_vue_vue_type_template_id_7c904b0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddNetworkComponent_vue_vue_type_template_id_7c904b0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7c904b0a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/networks/AddNetworkComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNetworkComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddNetworkComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNetworkComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=template&id=7c904b0a&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=template&id=7c904b0a&scoped=true& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNetworkComponent_vue_vue_type_template_id_7c904b0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddNetworkComponent.vue?vue&type=template&id=7c904b0a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/networks/AddNetworkComponent.vue?vue&type=template&id=7c904b0a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNetworkComponent_vue_vue_type_template_id_7c904b0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNetworkComponent_vue_vue_type_template_id_7c904b0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);