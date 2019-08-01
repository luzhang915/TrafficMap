import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import CityPin from './Pin';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            api_url: 'https://data.edmonton.ca/resource/87ck-293k.json',
            viewport: {
                width: 1100,
                height: 600,
                latitude: 53.5444,
                longitude: -113.4989,
                zoom: 10
            },
            coords: [
                { latitude: 53.5444, longitude: -113.4989 },
                { latitude: 53.5437, longitude: -113.4937 },
                { latitude: 53.5439, longitude: -113.4917 },
            ],
            data: null,
        };
    }

    componentDidMount() {
        const { data, api_url } = this.state;

        if (!data) {
            fetch(api_url, { method: 'GET' })
                .then(response => response.json())
                // .then(response => console.log(response.map(coord => (
                //     coord.location.longitude.valueOf()
                // ))));
                .then(response => this.setState({ data: response }));
        }
    }

    render() {
        const { coords, data } = this.state;

        return (
            <MapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                {...this.state.viewport}
                onViewportChange={viewport => this.setState({ viewport })}>

                {data && data.map((coord, i) => (
                    <Marker key={`marker-${i * (Math.random() * 200 + 1)}`}
                            latitude={Number(coord.location.latitude)}
                            longitude={Number(coord.location.longitude)}>
                        <CityPin />
                    </Marker>
                )) }

            </MapGL>
        );
    }
}