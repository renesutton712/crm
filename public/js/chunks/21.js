(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{247:function(t,e,r){"use strict";r.r(e);function n(){$((function(){var t,e,r,n,i,a,s,o,l,p,d,u=jQuery,c=[".form-holder-place1",".form-holder-place2",".form-holder-place3",".form-holder-place4",".form-holder-place5"],h=0,f=0,m=0,v=0,b={user_id:"",ri:"",oi:"",ci:""},y="First name is required",g="Last name is required",w="Country is required",x="Please enter valid phone number",_="Please enter valid email",j="Password must contain 1 lowercase 1 uppercase and be at least 8 characters long",k={first_name:"First Name:",last_name:"Last Name:",country:"Country",phone:"Phone",email:"Email",password:"Password",submit_btn:"Open Account"},P="",C="",E=function(){var t=window.location.search,e=new URLSearchParams(t);e.entries();return e}(),T=/^[a-z-A-Z^. ]+$/,N=/[2-9]{1}\d{2}/,O=/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,A=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;function S(t){for(var e={},r=t.substring(t.indexOf("?")+1).split("&"),n=0;n<r.length;n++)if(r[n]){var i=r[n].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}function q(t,e,r){var n=new Date;n.setTime(n.getTime()+24*r*60*60*1e3);var i="expires="+n.toUTCString();document.cookie=t+"="+e+";"+i+";path=/"}function z(t){for(var e=t+"=",r=decodeURIComponent(document.cookie).split(";"),n=0;n<r.length;n++){for(var i=r[n];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(e))return i.substring(e.length,i.length)}return""}function L(t){k.first_name=t.first_name,k.last_name=t.last_name,k.country=t.country,k.phone=t.phone,k.email=t.email,k.password=t.password,k.submit_btn=t.submit_btn}!function(){var t=document.getElementsByTagName("head")[0],e=document.createElement("script"),r=document.createElement("link"),n=document.createElement("link"),i=document.createElement("script");r.rel="stylesheet",r.type="text/css",r.href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",n.rel="stylesheet",n.type="text/css",n.href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-formhelpers/2.3.0/css/bootstrap-formhelpers.min.css",i.type="text/javascript",i.src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-formhelpers/2.3.0/js/bootstrap-formhelpers.min.js",e.type="text/javascript",e.src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",t.appendChild(n),t.appendChild(e),t.appendChild(i)}(),u.ajax({url:"https://ipinfo.io",method:"get",async:!1,dataType:"json"}).done((function(t){P=t.country,C=t.ip})),""!==z("lang")&&"undefined"!==z("lang")&&u.ajax({url:"https://storsleads.club/api/form/lang",method:"POST",data:{lang:z("lang")},async:!1,dataType:"json"}).done((function(t){if(!("status"in t)||t.status)return L(t);alert(t.msg)})).fail((function(t,e,r){alert(e)})),function(){var t=E.has("oi")?E.get("oi"):m,e=E.has("ri")?E.get("ri"):f,r=E.has("ci")?E.get("ci"):h;if(""!==z(t+"_"+e)&&"undefined"!==z(t+"_"+e))return void(b.user_id=z(t+"_"+e));u.ajax({url:"https://storsleads.club/api/form/click",method:"POST",async:!1,crossDomain:!0,data:{oi:t,ri:e,ci:r,ap:E.has("ap")?E.get("ap"):v,client_country:P,client_ip:C,ua:window.navigator.userAgent,url_params:S(window.location.search)}}).done((function(r){var n=JSON.parse(atob(r));q(t+"_"+e,n.unique_id,1),"lang"in n&&""!==n.lang&&(q("lang",n.lang.lang,1),L(n.lang),b.user_id=n.unique_id,b.ci=n.ci,b.oi=n.oi,b.ri=n.ri)})).fail((function(t,e,r){alert(e)}))}(),t="off"==="".first_name?"":"<input value='' autocomplete='off' type='text' class='form-control fn' id='First_Name' placeholder='"+k.first_name+"' /><span class='error-block fn-error'></span>",e="off"==="".last_name?"":"<input value='' autocomplete='off' type='text' class='form-control ln' id='Last_Name' placeholder='"+k.last_name+"' /><span class='error-block ln-error'></span>",r="off"==="".country?"":"<select id='countries_phone1' class='form-control bfh-countries country'></select><span class='error-block country-error'></span>",n="off"==="".phone?"":"<input value='' type='text' class='form-control bfh-phone phone' data-country='countries_phone1' placeholder='"+k.phone+"'/><span class='error-block phone-error'></span>",i="off"==="".email?"":"<input value='' autocomplete='off' type='email' id='Email' class='form-control email' placeholder='"+k.email+"' /><span class='error-block email-error'></span>",a="off"==="".password?"":"<input value='' type='password' id='PWD' placeholder='"+k.password+"' class='form-control pwd'/><span class='error-block pwd-error'></span>",s="<form id='user-form-lp'><div class='full-name'><div class='fn-holder'>"+t+"</div><div class='ln-holder'>"+e+"</div> </div><div class='country-select'><div>"+r+"</div></div><div class='phone-input'><div>"+n+"</div></div><div class='email-input'><div>"+i+"</div></div><div class='password-input'><div>"+a+"</div></div><input type='submit' class='btn btn-default mt-4' value='"+k.submit_btn+"' disabled='disabled'/><input type='hidden' class='user' value='' /> <input type='hidden' class='ri' value='' /> <input type='hidden' class='oi' value='' /> <input type='hidden' class='ap' value='' /> <input type='hidden' class='ci' value='' /> <input type='hidden' class='client_ip' value='' /> </form>",u.each(c,(function(t,e){u(e).append(s)})),u("body").append("<div style='display:none;z-index: 99999;position: fixed;width: 100%; height: 100%;background: rgb(0 0 0 / 0.6); top: 0;' class='form-layover'><img src='https://storsleads.club/images/loader.svg' width='150' height='150' alt=''></div>"),u(".bfh-countries").attr("data-country",P),u(".client_ip").val(C),u("#PWD").val((o=8,l=8,p=Math.floor(Math.random()*(o-l+1))+l,Array(p).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map((function(t){return t[Math.floor(Math.random()*t.length)]})).join(""))),d=b,u(".user").val(d.user_id),u(".ri").val(d.ri),u(".oi").val(d.oi),u(".ci").val(d.ci),u("#user-form-lp .error-block").css({position:"absolute",color:"#fff",display:"none","font-weight":"600","font-size":"12px","z-index":"99999",background:"red",padding:"5px","border-radius":"3px",left:"15%",bottom:"-30px"}),u("#user-form-lp .error-block::after").css({"border-left":"solid transparent 5px","border-right":"solid transparent 5px","border-bottom":"solid #ec2b00 10px",top:"-10px",content:" ",height:"0",left:"50%","margin-left":"-13px",position:"absolute",width:" 0"}),u("#user-form-lp").css({"max-width":"430px",width:"100%",margin:"auto"}),u("#user-form-lp div > div").css({position:"relative"}),u("#user-form-lp  .fn-holder").css({display:"inline-block",width:"45%","margin-right":"5%"}),u("#user-form-lp  .ln-holder").css({display:"inline-block",width:"50%"}),u("#user-form-lp input,select").css({height:"45px",width:"100%",margin:"5px 0",border:"1px solid #000","border-radius":"3px",padding:"0 0 0 10px"}),u("#user-form-lp select").css({background:"#fff",width:"100%"}),u('#user-form-lp input[type="submit"]').css({cursor:"pointer","font-weight":"bold",width:"100%"}),u("#user-form-lp input#Last_Name").css({display:"inline-block"}),u("#user-form-lp input#First_Name").css({display:"inline-block"}),u(".form-layover img").css({position:"absolute",left:"0",right:"0",margin:" auto",top:"30%"}),u("#user-form-lp #PWD").css({display:"none"}),u("#user-form-lp .fn").on("focusout",(function(){return T.test(u(this).val())?u(this).val().length<3?(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0),void u(this).parent().find(".fn-error").text("First name must be at least 3 characters long").show()):void((0===u(this).val().length||u(this).val().length>=3)&&(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!1),u(this).parent().find(".fn-error").hide())):(u(this).parent().find(".fn-error").text("First name is not valid!").show(),void u(this).parent().parent().parent().parent().parent().find('input[type="submit"]').attr("disabled",!0))})),u("#user-form-lp .ln").on("focusout",(function(){return T.test(u(this).val())?u(this).val().length<=3?(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0),void u(this).parent().find(".ln-error").text("Last name must be at least 3 characters long").show()):void((0===u(this).val().length||u(this).val().length>=3)&&(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!1),u(this).parent().find(".ln-error").hide())):(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0),void u(this).parent().find(".ln-error").text("Last name is not valid!").show())})),u("#user-form-lp .phone").on("focusout",(function(){return N.test(u(this).val())?u(this).val().length<=6?(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0),void u(this).parent().find(".phone-error").text("Please enter a valid phone number").show()):void((0===u(this).val().length||u(this).val().length>=6)&&(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!1),u(this).parent().find(".phone-error").hide())):(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0),void u(this).parent().find(".phone-error").text("Phone is not valid!").show())})),u("#user-form-lp .email").on("focusout",(function(){return A.test(u(this).val())?u(this).val().length<=6?(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0),void u(this).parent().find(".email-error").text("Please enter a valid email address").show()):void((0===u(this).val().length||u(this).val().length>=6)&&(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!1),u(this).parent().find(".email-error").hide())):(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0),void u(this).parent().find(".email-error").text("Email is not valid!").show())})),u("#user-form-lp .pwd").on("focusout",(function(){if(!O.test(u(this).val()))return u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0),void u(this).parent().find(".pwd-error").text("Password must contain 1 lowercase 1 uppercase and be at least 8 characters long").show();(0===u(this).val().length||u(this).val().length>=8)&&(u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!1),u(this).parent().find(".pwd-error").hide())})),u("#user-form-lp").on("submit",(function(t){var e=this;t.preventDefault(),u(".form-layover").show();var r=u(this).find(".fn").val(),n=u(this).find(".ln").val(),i=u(this).find(".country").val(),a=u(this).find(".phone").val(),s=u(this).find(".email").val(),o=u(this).find(".pwd").val(),l=u(this).find(".user").val(),p=E.has("ri")?E.get("ri"):u(this).find(".ri").val(),d=E.has("ci")?E.get("ci"):u(this).find(".ci").val();!function(t,e,r,n,i,a,s,o){if(null==o||""===o.length)return u(".form-layover").hide(),!1;if(!T.test(e)||null==e||""===e)return t.find(".fn-error").text(y).show(),u(".form-layover").hide(),!1;if(!T.test(r)||null==r||""===r)return t.find(".ln-error").text(g).show(),u(".form-layover").hide(),!1;if(null==n||""===n)return t.find(".country-error").text(w).show(),u(".form-layover").hide(),!1;if(!N.test(i)||null==i||""===i)return t.find(".phone-error").text(x).show(),u(".form-layover").hide(),!1;if(!A.test(a)||null==a||""===a)return t.find(".email-error").text(_).show(),u(".form-layover").hide(),!1;if(!O.test(s)||null==s||""===s)return t.find(".pwd-error").text(j).show(),u(".form-layover").hide(),!1;return!0}(u(this),r,n,i,a,s,o,l)?u(this).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0):u.ajax({url:"https://storsleads.club/api/form/lead",method:"POST",data:{fn:r,ln:n,country:i,phone:a,email:s,pwd:o,user:l,ci:d,ri:p}}).done((function(t){var r=t;if(function(t){try{JSON.parse(t)}catch(t){return!1}return!0}(t)&&(r=JSON.parse(t)),!r.status)return u(e).parent().parent().parent().find('input[type="submit"]').attr("disabled",!0),u(".form-layover").hide(),void alert(r.msg);if(function(t,e,r){z(t)&&(document.cookie=t+"="+(e?";path="+e:"")+(r?";domain="+r:"")+";expires=Thu, 01 Jan 1970 00:00:01 GMT")}("user","/",window.location.hostname),"pixel"in r){var n,i=/##(.*)##/g;r.pixel.match(i);n=r.pixel.replace(i,(function(t,e){return function(t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var e=new RegExp("[\\?&]"+t+"=([^&#]*)").exec(location.search);return null===e?"":decodeURIComponent(e[1].replace(/\+/g," "))}(e)})),u("body").append(n)}setTimeout((function(){window.location.href=r.msg}),2500)})).fail((function(t,e,r){u(".form-layover").hide(),alert(e)}))}))}))}if("undefined"==typeof jQuery){var i=document.getElementsByTagName("head")[0],a=document.createElement("script");a.type="text/javascript",a.src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",a.onload=n,i.appendChild(a)}else n();var s={name:"formComponent",data:function(){return{}}},o=r(1),l=Object(o.a)(s,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"form-holder-place1"})])}],!1,null,"d7360bda",null);e.default=l.exports}}]);