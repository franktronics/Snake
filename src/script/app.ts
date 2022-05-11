import Food from "./food";
import Snake from "./snake";

const S = new Snake('snake-point', 'food')
S.setSpeed(200) //75 120 200

const vibration = () => {
    window.navigator.vibrate(50);
}
const btnT = document.getElementById('btn-t')
const btnR = document.getElementById('btn-r')
const btnB = document.getElementById('btn-b')
const btnL = document.getElementById('btn-l')

btnT?.addEventListener('pointerdown', function(e){
    e.preventDefault()
    e.stopPropagation()
    if(!S.status) return
    vibration()
    S.updateDirection('t')
})
btnR?.addEventListener('pointerdown', function(e){
    e.preventDefault()
    e.stopPropagation()
    if(!S.status) return
    vibration()
    S.updateDirection('r')
})
btnB?.addEventListener('pointerdown', function(e){
    e.preventDefault()
    e.stopPropagation()
    if(!S.status) return
    vibration()
    S.updateDirection('b')
})
btnL?.addEventListener('pointerdown', function(e){
    e.preventDefault()
    e.stopPropagation()
    if(!S.status) return
    vibration()
    S.updateDirection('l')
})
document.addEventListener('keydown', function(e){
    e.preventDefault()
    if(!S.status) return
    vibration()
    if(e.code === 'ArrowUp') S.updateDirection('t')
    if(e.code === 'ArrowDown') S.updateDirection('b')
    if(e.code === 'ArrowLeft') S.updateDirection('l')
    if(e.code === 'ArrowRight') S.updateDirection('r')
})

///////////////
const btnPlay = document.getElementById('btn-play')
const btnReplay = document.getElementById('btn-replay')

S.play()
const time = setInterval(() => {
    S.movesnake()
    S.buildSnake()
    const status = S.status

    if(!status) {
        clearInterval(time)
    }
}, S.speed)