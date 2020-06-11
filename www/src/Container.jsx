import React from 'react';
import './App.css';
import Page1 from './Page1.jsx';
import Page2 from './Page2.jsx';
import Footer from './Footer.jsx';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPage: "Page1",
                      pages: ["Page1", "Page2"]};
    }

    changePage = (page) => {
        if (this.state.pages.includes(page)) {
            this.setState({currentPage: page});
        }
    }

    render() {
        var page = <div>No page found</div>
        if (this.state.currentPage === "Page1") {
            page = <Page1 />
        } else if (this.state.currentPage === "Page2") {
            page = <Page2 />
        }

        return (
            <div>
                {page}
                <Footer {...this.state}
                        changePage={this.changePage} />
            </div>
        )
    }
}

export default Container;