(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{240:function(t,e,o){"use strict";o.r(e);var s=o(2),r=o(8),a={name:"AddNewRotator",props:["ri"],components:{"v-select":o.n(r).a},data:function(){return{NaNWeight:!1,submit:!1,networks_list:[],form_fields:{rotator_name:"",networks:[{network_id:"",weight:"",priority:""}],status:1,rotator_id:0},weightErr:{msg:""},maxWeight:100}},methods:{getNetworks:function(){var t=this;s.a.get("networks/get").then((function(e){if("status"in e.data)throw e.data;t.networks_list=e.data})).catch((function(e){t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},destroyRI:function(){this.$emit("destroyri")},addNetwork:function(){this.form_fields.networks.push({network_id:"",weight:"",priority:""})},removeNetwork:function(t){this.form_fields.networks.splice(t,1)},save:function(){var t=this;this.$vs.loading(),this.form_fields.rotator_id=null==this.ri?0:this.ri,this.submit=!0,this.validateRotatorName?this.$vs.loading.close():s.a.post("rotators/store",this.form_fields).then((function(t){if(!t.data.status)throw t.data.msg;location.reload()})).catch((function(e){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:e,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getRotatorData:function(){var t=this;this.$vs.loading(),s.a.get("rotators/get/"+this.ri).then((function(e){t.form_fields.rotator_name=e.data[0].rotator_name,t.form_fields.networks=e.data[0].rotator_group,t.$vs.loading.close()})).catch((function(e){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},validateWeight:function(t){var e=0;if(isNaN(t))return this.NaNWeight=!0,void(this.weightErr.msg="Weight must be a number");this.weightErr.msg="",this.NaNWeight=!1;for(var o=0;o<this.form_fields.networks.length;o++)e+=Number(this.form_fields.networks[o].weight),this.maxWeight<e&&(this.NaNWeight=!0,this.weightErr.msg="Weight is above max percentage (100%)")}},computed:{validateRotatorName:function(){return""===this.form_fields.rotator_name}},beforeMount:function(){this.getNetworks(),null!==this.ri&&this.getRotatorData()},destroyed:function(){this.destroyRI()}},i=o(1),n={name:"IndexComponent",components:{AddNewRotator:Object(i.a)(a,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("vs-row",{attrs:{"vs-w":"12"}},[o("vs-col",[o("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Rotator Name"},model:{value:t.form_fields.rotator_name,callback:function(e){t.$set(t.form_fields,"rotator_name",e)},expression:"form_fields.rotator_name"}}),t._v(" "),t.submit&&t.validateRotatorName?o("span",{staticClass:"error"},[t._v("Rotator name is required!")]):t._e()],1)],1),t._v(" "),o("vs-divider"),t._v(" "),o("h5",[t._v(t._s(t.weightErr.msg))]),t._v(" "),o("vs-divider"),t._v(" "),t._l(t.form_fields.networks,(function(e,s){return o("vs-row",{attrs:{"vs-w":"12"}},[o("vs-col",{attrs:{"vs-w":"4"}},[o("label",{attrs:{for:"Network"}},[t._v("Network:")]),t._v(" "),o("v-select",{attrs:{label:"network_name",id:"Network",options:t.networks_list,reduce:function(t){return t.id}},model:{value:e.network_id,callback:function(o){t.$set(e,"network_id",o)},expression:"item.network_id"}})],1),t._v(" "),o("vs-col",{staticClass:"ml-3 mr-3",attrs:{"vs-w":"2"}},[o("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Weight"},on:{keyup:function(o){return t.validateWeight(e.weight)}},model:{value:e.weight,callback:function(o){t.$set(e,"weight",o)},expression:"item.weight"}})],1),t._v(" "),o("vs-col",{attrs:{"vs-w":"2"}},[o("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Priority"},model:{value:e.priority,callback:function(o){t.$set(e,"priority",o)},expression:"item.priority"}})],1),t._v(" "),o("vs-col",{staticClass:"ml-3",attrs:{"vs-w":"2"}},[o("vs-button",{staticClass:"mt-5",attrs:{"icon-pack":"feather",icon:"icon-minus-square",type:"border",color:"dark",disabled:t.form_fields.networks.length<=1},on:{click:function(e){return t.removeNetwork(s)}}})],1)],1)})),t._v(" "),o("vs-row",{staticClass:"mt-4"},[o("vs-col",[o("vs-button",{attrs:{color:"dark",type:"border"},on:{click:t.addNetwork}},[t._v("Add network")])],1)],1),t._v(" "),o("vs-divider"),t._v(" "),o("vs-row",{staticClass:"mt-5",attrs:{"vs-w":"12","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}},[o("vs-col",{attrs:{"vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}},[o("vs-button",{attrs:{disabled:t.NaNWeight,color:"success",type:"filled"},on:{click:t.save}},[t._v("Save")])],1)],1)],2)}),[],!1,null,"e90ff1f2",null).exports},data:function(){return{isModalVisible:!1,rotators_list:[],selected_rotators:[],rotator_id:null}},methods:{convertDate:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()},showModal:function(){this.isModalVisible=!0},closeModal:function(){this.isModalVisible=!1},getRotators:function(){var t=this;this.$vs.loading(),s.a.get("rotators/get").then((function(e){if(t.rotators_list=e.data,0===t.rotators_list.length)throw"No rotators found";t.$vs.loading.close()})).catch((function(e){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:e,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},editRotator:function(t){this.rotator_id=t,this.showModal()},destroyri:function(){this.rotator_id=null},deleteRotator:function(t){var e=this;confirm("are you sure you want to delete this rotator?")&&(this.$vs.loading(),s.a.get("rotators/delete/"+t).then((function(t){if(!t.data.status)throw t.data;location.reload()})).catch((function(t){e.$vs.loading.close(),e.$vs.notify({title:"Error",text:t.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})})))}},beforeMount:function(){this.getRotators()}},l=Object(i.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("vs-card",[o("vs-row",{attrs:{"vs-type":"flex","vs-justify":"space-between","vs-align":"center","vs-w":"12"}},[o("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-start","vs-align":"center"}},[o("div",[o("h3",[t._v("Rotator")])])]),t._v(" "),o("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}},[o("vs-button",{attrs:{type:"filled",color:"primary"},on:{click:t.showModal}},[t._v("Add Rotator")])],1)],1),t._v(" "),o("vs-row",[o("vs-col",[o("vs-table",{attrs:{search:"",data:t.rotators_list,multiple:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.data;return t._l(s,(function(e,r){return o("vs-tr",{key:r,attrs:{data:e}},[o("vs-td",{attrs:{data:s[r].id}},[t._v(t._s(s[r].id))]),t._v(" "),o("vs-td",{attrs:{data:s[r].rotator_name}},[t._v(t._s(s[r].rotator_name))]),t._v(" "),o("vs-td",{attrs:{data:s[r].status}},[t._v(t._s(s[r].status))]),t._v(" "),o("vs-td",{attrs:{data:s[r].updated_at}},[t._v(t._s(t.convertDate(s[r].updated_at)))]),t._v(" "),o("vs-td",[o("vs-icon",{staticClass:"mr-3",attrs:{icon:"create",size:"small",color:"success"},on:{click:function(e){return t.editRotator(s[r].id)}}}),t._v(" "),o("vs-icon",{attrs:{icon:"delete",size:"small",color:"danger"},on:{click:function(e){return t.deleteRotator(s[r].id)}}})],1)],1)}))}}]),model:{value:t.selected_rotators,callback:function(e){t.selected_rotators=e},expression:"selected_rotators"}},[o("template",{slot:"header"}),t._v(" "),o("template",{slot:"thead"},[o("vs-th",{attrs:{"sort-key":"id"}},[t._v("ID")]),t._v(" "),o("vs-th",{attrs:{"sort-key":"campaign_name"}},[t._v("Rotator Name")]),t._v(" "),o("vs-th",{attrs:{"sort-key":"network_name"}},[t._v("Status")]),t._v(" "),o("vs-th",{attrs:{sort_key:"offer_name"}},[t._v("Created")]),t._v(" "),o("vs-th",[t._v("Actions")])],1)],2)],1)],1),t._v(" "),t.isModalVisible?o("modal",{on:{close:t.closeModal},scopedSlots:t._u([{key:"header",fn:function(){return[o("p",[t._v("Add Rotator")])]},proxy:!0},{key:"body",fn:function(){return[o("add-new-rotator",{attrs:{ri:t.rotator_id},on:{destroyri:t.destroyri}})]},proxy:!0}],null,!1,2319456359)}):t._e()],1)}),[],!1,null,"442836dc",null);e.default=l.exports}}]);