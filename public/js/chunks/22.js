(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{238:function(t,e,s){"use strict";s.r(e);var r=s(2),a=s(8),o={name:"AddOfferComponent",components:{"v-select":s.n(a).a},data:function(){return{submit:!1,form_fields:{offer_name:"",network_id:"",offer_url:"",offer_token:"",offer_token_val:""},networks_list:[]}},methods:{save:function(){var t=this;if(this.submit=!0,this.validateOfferName||this.validateNetwork||this.validateOfferToken||this.validateOfferTokenVal)return!1;this.$vs.loading(),r.a.post("offers/store",this.form_fields).then((function(t){if("status"in t.data&&!t.data.status)throw t.data;location.reload()})).catch((function(e){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getNetworks:function(){var t=this;r.a.get("networks/get").then((function(e){if("status"in e.data)throw e.data;t.networks_list=e.data})).catch((function(e){t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))}},computed:{validateOfferName:function(){return""===this.form_fields.offer_name},validateNetwork:function(){return""===this.form_fields.network_id},validateOfferToken:function(){return""===this.form_fields.offer_token},validateOfferTokenVal:function(){return""===this.form_fields.offer_token_val}},beforeMount:function(){this.getNetworks()}},f=s(1),n={name:"IndexComponent",components:{AddOfferComponent:Object(f.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("vs-row",{attrs:{"vs-w":"12"}},[s("vs-col",[s("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Offer Name"},model:{value:t.form_fields.offer_name,callback:function(e){t.$set(t.form_fields,"offer_name",e)},expression:"form_fields.offer_name"}}),t._v(" "),t.submit&&t.validateOfferName?s("span",{staticClass:"error"},[t._v("Offer name is required!")]):t._e()],1)],1),t._v(" "),s("vs-row",{staticClass:"mt-3",attrs:{"vs-w":"12"}},[s("vs-col",[s("label",{attrs:{for:"Network"}},[t._v("Select Network(optional):")]),t._v(" "),s("v-select",{attrs:{label:"network_name",id:"Network",options:t.networks_list,reduce:function(t){return t.id}},model:{value:t.form_fields.network_id,callback:function(e){t.$set(t.form_fields,"network_id",e)},expression:"form_fields.network_id"}}),t._v(" "),t.submit&&t.validateNetwork?s("span",{staticClass:"error"},[t._v("Network is required!")]):t._e()],1)],1),t._v(" "),s("vs-row",{staticClass:"mt-3",attrs:{"vs-w":"12"}},[s("vs-col",{attrs:{"vs-w":"5"}},[s("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Offer URL param key"},model:{value:t.form_fields.offer_token,callback:function(e){t.$set(t.form_fields,"offer_token",e)},expression:"form_fields.offer_token"}}),t._v(" "),t.submit&&t.validateOfferToken?s("span",{staticClass:"error"},[t._v("Offer name is required!")]):t._e()],1),t._v(" "),s("vs-col",{attrs:{"vs-w":"2"}}),t._v(" "),s("vs-col",{attrs:{"vs-w":"5"}},[s("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Offer URL param value"},model:{value:t.form_fields.offer_token_val,callback:function(e){t.$set(t.form_fields,"offer_token_val",e)},expression:"form_fields.offer_token_val"}}),t._v(" "),t.submit&&t.validateOfferTokenVal?s("span",{staticClass:"error"},[t._v("Offer name is required!")]):t._e()],1)],1),t._v(" "),s("vs-row",{staticClass:"mt-3",attrs:{"vs-w":"12"}},[s("vs-col",[s("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Offer URL(Optional)"},model:{value:t.form_fields.offer_url,callback:function(e){t.$set(t.form_fields,"offer_url",e)},expression:"form_fields.offer_url"}})],1)],1),t._v(" "),s("vs-row",{staticClass:"mt-5",attrs:{"vs-w":"12"}},[s("vs-col",[s("vs-button",{attrs:{color:"success",type:"filled"},on:{click:t.save}},[t._v("Save")])],1)],1)],1)}),[],!1,null,"d6ff8402",null).exports},data:function(){return{isModalVisible:!1,offers_list:[],selected_offers:[]}},methods:{showModal:function(){this.isModalVisible=!0},closeModal:function(){this.isModalVisible=!1},getOffers:function(){var t=this;this.$vs.loading(),r.a.get("offers/get").then((function(e){if("string"==typeof e.data)throw e.data;t.offers_list=e.data,t.$vs.loading.close()})).catch((function(e){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))}},beforeMount:function(){this.getOffers()}},l=Object(f.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("vs-card",[s("vs-row",{attrs:{"vs-type":"flex","vs-justify":"space-between","vs-align":"center","vs-w":"12"}},[s("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-start","vs-align":"center"}},[s("div",[s("h3",[t._v("Offers")])])]),t._v(" "),s("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}},[s("vs-button",{attrs:{type:"filled",color:"primary"},on:{click:t.showModal}},[t._v("Add Offer")])],1)],1),t._v(" "),s("vs-row",[s("vs-col",[s("vs-table",{attrs:{search:"",data:t.offers_list,multiple:""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.data;return t._l(r,(function(e,a){return s("vs-tr",{key:a,attrs:{data:e}},[s("vs-td",{attrs:{data:r[a].id}},[t._v(t._s(r[a].id))]),t._v(" "),s("vs-td",{attrs:{data:r[a].network_name}},[t._v(t._s(r[a].network_name))]),t._v(" "),s("vs-td",{attrs:{data:r[a].offer_id}},[t._v(t._s(r[a].offer_id))]),t._v(" "),s("vs-td",{attrs:{data:r[a].offer_name}},[t._v(t._s(r[a].offer_name))]),t._v(" "),s("vs-td",{attrs:{data:r[a].offer_token}},[t._v(t._s(r[a].offer_token))]),t._v(" "),s("vs-td",{attrs:{data:r[a].offer_token_value}},[t._v(t._s(r[a].offer_token_value))]),t._v(" "),s("vs-td",{attrs:{data:r[a].offer_url}},[t._v(t._s(r[a].offer_url))]),t._v(" "),1===r[a].status?s("vs-td",{attrs:{data:r[a].status}},[t._v("Active")]):s("vs-td",{attrs:{data:r[a].status}},[t._v("Not Active")]),t._v(" "),s("vs-td",{attrs:{data:r[a].updated_at}},[t._v(t._s(r[a].updated_at))])],1)}))}}]),model:{value:t.selected_offers,callback:function(e){t.selected_offers=e},expression:"selected_offers"}},[s("template",{slot:"header"}),t._v(" "),s("template",{slot:"thead"},[s("vs-th",{attrs:{sort_key:"id"}},[t._v("ID")]),t._v(" "),s("vs-th",{attrs:{sort_key:"network_name"}},[t._v("Network Name")]),t._v(" "),s("vs-th",{attrs:{"sort-key":"offer_id"}},[t._v("OI")]),t._v(" "),s("vs-th",{attrs:{"sort-key":"offer_name"}},[t._v("Offer Name")]),t._v(" "),s("vs-th",{attrs:{"sort-key":"offer_token"}},[t._v("Offer token key")]),t._v(" "),s("vs-th",{attrs:{"sort-key":"offer_token_value"}},[t._v("Offer token value")]),t._v(" "),s("vs-th",{attrs:{"sort-key":"offer_url"}},[t._v("Offer URL")]),t._v(" "),s("vs-th",{attrs:{sort_key:"status"}},[t._v("Status")]),t._v(" "),s("vs-th",{attrs:{sort_key:"updated_at"}},[t._v("Created")])],1)],2)],1)],1),t._v(" "),t.isModalVisible?s("modal",{on:{close:t.closeModal},scopedSlots:t._u([{key:"header",fn:function(){return[s("p",[t._v("Add Offer")])]},proxy:!0},{key:"body",fn:function(){return[s("add-offer-component")]},proxy:!0}],null,!1,523595451)}):t._e()],1)}),[],!1,null,"0d79b952",null);e.default=l.exports}}]);