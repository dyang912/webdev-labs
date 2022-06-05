import React from 'react';

class NavBar extends React.Component {  

    constructor(props) {
        super(props);
        console.log('NavBar component created');
    }

    componentDidMount() {
        console.log('NavBar component mounted');
    }

    render () {
        return (
            <div className="navbar">
                <h1 className="logo">Photo App</h1>

                <ul className="user">
                    <li><a href="/api">API Docs</a></li>
                    <li><div>{this.props.username}</div></li>
                    <li><a href="/login">Sign out</a></li>
                </ul>
            </div>
        );
    }
}

export default NavBar;