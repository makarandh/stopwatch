import React from "react"


export class Toggle extends React.Component {
    state = {
        isToggleOn: true
    }

    handleClick = () => {
        this.setState(prevState => ({isToggleOn: !prevState.isToggleOn}))
    }

    render() {
        return (
            <button onClick={this.handleClick}>        {this.state.isToggleOn ? "ON" : "OFF"}
            </button>
        )
    }
}
