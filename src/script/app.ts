import Snake from "./snake";
import axios from 'axios'
import Cookies from 'js-cookie'
import { codeGenerator } from "./other";

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

const url = process.env.BACK_END

let name = Cookies.get('name') || null
let token = Cookies.get('token') || null
if(!name || !token){
    name = localStorage.getItem('name')
    token = localStorage.getItem('token')
}

if(!name || !token){
    const insPage = document.getElementById('inscription') as HTMLElement
    insPage.style.display = "flex"
    const form = document.getElementById('form')
    const input = document.getElementById('ins-name')
    const error = document.getElementById('form-error')
    let valueName = ''
    input?.addEventListener('change', function(e: any){
        valueName = e.target.value
    })
    form?.addEventListener('submit', function(e){
        e.preventDefault()
        const token = Date.now() + codeGenerator({
            includeUpperCase: true,
            includeNumbers: true,
            length: 20
        })
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        }
        axios.post(url+ 'signin', {name: valueName, token: token}, config)
            .then((res) => {
                if(res.data.message){
                    Cookies.set('name', valueName)
                    Cookies.set('token', token)
                    localStorage.setItem('name', valueName)
                    localStorage.setItem('token', token)
                    insPage.style.display = 'none'
                }else{
                    error!.innerHTML = res.data.messageError
                }
            })
            .catch((er) => {
                console.log(er)
                error!.innerHTML = 'Une erreur est survenue'
            })
    })
    
}else{
    axios.post(url+ 'getstat')
        .then((data) => {
            console.log(data);
        })
        .catch((er) => {
            console.log(er);
            
        })
}

S.play()
const time = setInterval(() => {
    S.movesnake()
    S.buildSnake()
    const status = S.status

    if(!status) {
        clearInterval(time)
    }
}, S.speed)