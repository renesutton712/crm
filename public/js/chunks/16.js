(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "IndexComponent",
  data: function data() {
    return {
      leads_list: [],
      selected_leads: []
    };
  },
  methods: {
    getLeads: function getLeads() {
      var _this = this;

      this.$vs.loading();
      _axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('leads/get').then(function (response) {
        if ("status" in response.data) {
          throw response.data;
        }

        _this.leads_list = response.data;

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
    this.getLeads();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=template&id=a55a3450&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=template&id=a55a3450&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
            [_c("div", [_c("h3", [_vm._v("Leads")])])]
          ),
          _vm._v(" "),
          _c("vs-col", {
            attrs: {
              "vs-w": "6",
              "vs-type": "flex",
              "vs-justify": "flex-end",
              "vs-align": "center"
            }
          })
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
                  attrs: { search: "", data: _vm.leads_list, multiple: "" },
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
                                { attrs: { data: data[indextr].unique_id } },
                                [_vm._v(_vm._s(data[indextr].unique_id))]
                              ),
                              _vm._v(" "),
                              data[indextr].campaign !== null
                                ? _c(
                                    "vs-td",
                                    {
                                      attrs: {
                                        data:
                                          data[indextr].campaign.campaign_name
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(
                                            data[indextr].campaign.campaign_name
                                          ) +
                                          "\n                        "
                                      )
                                    ]
                                  )
                                : _c("vs-td", [_vm._v("Campaign not found!")]),
                              _vm._v(" "),
                              data[indextr].network !== null
                                ? _c(
                                    "vs-td",
                                    {
                                      attrs: {
                                        data: data[indextr].network.network_name
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(
                                            data[indextr].network.network_name
                                          ) +
                                          "\n                        "
                                      )
                                    ]
                                  )
                                : _c("vs-td", [_vm._v("No Network found")]),
                              _vm._v(" "),
                              data[indextr].offer !== null
                                ? _c(
                                    "vs-td",
                                    {
                                      attrs: {
                                        data: data[indextr].offer.offer_name
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(
                                            data[indextr].offer.offer_name
                                          ) +
                                          "\n                        "
                                      )
                                    ]
                                  )
                                : _c("vs-td", [_vm._v("No Offer Found!")]),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].country } },
                                [_vm._v(_vm._s(data[indextr].country))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].first_name } },
                                [_vm._v(_vm._s(data[indextr].first_name))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].last_name } },
                                [_vm._v(_vm._s(data[indextr].last_name))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].email } },
                                [_vm._v(_vm._s(data[indextr].email))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].phone } },
                                [_vm._v(_vm._s(data[indextr].phone))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].ip } },
                                [_vm._v(_vm._s(data[indextr].ip))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].ua } },
                                [_vm._v(_vm._s(data[indextr].ua))]
                              ),
                              _vm._v(" "),
                              data[indextr].status === 3
                                ? _c(
                                    "vs-td",
                                    {
                                      staticClass: "font-bold text-primary",
                                      attrs: { data: data[indextr].status }
                                    },
                                    [
                                      _vm._v(
                                        "\n                            FTD\n                        "
                                      )
                                    ]
                                  )
                                : _c(
                                    "vs-td",
                                    {
                                      class: [
                                        data[indextr].status === 1
                                          ? "text-dark font-bold"
                                          : "text-success font-bold"
                                      ],
                                      attrs: { data: data[indextr].status }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          data[indextr].status === 1
                                            ? "Click"
                                            : "Lead"
                                        ) + "\n                        "
                                      )
                                    ]
                                  ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].url_params } },
                                [_vm._v(_vm._s(data[indextr].url_params))]
                              )
                            ],
                            1
                          )
                        })
                      }
                    }
                  ]),
                  model: {
                    value: _vm.selected_leads,
                    callback: function($$v) {
                      _vm.selected_leads = $$v
                    },
                    expression: "selected_leads"
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
                      _c("vs-th", { attrs: { "sort-key": "campaign_name" } }, [
                        _vm._v("Campaign Name")
                      ]),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "network.network_name" } },
                        [_vm._v("Network Name")]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-th",
                        { attrs: { "sort-key": "offer.offer_name" } },
                        [_vm._v("Offer Name")]
                      ),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "country" } }, [
                        _vm._v("Country")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "first_name" } }, [
                        _vm._v("First Name")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "last_name" } }, [
                        _vm._v("Last Name")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "email" } }, [
                        _vm._v("Email")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "phone" } }, [
                        _vm._v("Phone")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "ip" } }, [
                        _vm._v("IP")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "ua" } }, [
                        _vm._v("UA")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "status" } }, [
                        _vm._v("Type")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "url_params" } }, [
                        _vm._v("URL Params")
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/pages/leads/IndexComponent.vue":
/*!***************************************************************!*\
  !*** ./resources/js/src/views/pages/leads/IndexComponent.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexComponent_vue_vue_type_template_id_a55a3450_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=template&id=a55a3450&scoped=true& */ "./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=template&id=a55a3450&scoped=true&");
/* harmony import */ var _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexComponent_vue_vue_type_template_id_a55a3450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IndexComponent_vue_vue_type_template_id_a55a3450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "a55a3450",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/leads/IndexComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=template&id=a55a3450&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=template&id=a55a3450&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_a55a3450_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexComponent.vue?vue&type=template&id=a55a3450&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/leads/IndexComponent.vue?vue&type=template&id=a55a3450&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_a55a3450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_a55a3450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);