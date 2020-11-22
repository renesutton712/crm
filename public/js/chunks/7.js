(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{165:function(t,s,e){"use strict";var a=e(41);e.n(a).a},166:function(t,s,e){(t.exports=e(6)(!1)).push([t.i,".info[data-v-2a73621d]{color:#ff9f43;font-weight:600}.input_like--p[data-v-2a73621d]{max-width:200px;width:100%;height:30px}[dir] .input_like--p[data-v-2a73621d]{border:1px solid;border-radius:5px}.input_like--submit[data-v-2a73621d]{max-width:80px;width:100%}[dir] .input_like--submit[data-v-2a73621d]{text-align:center;padding:3px 5px;border:1px solid;border-radius:5px;margin-top:5px}.error[data-v-2a73621d]{color:red}[dir] .error[data-v-2a73621d]{margin:2px 0}",""])},237:function(t,s,e){"use strict";e.r(s);var a=e(2),i=e(8),o=e.n(i),r={name:"AddCampaignComponent",props:["ci"],components:{"v-select":o.a},data:function(){return{submit:!1,form_fields:{campaign_name:"",pixel_id:"",iframe_id:"",offer_id:"",rotator_id:"",platform_id:"",ci:null,settings:{first_name:!0,last_name:!0,country:!0,phone:!0,email:!0,password:!0}},pixels_list:[],iframe_list:[],rotators_list:[],offers_list:[],platform_list:[{id:1,platform_name:"Facebook"},{id:2,platform_name:"Google"},{id:3,platform_name:"Pinterest"}]}},methods:{save:function(){var t=this;if(this.submit=!0,this.validateCampaignName||this.validateOffer||this.validatePostback||this.validateRotator)return!1;this.$vs.loading(),this.form_fields.ci=null==this.ci?0:this.ci,a.a.post("campaigns/store",this.form_fields).then((function(t){if(!t.data.status)throw t.data;location.reload()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getPixels:function(){var t=this;a.a.get("pixels/all").then((function(s){if("status"in s.data)throw s.data;t.pixels_list=s.data})).catch((function(s){t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getRotators:function(){var t=this;a.a.get("rotators/get").then((function(s){if("status"in s.data)throw s.data;t.rotators_list=s.data})).catch((function(s){t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getOffers:function(){var t=this;a.a.get("offers/get").then((function(s){if("status"in s.data)throw s.data;t.offers_list=s.data})).catch((function(s){t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getCampaign:function(){var t=this;this.$vs.loading(),a.a.get("campaigns/get/"+this.ci).then((function(s){t.form_fields.campaign_name=s.data[0].campaign_name,t.form_fields.offer_id=s.data[0].offer_id,t.form_fields.rotator_id=s.data[0].rotator_id,t.form_fields.platform_id=Number(s.data[0].platform),t.form_fields.pixel_id=Number(s.data[0].pixel_id),t.form_fields.iframe_id=Number(s.data[0].iframe_id),t.$vs.loading.close()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getIframePixels:function(){var t=this;this.$vs.loading(),a.a.get("iframe/get").then((function(s){t.iframe_list=s.data,t.$vs.loading.close()})).catch((function(s){console.log(s),t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},destroyCI:function(){this.$emit("destroyci")}},computed:{validateCampaignName:function(){return""===this.form_fields.campaign_name},validateOffer:function(){return""===this.form_fields.offer_id},validatePostback:function(){return""===this.form_fields.pixel_id},validateRotator:function(){return""===this.form_fields.rotator_id&&""===this.form_fields.offer_id}},beforeMount:function(){this.getRotators(),this.getPixels(),this.getIframePixels(),this.getOffers(),null!==this.ci&&this.getCampaign()},destroyed:function(){this.destroyCI()}},n=(e(165),e(1)),l={name:"IndexComponent",components:{AddCampaignComponent:Object(n.a)(r,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("vs-row",{attrs:{"vs-w":"12"}},[e("vs-col",[e("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Campaign Name"},model:{value:t.form_fields.campaign_name,callback:function(s){t.$set(t.form_fields,"campaign_name",s)},expression:"form_fields.campaign_name"}}),t._v(" "),t.submit&&t.validateCampaignName?e("span",{staticClass:"error"},[t._v("Campaign name is required!")]):t._e()],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-3",attrs:{"vs-w":"12"}},[e("vs-col",[e("label",{attrs:{for:"Offer"}},[t._v("Select Offer:")]),t._v(" "),e("v-select",{attrs:{label:"offer_name",id:"Offer",options:t.offers_list,reduce:function(t){return t.offer_id}},model:{value:t.form_fields.offer_id,callback:function(s){t.$set(t.form_fields,"offer_id",s)},expression:"form_fields.offer_id"}}),t._v(" "),t.submit&&t.validateOffer?e("span",{staticClass:"error"},[t._v("Offer is required!")]):t._e()],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-3 mb-3",attrs:{"vs-w":"12"}},[e("vs-col",[e("label",{attrs:{for:"Rotator"}},[t._v("Select Rotator:")]),t._v(" "),e("v-select",{attrs:{label:"rotator_name",id:"Rotator",options:t.rotators_list,reduce:function(t){return t.id}},model:{value:t.form_fields.rotator_id,callback:function(s){t.$set(t.form_fields,"rotator_id",s)},expression:"form_fields.rotator_id"}}),t._v(" "),t.submit&&t.validateRotator?e("span",{staticClass:"error"},[t._v("Rotator is required!")]):t._e()],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-3",attrs:{"vs-w":"12"}},[e("vs-col",[e("label",{attrs:{for:"Postback"}},[t._v("Select Postback:")]),t._v(" "),e("v-select",{attrs:{label:"pixel_name",id:"Postback",options:t.pixels_list,reduce:function(t){return t.id}},model:{value:t.form_fields.pixel_id,callback:function(s){t.$set(t.form_fields,"pixel_id",s)},expression:"form_fields.pixel_id"}}),t._v(" "),t.submit&&t.validatePostback?e("span",{staticClass:"error"},[t._v("Postback is required!")]):t._e()],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-3",attrs:{"vs-w":"12"}},[e("vs-col",[e("label",{attrs:{for:"Iframe"}},[t._v("Select Iframe pixel(optional):")]),t._v(" "),e("v-select",{attrs:{label:"iframe_name",id:"Iframe",options:t.iframe_list,reduce:function(t){return t.id}},model:{value:t.form_fields.iframe_id,callback:function(s){t.$set(t.form_fields,"iframe_id",s)},expression:"form_fields.iframe_id"}}),t._v(" "),e("span",{staticClass:"info"},[t._v("Select iframe pixel to associated with the campaign")])],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-3 mb-3",attrs:{"vs-w":"12"}},[e("vs-col",[e("label",{attrs:{for:"Platform"}},[t._v("Select Platform(optional):")]),t._v(" "),e("v-select",{attrs:{label:"platform_name",id:"Platform",options:t.platform_list,reduce:function(t){return t.id}},model:{value:t.form_fields.platform_id,callback:function(s){t.$set(t.form_fields,"platform_id",s)},expression:"form_fields.platform_id"}}),t._v(" "),e("span",{staticClass:"info"},[t._v("Select platform associated with the campaign")])],1)],1),t._v(" "),e("vs-divider"),t._v(" "),e("div",{staticClass:"mt-3 mb-3"},[e("p",{staticClass:"info"},[t._v("Select form fields you wish to display for this campaign")]),t._v(" "),e("p",{staticClass:"mb-3 info"},[t._v("By default all fields will be displayed")]),t._v(" "),e("vs-row",{attrs:{"vs-w":"12","vs-type":"flex","vs-justify":"space-between"}},[e("vs-col",{attrs:{"vs-w":"3"}},[e("ul",{staticClass:"centerx"},[e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.first_name,callback:function(s){t.$set(t.form_fields.settings,"first_name",s)},expression:"form_fields.settings.first_name"}},[t._v("First Name")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.last_name,callback:function(s){t.$set(t.form_fields.settings,"last_name",s)},expression:"form_fields.settings.last_name"}},[t._v("Last Name")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.country,callback:function(s){t.$set(t.form_fields.settings,"country",s)},expression:"form_fields.settings.country"}},[t._v("Country")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.phone,callback:function(s){t.$set(t.form_fields.settings,"phone",s)},expression:"form_fields.settings.phone"}},[t._v("Phone")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.email,callback:function(s){t.$set(t.form_fields.settings,"email",s)},expression:"form_fields.settings.email"}},[t._v("Email")])],1),t._v(" "),e("li",{staticClass:"mt-2 mb-2"},[e("vs-checkbox",{model:{value:t.form_fields.settings.password,callback:function(s){t.$set(t.form_fields.settings,"password",s)},expression:"form_fields.settings.password"}},[t._v("Password")])],1)])]),t._v(" "),e("vs-col",{attrs:{"vs-w":"9"}},[t.form_fields.settings.first_name?e("p",{staticClass:"input_like--label"},[t._v("First Name:")]):t._e(),t._v(" "),t.form_fields.settings.first_name?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.last_name?e("p",{staticClass:"input_like--label"},[t._v("Last Name:")]):t._e(),t._v(" "),t.form_fields.settings.last_name?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.country?e("p",{staticClass:"input_like--label"},[t._v("Country:")]):t._e(),t._v(" "),t.form_fields.settings.country?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.phone?e("p",{staticClass:"input_like--label"},[t._v("Phone:")]):t._e(),t._v(" "),t.form_fields.settings.phone?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.email?e("p",{staticClass:"input_like--label"},[t._v("Email:")]):t._e(),t._v(" "),t.form_fields.settings.email?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),t.form_fields.settings.password?e("p",{staticClass:"input_like--label"},[t._v("Password:")]):t._e(),t._v(" "),t.form_fields.settings.password?e("p",{staticClass:"input_like--p"}):t._e(),t._v(" "),e("p",{staticClass:"input_like--submit"},[t._v("Submit")])])],1)],1),t._v(" "),e("vs-row",{staticClass:"mt-5",attrs:{"vs-w":"12"}},[e("vs-col",[e("vs-button",{attrs:{color:"success",type:"filled"},on:{click:t.save}},[t._v("Save")])],1)],1)],1)}),[],!1,null,"2a73621d",null).exports,"v-select":o.a},data:function(){return{selected_campaigns:[],isModalVisible:!1,campaigns_list:[],campaign_id:null,actions_list:[{id:0,text:"Delete"},{id:1,text:"Pause"},{id:2,text:"Active"}],platform_names:{1:"Facebook",2:"Google",3:"Pinterest"},selected_action:0}},methods:{showModal:function(){this.isModalVisible=!0},closeModal:function(){this.isModalVisible=!1},getCampaigns:function(){var t=this;this.$vs.loading(),a.a.get("campaigns/get").then((function(s){if("status"in s.data)throw s.data;t.campaigns_list=s.data,t.$vs.loading.close()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},editCampaign:function(t){this.campaign_id=t,this.showModal()},destroyci:function(){this.campaign_id=null},sendAction:function(){var t=this,s=1===this.selected_action?"pause":"delete";this.selected_campaigns.length<=0||!confirm("Are you sure you want to "+s+" campaigns")||(this.$vs.loading(),a.a.post("campaigns/alter",{status:this.selected_action,campaigns:this.selected_campaigns}).then((function(t){if(!t.data.status)throw t.data;location.reload()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})})))}},beforeMount:function(){this.getCampaigns()}},c=Object(n.a)(l,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("vs-card",[e("vs-row",{attrs:{"vs-type":"flex","vs-justify":"space-between","vs-align":"center","vs-w":"12"}},[e("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-start","vs-align":"center"}},[e("div",[e("h3",[t._v("Campaigns")])])]),t._v(" "),e("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}},[e("vs-button",{attrs:{type:"filled",color:"primary"},on:{click:t.showModal}},[t._v("Add Campaign")])],1)],1),t._v(" "),e("vs-divider"),t._v(" "),e("vs-row",{staticClass:"mt-4 mb-4",attrs:{"vs-type":"flex","vs-justify":"flex-start","vs-align":"center","vs-w":"12"}},[e("vs-col",{attrs:{"vs-w":"2"}},[e("label",{attrs:{for:"Actions"}},[t._v("Actions:")]),t._v(" "),e("v-select",{attrs:{disabled:t.selected_campaigns.length<=0,label:"text",id:"Actions",options:t.actions_list,reduce:function(t){return t.id}},model:{value:t.selected_action,callback:function(s){t.selected_action=s},expression:"selected_action"}})],1),t._v(" "),e("vs-col",{staticClass:"mt-2 ml-5",attrs:{"vs-w":"2"}},[e("vs-button",{attrs:{disabled:t.selected_campaigns.length<=0,color:"success",type:"border"},on:{click:t.sendAction}},[t._v("Go\n            ")])],1)],1),t._v(" "),e("vs-row",[e("vs-col",[e("vs-table",{attrs:{search:"",data:t.campaigns_list,multiple:""},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.data;return t._l(a,(function(s,i){return e("vs-tr",{key:i,attrs:{data:s}},[e("vs-td",{attrs:{data:a[i].id}},[t._v(t._s(a[i].id))]),t._v(" "),e("vs-td",{attrs:{data:a[i].campaign_name}},[t._v(t._s(a[i].campaign_name))]),t._v(" "),e("vs-td",{attrs:{data:a[i].rotator_name}},[t._v(t._s(a[i].rotator_name))]),t._v(" "),e("vs-td",{attrs:{data:a[i].offer_name}},[t._v(t._s(a[i].offer_name))]),t._v(" "),e("vs-td",{attrs:{data:a[i].rotator_name}},[t._v(t._s(a[i].rotator_name))]),t._v(" "),e("vs-td",{attrs:{data:a[i].platform}},[t._v(t._s(t.platform_names[a[i].platform]))]),t._v(" "),e("vs-td",[t._v(t._s("&ci="+a[i].id+"&ri="+a[i].rotator_id+"&oi="+a[i].offer_id)+"\n                        ")]),t._v(" "),2===a[i].status?e("vs-td",{attrs:{data:a[i].status}},[t._v("Active")]):e("vs-td",{attrs:{data:a[i].status}},[t._v("Paused")]),t._v(" "),e("vs-td",[e("vs-button",{attrs:{color:"success",size:"small"},on:{click:function(s){return t.editCampaign(a[i].id)}}},[t._v("Edit\n                            ")])],1)],1)}))}}]),model:{value:t.selected_campaigns,callback:function(s){t.selected_campaigns=s},expression:"selected_campaigns"}},[e("template",{slot:"header"}),t._v(" "),e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"id"}},[t._v("CI")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"campaign_name"}},[t._v("Campaign Name")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"network_name"}},[t._v("Network Name")]),t._v(" "),e("vs-th",{attrs:{sort_key:"offer_name"}},[t._v("Offer Name")]),t._v(" "),e("vs-th",{attrs:{sort_key:"rotator_name"}},[t._v("Rotator Name")]),t._v(" "),e("vs-th",{attrs:{sort_key:"platform"}},[t._v("Platform")]),t._v(" "),e("vs-th",[t._v("URL parameters")]),t._v(" "),e("vs-th",{attrs:{sort_key:"status"}},[t._v("Status")]),t._v(" "),e("vs-th",[t._v("Actions")])],1)],2)],1)],1),t._v(" "),t.isModalVisible?e("modal",{on:{close:t.closeModal},scopedSlots:t._u([{key:"header",fn:function(){return[e("p",[t._v("Add Campaign")])]},proxy:!0},{key:"body",fn:function(){return[e("add-campaign-component",{attrs:{ci:t.campaign_id},on:{destroyci:t.destroyci}})]},proxy:!0}],null,!1,3583378586)}):t._e()],1)}),[],!1,null,"9f31953c",null);s.default=c.exports},41:function(t,s,e){var a=e(166);"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};e(7)(a,i);a.locals&&(t.exports=a.locals)}}]);