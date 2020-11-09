(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../axios */ "./resources/js/src/axios.js");
/* harmony import */ var _campaigns_AddCampaignComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../campaigns/AddCampaignComponent */ "./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_2__);
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
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    'v-select': vue_select__WEBPACK_IMPORTED_MODULE_2___default.a
  },
  name: "AddNewPixel",
  data: function data() {
    return {
      submit: false,
      campaigns_list: [],
      form_fields: {
        pixel_name: '',
        pixel_url: [{
          url: '',
          type: ''
        }]
      }
    };
  },
  methods: {
    getCampaigns: function getCampaigns() {
      var _this = this;

      this.$vs.loading();
      _axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('campaigns/get').then(function (response) {
        if ("status" in response.data) {
          throw response.data;
        }

        _this.campaigns_list = response.data;

        _this.$vs.loading.close();
      }).catch(function (error) {
        _this.$vs.loading.close();

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
    validatePixelName: function validatePixelName() {
      return this.form_fields.pixel_name === '';
    }
  },
  beforeMount: function beforeMount() {
    this.getCampaigns();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../axios */ "./resources/js/src/axios.js");
/* harmony import */ var _AddNewPixel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddNewPixel */ "./resources/js/src/views/pages/pixels/AddNewPixel.vue");
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
  name: "IndexComponent",
  components: {
    AddNewPixel: _AddNewPixel__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      isModalVisible: false,
      selected_pixels: [],
      pixels_list: []
    };
  },
  methods: {
    showModal: function showModal() {
      this.isModalVisible = true;
    },
    closeModal: function closeModal() {
      this.isModalVisible = false;
    },
    getPixels: function getPixels() {
      var _this = this;

      this.$vs.loading();
      _axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('pixels/get').then(function (response) {
        _this.pixels_list = response.data;

        _this.$vs.loading.close();
      }).catch(function (error) {
        _this.$vs.loading.close();

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
  beforeMount: function beforeMount() {
    this.getPixels();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=template&id=4689318c&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=template&id=4689318c&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
                attrs: { "label-placeholder": "Pixel Name" },
                model: {
                  value: _vm.form_fields.offer_name,
                  callback: function($$v) {
                    _vm.$set(_vm.form_fields, "offer_name", $$v)
                  },
                  expression: "form_fields.offer_name"
                }
              }),
              _vm._v(" "),
              _vm.submit && _vm.validatePixelName
                ? _c("span", { staticClass: "error" }, [
                    _vm._v("Pixel name is required!")
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
        { staticClass: "mt-3", attrs: { "vs-w": "12" } },
        [
          _c(
            "vs-col",
            [
              _c("label", { attrs: { for: "Campaign" } }, [
                _vm._v("Select Campaign:")
              ]),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  label: "network_name",
                  id: "Campaign",
                  options: _vm.campaigns_list,
                  reduce: function(network) {
                    return network.id
                  }
                },
                model: {
                  value: _vm.form_fields.network_id,
                  callback: function($$v) {
                    _vm.$set(_vm.form_fields, "network_id", $$v)
                  },
                  expression: "form_fields.network_id"
                }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "info" }, [
                _vm._v("Select network associated with the offer")
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "vs-row",
        { staticClass: "mt-3", attrs: { "vs-w": "12" } },
        [
          _c(
            "vs-col",
            [
              _c("vs-input", {
                staticClass: "w-full",
                attrs: { "label-placeholder": "Offer URL(Optional)" },
                model: {
                  value: _vm.form_fields.offer_url,
                  callback: function($$v) {
                    _vm.$set(_vm.form_fields, "offer_url", $$v)
                  },
                  expression: "form_fields.offer_url"
                }
              })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=template&id=0cf623e8&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=template&id=0cf623e8&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
    "vs-card",
    [
      _c(
        "vs-row",
        {
          attrs: {
            "vs-type": "flex",
            "vs-justify": "space-between",
            "vs-align": "center",
            "vs-w": "12"
          }
        },
        [
          _c(
            "vs-col",
            {
              attrs: {
                "vs-w": "6",
                "vs-type": "flex",
                "vs-justify": "flex-start",
                "vs-align": "center"
              }
            },
            [_c("div", [_c("h3", [_vm._v("Pixels")])])]
          ),
          _vm._v(" "),
          _c(
            "vs-col",
            {
              attrs: {
                "vs-w": "6",
                "vs-type": "flex",
                "vs-justify": "flex-end",
                "vs-align": "center"
              }
            },
            [
              _c(
                "vs-button",
                {
                  attrs: { type: "filled", color: "primary" },
                  on: { click: _vm.showModal }
                },
                [_vm._v("Add Pixel")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "vs-row",
        [
          _c(
            "vs-col",
            [
              _c(
                "vs-table",
                {
                  attrs: { search: "", data: _vm.pixels_list, multiple: "" },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(ref) {
                        var data = ref.data
                        return _vm._l(data, function(tr, indextr) {
                          return _c(
                            "vs-tr",
                            { key: indextr, attrs: { data: tr } },
                            [
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].id } },
                                [_vm._v(_vm._s(data[indextr].id))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].name } },
                                [_vm._v(_vm._s(data[indextr].name))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].url } },
                                [_vm._v(_vm._s(data[indextr].url))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].type } },
                                [_vm._v(_vm._s(data[indextr].type))]
                              )
                            ],
                            1
                          )
                        })
                      }
                    }
                  ]),
                  model: {
                    value: _vm.selected_pixels,
                    callback: function($$v) {
                      _vm.selected_pixels = $$v
                    },
                    expression: "selected_pixels"
                  }
                },
                [
                  _c("template", { slot: "header" }),
                  _vm._v(" "),
                  _c(
                    "template",
                    { slot: "thead" },
                    [
                      _c("vs-th", { attrs: { "sort-key": "unique_id" } }, [
                        _vm._v("ID")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "unique_id" } }, [
                        _vm._v("Name")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "network_name" } }, [
                        _vm._v("URL")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "event" } }, [
                        _vm._v("Type")
                      ])
                    ],
                    1
                  )
                ],
                2
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.isModalVisible
        ? _c("modal", {
            on: { close: _vm.closeModal },
            scopedSlots: _vm._u(
              [
                {
                  key: "header",
                  fn: function() {
                    return [_c("p", [_vm._v("Add Pixel")])]
                  },
                  proxy: true
                },
                {
                  key: "body",
                  fn: function() {
                    return [_c("add-new-pixel")]
                  },
                  proxy: true
                }
              ],
              null,
              false,
              2072810408
            )
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/pages/pixels/AddNewPixel.vue":
/*!*************************************************************!*\
  !*** ./resources/js/src/views/pages/pixels/AddNewPixel.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddNewPixel_vue_vue_type_template_id_4689318c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddNewPixel.vue?vue&type=template&id=4689318c&scoped=true& */ "./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=template&id=4689318c&scoped=true&");
/* harmony import */ var _AddNewPixel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddNewPixel.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddNewPixel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddNewPixel_vue_vue_type_template_id_4689318c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddNewPixel_vue_vue_type_template_id_4689318c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4689318c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/pixels/AddNewPixel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewPixel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddNewPixel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewPixel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=template&id=4689318c&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=template&id=4689318c&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewPixel_vue_vue_type_template_id_4689318c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddNewPixel.vue?vue&type=template&id=4689318c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/pixels/AddNewPixel.vue?vue&type=template&id=4689318c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewPixel_vue_vue_type_template_id_4689318c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewPixel_vue_vue_type_template_id_4689318c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/pages/pixels/IndexComponent.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/views/pages/pixels/IndexComponent.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexComponent_vue_vue_type_template_id_0cf623e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=template&id=0cf623e8&scoped=true& */ "./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=template&id=0cf623e8&scoped=true&");
/* harmony import */ var _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexComponent_vue_vue_type_template_id_0cf623e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IndexComponent_vue_vue_type_template_id_0cf623e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0cf623e8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/pixels/IndexComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=template&id=0cf623e8&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=template&id=0cf623e8&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_0cf623e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexComponent.vue?vue&type=template&id=0cf623e8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/pixels/IndexComponent.vue?vue&type=template&id=0cf623e8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_0cf623e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_0cf623e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);