window.onload = () => {

    let $ = document.querySelector.bind(document);
    let $All = document.querySelectorAll.bind(document);
    let menu = $("#menu");
    let body = $("body")
    let menuBar1 = $("#menu1");
    let menuBar2 = $("#menu2");
    let navPage1 = $("#nav-page1")
    let navPage2 = $("#nav-page2")
    let titleContainer=$("#title-container")
    const header=$("header")
    let revealElement = $All(".reveal");
    // const title3=$(".title3")
    //for navigation
    menu.onclick = () => {
        menu.classList.toggle("rotate-menu")
        menuBar1.classList.toggle("rotate1")
        menuBar2.classList.toggle("rotate2")
        navPage1.classList.toggle("toggle")
        navPage2.classList.toggle("toggle")

        if (navPage1.classList == "toggle") {
            menuBar1.style = "background-color: white;"
            menuBar2.style = "background-color: white;"
        }

        else {
            menuBar1.style = "background-color: #212121;"
            menuBar2.style = "background-color: #212121;"
        }
    }

    // let increase=1;
    //parallax
   // window.onscroll=()=>{
       // x=200;

        // increase += 0.1;
        // if(increase>3){
        //     increase=1;
        // }
        //let y=window.pageYOffset;
        // titleContainer.style=`top:${y*0.7}px`
        // console.log(increase)
        //if (y >= x) {
         //   header.style="background:whitesmoke"
       // }
        //else{
         //   header.style="background:transparent"
       // }
        // console.log(title3)
        // title3.style=`transform:scale(${increase},${increase})`
   // }

    //for revealing animation
    
    setTimeout(() => {
        for (let i = 0; i < revealElement.length; i++) {
            revealElement[i].classList.add("revealed")
        }
    }, 200);

    let boxes = [
        {
            num: 0,
            name: "RAIN",
            icon: "./svg/rain.svg",
            sound: "./sounds/Rain.mp3",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 1,
            name: "campfire",
            icon: "./svg/campfire.svg",
            sound: "./sounds/fire.mp3",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 2,
            name: "rowing",
            icon: "./svg/rowing.svg",
            sound: "./sounds/forest.mp3",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 3,
            name: "forest",
            icon: "./svg/forest.svg",
            sound: "./sounds/forest.mp3",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 4,
            name: "cafe",
            icon: "./svg/cafe.svg",
            sound: "./sounds/forest.mp3",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 5,
            name: "train",
            icon: "./svg/train.svg",
            sound: "./sounds/train.m4a",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 6,
            name: "night",
            icon: "./svg/night.svg",
            sound: "./sounds/night.mp3",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 7,
            name: "windy",
            icon: "./svg/wind.svg",
            sound: "./sounds/windy.m4a",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 8,
            name: "windchime",
            icon: "./svg/windchime.svg",
            sound: "./sounds/windchime.m4a",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 9,
            name: "ocean",
            icon: "./svg/ocean.svg",
            sound: "./sounds/ocean.m4a",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 10,
            name: "clock",
            icon: "./svg/clock.svg",
            sound: "./sounds/clock.m4a",
            volIcon: "./svg/volume_up_black_24dp.svg"

        },
        {
            num: 11,
            name: "library",
            icon: "./svg/library.svg",
            sound: "./sounds/forest.mp3",
            volIcon: "./svg/volume_up_black_24dp.svg"
        
        },
        {
            num: 12,
            name: "snowfall",
            icon: "./svg/snowing.svg",
            sound: "./sounds/snowfall.m4a",
            volIcon: "./svg/volume_up_black_24dp.svg"
        
        }

    ]
let arr=[];

    for (const i of boxes) {
        let box = document.createElement("div");
        box.classList = "box";
        sounds.appendChild(box)
        let audio = document.createElement("audio")
         arr.push(audio)
        audio.classList=`actuallysound`;
        let icon = document.createElement("img")
        icon.src = i.icon;
        icon.classList = "icon";
        box.appendChild(icon)
        audio.src = i.sound;
        audio.volume = 0.6;
        audio.loop = true;

        let inplabel = document.createElement("input");
        inplabel.classList = "inputvol"
        inplabel.type = 'range'; inplabel.min = 0; inplabel.max = 1; inplabel.step = .1; inplabel.value = .7;
        box.appendChild(inplabel)
        icon.addEventListener("click", () => {
            if (audio.paused) {

                audio.play();
                inplabel.classList.add("inp-display")
                icon.classList.add("icon-opacity");
            }
            else if (audio.play) {
                audio.load();
                audio.pause();
                inplabel.classList.remove("inp-display")
                icon.classList.remove("icon-opacity");
            };
        })

        inplabel.addEventListener("change", () => {
            audio.volume = parseFloat(inplabel.value);
        });


    }
    
      let line =$All(".line")
    let box=$All(".box")

    const observer=new IntersectionObserver(
        entries =>{
            entries.forEach(entry =>{
                entry.target.classList.toggle("box-show", entry.isIntersecting)
                
            })
            // entries.forEach(entry =>{
            //     entry.target.classList.toggle("toggle", entry.isIntersecting)
            // })
        },
        {
            threshold: 0
        }
       
    )
    box.forEach(card => {
        observer.observe(card)
    })
   

    let time = document.getElementById("time")
    let seconds = document.getElementById("seconds")
    let ss = document.getElementById("ss")
    let se_dots = document.querySelector(".se_dots")

    let interval = null;
    let status = true;
    let sec = 0;

    const stopwatch = () => {
        sec++;
        // if (sec % 60 === 0) {
        //     sec = 0;
        // }
    }


    function start() {

        stopwatch()
        seconds.innerHTML = sec;
        ss.style.strokeDashoffset = 440 - (440 * sec) / 60
        se_dots.style = `transform: rotate(${sec * 6}deg)`
        //360/60=6 

    }

    function startStop() {
        if (status) {

            interval = window.setInterval(start, 1000)
            status = false
            document.querySelector(".circle").style="--clr:hsl(0, 0%, 40%)"
            seconds.style="color:hsl(0, 0%, 40%)"
        }
        else {
            clearInterval(interval);
            status = true
            document.querySelector(".circle").style="--clr:hsl(0, 0%, 60%)"
            seconds.style="color:hsl(0, 0%, 60%)"
        }
    }
    time.addEventListener("click", startStop);

    const playlist = [
        {
            id: 0,
            name: 'relax',
            no: [0, 1, 3,4]
        },
        {
            id: 1,
            name: 'focus',
            no: [5, 4, 8,10]
        },
        {
            id: 2,
            name: 'productivity',
            no: [1, 6, 12]
        },
        {
            id: 3,
            name: 'study',
            no: [4, 7,11]
        },
        {
            id: 4,
            name: 'random',
            no: [1, 4, 5]
        }
    ]
    let musicbtn=$All(".music-btn")
    let inputvol=$All(".inputvol")
    let icon=$All(".icon")
    
    for(let i=0; i<musicbtn.length;i++){
        musicbtn[i].onclick = () => {  

            // console.log(playlist[i].no[0])
            for(let j=0; j<playlist[i].no.length;j++){
                
                    if (arr[playlist[i].no[j]].paused) {
                          arr[playlist[i].no[j]].load()
                          arr[playlist[i].no[j]].play();
                    inputvol[playlist[i].no[j]].classList.add("inp-display")
                    icon[playlist[i].no[j]].classList.add("icon-opacity");
                    }
                  else if (arr[playlist[i].no[j]].play) {
                    arr[playlist[i].no[j]].pause();
                    inputvol[playlist[i].no[j]].classList.remove("inp-display")
                    icon[playlist[i].no[j]].classList.remove("icon-opacity");
                  }
                
            }
        }
    }


}
