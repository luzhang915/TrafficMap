import React, { Component } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from './components/Header';
import Map from './components/Map';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            applicationName: 'Traffic Map',
            data: null,
            api_url: 'https://data.edmonton.ca/resource/87ck-293k.json'
        }
    };

    createFeatureCollection(data) {
        let features = [];
        data.forEach(point => {
            features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        parseFloat(point.location.longitude),
                        parseFloat(point.location.latitude)
                    ]
                },
                "properties": {
                    "name": point.disruption_number,
                    "description": point.description,
                    "details": point.details,
                    "duration": point.duration,
                    "impact": point.impact
                }
            });
        });

        return {
            "type": "FeatureCollection",
            "features": features
        };
    }

    componentDidMount() {
        const { data, api_url } = this.state;

        if (!data) {
            fetch(api_url, { method: 'GET' })
                .then(response => response.json())
                .then(response => this.createFeatureCollection(response))
                .then(response => this.setState({ data: response }));
        }
    }

    render() {
        return (
            <div className="App">
            <Header appName={this.state.applicationName}/>

            <Container>
                <Map data={this.state.data}/>
            </Container>
            </div>
        );
    }

}

export default App;
