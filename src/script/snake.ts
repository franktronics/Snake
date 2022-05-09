import { Point } from "../types/snake-types"

export default class Snake {
    snake: Point[]
    table: HTMLElement

    constructor (idTable: string) {
        this.snake = [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0}
        ]
        this.table = document.getElementById(idTable)
    }

    buildSnake () {
        this.table.innerHTML = ''
        this.snake.forEach((pt: Point, k: number) => {
            const block = document.createElement('div')
            block.classList.add('point')
            block.style.left = `${pt.x * 10}px`
            block.style.top = `${pt.y * 10}px`

            this.table.insertAdjacentElement('beforeend', block)
        })
    }
}