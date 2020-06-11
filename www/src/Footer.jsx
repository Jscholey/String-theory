import React from 'react';
import './App.css';

class Footer extends React.Component {
    render() {
        return (
            <div id="footer">
                <h3>This is a footer, it should appear on every "page"</h3>
                <h4>{this.props.currentPage}</h4>
                {this.props.pages.map((page, i) => {return <button onClick={() => {this.props.changePage(page)}}>{page}</button>})}
            </div>
        )
    }
}

export default Footer;