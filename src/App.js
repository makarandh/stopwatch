import React from "react"
import "./App.css"


const SEC = "sec"
const MIN = "min"
const HOUR = "hour"
const DAY = "day"


export class App extends React.Component {

    state = {
        timerID: null,
        running: false
    }

    incrementDay = () => {
        this.setState((state) => ({day: state.day + 1}), () => {
            localStorage.setItem(DAY, this.state.day)
        })
    }

    incrementHour = () => {
        if(this.state.hour === 23) {
            this.setState({hour: 0}, () => {
                localStorage.setItem(HOUR, this.state.hour)
            })
            this.incrementDay()
            return
        }
        this.setState((state) => ({hour: state.hour + 1}), () => {
            localStorage.setItem(HOUR, this.state.hour)
        })
    }

    incrementMin = () => {
        if(this.state.min === 59) {
            this.setState({min: 0}, () => {
                localStorage.setItem(MIN, this.state.min)
            })
            this.incrementHour()
            return
        }
        this.setState((state) => ({min: state.min + 1}), () => {
            localStorage.setItem(MIN, this.state.min)
        })
    }

    incrementTimer = () => {
        if(this.state.sec === 59) {
            this.setState({sec: 0}, () => {
                localStorage.setItem(SEC, this.state.sec)
            })
            this.incrementMin()
            return
        }
        this.setState((state) => ({sec: state.sec + 1}), () => {
            localStorage.setItem(SEC, this.state.sec)
        })
    }

    startTimer = () => {
        if(this.state.timerID === null) {
            this.setState({
                timerID: setInterval(this.incrementTimer, 1),
                running: true
            })
        }
    }

    pauseTimer = () => {
        if(this.state.timerID !== null) {
            clearInterval(this.state.timerID)
            this.setState({
                timerID: null,
                running: false
            })
        }
    }

    resetTimer = () => {
        this.pauseTimer()
        this.setState({
            sec: 0,
            min: 0,
            hour: 0,
            day: 0
        })
        this.resetLocalStorage()
    }

    resetLocalStorage = () => {
        localStorage.setItem(SEC, "0")
        localStorage.setItem(MIN, "0")
        localStorage.setItem(HOUR, "0")
        localStorage.setItem(DAY, "0")
    }

    componentDidMount() {
        try {
            const sec = parseInt(localStorage.getItem(SEC))
            const min = parseInt(localStorage.getItem(MIN))
            const hour = parseInt(localStorage.getItem(HOUR))
            const day = parseInt(localStorage.getItem(DAY))

            if((Number.isInteger(sec) && sec < 60 && sec >= 0) && (Number.isInteger(min) && min < 60 && min >= 0)
               && (Number.isInteger(hour) && hour < 60 && hour >= 0) && (Number.isInteger(day) && day >= 0)) {
                this.setState({sec, min, hour, day})
                return
            }
            this.resetTimer()
        }
        catch(e) {
            this.resetTimer()
            console.log(e)
        }
    }

    componentWillUnmount() {
        this.pauseTimer()
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        {`0${this.state.day}`.slice(-2)}
                        :{`0${this.state.hour}`.slice(-2)}
                        :{`0${this.state.min}`.slice(-2)}
                        :{`0${this.state.sec}`.slice(-2)}
                    </div>
                    <div>
                        {this.state.running
                         ? <button onClick={this.pauseTimer}>Pause</button>
                         : <button onClick={this.startTimer}>Start</button>
                        }
                        <button onClick={this.resetTimer}>Reset</button>
                    </div>
                </header>
            </div>
        )
    }
}
