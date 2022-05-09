import Food from "./food";
import Snake from "./snake";

const F = new Food('food')

window.setInterval(() => {
    console.log(F.getPosition());
    F.buildNewFood()
}, 1000)

const S = new Snake('snake-point')
S.buildSnake()