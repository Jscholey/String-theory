import PropTypes from "prop-types";
import React from "react";


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
                    step={this.props.step != null ? this.props.step : 1}
                    onChange={this.props.onUpdate}
                />
                <input
                    value={this.props.number}
                    type="range"
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    onChange={this.props.onUpdate}
                />
            </form>
        );
    }
}

Slider.defaultProps = {
    step: 1
};

Slider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
    ]).isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
    step: PropTypes.number
};


export default Slider;
