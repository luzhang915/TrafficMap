import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from './components/Header';
import Map from './components/Map';

require('dotenv').config()

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            applicationName: 'Traffic Map'
        }
    };

    render() {
        return (
            <div className="App">
            <Header appName={this.state.applicationName}/>

            <Container>
                <Map />
            </Container>
            </div>
        );
    }

}

export default App;
