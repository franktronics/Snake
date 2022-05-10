import { Position } from "../types/food-types"
import { Direc, Point } from "../types/snake-types"
import { TABLE_HEIGHT, TABLE_WIDTH } from "./constant"

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
}

export default class Snake {
    snake: Point[]
    table: HTMLElement | null
    nextDirection: Direc
    actualDirection: Direc
    lastPress: number
    speed: number
    foodPosition: Position
    food: HTMLElement | null
    lastElt: null | {
        status: boolean,
        x: number,
        y: number
    }

    constructor (idTable: string, idFood: string) {
        this.snake = [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0}
        ]
        this.table = document.getElementById(idTable)
        this.actualDirection = 'r'
        this.nextDirection = 'r'
        this.lastPress = Date.now()
        this.speed = 200
        this.foodPosition = {
            x: 0,
            y: 0
        }
        this.food = document.getElementById(idFood)
        this.lastElt = null
    }

    buildSnake () {
        if(!this.table) return
        
        this.table.innerHTML = ''
        this.snake.forEach((pt: Point, k: number) => {
            const block = document.createElement('div')
            block.classList.add('point')
            block.style.left = `${pt.x * 10}px`
            block.style.top = `${pt.y * 10}px`

            this.table?.insertAdjacentElement('beforeend', block)
        })
    }
    movesnake () {
        const actualHead = this.snake[this.snake.length - 1]

        switch(this.actualDirection){
            case 't':
                if(actualHead.y > 0){
                    this.snake[this.snake.length - 1] = {
                        x: actualHead.x,
                        y: actualHead.y - 1
                    }
                } 
                break
            case 'r':
                if(actualHead.x < TABLE_WIDTH - 1){
                    this.snake[this.snake.length - 1] = {
                        x: actualHead.x + 1,
                        y: actualHead.y
                    }
                }
                break;
            case 'b':
                if(actualHead.y < TABLE_HEIGHT - 1){
                    this.snake[this.snake.length - 1] = {
                        x: actualHead.x,
                        y: actualHead.y + 1
                    }
                } 
                break
            case 'l':
                if(actualHead.x > 0){
                    this.snake[this.snake.length - 1] = {
                        x: actualHead.x - 1,
                        y: actualHead.y
                    }
                }
                break
        }
        if(this.snake[this.snake.length - 1].x === this.foodPosition.x && this.snake[this.snake.length - 1].y === this.foodPosition.y){
            
            this.lastElt = {
                status: false,
                x: this.snake[1].x,
                y: this.snake[1].y
            }
            this.buildNewFood()
        }

        const makeChain = (k: number = this.snake.length - 2, value = actualHead) => {
            if(k < 0) return
            
            const tempValue = this.snake[k]
            this.snake[k] = value
            
            makeChain(k - 1, tempValue)
        }
        if(this.snake[this.snake.length - 1] !== actualHead){
            makeChain()
            if(this.lastElt !== null && this.lastElt.status){
                this.snake.unshift(this.lastElt)
                this.lastElt = null
            }
            if(this.lastElt !== null) this.lastElt.status = true
        }
        if(this.nextDirection !== this.actualDirection) this.actualDirection = this.nextDirection
    }
    updateDirection (d: Direc) {
        if(
            (d === 't' && this.actualDirection === 'b') || 
            (d === 'b' && this.actualDirection === 't')
        ) return
        if(
            (d === 'l' && this.actualDirection === 'r') || 
            (d === 'r' && this.actualDirection === 'l')
        ) return
        
        if(Date.now() - this.lastPress > this.speed){
            this.nextDirection = d
            this.lastPress = Date.now()
        }  
    }
    play () {
        this.buildNewFood()
    }


    buildNewFood () {
        if(!this.food) return
        
        this.generatPosition(this.snake)
        this.food.style.left = `${this.foodPosition.x * 10}px`
        this.food.style.top = `${this.foodPosition.y * 10}px`
    }
    generatPosition (snake: Point[]) {
        let newX = this.foodPosition.x
        let newY = this.foodPosition.y
        while(!(this.foodPosition.x !== newX || this.foodPosition.y !== newY) || (snake.indexOf({x: newX, y: newY}) > 0)){
            newX = getRandomInt(TABLE_WIDTH)
            newY = getRandomInt(TABLE_HEIGHT)
        }
        this.foodPosition = {
            x: newX,
            y: newY
        }
    }
}