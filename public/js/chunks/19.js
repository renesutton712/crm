(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{241:function(e,t,i){"use strict";i.r(t);var s=i(2),a={name:"AddNewIframePixel",props:["p_id"],data:function(){return{submit:!1,form_fields:{pixel_id:0,pixel_name:"",pixel_content:""}}},methods:{save:function(){var e=this;this.$vs.loading(),this.form_fields.pixel_id=null==this.p_id?0:this.p_id,s.a.post("iframe/store",this.form_fields).then((function(e){if(!e.data.status)throw e.data;location.reload()})).catch((function(t){e.$vs.loading.close(),e.$vs.notify({title:"Error",text:t.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},getIframeContent:function(){var e=this;this.$vs.loading(),s.a.get("iframe/get/"+this.p_id).then((function(t){e.form_fields.pixel_id=t.data.id,e.form_fields.pixel_name=t.data.iframe_name,e.form_fields.pixel_content=t.data.iframe_content,e.$vs.loading.close()})).catch((function(t){e.$vs.loading.close(),e.$vs.notify({title:"Error",text:t.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))}},computed:{validatePixelName:function(){return""===this.form_fields.network_name}},beforeMount:function(){null!==this.p_id&&this.getIframeContent()},destroyed:function(){this.$emit("destroyPID")}},n=i(1),o={name:"IndexComponent",components:{AddNewIframePixel:Object(n.a)(a,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("vs-row",{attrs:{"vs-w":"12"}},[i("vs-col",[i("vs-input",{staticClass:"w-full",attrs:{"label-placeholder":"Pixel Name"},model:{value:e.form_fields.pixel_name,callback:function(t){e.$set(e.form_fields,"pixel_name",t)},expression:"form_fields.pixel_name"}}),e._v(" "),e.submit&&e.validatePixelName?i("span",{staticClass:"error"},[e._v("Pixel name is required!")]):e._e()],1)],1),e._v(" "),i("vs-row",{staticClass:"mt-4",attrs:{"vs-w":"12"}},[i("vs-col",[i("vs-textarea",{attrs:{label:"Pixel Content",height:"400px"},model:{value:e.form_fields.pixel_content,callback:function(t){e.$set(e.form_fields,"pixel_content",t)},expression:"form_fields.pixel_content"}})],1)],1),e._v(" "),i("vs-row",{staticClass:"mt-5",attrs:{"vs-w":"12"}},[i("vs-col",[i("vs-button",{attrs:{color:"success",type:"filled"},on:{click:e.save}},[e._v("Save")])],1)],1)],1)}),[],!1,null,"6e72ed58",null).exports},data:function(){return{isModalVisible:!1,p_id:null,iframe_list:[],selected_iframes:[]}},methods:{showModal:function(){this.isModalVisible=!0},closeModal:function(){this.isModalVisible=!1},getPixels:function(){var e=this;this.$vs.loading(),s.a.get("iframe/get").then((function(t){e.iframe_list=t.data,e.$vs.loading.close()})).catch((function(t){console.log(t),e.$vs.loading.close(),e.$vs.notify({title:"Error",text:t.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))},destroyPID:function(){this.p_id=null},deleteIframePixel:function(e){var t=this;confirm("Are you sure you want to delete this network?")&&(this.$vs.loading(),s.a.get("iframe/delete/"+e).then((function(e){if(!e.data.status)throw t.$vs.loading.close(),e.data;location.reload()})).catch((function(e){t.$vs.loading.close(),t.$vs.loading.close(),t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})})),this.$vs.loading())},EditIframePixel:function(e){this.p_id=e,this.showModal()}},beforeMount:function(){this.getPixels()}},l=Object(n.a)(o,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("vs-card",[i("vs-row",{attrs:{"vs-type":"flex","vs-justify":"space-between","vs-align":"center","vs-w":"12"}},[i("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-start","vs-align":"center"}},[i("div",[i("h3",[e._v("Iframe Pixels")])])]),e._v(" "),i("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}},[i("vs-button",{attrs:{type:"filled",color:"primary"},on:{click:e.showModal}},[e._v("Add Iframe Pixel")])],1)],1),e._v(" "),i("vs-row",[i("vs-col",[i("vs-table",{attrs:{search:"",data:e.iframe_list,multiple:""},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.data;return e._l(s,(function(t,a){return i("vs-tr",{key:a,attrs:{data:t}},[i("vs-td",{attrs:{data:s[a].id}},[e._v(e._s(s[a].id))]),e._v(" "),i("vs-td",{attrs:{data:s[a].iframe_name}},[e._v(e._s(s[a].iframe_name))]),e._v(" "),i("vs-td",{attrs:{data:s[a].iframe_content}},[e._v(e._s(s[a].iframe_content))]),e._v(" "),i("vs-td",[i("vs-icon",{staticClass:"mr-3",attrs:{icon:"create",size:"small",color:"success"},on:{click:function(t){return e.EditIframePixel(s[a].id)}}}),e._v(" "),i("vs-icon",{attrs:{icon:"delete",size:"small",color:"danger"},on:{click:function(t){return e.deleteIframePixel(s[a].id)}}})],1)],1)}))}}]),model:{value:e.selected_iframes,callback:function(t){e.selected_iframes=t},expression:"selected_iframes"}},[i("template",{slot:"header"}),e._v(" "),i("template",{slot:"thead"},[i("vs-th",{attrs:{"sort-key":"id"}},[e._v("ID")]),e._v(" "),i("vs-th",{attrs:{"sort-key":"iframe_name"}},[e._v("Iframe Name")]),e._v(" "),i("vs-th",{attrs:{"sort-key":"iframe_content"}},[e._v("Iframe Content")]),e._v(" "),i("vs-th",[e._v("Actions")])],1)],2)],1)],1),e._v(" "),e.isModalVisible?i("modal",{on:{close:e.closeModal},scopedSlots:e._u([{key:"header",fn:function(){return[i("p",[e._v("Add Iframe Pixel")])]},proxy:!0},{key:"body",fn:function(){return[i("add-new-iframe-pixel",{attrs:{p_id:e.p_id},on:{destroyPID:e.destroyPID}})]},proxy:!0}],null,!1,1966788386)}):e._e()],1)}),[],!1,null,"61f96256",null);t.default=l.exports}}]);