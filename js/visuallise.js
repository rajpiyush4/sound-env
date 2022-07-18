const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = '10px Monospace'

//debug
const gui = new dat.GUI({ autoPlace: false })

class Microphone {
    constructor(fftSize) {
        this.initialized = false
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {

            this.audioContext = new AudioContext()

            this.microphone = this.audioContext.createMediaStreamSource(stream)

            this.analyser = this.audioContext.createAnalyser()

            this.analyser.fftSize = fftSize

            const bufferlength = this.analyser.frequencyBinCount

            this.dataArray = new Uint8Array(bufferlength)

            this.microphone.connect(this.analyser)
            this.initialized = true
        }.bind(this)).catch(function (error) { alert(error) })
    }

    getSamples() {

        this.analyser.getByteTimeDomainData(this.dataArray)

        let normSamples = [...this.dataArray].map(e => e / 128 -1)
        return normSamples

    }

    getVolume() {
        this.analyser.getByteTimeDomainData(this.dataArray)
        let normSamples = [...this.dataArray].map(e => e / (fftSize / 2) - 1)

        let sum = 0

        for (let i = 0; i < normSamples.length; i++) {
            sum += normSamples[i] * normSamples[i]
        }
        let volume = Math.sqrt(sum / normSamples.length)
        return volume
    }
}

const barHeight = {
    length: 1000,
    rotation: .5,
    x: 0,
    y: 0,
    posX: 1,
    posY: 1
}

gui.add(barHeight, 'rotation', 0, 2, .1)
gui.add(barHeight, 'x', -2, 2, .1)
gui.add(barHeight, 'y', 0, 500, 10)
gui.add(barHeight, 'posX', 0, 1, .2)
gui.add(barHeight, 'posY', 0, 1, .2)

let customContainer = document.getElementById('gui-container');
customContainer.appendChild(gui.domElement);

const visualizer = document.getElementById('visualizer')
let visOn = true
visualizer.addEventListener('click', ()=>{
    if (visOn) {
        canvas.style='display: block'
        document.getElementById('gui-container').style = "display: block"

        visOn = false
    }else{
        canvas.style='display: none'
        document.getElementById('gui-container').style = "display: none"

        visOn = true
    }

})

const fftSize = 512
const microphone = new Microphone(fftSize)
let animeFrame;
function draw() {
    if (microphone.initialized) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const samples = microphone.getSamples()
        ctx.strokeStyle = 'white'

        let height = 10
        samples.forEach((elem, i) => {
          let  sound = elem * 500
            if (sound > height) {
                height = sound
            } else {
                height -= height * 0.0005
            }
            ctx.fillStyle = `rgb(${i * 2},200,200)`
            ctx.save()
            ctx.translate((canvas.width * barHeight.posX) / 2, (canvas.height * barHeight.posY) / 2)
            ctx.rotate(i * barHeight.rotation)
            ctx.beginPath()
            ctx.fillRect(i * barHeight.x, barHeight.y, 40, height)
            ctx.fill()
            ctx.restore()

        })

    }
    animeFrame = requestAnimationFrame(draw)
}
draw()

let state = true;
onkeyup = function (e) {
    let k = e.key;
    // alert(k)
    if (k == 'p') {
        if (state) {
            cancelAnimationFrame(animeFrame);
            state = false;
        }
        else {
            requestAnimationFrame(draw);
            state = true;
        }
    }

}


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})