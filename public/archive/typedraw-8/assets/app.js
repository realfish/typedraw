var TD=TD||{};TD.donors=[],TD.expiry="27 March 2017 00:00 UTC+8",TD.lucks=[],TD.seed={},function(){"use strict";TD.seed={get:function e(){var t=window.location.hash.substring(1);return t?t:Date.now().toString()},set:function e(t){window.location.hash=t}}}(),function(){"use strict";document.getElementsByTagName("body")[0].addEventListener("touchstart",function(){})}(),function(){"use strict";var e=document,t=TD.expiry,n="./csv/donors.csv",s={method:"GET",mode:"cors",headers:{Pragma:"no-cache","Cache-Control":"no-cache"}},r={header:!0},o=function e(){var t=TD.seed.get();return TD.seed.set(t),new Chance(t)},c=function e(t){for(var n=[],s=0;s<t.length;s++)"ind"===t[s].type&&"0"===t[s].flag&&n.push(t[s]);return n},a=function e(t,n){for(var s=void 0,r=o(),c=0;c<n;c++)s=r.integer({min:0,max:t.length-(1+c)}),TD.lucks.push(t[s]),t.splice(s,1)},i=function t(){var n=c(TD.donors);a(n,e.querySelector("#rnd-num").value),d(),u()},d=function t(){e.querySelector(".machine").classList.add("is-hidden")},u=function t(){var n=e.querySelector(".announce"),s=e.getElementById("tmpl-result").text,r=doT.template(s),o=r(TD.lucks);n.innerHTML=o,n.classList.add("is-show")};fetch("./csv/donors.csv",s).then(function(e){if(e.ok)return e.text();var t=new Error(e.statusText);throw t.res=e,t}).then(function(n){TD.donors=Papa.parse(n,r).data;var s=e.querySelector(".ack-time"),o=e.querySelector(".ack-num"),c=e.querySelector(".ack");s.textContent=t,o.textContent=TD.donors.length,c.classList.remove("is-disabled");var a=e.querySelector("#draw-btn");a.classList.remove("is-disabled"),a.addEventListener("click",i)})}(),function(){"use strict";var e=document,t=e.querySelector(".modal"),n=function n(o,c,a,i){var d=e.getElementsByClassName(o)[0],u=e.getElementById(c).text,l=doT.template(u),v=l(a);d.innerHTML=v,setTimeout(s,50),t.addEventListener("click",function(e){for(var t=e.target;t&&!t.matches("#"+i+",."+o);)t=t.parentNode;t&&t.matches("#"+i)&&r()})},s=function e(){t.classList.add("is-active")},r=function e(){t.classList.remove("is-active")},o=e.getElementById("action-donors"),c=function e(){n("modal-main","tmpl-donors",TD.donors,"modal-close")};o.addEventListener("click",c)}(),function(){"use strict";var e=document,t=e.querySelector("#rnd-num"),n=e.querySelector("#rnd-dec"),s=e.querySelector("#rnd-inc"),r=function e(){var s=t.value;if(s<=1)return void n.classList.add("is-disabled");s--,t.value=s,n.classList.remove("is-disabled"),s<=1&&n.classList.add("is-disabled")},o=function e(){var s=t.value;s++,t.value=s,s>1&&n.classList.remove("is-disabled")};n.addEventListener("click",r),s.addEventListener("click",o)}();