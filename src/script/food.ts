import { Position } from "../types/food-types"

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
}
const TABLE_WIDTH = 30
const TABLE_HEIGHT = 40

export default class Food {
    position: Position
    food: HTMLElement

    constructor (eltId: string) {
        this.position = {
            x: 0,
            y: 0
        }
        this.food = document.getElementById(eltId)
    }
    buildNewFood () {
        this.generatPosition()
        this.food.style.left = `${this.position.x * 10}px`
        this.food.style.top = `${this.position.y * 10}px`
    }
    generatPosition () {
        let newX = this.position.x
        let newY = this.position.y
        while(!(this.position.x !== newX || this.position.y !== newY)){
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