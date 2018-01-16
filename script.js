let pad0 = val => {
    const result = val.toString();
    return result.length < 2 ? `0${result}` : result;
}

// class Results extends React.Component {
//     constructor(props){
//         super(props);

//     }

//     static defaultProps = {
//         results: []
//     }

//     render(){
//         let resultList = this.props.results.map((val, key)=>{
//             return (<li key={key}>{val}</li>);
//         })
//         return (<ul className="results"> {resultList} </ul>);
//     }
// }

class Stopwatch extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            times : {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            running: false,
            watch: null,
            results: []
        }
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}.${pad0(times.miliseconds)}`;
    }

    reset = () =>{
        this.setState({
            times : {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    start = () => {
        if (!this.state.running) {
            this.setState({
                running: true,
                watch: setInterval( () => this.step(), 10),
            });
        }
    };

    step = () =>{
        if (!this.state.running) return;
        this.calculate();
    }

    stop = () =>{
        clearInterval(this.state.watch);
        this.setState({
            running: false
        });
    }

    calculate = () =>{
        let ms = this.state.times.miliseconds;
        let sec = this.state.times.seconds;
        let min = this.state.times.minutes;
        ms++;
        if(ms >= 100){
            sec++;
            ms = 0;
        }

        if(sec >= 60){
            min++;
            sec = 0;
        }

        this.setState({
            times: {
                miliseconds: ms,
                seconds: sec,
                minutes: min
            }
        })
    }

    resetTimer = () =>{
        this.reset();
    }

    addToList = () =>{
        this.setState({
            results: [...this.state.results, this.format(this.state.times)]
        })
        
    }

    clearList = () =>{
        this.setState({
            results: []
        })
    }

    render() {
        let resultList = this.state.results.map((val, key)=>{
            return (<li key={key}>{val}</li>);
        })
        return (<div>
            <nav className="controls">
                <a href="#" className="button" id="start" onClick={this.start}>Start</a>
                <a href="#" className="button" id="stop" onClick={this.stop}>Stop</a>
                <a href="#" className="button" id="reset" onClick={this.resetTimer}>Reset</a>
                <a href="#" className="button" id="add" onClick={this.addToList}>Add to list</a>
                <a href="#" className="button" id="clear" onClick={this.clearList}>Clear list</a>
            </nav>
            <div className="stopwatch">{this.format(this.state.times)}</div>
            {/* <Results results={this.state.results} /> */}
            <ul className="results">{resultList}</ul>
            </div>);
    }
};

ReactDOM.render(<Stopwatch />, document.getElementById('app'));
