(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{12:function(e,n,t){},13:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(6),i=t.n(c),r=t(1),u=t(4);var l=function(e){var n=e.cell,t=e.handleClickOnCell,c=e.handleMouseOver,i=Object(a.useState)(!1),r=Object(u.a)(i,2),l=r[0],s=r[1],h=function(e){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t(e,n.key,a),s(!0)};return function(){if(n.isGiven){var e="cell isGiven "+(n.highlighted?" highlighted":"");return o.a.createElement("div",{className:e},o.a.createElement("span",{className:"cell-number"},n.actualValue))}var t="cell notGiven "+(l?" clicked":"")+(n.highlighted?" highlighted":"");return o.a.createElement("div",{className:t,onMouseOver:function(){c(n)},onTransitionEnd:function(){s(!1)},onClick:function(e){h(e)},onContextMenu:function(e){h(e,!0)}},o.a.createElement("span",{className:"cell-number"},0===n.guessedValue?"":n.guessedValue))}()};function s(e,n,t){this.key=e,this.x=n,this.y=t,this.guessedValue=0,this.actualValue=0,this.isGiven=!1,this.highlighted=!1}var h=[1,0,6,0,0,2,3,0,0,0,5,0,0,0,6,0,9,1,0,0,9,5,0,1,4,6,2,0,3,7,9,0,5,0,0,0,5,8,1,0,2,7,9,0,0,0,0,0,4,0,8,1,5,7,0,0,0,2,6,0,5,4,0,0,0,4,1,5,0,6,0,9,9,0,0,8,7,4,2,1,0];t(12);var f=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1];Object(a.useEffect)((function(){for(var e=[],n=0,t=0;t<9;t++){for(var a=[],o=0;o<9;o++)a.push(new s(n,o,t)),n++;e.push(a)}console.log(e),c(e)}),[]);var i=function(){var e=Object(r.a)(t);e.forEach((function(e){e.forEach((function(e){e.actualValue=0,e.guessedValue=0,e.isGiven=!1}))})),c(e)},f=function(e){var n=Object(r.a)(t);console.log("mouseHover");var a=function(e){var n=Math.floor(e.x/3),t=Math.floor(e.y/3);e.x,e.y;return[[3*n+0,3*t+0],[3*n+1,3*t+0],[3*n+2,3*t+0],[3*n+0,3*t+1],[3*n+1,3*t+1],[3*n+2,3*t+1],[3*n+0,3*t+2],[3*n+1,3*t+2],[3*n+2,3*t+2]]}(e);n.forEach((function(e){e.forEach((function(e){e.highlighted=!1}))})),a.forEach((function(e){var t,a,o;(t=n,a=e[0],o=e[1],t[o][a]).highlighted=!0})),function(e,n){var t=[];return e.forEach((function(e){t.push(e[n.x])})),t}(n,e).forEach((function(e){e.highlighted=!0})),function(e,n){return e[n.y]}(n,e).forEach((function(e){e.highlighted=!0})),c(n)},v=function(e,n){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];e.preventDefault();var o=Object(r.a)(t),i=null;if(o.forEach((function(e){var t=e.find((function(e){return e.key===n}));t&&(i=t)})),null!=i){var u=i.guessedValue+(a?-1:1);u<0&&(u=9),u>9&&(u=0),i.guessedValue=u,c(o)}};return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"grid"},t.map((function(e,n){return o.a.createElement("div",{key:100*n},e.map((function(e,n){return o.a.createElement(l,{key:e.key,cell:e,handleClickOnCell:v,handleMouseOver:f})})))}))),o.a.createElement("button",{onClick:function(){!function(e){i();var n=Object(r.a)(t);n.forEach((function(n){n.forEach((function(n){0!==e[n.key]&&(n.actualValue=e[n.key],n.isGiven=!0)}))})),c(n)}(h)}},"Load default values"),o.a.createElement("button",{onClick:function(){i()}},"Clear all"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,n,t){e.exports=t(13)}},[[7,1,2]]]);
//# sourceMappingURL=main.e9be02a2.chunk.js.map