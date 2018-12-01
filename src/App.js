import React, {Component} from 'react';
import './App.css';
import './bootstrap-grid.css'
import queryString from 'query-string';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputTitle: '',
        };

        this.getInputData = this.getInputData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getAPIdata = this.getAPIdata.bind(this);
    }

    getInputData(title) {
        this.setState({inputTitle: title})
    }

    getAPIdata() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token
        fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify({
                'snippet':
                {
                    'title':this.state.inputTitle
                }
            })
        }).then(response => response.json()).then(data => {
            console.log(data)
            window.alert('https://www.youtube.com/playlist?list=' + data.id + '\n if this says undefined look in the console for errors (ctrl+shift+i)')
        })
    }

    handleClick() {
        this.getAPIdata(this.state.inputTitle)
    }

    render() {
        return (<div className="App">
        <h1>Playlist creator</h1>
        <h2>YouTube</h2>
        <button className="token-btn" onClick={() => window.location = 'https://yt-playlist-creator-backend.herokuapp.com/authenticate'}>Get Token</button>
        <SongInput callback={this.getInputData} btnpress={this.handleClick}/>
        <div className="row">
        </div>
    </div>);
}
}

class SongInput extends Component {
    render() {
        return (<div className="searchbar">
        <input type="text" placeholder="Playlist title" onChange={e => this.props.callback(e.target.value)}/>
        <button className='submit' onClick={this.props.btnpress}>Create</button>
    </div>);
}
}

export default App;
