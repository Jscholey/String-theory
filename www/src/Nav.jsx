import React from 'react';


class Nav extends React.Component {
    prettyName = (page) => {
        switch(page) {
            case "fretboard":
                return "Fretboard";
            case "metronome":
                return "Super duper metronome";
            default:
                return "huh wtf";
        }
    }

    render() {
        return (
            <div id="nav">
                {this.props.pages.map((page, index) => {
                    return (
                        <input
                            value={this.prettyName(page)}
                            type="button"
                            onClick={() => this.props.changePage(page)}
                        />
                    )
                })}
            </div>
        )
    }
}


export default Nav;
