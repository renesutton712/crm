(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{240:function(t,e,s){"use strict";s.r(e);var a=s(2),n={name:"IndexComponent",data:function(){return{selected_postbacks:[],postback_list:[]}},methods:{getPostbacks:function(){var t=this;this.$vs.loading(),a.a.get("postbacks/get").then((function(e){t.postback_list=e.data,t.$vs.loading.close()})).catch((function(e){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:e.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))}},beforeMount:function(){this.getPostbacks()}},o=s(1),v=Object(o.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("vs-card",[s("vs-row",{attrs:{"vs-type":"flex","vs-justify":"space-between","vs-align":"center","vs-w":"12"}},[s("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-start","vs-align":"center"}},[s("div",[s("h3",[t._v("Postbacks")])])]),t._v(" "),s("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}})],1),t._v(" "),s("vs-row",[s("vs-col",[s("vs-table",{attrs:{search:"",data:t.postback_list,multiple:""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.data;return t._l(a,(function(e,n){return s("vs-tr",{key:n,attrs:{data:e}},[s("vs-td",{attrs:{data:a[n].id}},[t._v(t._s(a[n].id))]),t._v(" "),s("vs-td",{attrs:{data:a[n].unique_id}},[t._v(t._s(a[n].unique_id))]),t._v(" "),s("vs-td",{attrs:{data:a[n].network_name}},[t._v(t._s(a[n].network_name))]),t._v(" "),s("vs-td",{class:["FTD"===a[n].event?"text-primary font-bold":"text-success font-bold"],attrs:{data:a[n].event}},[t._v(t._s(a[n].event)+"\n                        ")]),t._v(" "),s("vs-td",{attrs:{data:a[n].created_at}},[t._v(t._s(a[n].created_at))])],1)}))}}]),model:{value:t.selected_postbacks,callback:function(e){t.selected_postbacks=e},expression:"selected_postbacks"}},[s("template",{slot:"header"}),t._v(" "),s("template",{slot:"thead"},[s("vs-th",{attrs:{"sort-key":"unique_id"}},[t._v("ID")]),t._v(" "),s("vs-th",{attrs:{"sort-key":"unique_id"}},[t._v("Unique")]),t._v(" "),s("vs-th",{attrs:{"sort-key":"network_name"}},[t._v("Network")]),t._v(" "),s("vs-th",{attrs:{"sort-key":"event"}},[t._v("Event")]),t._v(" "),s("vs-th",{attrs:{"sort-key":"created_at"}},[t._v("Created")])],1)],2)],1)],1)],1)}),[],!1,null,"4b39089a",null);e.default=v.exports}}]);