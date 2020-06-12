import React from 'react';


/* 
* Requires Props:
* int min
* int max
* int number (current value)
* func onUpdate
* 
* Requires string children
*/
class Slider extends React.Component {
    render() {
        return (
            <form>
                <label>{this.props.children}</label>
                <input
                    value={this.props.number}
                    type="number"
                    min={this.props.min}
                    max={this.props.max}
                    onChange={this.props.onUpdate}
                />
                <input
                    value={this.props.number}
                    type="range"
                    min={this.props.min}
                    max={this.props.max}
                    onChange={this.props.onUpdate}
                />
            </form>
        )
    }
}


export default Slider;
