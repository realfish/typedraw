var TD=TD||{};TD.donors=[],TD.expiry="2 July 2018 00:00 UTC+8",TD.lucks=[],TD.seed={},function(){"use strict";TD.seed={get:function e(){var t=window.location.hash.substring(1);return t||Date.now().toString()},set:function e(t){window.location.hash=t}}}(),function(){"use strict";document.getElementsByTagName("body")[0].addEventListener("touchstart",function(){})}(),function(){"use strict";var e=document,t=TD.expiry,n={method:"GET",mode:"cors",headers:{Pragma:"no-cache","Cache-Control":"no-cache"}},s={header:!0},r=function e(){var t=TD.seed.get();return TD.seed.set(t),new Chance(t)},o=function e(t){for(var n=[],s=0;s<t.length;s++)"ind"===t[s].type&&"0"===t[s].flag&&n.push(t[s]);return n},a=function e(t,n){for(var s=void 0,o=r(),a=0;a<n;a++)s=o.integer({min:0,max:t.length-(1+a)}),TD.lucks.push(t[s]),t.splice(s,1)},c=function t(){var n=o(TD.donors),s=e.querySelector("#rnd-num"),r=s.value;a(n,r),i(),d()},i=function t(){e.querySelector(".machine").classList.add("is-hidden")},d=function t(){var n=e.querySelector(".announce"),s=e.getElementById("tmpl-result").text,r=doT.template(s),o=r(TD.lucks);n.innerHTML=o,n.classList.add("is-show")};fetch("./csv/donors.csv",n).then(function(e){if(e.ok)return e.text();var t=new Error(e.statusText);throw t.res=e,t}).then(function(n){TD.donors=Papa.parse(n,s).data;var r=e.querySelector(".ack-time"),o=e.querySelector(".ack-num"),a=e.querySelector(".ack");r.textContent=t,o.textContent=TD.donors.length,a.classList.remove("is-disabled");var i=e.querySelector("#draw-btn");i.classList.remove("is-disabled"),i.addEventListener("click",c)})}(),function(){"use strict";var e=document,t=e.querySelector(".modal"),n=function n(o,a,c,i){var d=e.getElementsByClassName(o)[0],u=e.getElementById(a).text,l=doT.template(u),v=l(c);d.innerHTML=v,setTimeout(s,50),t.addEventListener("click",function(e){for(var t=e.target;t&&!t.matches("#"+i+",."+o);)t=t.parentNode;t&&t.matches("#"+i)&&r()})},s=function e(){t.classList.add("is-active")},r=function e(){t.classList.remove("is-active")},o=e.getElementById("action-donors"),a=function e(){n("modal-main","tmpl-donors",TD.donors,"modal-close")};o.addEventListener("click",a)}(),function(){"use strict";var e=document,t=e.querySelector("#rnd-num"),n=e.querySelector("#rnd-dec"),s=e.querySelector("#rnd-inc"),r=function e(){var s=t.value;if(s<=1)return void n.classList.add("is-disabled");s--,t.value=s,n.classList.remove("is-disabled"),s<=1&&n.classList.add("is-disabled")},o=function e(){var s=t.value;s++,t.value=s,s>1&&n.classList.remove("is-disabled")};n.addEventListener("click",r),s.addEventListener("click",o)}();