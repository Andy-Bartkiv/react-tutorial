(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{12:function(t,e,n){"use strict";n.r(e);var s=n(11),r=n(8),i=n(5),a=n(6),c=n(9),o=n(7),u=n(1),l=n.n(u),h=n(10),d=n.n(h),j=(n(17),n(0));function p(t){var e="";return t.winner&&t.winner.includes(t.id)&&(e="win"),Object(j.jsx)("button",{className:"square ".concat(e),onClick:t.onClick,children:t.value})}var x=function(t){Object(c.a)(n,t);var e=Object(o.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(a.a)(n,[{key:"renderRow",value:function(t){var e=this;return Object(j.jsx)("div",{className:"board-row",children:[0,1,2].map((function(n){return e.renderSquare(3*t+n)}))},"row-".concat(t))}},{key:"renderSquare",value:function(t){var e=this;return Object(j.jsx)(p,{id:t,winner:this.props.winner,value:this.props.squares[t],onClick:function(){return e.props.onClick(t)}},t)}},{key:"render",value:function(){var t=this;return Object(j.jsx)("div",{children:[0,1,2].map((function(e){return t.renderRow(e)}))})}}]),n}(l.a.Component),v=function(t){Object(c.a)(n,t);var e=Object(o.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).state={history:[{index:0,squares:Array(9).fill(null)}],stepN:0,xIsNext:!0,sortDesc:!0},s}return Object(a.a)(n,[{key:"handleClick",value:function(t){var e=this.state.history.slice(0,this.state.stepN+1),n=e[e.length-1],s=n.squares.slice(),r=n.index;b(s)||s[t]||(s[t]=this.state.xIsNext?"X":"O",this.setState({history:e.concat([{squares:s,index:r+1}]),stepN:e.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(t){this.setState({stepN:t,xIsNext:t%2===0})}},{key:"sortHistory",value:function(){this.setState({sortDesc:!this.state.sortDesc})}},{key:"displayLocation",value:function(t){var e;if(t){var n=this.state.history[t].squares.reduce((function(t,e,n){var s=e?t+e:t+"_";return s+=(n+1)%3===0&&n<8?",":""}),"");e="Go to move #".concat(t," ")+n}else e="Go to game start";return e}},{key:"render",value:function(){var t=this,e=Object(r.a)(this.state.history),n=e[this.state.stepN],s=b(n.squares);this.state.sortDesc||e.sort((function(t,e){return t.index-e.index?-1:1}));var i=e.map((function(e,n){return Object(j.jsx)("li",{children:Object(j.jsx)("button",{className:e.index===t.state.stepN?"bold":"",onClick:function(){t.jumpTo(e.index)},children:t.displayLocation(e.index)})},n)})),a=s?"Winner ".concat(s.mark):n.index>=9?"It's a draw":"Next player: ".concat(this.state.xIsNext?"X":"O");return Object(j.jsxs)("div",{className:"game",children:[Object(j.jsx)("div",{className:"game-board",children:Object(j.jsx)(x,{winner:s?s.pos:null,squares:n.squares,onClick:function(e){return t.handleClick(e)}})}),Object(j.jsxs)("div",{className:"game-info",children:[Object(j.jsx)("div",{children:a}),Object(j.jsx)("button",{onClick:function(){return t.sortHistory()},children:this.state.sortDesc?"Sort -Up-":"Sort Down"}),Object(j.jsx)("ol",{children:i})]})]})}}]),n}(l.a.Component);function b(t){for(var e=null,n=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],i=0;i<n.length;i++){var a,c=Object(s.a)(n[i],3),o=c[0],u=c[1],l=c[2];if(t[o]&&t[o]===t[u]&&t[o]===t[l])if(e)(a=e.pos).push.apply(a,Object(r.a)(n[i]));else e={mark:t[o],pos:n[i]}}return e}d.a.render(Object(j.jsx)(v,{}),document.getElementById("root"))},17:function(t,e,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.dd8cb45c.chunk.js.map