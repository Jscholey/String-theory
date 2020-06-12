import React from 'react';
import FretboardPage from './fretboard/Fretboard.jsx';
import Nav from './Nav.jsx'


class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPage: "fretboard",
                      pages: ["fretboard", "metronome"]}
    }

    changePage = (page) => {
        if (this.state.pages.includes(page)) {
            this.setState({currentPage: page});
        }
    }

    render() {
        var page;
        switch (this.state.currentPage) {
            case "fretboard":
                page = <FretboardPage />
                break;
            default:
                page = <div>No page found</div>
        }

        return (
            <div>
                {page}
                <Nav {...this.state}
                     changePage={this.changePage}/>
            </div>
        )
    }
}


export default Container;
