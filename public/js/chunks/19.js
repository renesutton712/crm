(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{238:function(t,s,a){"use strict";a.r(s);var e=a(2),r={name:"IndexComponent",data:function(){return{leads_list:[],selected_leads:[]}},methods:{getLeads:function(){var t=this;this.$vs.loading(),e.a.get("leads/get").then((function(s){if("status"in s.data)throw s.data;t.leads_list=s.data,t.$vs.loading.close()})).catch((function(s){t.$vs.loading.close(),t.$vs.notify({title:"Error",text:s.msg,iconPack:"feather",icon:"icon-alert-circle",color:"warning"})}))}},beforeMount:function(){this.getLeads()}},v=a(1),n=Object(v.a)(r,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("vs-card",[a("vs-row",{attrs:{"vs-type":"flex","vs-justify":"space-between","vs-align":"center","vs-w":"12"}},[a("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-start","vs-align":"center"}},[a("div",[a("h3",[t._v("Leads")])])]),t._v(" "),a("vs-col",{attrs:{"vs-w":"6","vs-type":"flex","vs-justify":"flex-end","vs-align":"center"}})],1),t._v(" "),a("vs-row",[a("vs-col",[a("vs-table",{attrs:{search:"",data:t.leads_list,multiple:""},scopedSlots:t._u([{key:"default",fn:function(s){var e=s.data;return t._l(e,(function(s,r){return a("vs-tr",{key:r,attrs:{data:s}},[a("vs-td",{attrs:{data:e[r].unique_id}},[t._v(t._s(e[r].unique_id))]),t._v(" "),null!==e[r].campaign?a("vs-td",{attrs:{data:e[r].campaign.campaign_name}},[t._v("\n                            "+t._s(e[r].campaign.campaign_name)+"\n                        ")]):a("vs-td",[t._v("Campaign not found!")]),t._v(" "),null!==e[r].network?a("vs-td",{attrs:{data:e[r].network.network_name}},[t._v("\n                            "+t._s(e[r].network.network_name)+"\n                        ")]):a("vs-td",[t._v("No Network found")]),t._v(" "),null!==e[r].offer?a("vs-td",{attrs:{data:e[r].offer.offer_name}},[t._v("\n                            "+t._s(e[r].offer.offer_name)+"\n                        ")]):a("vs-td",[t._v("No Offer Found!")]),t._v(" "),a("vs-td",{attrs:{data:e[r].country}},[t._v(t._s(e[r].country))]),t._v(" "),a("vs-td",{attrs:{data:e[r].first_name}},[t._v(t._s(e[r].first_name))]),t._v(" "),a("vs-td",{attrs:{data:e[r].last_name}},[t._v(t._s(e[r].last_name))]),t._v(" "),a("vs-td",{attrs:{data:e[r].email}},[t._v(t._s(e[r].email))]),t._v(" "),a("vs-td",{attrs:{data:e[r].phone}},[t._v(t._s(e[r].phone))]),t._v(" "),a("vs-td",{attrs:{data:e[r].ip}},[t._v(t._s(e[r].ip))]),t._v(" "),a("vs-td",{attrs:{data:e[r].ua}},[t._v(t._s(e[r].ua))]),t._v(" "),3===e[r].status?a("vs-td",{staticClass:"font-bold text-primary",attrs:{data:e[r].status}},[t._v("\n                            FTD\n                        ")]):a("vs-td",{class:[1===e[r].status?"text-dark font-bold":"text-success font-bold"],attrs:{data:e[r].status}},[t._v(t._s(1===e[r].status?"Click":"Lead")+"\n                        ")]),t._v(" "),a("vs-td",{attrs:{data:e[r].url_params}},[t._v(t._s(e[r].url_params))])],1)}))}}]),model:{value:t.selected_leads,callback:function(s){t.selected_leads=s},expression:"selected_leads"}},[a("template",{slot:"header"}),t._v(" "),a("template",{slot:"thead"},[a("vs-th",{attrs:{"sort-key":"unique_id"}},[t._v("ID")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"campaign_name"}},[t._v("Campaign Name")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"network.network_name"}},[t._v("Network Name")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"offer.offer_name"}},[t._v("Offer Name")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"country"}},[t._v("Country")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"first_name"}},[t._v("First Name")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"last_name"}},[t._v("Last Name")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"email"}},[t._v("Email")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"phone"}},[t._v("Phone")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"ip"}},[t._v("IP")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"ua"}},[t._v("UA")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"status"}},[t._v("Type")]),t._v(" "),a("vs-th",{attrs:{"sort-key":"url_params"}},[t._v("URL Params")])],1)],2)],1)],1)],1)}),[],!1,null,"0072d79f",null);s.default=n.exports}}]);