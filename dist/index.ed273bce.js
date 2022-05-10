!function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var e=function(t){return Math.floor(Math.random()*t)},n=function(){"use strict";function n(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.snake=[{x:0,y:0},{x:1,y:0},{x:2,y:0}],this.table=document.getElementById(t),this.actualDirection="r",this.nextDirection="r",this.lastPress=Date.now(),this.speed=200,this.foodPosition={x:0,y:0},this.food=document.getElementById(e),this.lastElt=null}var i,o,s;return i=n,o=[{key:"buildSnake",value:function(){var t=this;this.table&&(this.table.innerHTML="",this.snake.forEach((function(e,n){var i,o=document.createElement("div");o.classList.add("point"),o.style.left="".concat(10*e.x,"px"),o.style.top="".concat(10*e.y,"px"),null===(i=t.table)||void 0===i||i.insertAdjacentElement("beforeend",o)})))}},{key:"movesnake",value:function(){var t=this,e=this.snake[this.snake.length-1];switch(this.actualDirection){case"t":e.y>0&&(this.snake[this.snake.length-1]={x:e.x,y:e.y-1});break;case"r":e.x<29&&(this.snake[this.snake.length-1]={x:e.x+1,y:e.y});break;case"b":e.y<39&&(this.snake[this.snake.length-1]={x:e.x,y:e.y+1});break;case"l":e.x>0&&(this.snake[this.snake.length-1]={x:e.x-1,y:e.y})}this.snake[this.snake.length-1].x===this.foodPosition.x&&this.snake[this.snake.length-1].y===this.foodPosition.y&&(this.lastElt={status:!1,x:this.snake[1].x,y:this.snake[1].y},this.buildNewFood());var n=function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.snake.length-2,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;if(!(i<0)){var s=t.snake[i];t.snake[i]=o,n(i-1,s)}};this.snake[this.snake.length-1]!==e&&(n(),null!==this.lastElt&&this.lastElt.status&&(this.snake.unshift(this.lastElt),this.lastElt=null),null!==this.lastElt&&(this.lastElt.status=!0)),this.nextDirection!==this.actualDirection&&(this.actualDirection=this.nextDirection)}},{key:"updateDirection",value:function(t){"t"===t&&"b"===this.actualDirection||"b"===t&&"t"===this.actualDirection||"l"===t&&"r"===this.actualDirection||"r"===t&&"l"===this.actualDirection||Date.now()-this.lastPress>this.speed&&(this.nextDirection=t,this.lastPress=Date.now())}},{key:"play",value:function(){this.buildNewFood()}},{key:"buildNewFood",value:function(){this.food&&(this.generatPosition(this.snake),this.food.style.left="".concat(10*this.foodPosition.x,"px"),this.food.style.top="".concat(10*this.foodPosition.y,"px"))}},{key:"generatPosition",value:function(t){for(var n=this.foodPosition.x,i=this.foodPosition.y;this.foodPosition.x===n&&this.foodPosition.y===i||t.indexOf({x:n,y:i})>0;)n=e(30),i=e(40);this.foodPosition={x:n,y:i}}}],o&&t(i.prototype,o),s&&t(i,s),n}(),i=new n("snake-point","food");i.play();setInterval((function(){i.movesnake(),i.buildSnake()}),i.speed);var o=document.getElementById("btn-t"),s=document.getElementById("btn-r"),a=document.getElementById("btn-b"),l=document.getElementById("btn-l");null==o||o.addEventListener("pointerdown",(function(t){t.preventDefault(),t.stopPropagation(),i.updateDirection("t")})),null==s||s.addEventListener("pointerdown",(function(t){t.preventDefault(),t.stopPropagation(),i.updateDirection("r")})),null==a||a.addEventListener("pointerdown",(function(t){t.preventDefault(),t.stopPropagation(),i.updateDirection("b")})),null==l||l.addEventListener("pointerdown",(function(t){t.preventDefault(),t.stopPropagation(),i.updateDirection("l")})),document.addEventListener("keydown",(function(t){t.preventDefault(),"ArrowUp"===t.code&&i.updateDirection("t"),"ArrowDown"===t.code&&i.updateDirection("b"),"ArrowLeft"===t.code&&i.updateDirection("l"),"ArrowRight"===t.code&&i.updateDirection("r")}))}();
//# sourceMappingURL=index.ed273bce.js.map
