(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{166:function(t,s,e){"use strict";var a=e(41);e.n(a).a},167:function(t,s,e){(t.exports=e(6)(!1)).push([t.i,".info[data-v-3e60eb11]{color:#ff9f43;font-weight:600}.input_like--p[data-v-3e60eb11]{max-width:200px;width:100%;height:30px}[dir] .input_like--p[data-v-3e60eb11]{border:1px solid;border-radius:5px}.input_like--submit[data-v-3e60eb11]{max-width:80px;width:100%}[dir] .input_like--submit[data-v-3e60eb11]{text-align:center;padding:3px 5px;border:1px solid;border-radius:5px;margin-top:5px}",""])},237:function(t,s,e){"use strict";e.r(s);var a=e(2),i=e(8),o=e.n(i),n={name:"AddCampaignComponent",props:["ci"],components:{"v-select":o.a},data:function(){return{submit:!1,form_fields:{campaign_name:"",pixel_id:"",offer_id:"",rotator_id:"",platform:"",ci:null,settings:{first_name:!0,last_name:!0,country:!0,phone:!0,email:!0,password:!0}},pixels_list:[],rotators_list:[],platform_list:[{id:1,platform_name:"Facebook"},{id:2,platform_name:"Google"},{id:3,platform_name:"Pinterest"}]}},methods:{save:function(){var t=this;if(this.submit=!0,this.validateCampaignName)return!1;this.$vs.loading(),this.form_fields.ci=null==this.ci?0:this.ci,a.a.post("campaigns/store",this.form_fields).then((function(t){if(!t.data.status)throw t.data;location.reload()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getPixels:function(){var t=this;a.a.get("pixels/all").then((function(s){if("status"in s.data)throw s.data;t.pixels_list=s.data})).catch((function(s){t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getRotators:function(){var t=this;a.a.get("rotators/get").then((function(s){if("status"in s.data)throw s.data;t.rotators_list=s.data})).catch((function(s){t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getCampaign:function(){var t=this;this.$vs.loading(),a.a.get("campaigns/get/"+this.ci).then((function(s){t.form_fields.campaign_name=s.data[0].campaign_name,t.form_fields.offer_id=s.data[0].offer_id,t.form_fields.rotator_id=s.data[0].rotator_id,t.form_fields.platform=Number(s.data[0].platform),t.form_fields.pixel_id=Number(s.data[0].pixel_id),t.$vs.loading.close()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},destroyCI:function(){this.$emit("destroyci")}},computed:{validateCampaignName:function(){return""===this.form_fields.campaign_name}},beforeMount:function(){this.getRotators(),this.getPixels(),null!==this.ci&&this.getCampaign()},destroyed:function(){this.destroyCI()}},l=(e(166),e(1)),r={name:"IndexComponent",components:{AddCampaignComponent:Object(l.a)(n,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("vs-row",{attrs:{"vs-w":"12"}},[e("vs-col",[e("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Campaign Name"},model:{value:t.form_fields.campaign_name,callback:function(s){t.$set(t.form_fields,"campaign_name",s)},expression:"form_fields.campaign_name"}}),t._v(" "),t.submit&&t.validateCampaignName?e("span",{staticClass:"error"},[t._v("Campaign name is required!")]):t._e()],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-3",attrs:{"vs-w":"12"}},[e("vs-col",[e("label",{attrs:{for:"Pixel"}},[t._v("Select Pixel(optional):")]),t._v(" "),e("v-select",{attrs:{label:"pixel_name",id:"Pixel",options:t.pixels_list,reduce:function(t){return t.id}},model:{value:t.form_fields.pixel_id,callback:function(s){t.$set(t.form_fields,"pixel_id",s)},expression:"form_fields.pixel_id"}}),t._v(" "),e("span",{staticClass:"info"},[t._v("Select offer associated with the campaign")])],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-3 mb-3",attrs:{"vs-w":"12"}},[e("vs-col",[e("label",{attrs:{for:"Rotator"}},[t._v("Select Rotator(optional):")]),t._v(" "),e("v-select",{attrs:{label:"rotator_name",id:"Rotator",options:t.rotators_list,reduce:function(t){return t.id}},model:{value:t.form_fields.rotator_id,callback:function(s){t.$set(t.form_fields,"rotator_id",s)},expression:"form_fields.rotator_id"}}),t._v(" "),e("span",{staticClass:"info"},[t._v("Select network associated with the campaign")])],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-3 mb-3",attrs:{"vs-w":"12"}},[e("vs-col",[e("label",{attrs:{for:"Platform"}},[t._v("Select Platform(optional):")]),t._v(" "),e("v-select",{attrs:{label:"platform_name",id:"Platform",options:t.platform_list,reduce:function(t){return t.id}},model:{value:t.form_fields.platform,callback:function(s){t.$set(t.form_fields,"platform",s)},expression:"form_fields.platform"}}),t._v(" "),e("span",{staticClass:"info"},[t._v("Select platform associated with the campaign")])],1)],1),t._v(" "),e("vs-divider"),t._v(" "),e("div",{staticClass:"mt-3 mb-3"},[e("p",{staticClass:"info"},[t._v("Select form fields you wish to display for this campaign")]),t._v(" "),e("p",{staticClass:"mb-3 info"},[t._v("By default all fields will be displayed")]),t._v(" "),e("vs-row",{attrs:{"vs-w":"12","vs-type":"flex","vs-justify":"space-between"}},[e("vs-col",{attrs:{"vs-w":"3"}},[e("ul",{staticClass:"centerx"},[e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.first_name,callback:function(s){t.$set(t.form_fields.settings,"first_name",s)},expression:"form_fields.settings.first_name"}},[t._v("First Name")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.last_name,callback:function(s){t.$set(t.form_fields.settings,"last_name",s)},expression:"form_fields.settings.last_name"}},[t._v("Last Name")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.country,callback:function(s){t.$set(t.form_fields.settings,"country",s)},expression:"form_fields.settings.country"}},[t._v("Country")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.phone,callback:function(s){t.$set(t.form_fields.settings,"phone",s)},expression:"form_fields.settings.phone"}},[t._v("Phone")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.email,callback:function(s){t.$set(t.form_fields.settings,"email",s)},expression:"form_fields.settings.email"}},[t._v("Email")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.password,callback:function(s){t.$set(t.form_fields.settings,"password",s)},expression:"form_fields.settings.password"}},[t._v("Password")])],1)])]),t._v(" "),e("vs-col",{attrs:{"vs-w":"9"}},[t.form_fields.settings.first_name?e("p",{staticClass:"input_like--label"},[t._v("First Name:")]):t._e(),t._v(" "),t.form_fields.settings.first_name?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.last_name?e("p",{staticClass:"input_like--label"},[t._v("Last Name:")]):t._e(),t._v(" "),t.form_fields.settings.last_name?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.country?e("p",{staticClass:"input_like--label"},[t._v("Country:")]):t._e(),t._v(" "),t.form_fields.settings.country?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.phone?e("p",{staticClass:"input_like--label"},[t._v("Phone:")]):t._e(),t._v(" "),t.form_fields.settings.phone?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.email?e("p",{staticClass:"input_like--label"},[t._v("Email:")]):t._e(),t._v(" "),t.form_fields.settings.email?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.password?e("p",{staticClass:"input_like--label"},[t._v("Password:")]):t._e(),t._v(" "),t.form_fields.settings.password?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),e("p",{staticClass:"input_like--submit"},[t._v("Submit")])])],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-5",attrs:{"vs-w":"12"}},[e("vs-col",[e("vs-button",{attrs:{color:"success",type:"filled"},on:{click:t.save}},[t._v("Save")])],1)],1)],1)}),[],!1,null,"3e60eb11",null).exports,"v-select":o.a},data:function(){return{selected_campaigns:[],isModalVisible:!1,campaigns_list:[],campaign_id:null,actions_list:[{id:0,text:"Delete"},{id:1,text:"Pause"},{id:2,text:"Active"}],selected_action:0}},methods:{showModal:function(){this.isModalVisible=!0},closeModal:function(){this.isModalVisible=!1},getCampaigns:function(){var t=this;this.$vs.loading(),a.a.get("campaigns/get").then((function(s){if("status"in s.data)throw s.data;t.campaigns_list=s.data,t.$vs.loading.close()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},editCampaign:function(t){this.campaign_id=t,this.showModal()},destroyci:function(){this.campaign_id=null},sendAction:function(){var t=this,s=1===this.selected_action?"pause":"delete";this.selected_campaigns.length<=0||!confirm("Are you sure you want to "+s+" campaigns")||(this.$vs.loading(),a.a.post("campaigns/alter",{status:this.selected_action,campaigns:this.selected_campaigns}).then((function(t){if(!t.data.status)throw t.data;location.reload()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})})))}},beforeMount:function(){this.getCampaigns()}},c=Object(l.a)(r,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("vs-card",[e("vs-row",{attrs:{"vs-type":"flex","vs-justify":"space-between","vs-align":"center","vs-w":"12"}},[e("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-start","vs-align":"center"}},[e("div",[e("h3",[t._v("Campaigns")])])]),t._v(" "),e("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}},[e("vs-button",{attrs:{type:"filled",color:"primary"},on:{click:t.showModal}},[t._v("Add Campaign")])],1)],1),t._v(" "),e("vs-divider"),t._v(" "),e("vs-row",{staticClass:"mt-4 mb-4",attrs:{"vs-type":"flex","vs-justify":"flex-start","vs-align":"center","vs-w":"12"}},[e("vs-col",{attrs:{"vs-w":"2"}},[e("label",{attrs:{for:"Actions"}},[t._v("Actions:")]),t._v(" "),e("v-select",{attrs:{disabled:t.selected_campaigns.length<=0,label:"text",id:"Actions",options:t.actions_list,reduce:function(t){return t.id}},model:{value:t.selected_action,callback:function(s){t.selected_action=s},expression:"selected_action"}})],1),t._v(" "),e("vs-col",{staticClass:"mt-2 ml-5",attrs:{"vs-w":"2"}},[e("vs-button",{attrs:{disabled:t.selected_campaigns.length<=0,color:"success",type:"border"},on:{click:t.sendAction}},[t._v("Go\n            ")])],1)],1),t._v(" "),e("vs-row",[e("vs-col",[e("vs-table",{attrs:{search:"",data:t.campaigns_list,multiple:""},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.data;return t._l(a,(function(s,i){return e("vs-tr",{key:i,attrs:{data:s}},[e("vs-td",{attrs:{data:a[i].id}},[t._v(t._s(a[i].id))]),t._v(" "),e("vs-td",{attrs:{data:a[i].campaign_name}},[t._v(t._s(a[i].campaign_name))]),t._v(" "),e("vs-td",{attrs:{data:a[i].rotator_name}},[t._v(t._s(a[i].rotator_name))]),t._v(" "),e("vs-td",{attrs:{data:a[i].offer_name}},[t._v(t._s(a[i].offer_name))]),t._v(" "),e("vs-td",{attrs:{data:a[i].platform}},[t._v(t._s(a[i].platform))]),t._v(" "),e("vs-td",[t._v(t._s("&ci="+a[i].id+"&ri="+a[i].rotator_id+"&oi="+a[i].offer_id)+"\n                        ")]),t._v(" "),2===a[i].status?e("vs-td",{attrs:{data:a[i].status}},[t._v("Active")]):e("vs-td",{attrs:{data:a[i].status}},[t._v("Paused")]),t._v(" "),e("vs-td",[e("vs-button",{attrs:{color:"success",size:"small"},on:{click:function(s){return t.editCampaign(a[i].id)}}},[t._v("Edit\n                            ")])],1)],1)}))}}]),model:{value:t.selected_campaigns,callback:function(s){t.selected_campaigns=s},expression:"selected_campaigns"}},[e("template",{slot:"header"}),t._v(" "),e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"id"}},[t._v("CI")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"campaign_name"}},[t._v("Campaign Name")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"network_name"}},[t._v("Network Name")]),t._v(" "),e("vs-th",{attrs:{sort_key:"offer_name"}},[t._v("Offer Name")]),t._v(" "),e("vs-th",{attrs:{sort_key:"platform"}},[t._v("Platform")]),t._v(" "),e("vs-th",[t._v("URL parameters")]),t._v(" "),e("vs-th",{attrs:{sort_key:"status"}},[t._v("Status")]),t._v(" "),e("vs-th",[t._v("Actions")])],1)],2)],1)],1),t._v(" "),t.isModalVisible?e("modal",{on:{close:t.closeModal},scopedSlots:t._u([{key:"header",fn:function(){return[e("p",[t._v("Add Campaign")])]},proxy:!0},{key:"body",fn:function(){return[e("add-campaign-component",{attrs:{ci:t.campaign_id},on:{destroyci:t.destroyci}})]},proxy:!0}],null,!1,3583378586)}):t._e()],1)}),[],!1,null,"29902a09",null);s.default=c.exports},41:function(t,s,e){var a=e(167);"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};e(7)(a,i);a.locals&&(t.exports=a.locals)}}]);