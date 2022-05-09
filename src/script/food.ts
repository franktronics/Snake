import { Position } from "../types/food-types"
import { Point } from "../types/snake-types";
import { TABLE_HEIGHT, TABLE_WIDTH } from "./constant";

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
}

export default class Food {
    position: Position
    food: HTMLElement | null

    constructor (eltId: string) {
        this.position = {
            x: 0,
            y: 0
        }
        this.food = document.getElementById(eltId)
    }
    buildNewFood (snake: Point[]) {
        if(!this.food) return
        
        this.generatPosition(snake)
        this.food.style.left = `${this.position.x * 10}px`
        this.food.style.top = `${this.position.y * 10}px`
    }
    generatPosition (snake: Point[]) {
        let newX = this.position.x
        let newY = this.position.y
        while(!(this.position.x !== newX || this.position.y !== newY) || (snake.indexOf({x: newX, y: newY}) > 0)){
            newX = getRandomInt(TABLE_WIDTH)
            newY = getRandomInt(TABLE_HEIGHT)
        }
        this.position = {
            x: newX,
            y: newY
        }
    }
    getPosition () {
        return this.position
    }
}