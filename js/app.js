function allLoaded (){

    const photo = document.querySelector('.home__photo');
    const greeting = document.querySelector('.home__greeting');
    const name = document.querySelector('.home__name');
    const paragraph = document.querySelector('.home__paragraph');
    const projectsTitle = document.querySelector('.projects__title');
    const cards = document.querySelectorAll('.projects__card');
    const sections = gsap.utils.toArray('section');
    const resumeSec = document.querySelector('.resume');
    const edu = document.querySelector('.resume__edu');
    const lang = document.querySelector('.resume__lang');
    const exp = document.querySelector('.resume__exp');
    const mailBtn = document.querySelector('.contact__btn');
    const chevron = document.querySelectorAll('.chevron');
    const scrollIndicator = document.querySelector('.container .text');

    mailBtn.addEventListener('click', emailSent, false);

    window.addEventListener('scroll', function(e) {
        if((window.pageYOffset + window.innerHeight) > document.body.clientHeight - window.innerHeight) {
            chevron.forEach(element => {
                element.style.display = 'none';
            });
            scrollIndicator.innerHTML = "back to projects";
            scrollIndicator.style.fontSize = '1.5em';
            scrollIndicator.style.cursor = 'pointer';
            scrollIndicator.addEventListener('click', function(e) {
                window.scrollTo({top: window.innerHeight, left: 0, behavior: 'smooth'});
            })
        } else if ((window.pageYOffset + window.innerHeight) < document.body.clientHeight - window.innerHeight){
            chevron.forEach(element => {
                element.style.display = 'block';
            });
            scrollIndicator.innerHTML = "scroll down";
            scrollIndicator.style.fontSize = '12px';
            scrollIndicator.style.cursor = 'unset';
        }
    });

    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline();
    let eduTl = gsap.timeline({
        scrollTrigger: {
            trigger: resumeSec,
            start: "0 0",
            end: "1000vh",
            scrub: 1,
            pin: resumeSec
        }
    });

    tl.from(photo, {scaleY: 0, transformOrigin: "top", duration: .7, delay: .4,});
    tl.from(greeting, {opacity: 0, duration: .1, y: 500});
    tl.from(name, {opacity: 0, duration: .1, delay: .6, x: 500});
    tl.to(paragraph, {y: 0, opacity: 1, duration: 1, delay: .4, lineHeight: 3});


    ScrollTrigger.matchMedia({
        "(max-width: 835px)": function() {
            gsap.to(greeting, {
                scrollTrigger: {
                    trigger: greeting,
                    start: "-390vh 125vh",
                    scrub: 0.01
                },
                x: -500
            });
            
            gsap.to(name, {
                scrollTrigger: {
                    trigger: name,
                    start: "-10vh 50vh",
                    end: "300%",
                    scrub: .3
                },
                y: -500
            });

            gsap.to(paragraph, {
                scrollTrigger: {
                    trigger: name,
                    start: "0 75vh",
                    end: "100",
                    scrub: .3
                },
                x: -1500
            });

            gsap.to(projectsTitle, {
                scrollTrigger: {
                    trigger: projectsTitle,
                    start: "0 700vh",
                    end: "0 550vh",
                    scrub: .2
                },
                x: 0,
                opacity: 1
            });
            
            cards.forEach((element, index) => {
                gsap.from(cards[index], {
                    scrollTrigger: {
                        trigger: cards[index],
                        start: "0 600vh",
                        end: "100vh 500vh",
                        scrub: .3
                    },
                    opacity: 0,
                    duration: 3
                });
            });
        },

        "(min-width: 835px)": function() {
            gsap.to(greeting, {
                scrollTrigger: {
                    trigger: greeting,
                    start: "-430vh 125vh",
                    scrub: 0.01
                },
                x: -500
            });
            
            gsap.to(name, {
                scrollTrigger: {
                    trigger: name,
                    start: "-10vh 50vh",
                    end: "300%",
                    scrub: .3
                },
                y: -500
            });

            gsap.to(paragraph, {
                scrollTrigger: {
                    trigger: name,
                    start: "0 150vh",
                    scrub: .3
                },
                x: -1500
            });

            gsap.to(projectsTitle, {
                scrollTrigger: {
                    trigger: projectsTitle,
                    start: "0 1000vh",
                    end: "0 700vh",
                    scrub: .2
                },
                x: 0,
                opacity: 1
            });
            
            cards.forEach((element, index) => {
                gsap.from(cards[index], {
                    scrollTrigger: {
                        trigger: cards[index],
                        start: "0 1000vh",
                        end: "100vh 600vh",
                        scrub: .3
                    },
                    opacity: 0,
                    duration: 3
                });
            });
        },

        "(min-width: 1390px)": function() {
            gsap.to(greeting, {
                scrollTrigger: {
                    trigger: greeting,
                    start: "-430vh 125vh",
                    scrub: 0.01
                },
                x: -500
            });
            
            gsap.to(name, {
                scrollTrigger: {
                    trigger: name,
                    start: "-10vh 50vh",
                    end: "300%",
                    scrub: .3
                },
                y: -500
            });

            gsap.to(paragraph, {
                scrollTrigger: {
                    trigger: name,
                    start: "0 190vh",
                    scrub: .3
                },
                x: -1500
            });

            gsap.to(projectsTitle, {
                scrollTrigger: {
                    trigger: projectsTitle,
                    start: "0 1000vh",
                    end: "0 700vh",
                    scrub: .2
                },
                x: 0,
                opacity: 1
            });
        },

        "all": function() {
            eduTl.from(edu, {x: "-300%", delay: 3, duration: 25}).to({},6,{})
            .from(lang, {x: "-300%", delay: 1, duration: 25}).to({},6,{})
            .from(exp, {x: "300%", duration: 25}).to({},20,{});
        }
    });

    function emailSent(){
        const alertMsg = document.querySelector('.contact__status');
        var company = document.forms['form']['email'].value;
        var message = document.forms['form']['message'].value;
        var data = new FormData();
        data.append('email', company);
        data.append('message', message);

        if (company=='' || message==''){
            alertMsg.innerHTML = "Fill in all the fields please";
        } else {
            var xhttp = new XMLHttpRequest();

            xhttp.open("POST", "./send-email.php");

            xhttp.onload = function() {
                if(this.response == "ok"){
                    alertMsg.style.color = "rgb(0, 255, 0)";
                    alertMsg.innerHTML = "Email sent!";
                    document.querySelector('.contact__email').value = '';
                    document.querySelector('.contact__message').value = '';
                } else {
                    alert(this.response);
                    alertMsg.style.color = "red";
                    alertMsg.innerHTML = "Error sending email!";
                    document.querySelector('.contact__email').value = '';
                    document.querySelector('.contact__message').value = '';
                }
            }
            xhttp.send(data);
        }
        alertMsg.style.opacity = "1";
    }   
}

var queue = new createjs.LoadQueue(false);

queue.on('complete', event => {
    gsap.to(document.querySelector('.overlay'), {opacity: 0, duration: .2});
    allLoaded();
});

queue.loadFile('http://165.22.17.31/RihardsMednisCom/img/photo.jpg');
queue.loadFile('http://165.22.17.31/RihardsMednisCom/img/json.png');
queue.loadFile('http://165.22.17.31/RihardsMednisCom/img/php.png');
queue.loadFile('http://165.22.17.31/RihardsMednisCom/img/mars.png');
queue.loadFile('http://165.22.17.31/RihardsMednisCom/img/cleaning.png');