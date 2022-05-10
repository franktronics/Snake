import Food from "./food";
import Snake from "./snake";

const S = new Snake('snake-point', 'food')
S.play()

const btnT = document.getElementById('btn-t')
const btnR = document.getElementById('btn-r')
const btnB = document.getElementById('btn-b')
const btnL = document.getElementById('btn-l')

btnT?.addEventListener('pointerdown', function(e){
    e.preventDefault()
    e.stopPropagation()
    S.updateDirection('t')
})
btnR?.addEventListener('pointerdown', function(e){
    e.preventDefault()
    e.stopPropagation()
    S.updateDirection('r')
})
btnB?.addEventListener('pointerdown', function(e){
    e.preventDefault()
    e.stopPropagation()
    S.updateDirection('b')
})
btnL?.addEventListener('pointerdown', function(e){
    e.preventDefault()
    e.stopPropagation()
    S.updateDirection('l')
})