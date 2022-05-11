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
    speed: number
    foodPosition: Position
    food: HTMLElement | null
    lastElt: null | {
        status: boolean,
        x: number,
        y: number
    }
    score: number
    status: boolean

    constructor (idTable: string, idFood: string) {
        this.snake = [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0}
        ]
        this.table = document.getElementById(idTable)
        this.actualDirection = 'r'
        this.nextDirection = 'r'
        this.speed = 200
        this.foodPosition = {
            x: 0,
            y: 0
        }
        this.food = document.getElementById(idFood)
        this.lastElt = null
        this.score = 0
        this.status = true
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
                const a = () => {
                    const pos = {
                        x: actualHead.x,
                        y: actualHead.y - 1
                    }
                    if(actualHead.y > 0){
                        this.snake[this.snake.length - 1] = pos
                    }else {
                        this.verifPosition(pos)
                    }
                }
                a()
                break
            case 'r':
                const b = () => {
                    const pos = {
                        x: actualHead.x + 1,
                        y: actualHead.y
                    }
                    if(actualHead.x < TABLE_WIDTH - 1){
                        this.snake[this.snake.length - 1] = pos
                    }else{
                        this.verifPosition(pos)
                    }
                }
                b()
                break;
            case 'b':
                const c = () => {
                    const pos = {
                        x: actualHead.x,
                        y: actualHead.y + 1
                    }
                    if(actualHead.y < TABLE_HEIGHT - 1){
                        this.snake[this.snake.length - 1] = pos
                    }else {
                        this.verifPosition(pos)
                    }
                }
                c() 
                break
            case 'l':
                const d = () => {
                    const pos = {
                        x: actualHead.x - 1,
                        y: actualHead.y
                    }
                    if(actualHead.x > 0){
                        this.snake[this.snake.length - 1] = pos
                    }else {
                        this.verifPosition(pos)
                    }
                }
                d()
                break
        }
        if(this.snake[this.snake.length - 1].x === this.foodPosition.x && this.snake[this.snake.length - 1].y === this.foodPosition.y){
            
            this.lastElt = {
                status: false,
                x: this.snake[1].x,
                y: this.snake[1].y
            }
            window.navigator.vibrate(400);
            this.updateScore()
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
        
        this.nextDirection = d
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
    setSpeed (speed: number) {
        this.speed = speed
    }
    updateScore () {
        const score = document.getElementById('snake-score') as HTMLSpanElement
        const s = (this.snake.length - 2) * 5
        this.score = s
        score.innerHTML = `${s}`
    }
    verifPosition (pos: Position) {
        if(pos.x > TABLE_WIDTH ||
           pos.x < 0 ||
           pos.y > TABLE_HEIGHT ||
           pos.y < 0
        ){
            this.status = false
        }
    }
}