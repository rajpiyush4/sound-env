window.onload = () => {
    const $ = document.querySelector.bind(document);
    const $All = document.querySelectorAll.bind(document);
    const menu = $("#menu");
    const menuBar1 = $("#menu1");
    const menuBar2 = $("#menu2");
    const navPage1 = $("#nav-page1")
    const navPage2 = $("#nav-page2")
    const revealElement = $All(".reveal");


    //for navigation
    function menuToggle() {
        menu.onclick = () => {
            menu.classList.toggle("rotate-menu")
            menuBar1.classList.toggle("rotate1")
            menuBar2.classList.toggle("rotate2")
            navPage1.classList.toggle("toggle")
            navPage2.classList.toggle("toggle")

        }
    }
    menuToggle()

    //blog popup
    function blogPopup() {
        const blog = $('#blog')
        const noteClick = $('#notepad')
        let check = true
        noteClick.onclick = () => {
            if (check) {
                blog.style = 'opacity: 1'
                note.style = 'animation: pop 0.5s forwards ease-in-out;'
                check = false;
                window.scrollTo(00, 0);
            } else {
                blog.style = 'opacity:0;'
                note.style = 'animation: unpop 0.5s forwards ease-in-out;'
                check = true
            }
        }
    }
    blogPopup()

    //dropdown in blog
    function dropdown() {
        document.addEventListener('click', e => {
            const isDropdownButton = e.target.matches('[data-dropdown-button]')
            // console.log(isDropdownButton)
            // console.log(e.target.closest('[data-dropdown]'))
            if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

            let currentDropdown
            if (isDropdownButton) {
                currentDropdown = e.target.closest('[data-dropdown]')
                currentDropdown.classList.toggle('active')
            }

            $All('[data-dropdown].active').forEach(dropdown => {
                if (dropdown == currentDropdown) return
                dropdown.classList.remove('active')

            })

        })
    }
    dropdown()


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

    //creating audio files
    let arr = [];
    for (const i of boxes) {
        let box = document.createElement("div");
        box.classList = "box";
        // box.classList ="box-show"
        sounds.appendChild(box)
        let audio = document.createElement("audio")
        arr.push(audio)
        audio.classList = `actuallysound`;
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
                box.classList.add('in-boxshadow')
            }
            else if (audio.play) {
                audio.pause();
                inplabel.classList.remove("inp-display")
                icon.classList.remove("icon-opacity");
                
            };
        })

        inplabel.addEventListener("change", () => {
            audio.volume = parseFloat(inplabel.value);
        });


    }


    //intersection observer for audio boxes 
    let box = $All(".box")
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle("box-show", entry.isIntersecting)

            })

        },
        {
            threshold: 0.7
        }

    )
    box.forEach(card => {
        observer.observe(card)
    })



    //time function

    let time = $("#time")
    let seconds = $("#seconds")
    let ss = $("#ss")
    let se_dots = $(".se_dots")


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
            $(".circle").style = "--clr:hsl(0, 0%, 0%)"
            seconds.style = "color:hsl(0, 0%, 0%)"
        }
        else {
            clearInterval(interval);
            status = true
            $(".circle").style = "--clr:hsl(0, 0%, 60%)"
            seconds.style = "color:hsl(0, 0%, 60%)"
        }
    }
    time.addEventListener("click", startStop);


    //creating music playlist
    const playlist = [
        {
            id: 0,
            name: 'relax',
            no: [0, 1, 3, 4]
        },
        {
            id: 1,
            name: 'focus',
            no: [5, 4, 8, 10]
        },
        {
            id: 2,
            name: 'productivity',
            no: [1, 6, 12]
        },
        {
            id: 3,
            name: 'study',
            no: [4, 7, 11]
        },
        {
            id: 4,
            name: 'random',
            no: [1, 4, 5]
        }
    ]
    let musicbtn = $All(".music-btn")
    let inputvol = $All(".inputvol")
    let icon = $All(".icon")


    let prev
    for (let i = 0; i < musicbtn.length; i++) {
        musicbtn[i].onclick = () => {

            if (prev != undefined) {
                stopAllMusic(prev)
            }
            prev = i
            playMusic(i)

        }

    }

    function playMusic(point) {
        for (let j = 0; j < playlist[point].no.length; j++) {

            arr[playlist[point].no[j]].play();
            inputvol[playlist[point].no[j]].classList.add("inp-display")
            icon[playlist[point].no[j]].classList.add("icon-opacity");


        }


    }

    function stopAllMusic(prev) {
        for (let j = 0; j < playlist[prev].no.length; j++) {

            arr[playlist[prev].no[j]].pause();
            inputvol[playlist[prev].no[j]].classList.remove("inp-display")
            icon[playlist[prev].no[j]].classList.remove("icon-opacity");
            
        }
    }

    
    //.....blogStorage
    // function save(){
    const textBtn = $('#save-choice')
    const text = $('#textarea')
    textBtn.onclick = () => {
        // let textValue = text.value

        if (text.value === '') {
            popupAlert('empty file')
        }

        else {
            setId()
        }
    }

    let storageArray = []
    const fileListContainer = $("#files-list-container");
    function fillFilesOnRefresh() {
        if (localStorage.getItem('blog') != null) {
            let items = localStorage.getItem('blog');
            let val = JSON.parse(items);
            val.forEach((element) => {
                fileListContainer.innerHTML += `<div class='file-items'>${element.name} <span class='delete-icon' ></span></div>`
                //push in it so the stored files not get deleted on adding new files after refreshing window
                storageArray.push(element)
            });
        }
    }
    
    fillFilesOnRefresh();
    function fillFiles() {
        if (localStorage.getItem('blog') != null) {
            let items = localStorage.getItem('blog')
            let val = JSON.parse(items)
            val.forEach((element) => {
                fileListContainer.innerHTML += `<div class='file-items'>${element.name} <span class='delete-icon'></span></div>`
                //not pushing here so that on adding files again and again it will not write in file list for existing fills again
                // storageArray.push(element)
                // deleteFiles()
            });
        }

    }
    const form = $('#form')
    const inpName = $('#inp-name')


    function setId() {
        form.style = 'display:flex'
        inpName.focus();

        $('#cancel').onclick = () => {
            form.style = 'display:none'
            inpName.value = '';
        }

        $('#save').onclick = () => {
            if (inpName.value === '') {
                popupAlert('Please name it ')
            }

            else {
                // localStorage.setItem(inpName.value, text.value)
                const obj = {
                    name: inpName.value,
                    value: text.value
                }
                storageArray.push(obj)
                let stringArray = JSON.stringify(storageArray)

                localStorage.setItem('blog', stringArray)
                fileListContainer.innerHTML = ''
                //update localstorage and filelist so that you delete newly created list
                fillFiles();
                popupAlert('Item is saved')
                inpName.value = ''
                form.style = 'display:none'

                runClickFile();
                deleteFiles();

            }

        }

    }

    let fileList = $All(".file-items");

    function runClickFile() {
        fileList = $All(".file-items")
        for (let i = 0; i < fileList.length; i++) {
            fileList[i].onclick = () => {
    
                let items = localStorage.getItem('blog');
                let val = JSON.parse(items);

                try {
                    text.value = val[i].value;
                }
                catch (e) { }
            }
        }
    }
    runClickFile();

    function deleteFiles() {

        const deleteIcon = $All('.delete-icon');
        fileList = $All(".file-items")
  
        for (let i = 0; i < fileList.length; i++) {
            deleteIcon[i].addEventListener("click", function () {
               fileList[i].remove();
                storageArray.splice(i, 1);
                let items = localStorage.getItem('blog')
                let val = JSON.parse(items)
                // console.log(val)
                val.splice(i, 1);
                const stringVal = JSON.stringify(val)
                localStorage.removeItem('blog');
                // console.log(stringVal)
                localStorage.setItem('blog', stringVal);


            })
        }
    }
    //run in starting of window
    deleteFiles()

//popup
    const note = $("#note")
    function popupAlert(about) {
        const popUpbox = document.createElement('div')
        popUpbox.innerHTML = `<div class='popup-box'> ${about} </div>`
        note.appendChild(popUpbox)

    }


}



