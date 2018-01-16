let pad0 = val => {
    const result = val.toString();
    return result.length < 2 ? `0${result}` : result;
}

class Stopwatch {
    constructor(display, results = null) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}.${pad0(times.miliseconds)}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval( () => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds++;
        if(this.times.miliseconds >= 100) {
            this.times.seconds++;
            this.times.miliseconds = 0;
        }

        if(this.times.seconds >= 60){
            this.times.minutes++;
            this.seconds = 0;
        }
    }

    stop() {
        clearInterval(this.watch);
        this.running = false;
    }

    resetTimer() {
        this.reset();
        this.print();
    }

    addToList() {
        if(this.results){
            let time = document.createElement('li');
            time.innerHTML = this.format(this.times);
            this.results.appendChild(time);
        }
    }

    clearList() {
        if (this.results) {
            while(this.results.hasChildNodes()){
                this.results.removeChild(this.results.childNodes[0]);
            }
        }
    }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', ()=>stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', ()=>stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', ()=>stopwatch.resetTimer());

let addButton = document.getElementById('add');
addButton.addEventListener('click', ()=>stopwatch.addToList());

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', ()=>stopwatch.clearList());