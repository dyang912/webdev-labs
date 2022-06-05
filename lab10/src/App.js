import React from 'react';
import NavBar from './NavBar';
import Profile from './Profile';
import Stories from './Stories';
import Suggestions from './Suggestions';
import Posts from './Posts';
import {getHeaders} from "./utils";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.getProfileFromServer();
        this.state = {
            user: {}
        }
    }

    getProfileFromServer() {
        fetch('/api/profile', {
            headers: getHeaders()
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    user: data
                })
            })
    }

    render () {
        return (
            <div>
                <NavBar username={this.state.user?.username} />
                <div className="recommendations_panel">
                    <Profile profile={this.state.user}/>
                    <Suggestions />
                </div>

                <main className="main_body">
                    <Stories />
                    <Posts />
                </main>
            </div>
        );
    }
}

export default App;