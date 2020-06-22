import PropTypes from "prop-types";
import React from "react";


class Nav extends React.Component {
    prettyName = (page) => {
        switch(page) {
        case "fretboard":
            return "Fretboard";
        case "metronome":
            return "Metronome";
        default:
            return "Coming Soon";
        }
    }

    render() {
        return (
            <div className="nav">
                {this.props.pages.map((page, index) => {
                    var className = "nav-button";
                    if (page === this.props.currentPage) {
                        className += " nav-button-active";
                    }
                    return (
                        <input
                            value={this.prettyName(page)}
                            className={className}
                            type="button"
                            key={index}
                            onClick={() => this.props.changePage(page)}
                        />
                    );
                })}
            </div>
        );
    }
}

Nav.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentPage: PropTypes.string.isRequired,
    changePage: PropTypes.func.isRequired
};


export default Nav;
