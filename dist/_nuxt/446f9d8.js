(window.webpackJsonp=window.webpackJsonp||[]).push([[35,26],{696:function(t,e,r){"use strict";r.r(e);var n={data:function(){return{srcList:["https://new.arhiterm.by/media/0408e750c0278b84320d742987a273b0_0RxaqKa.jpg"]}},props:["portfolio"],methods:{}},o=r(5),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"monter-galery"},[r("h2",[t._v("Галерея работ")]),t._v(" "),t._l(t.portfolio,(function(p,e){return r("div",{key:e,staticClass:"monter-galery-block"},[r("div",{staticClass:"monter-galery-img"},t._l(p.images,(function(i,t){return r("el-image",{directives:[{name:"show",rawName:"v-show",value:t<2,expression:"k<2"}],key:t,attrs:{src:i.img,"preview-src-list":p.images.map((function(t){return t.img}))}})})),1),t._v(" "),r("div",{staticClass:"monter-galery-left"},[r("span",[t._v(t._s(p.title))]),t._v(" "),r("strong",[r("i",{staticClass:"el-icon-place"}),t._v(t._s(p.address))]),t._v(" "),r("p",[t._v("\n                "+t._s(p.description)+"\n            ")])])])})),t._v(" "),r("div",{staticClass:"monter-galery-plus"},[t._v("Показать ещё...")])],2)}),[],!1,null,null,null);e.default=component.exports},720:function(t,e,r){"use strict";r.r(e);var n=r(2),o=(r(16),r(696)),l=r(228),c={asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.app,n=t.params,t.route,o=t.error,e.prev=1,e.next=4,r.store.dispatch("mounters/getMounter",n.id);case 4:return l=e.sent,console.log(l),e.abrupt("return",{mounter:l});case 9:return e.prev=9,e.t0=e.catch(1),e.abrupt("return",o({statusCode:404,message:"Товар не найдена или сервер не доступен"}));case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))()},components:{GaleryMounters:o.default,Breadcrumb:l.default},data:function(){return{}}},m=r(5),component=Object(m.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("Breadcrumb"),t._v(" "),r("h1",{staticClass:"h1-mounter"},[t._v("\n        "+t._s(t.mounter.whoiam.first_name)+"\n        "+t._s(t.mounter.whoiam.last_name)+"\n    ")]),t._v(" "),r("div",{staticClass:"mounter-tags"},[r("i",{staticClass:"el-icon-setting"}),t._v(" "),t._l(t.mounter.tag_s,(function(e,n){return r("strong",{key:n},[r("nuxt-link",{attrs:{to:"/mounters?page=1&tags=["+e.id+"]"}},[t._v(t._s(e.name))])],1)}))],2),t._v(" "),r("div",{staticClass:"mounter-img"},[r("el-image",{attrs:{src:t.mounter.whoiam.img,fit:"contain",lazy:""}})],1),t._v(" "),r("div",{staticClass:"mounter-section"},[r("p",[t._v(t._s(t.mounter.description))]),t._v(" "),t._m(0),t._v(" "),t._l(t.mounter.phone_s,(function(p,e){return r("div",{key:e,staticClass:"mounter-phone"},[r("i",{staticClass:"el-icon-phone-outline"}),t._v(" "),r("a",{attrs:{href:""}},[t._v(t._s(p.phone_number))])])}))],2),t._v(" "),r("GaleryMounters",{attrs:{portfolio:t.mounter.portfolio}})],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mounter-region"},[r("i",{staticClass:"el-icon-place"}),t._v(" "),r("span",[t._v("Минск")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{Breadcrumb:r(228).default})}}]);