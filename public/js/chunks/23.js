(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{244:function(t,s,e){"use strict";e.r(s);var a=e(2),n={name:"IndexComponent",data:function(){return{selected_postbacks:[],postback_list:[]}},methods:{getPostbacks:function(){var t=this;this.$vs.loading(),a.a.get("postbacks/get").then((function(s){t.postback_list=s.data,t.$vs.loading.close()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))}},beforeMount:function(){this.getPostbacks()}},v=e(1),o=Object(v.a)(n,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("vs-card",[e("vs-row",{attrs:{"vs-type":"flex","vs-justify":"space-between","vs-align":"center","vs-w":"12"}},[e("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-start","vs-align":"center"}},[e("div",[e("h3",[t._v("Postbacks")])])]),t._v(" "),e("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}})],1),t._v(" "),e("vs-row",[e("vs-col",[e("vs-table",{attrs:{search:"",data:t.postback_list,multiple:""},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.data;return t._l(a,(function(s,n){return e("vs-tr",{key:n,attrs:{data:s}},[e("vs-td",{attrs:{data:a[n].id}},[t._v(t._s(a[n].id))]),t._v(" "),e("vs-td",{attrs:{data:a[n].unique_id}},[t._v(t._s(a[n].unique_id))]),t._v(" "),e("vs-td",{attrs:{data:a[n].network_name}},[t._v(t._s(a[n].network_name))]),t._v(" "),e("vs-td",{class:["FTD"===a[n].event?"text-primary font-bold":"text-success font-bold"],attrs:{data:a[n].event}},[t._v(t._s(a[n].event)+"\n                        ")]),t._v(" "),e("vs-td",{attrs:{data:a[n].payout}},[t._v(t._s("$"+a[n].payout))]),t._v(" "),e("vs-td",{attrs:{data:a[n].created_at}},[t._v(t._s(a[n].created_at))])],1)}))}}]),model:{value:t.selected_postbacks,callback:function(s){t.selected_postbacks=s},expression:"selected_postbacks"}},[e("template",{slot:"header"}),t._v(" "),e("template",{slot:"thead"},[e("vs-th",{attrs:{"sort-key":"unique_id"}},[t._v("ID")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"unique_id"}},[t._v("Unique")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"network_name"}},[t._v("Network")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"event"}},[t._v("Event")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"payout"}},[t._v("Payout")]),t._v(" "),e("vs-th",{attrs:{"sort-key":"created_at"}},[t._v("Created")])],1)],2)],1)],1)],1)}),[],!1,null,"ca180d44",null);s.default=o.exports}}]);