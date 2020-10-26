(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../axios */ "./resources/js/src/axios.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_1__);
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
  name: "AddCampaignComponent",
  props: ['ci'],
  components: {
    'v-select': vue_select__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      submit: false,
      form_fields: {
        campaign_name: '',
        offer_id: '',
        rotator_id: '',
        platform: '',
        ci: null
      },
      offers_list: [],
      rotators_list: [],
      platform_list: [{
        id: 1,
        platform_name: 'Facebook'
      }, {
        id: 2,
        platform_name: 'Google'
      }, {
        id: 3,
        platform_name: 'Pinterest'
      }]
    };
  },
  methods: {
    save: function save() {
      var _this = this;

      this.submit = true;

      if (this.validateCampaignName) {
        return false;
      }

      this.$vs.loading();
      this.form_fields.ci = this.ci == null ? 0 : this.ci;
      _axios__WEBPACK_IMPORTED_MODULE_0__["default"].post('campaigns/store', this.form_fields).then(function (response) {
        if (!response.data) {
          throw response.data;
        } // if ("status" in response.data && !response.data.status) {
        //     throw response.data;
        // }


        location.reload();
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
    },
    getOffers: function getOffers() {
      var _this2 = this;

      _axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('offers/get').then(function (response) {
        if ("status" in response.data) {
          throw response.data;
        }

        _this2.offers_list = response.data;
      }).catch(function (error) {
        _this2.$vs.notify({
          title: 'Error',
          text: error.msg,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        });
      });
    },
    getRotators: function getRotators() {
      var _this3 = this;

      _axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('rotators/get').then(function (response) {
        if ("status" in response.data) {
          throw response.data;
        }

        _this3.rotators_list = response.data;
      }).catch(function (error) {
        _this3.$vs.notify({
          title: 'Error',
          text: error.msg,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        });
      });
    },
    getCampaign: function getCampaign() {
      var _this4 = this;

      this.$vs.loading();
      _axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('campaigns/get/' + this.ci).then(function (response) {
        _this4.form_fields.campaign_name = response.data[0].campaign_name;
        _this4.form_fields.offer_id = response.data[0].offer_id;
        _this4.form_fields.rotator_id = response.data[0].rotator_id;
        _this4.form_fields.platform = Number(response.data[0].platform);

        _this4.$vs.loading.close();
      }).catch(function (error) {
        _this4.$vs.loading.close();

        _this4.$vs.notify({
          title: 'Error',
          text: error.msg,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        });
      });
    },
    destroyCI: function destroyCI() {
      this.$emit('destroyci');
    }
  },
  computed: {
    validateCampaignName: function validateCampaignName() {
      return this.form_fields.campaign_name === '';
    }
  },
  beforeMount: function beforeMount() {
    this.getOffers();
    this.getRotators();

    if (this.ci !== null) {
      this.getCampaign();
    }
  },
  destroyed: function destroyed() {
    this.destroyCI();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddCampaignComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddCampaignComponent */ "./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../axios */ "./resources/js/src/axios.js");
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
    AddCampaignComponent: _AddCampaignComponent__WEBPACK_IMPORTED_MODULE_0__["default"],
    'v-select': vue_select__WEBPACK_IMPORTED_MODULE_2___default.a
  },
  data: function data() {
    return {
      selected_campaigns: [],
      isModalVisible: false,
      campaigns_list: [],
      campaign_id: null,
      actions_list: [{
        id: 0,
        text: 'Delete'
      }, {
        id: 1,
        text: 'Pause'
      }, {
        id: 2,
        text: 'Active'
      }],
      selected_action: 0
    };
  },
  methods: {
    showModal: function showModal() {
      this.isModalVisible = true;
    },
    closeModal: function closeModal() {
      this.isModalVisible = false;
    },
    getCampaigns: function getCampaigns() {
      var _this = this;

      this.$vs.loading();
      _axios__WEBPACK_IMPORTED_MODULE_1__["default"].get('campaigns/get').then(function (response) {
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
    },
    editCampaign: function editCampaign(ci) {
      this.campaign_id = ci;
      this.showModal();
    },
    destroyci: function destroyci() {
      this.campaign_id = null;
    },
    sendAction: function sendAction() {
      var _this2 = this;

      var action = this.selected_action === 1 ? 'pause' : 'delete';

      if (this.selected_campaigns.length <= 0 || !confirm('Are you sure you want to ' + action + ' campaigns')) {
        return;
      }

      this.$vs.loading();
      _axios__WEBPACK_IMPORTED_MODULE_1__["default"].post('campaigns/alter', {
        status: this.selected_action,
        campaigns: this.selected_campaigns
      }).then(function (response) {
        if (!response.data.status) {
          throw response.data;
        }

        location.reload();
      }).catch(function (error) {
        _this2.$vs.loading.close();

        _this2.$vs.notify({
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
    this.getCampaigns();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".info[data-v-732bbead] {\n  color: #ff9f43;\n  font-weight: 600;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--7-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/lib??ref--7-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=template&id=732bbead&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=template&id=732bbead&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
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
                attrs: { "label-placeholder": "Campaign Name" },
                model: {
                  value: _vm.form_fields.campaign_name,
                  callback: function($$v) {
                    _vm.$set(_vm.form_fields, "campaign_name", $$v)
                  },
                  expression: "form_fields.campaign_name"
                }
              }),
              _vm._v(" "),
              _vm.submit && _vm.validateCampaignName
                ? _c("span", { staticClass: "error" }, [
                    _vm._v("Campaign name is required!")
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
              _c("label", { attrs: { for: "Offer" } }, [
                _vm._v("Select Offer(optional):")
              ]),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  label: "offer_name",
                  id: "Offer",
                  options: _vm.offers_list,
                  reduce: function(offer) {
                    return offer.offer_id
                  }
                },
                model: {
                  value: _vm.form_fields.offer_id,
                  callback: function($$v) {
                    _vm.$set(_vm.form_fields, "offer_id", $$v)
                  },
                  expression: "form_fields.offer_id"
                }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "info" }, [
                _vm._v("Select offer associated with the campaign")
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
        { staticClass: "mt-3 mb-3", attrs: { "vs-w": "12" } },
        [
          _c(
            "vs-col",
            [
              _c("label", { attrs: { for: "Rotator" } }, [
                _vm._v("Select Rotator(optional):")
              ]),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  label: "rotator_name",
                  id: "Rotator",
                  options: _vm.rotators_list,
                  reduce: function(rotator) {
                    return rotator.id
                  }
                },
                model: {
                  value: _vm.form_fields.rotator_id,
                  callback: function($$v) {
                    _vm.$set(_vm.form_fields, "rotator_id", $$v)
                  },
                  expression: "form_fields.rotator_id"
                }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "info" }, [
                _vm._v("Select network associated with the campaign")
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
        { staticClass: "mt-3 mb-3", attrs: { "vs-w": "12" } },
        [
          _c(
            "vs-col",
            [
              _c("label", { attrs: { for: "Platform" } }, [
                _vm._v("Select Platform(optional):")
              ]),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  label: "platform_name",
                  id: "Platform",
                  options: _vm.platform_list,
                  reduce: function(platform) {
                    return platform.id
                  }
                },
                model: {
                  value: _vm.form_fields.platform,
                  callback: function($$v) {
                    _vm.$set(_vm.form_fields, "platform", $$v)
                  },
                  expression: "form_fields.platform"
                }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "info" }, [
                _vm._v("Select platform associated with the campaign")
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=template&id=74802f0c&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=template&id=74802f0c&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
            [_c("div", [_c("h3", [_vm._v("Campaigns")])])]
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
                [_vm._v("Add Campaign")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("vs-divider"),
      _vm._v(" "),
      _c(
        "vs-row",
        {
          staticClass: "mt-4 mb-4",
          attrs: {
            "vs-type": "flex",
            "vs-justify": "flex-start",
            "vs-align": "center",
            "vs-w": "12"
          }
        },
        [
          _c(
            "vs-col",
            { attrs: { "vs-w": "2" } },
            [
              _c("label", { attrs: { for: "Actions" } }, [_vm._v("Actions:")]),
              _vm._v(" "),
              _c("v-select", {
                attrs: {
                  disabled: _vm.selected_campaigns.length <= 0,
                  label: "text",
                  id: "Actions",
                  options: _vm.actions_list,
                  reduce: function(action) {
                    return action.id
                  }
                },
                model: {
                  value: _vm.selected_action,
                  callback: function($$v) {
                    _vm.selected_action = $$v
                  },
                  expression: "selected_action"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "vs-col",
            { staticClass: "mt-2 ml-5", attrs: { "vs-w": "2" } },
            [
              _c(
                "vs-button",
                {
                  attrs: {
                    disabled: _vm.selected_campaigns.length <= 0,
                    color: "success",
                    type: "border"
                  },
                  on: { click: _vm.sendAction }
                },
                [_vm._v("Go\n            ")]
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
                  attrs: { search: "", data: _vm.campaigns_list, multiple: "" },
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
                                {
                                  attrs: { data: data[indextr].campaign_name }
                                },
                                [_vm._v(_vm._s(data[indextr].campaign_name))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].rotator_name } },
                                [_vm._v(_vm._s(data[indextr].rotator_name))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].offer_name } },
                                [_vm._v(_vm._s(data[indextr].offer_name))]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].platform } },
                                [_vm._v(_vm._s(data[indextr].platform))]
                              ),
                              _vm._v(" "),
                              _c("vs-td", [
                                _vm._v(
                                  _vm._s(
                                    "&ci=" +
                                      data[indextr].id +
                                      "&ri=" +
                                      data[indextr].rotator_id +
                                      "&oi=" +
                                      data[indextr].offer_id
                                  ) + "\n                        "
                                )
                              ]),
                              _vm._v(" "),
                              data[indextr].status === 2
                                ? _c(
                                    "vs-td",
                                    { attrs: { data: data[indextr].status } },
                                    [_vm._v("Active")]
                                  )
                                : _c(
                                    "vs-td",
                                    { attrs: { data: data[indextr].status } },
                                    [_vm._v("Paused")]
                                  ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                [
                                  _c(
                                    "vs-button",
                                    {
                                      attrs: {
                                        color: "success",
                                        size: "small"
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.editCampaign(
                                            data[indextr].id
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "Edit\n                            "
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        })
                      }
                    }
                  ]),
                  model: {
                    value: _vm.selected_campaigns,
                    callback: function($$v) {
                      _vm.selected_campaigns = $$v
                    },
                    expression: "selected_campaigns"
                  }
                },
                [
                  _c("template", { slot: "header" }),
                  _vm._v(" "),
                  _c(
                    "template",
                    { slot: "thead" },
                    [
                      _c("vs-th", { attrs: { "sort-key": "id" } }, [
                        _vm._v("CI")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "campaign_name" } }, [
                        _vm._v("Campaign Name")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "network_name" } }, [
                        _vm._v("Network Name")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { sort_key: "offer_name" } }, [
                        _vm._v("Offer Name")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { sort_key: "platform" } }, [
                        _vm._v("Platform")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("URL parameters")]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { sort_key: "status" } }, [
                        _vm._v("Status")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v("Actions")])
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
                    return [_c("p", [_vm._v("Add Campaign")])]
                  },
                  proxy: true
                },
                {
                  key: "body",
                  fn: function() {
                    return [
                      _c("add-campaign-component", {
                        attrs: { ci: _vm.campaign_id },
                        on: { destroyci: _vm.destroyci }
                      })
                    ]
                  },
                  proxy: true
                }
              ],
              null,
              false,
              3583378586
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

/***/ "./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddCampaignComponent_vue_vue_type_template_id_732bbead_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddCampaignComponent.vue?vue&type=template&id=732bbead&scoped=true& */ "./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=template&id=732bbead&scoped=true&");
/* harmony import */ var _AddCampaignComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddCampaignComponent.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AddCampaignComponent_vue_vue_type_style_index_0_id_732bbead_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css& */ "./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AddCampaignComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddCampaignComponent_vue_vue_type_template_id_732bbead_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddCampaignComponent_vue_vue_type_template_id_732bbead_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "732bbead",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/campaigns/AddCampaignComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddCampaignComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css&":
/*!**********************************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_style_index_0_id_732bbead_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader??ref--7-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/lib??ref--7-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=style&index=0&id=732bbead&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_style_index_0_id_732bbead_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_style_index_0_id_732bbead_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_style_index_0_id_732bbead_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_style_index_0_id_732bbead_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_style_index_0_id_732bbead_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=template&id=732bbead&scoped=true&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=template&id=732bbead&scoped=true& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_template_id_732bbead_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddCampaignComponent.vue?vue&type=template&id=732bbead&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/AddCampaignComponent.vue?vue&type=template&id=732bbead&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_template_id_732bbead_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCampaignComponent_vue_vue_type_template_id_732bbead_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/pages/campaigns/IndexComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/views/pages/campaigns/IndexComponent.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IndexComponent_vue_vue_type_template_id_74802f0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=template&id=74802f0c&scoped=true& */ "./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=template&id=74802f0c&scoped=true&");
/* harmony import */ var _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexComponent.vue?vue&type=script&lang=js& */ "./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IndexComponent_vue_vue_type_template_id_74802f0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IndexComponent_vue_vue_type_template_id_74802f0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "74802f0c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/campaigns/IndexComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=template&id=74802f0c&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=template&id=74802f0c&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_74802f0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./IndexComponent.vue?vue&type=template&id=74802f0c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/pages/campaigns/IndexComponent.vue?vue&type=template&id=74802f0c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_74802f0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IndexComponent_vue_vue_type_template_id_74802f0c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);