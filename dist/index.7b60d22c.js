const t=t=>Math.floor(Math.random()*t);const e=new class{buildSnake(){this.table&&(this.table.innerHTML="",this.snake.forEach(((t,e)=>{var i;const s=document.createElement("div");s.classList.add("point"),s.style.left=10*t.x+"px",s.style.top=10*t.y+"px",null===(i=this.table)||void 0===i||i.insertAdjacentElement("beforeend",s)})))}movesnake(){const t=this.snake[this.snake.length-1];switch(this.actualDirection){case"t":t.y>0&&(this.snake[this.snake.length-1]={x:t.x,y:t.y-1});break;case"r":t.x<29&&(this.snake[this.snake.length-1]={x:t.x+1,y:t.y});break;case"b":t.y<39&&(this.snake[this.snake.length-1]={x:t.x,y:t.y+1});break;case"l":t.x>0&&(this.snake[this.snake.length-1]={x:t.x-1,y:t.y})}this.snake[this.snake.length-1].x===this.foodPosition.x&&this.snake[this.snake.length-1].y===this.foodPosition.y&&(this.lastElt={status:!1,x:this.snake[1].x,y:this.snake[1].y},this.buildNewFood());const e=(i=this.snake.length-2,s=t)=>{if(i<0)return;const n=this.snake[i];this.snake[i]=s,e(i-1,n)};this.snake[this.snake.length-1]!==t&&(e(),null!==this.lastElt&&this.lastElt.status&&(this.snake.unshift(this.lastElt),this.lastElt=null),null!==this.lastElt&&(this.lastElt.status=!0)),this.nextDirection!==this.actualDirection&&(this.actualDirection=this.nextDirection)}updateDirection(t){"t"===t&&"b"===this.actualDirection||"b"===t&&"t"===this.actualDirection||"l"===t&&"r"===this.actualDirection||"r"===t&&"l"===this.actualDirection||Date.now()-this.lastPress>this.speed&&(this.nextDirection=t,this.lastPress=Date.now())}play(){this.buildNewFood()}buildNewFood(){this.food&&(this.generatPosition(this.snake),this.food.style.left=10*this.foodPosition.x+"px",this.food.style.top=10*this.foodPosition.y+"px")}generatPosition(e){let i=this.foodPosition.x,s=this.foodPosition.y;for(;this.foodPosition.x===i&&this.foodPosition.y===s||e.indexOf({x:i,y:s})>0;)i=t(30),s=t(40);this.foodPosition={x:i,y:s}}constructor(t,e){this.snake=[{x:0,y:0},{x:1,y:0},{x:2,y:0}],this.table=document.getElementById(t),this.actualDirection="r",this.nextDirection="r",this.lastPress=Date.now(),this.speed=200,this.foodPosition={x:0,y:0},this.food=document.getElementById(e),this.lastElt=null}}("snake-point","food");e.play();setInterval((()=>{e.movesnake(),e.buildSnake()}),e.speed);const i=document.getElementById("btn-t"),s=document.getElementById("btn-r"),n=document.getElementById("btn-b"),o=document.getElementById("btn-l");null==i||i.addEventListener("pointerdown",(function(t){t.preventDefault(),t.stopPropagation(),e.updateDirection("t")})),null==s||s.addEventListener("pointerdown",(function(t){t.preventDefault(),t.stopPropagation(),e.updateDirection("r")})),null==n||n.addEventListener("pointerdown",(function(t){t.preventDefault(),t.stopPropagation(),e.updateDirection("b")})),null==o||o.addEventListener("pointerdown",(function(t){t.preventDefault(),t.stopPropagation(),e.updateDirection("l")})),document.addEventListener("keydown",(function(t){t.preventDefault(),"ArrowUp"===t.code&&e.updateDirection("t"),"ArrowDown"===t.code&&e.updateDirection("b"),"ArrowLeft"===t.code&&e.updateDirection("l"),"ArrowRight"===t.code&&e.updateDirection("r")}));
//# sourceMappingURL=index.7b60d22c.js.map