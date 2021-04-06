(window.webpackJsonp=window.webpackJsonp||[]).push([[19,23],{249:function(t,e,o){"use strict";o.r(e);var n=o(2),s={name:"IndexComponent",components:{AddNetworkComponent:o(72).default},data:function(){return{isModalVisible:!1,networks_list:[],selected_networks:[],ni:null}},methods:{showModal:function(){this.isModalVisible=!0},closeModal:function(){this.isModalVisible=!1},getNetworks:function(){var t=this;n.a.get("networks/get").then((function(e){if("status"in e.data)throw e.data;t.networks_list=e.data})).catch((function(e){t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},limitString:function(t){return t.length>20?"".concat(t.substring(0,20),"..."):t},destroyNi:function(){this.ni=null},deleteNetwork:function(t){var e=this;confirm("Are you sure you want to delete this network?")&&(this.$vs.loading(),n.a.get("networks/delete/"+t).then((function(t){if(!t.data.status)throw e.$vs.loading.close(),t.data;location.reload()})).catch((function(t){e.$vs.loading.close()})),this.$vs.loading())},editNetwork:function(t){this.ni=t,this.showModal()},cutString:function(t){return t.substring(0,80)+"..."}},beforeMount:function(){this.getNetworks()}},r=o(1),a=Object(r.a)(s,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("vs-card",[o("vs-row",{attrs:{"vs-type":"flex","vs-justify":"space-between","vs-align":"center","vs-w":"12"}},[o("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-start","vs-align":"center"}},[o("div",[o("h3",[t._v("Networks")])])]),t._v(" "),o("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}},[o("vs-button",{attrs:{type:"filled",color:"primary"},on:{click:t.showModal}},[t._v("Add Network")])],1)],1),t._v(" "),o("vs-row",[o("vs-col",[o("vs-table",{attrs:{search:"",data:t.networks_list,multiple:""},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.data;return t._l(n,(function(e,s){return o("vs-tr",{key:s,attrs:{data:e}},[o("vs-td",{attrs:{data:n[s].id}},[t._v(t._s(n[s].id))]),t._v(" "),o("vs-td",{attrs:{data:n[s].network_name}},[t._v(t._s(n[s].network_name))]),t._v(" "),void 0!==n[s].network_tokens[[1]]?o("vs-td",{attrs:{data:n[s].network_tokens[0].token_name}},[t._v("\n                            "+t._s(n[s].network_tokens[0].token_name)+",\n                            "+t._s(n[s].network_tokens[[1]].token_name)+"\n                        ")]):o("vs-td",[t._v(t._s(n[s].network_tokens[0].token_name))]),t._v(" "),void 0!==n[s].network_tokens[[1]]?o("vs-td",{attrs:{data:n[s].network_tokens[0].token}},[t._v("\n                            "+t._s(n[s].network_tokens[0].token)+",\n                            "+t._s(n[s].network_tokens[1].token)+"\n                        ")]):o("vs-td",[o("vx-tooltip",{attrs:{title:"Full",color:"primary",text:n[s].network_tokens[0].token,position:"bottom"}},[t._v("\n                                "+t._s(t.cutString(n[s].network_tokens[0].token))+"\n                            ")])],1),t._v(" "),o("vs-td",[o("vs-icon",{staticClass:"mr-3",attrs:{icon:"create",size:"small",color:"success"},on:{click:function(e){return t.editNetwork(n[s].id)}}}),t._v(" "),o("vs-icon",{attrs:{icon:"delete",size:"small",color:"danger"},on:{click:function(e){return t.deleteNetwork(n[s].id)}}})],1)],1)}))}}]),model:{value:t.selected_networks,callback:function(e){t.selected_networks=e},expression:"selected_networks"}},[o("template",{slot:"header"}),t._v(" "),o("template",{slot:"thead"},[o("vs-th",{attrs:{"sort-key":"id"}},[t._v("ID")]),t._v(" "),o("vs-th",{attrs:{"sort-key":"network_name"}},[t._v("Network Name")]),t._v(" "),o("vs-th",{attrs:{"sort-key":"network_tokens.token_name"}},[t._v("Token Name")]),t._v(" "),o("vs-th",{attrs:{"sort-key":"network_tokens.token"}},[t._v("Token Value")]),t._v(" "),o("vs-th",[t._v("Actions")])],1)],2)],1)],1),t._v(" "),t.isModalVisible?o("modal",{on:{close:t.closeModal},scopedSlots:t._u([{key:"header",fn:function(){return[o("p",[t._v("Add Network")])]},proxy:!0},{key:"body",fn:function(){return[o("add-network-component",{attrs:{ni:t.ni},on:{destroyNi:t.destroyNi}})]},proxy:!0}],null,!1,1869319932)}):t._e()],1)}),[],!1,null,"69b684c4",null);e.default=a.exports},72:function(t,e,o){"use strict";o.r(e);var n=o(2),s={name:"AddNetworkComponent",props:["ni"],data:function(){return{submit:!1,form_fields:{network_name:"",network_id:0,status:1,tokens:[{token_name:"",token:""}]}}},methods:{save:function(){var t=this;this.submit=!0,this.validateNetworkName||(this.form_fields.network_id=null==this.ni?0:this.ni,n.a.post("networks/store",this.form_fields).then((function(t){if(!t.data.status)throw t.data;location.reload()})).catch((function(e){t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})})))},AddToken:function(){this.form_fields.tokens.push({token_name:"",token:""})},removeToken:function(t){this.form_fields.tokens.splice(t,1)},destroyNi:function(){this.$emit("destroyNi")},getNetwork:function(){var t=this;this.$vs.loading(),n.a.get("networks/get/"+this.ni).then((function(e){if(!e.data.status)throw e.data;t.form_fields.network_name=e.data.network_name,t.form_fields.tokens=e.data.network_tokens,t.$vs.loading.close()})).catch((function(e){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))}},computed:{validateNetworkName:function(){return""===this.form_fields.network_name}},beforeMount:function(){null!==this.ni&&this.getNetwork()},destroyed:function(){this.destroyNi()}},r=o(1),a=Object(r.a)(s,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("vs-row",{attrs:{"vs-w":"12"}},[o("vs-col",[o("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Network Name"},model:{value:t.form_fields.network_name,callback:function(e){t.$set(t.form_fields,"network_name",e)},expression:"form_fields.network_name"}}),t._v(" "),t.submit&&t.validateNetworkName?o("span",{staticClass:"error"},[t._v("Network name is required!")]):t._e()],1)],1),t._v(" "),t._l(t.form_fields.tokens,(function(e,n){return o("vs-row",{staticClass:"mb-3 mt-3",attrs:{"vs-w":"12"}},[o("vs-col",{attrs:{"vs-w":"4"}},[o("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Token Name"},model:{value:e.token_name,callback:function(o){t.$set(e,"token_name",o)},expression:"item.token_name"}})],1),t._v(" "),o("vs-col",{staticClass:"mr-3 ml-3",attrs:{"vs-w":"4"}},[o("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Token"},model:{value:e.token,callback:function(o){t.$set(e,"token",o)},expression:"item.token"}})],1),t._v(" "),o("vs-col",{attrs:{"vs-w":"2"}},[o("vs-button",{staticClass:"mt-5",attrs:{"icon-pack":"feather",icon:"icon-minus-square",type:"border",color:"dark",disabled:t.form_fields.tokens.length<=1},on:{click:function(e){return t.removeToken(n)}}})],1)],1)})),t._v(" "),o("vs-row",{attrs:{"vs-w":"12"}},[o("vs-col",[o("vs-button",{attrs:{size:"small",color:"dark",type:"border"},on:{click:t.AddToken}},[t._v("+ Add Token")])],1)],1),t._v(" "),o("vs-row",{staticClass:"mt-5",attrs:{"vs-w":"12"}},[o("vs-col",[o("vs-button",{attrs:{color:"success",type:"filled"},on:{click:t.save}},[t._v("Save")])],1)],1)],2)}),[],!1,null,"207a4cb0",null);e.default=a.exports}}]);