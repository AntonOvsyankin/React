import React from 'react'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import '../styles/ResultMap.less';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'esri-leaflet';
// import {MapBounds} from 'react-leaflet-bounds';
// import {openHotel} from "./App";

const minZoom = 12;
const maxZoom = 19;

// export const hotelMarker = (id, price) => {
//     console.log('Marker', id, price);
//
//     return L.divIcon({
//         iconSize: null,
//         html: `<div class="map-label result-hotel" id="result-hotel-${id}"
//                 onmouseover="resultMapOnMouseOver('${id}')"
//                 onmouseout="resultMapOnMouseOver('')"
//                 onclick="resultMapOnMouseClick('${id}')">
//                 <div class="map-label-content">${price}</div><div class="map-label-arrow"></div>
//                 </div>`
//     });
// };

// export const hotelSoldOut = () => L.divIcon({
//     iconSize: null,
//     html: '<div class="red-notes"/>'
// });
//
// export function selectHotel(id) {
//     const expectedId = `result-hotel-${id}`;
//
//     console.log('select', expectedId);
//
//     for (let mk of document.getElementsByClassName('result-hotel')) {
//         const parent = mk.parentElement;
//         if (parent) {
//             if (mk.id === expectedId) {
//                 parent.classList.add('selected');
//             } else {
//                 parent.classList.remove('selected');
//             }
//         }
//     }
// }
//
export function strToMas(value : string) {
    const mas = (value.length > 0) ? value.split(',') : '';
    return (mas.length === 4) ? mas : '';
}

interface ResultMapProps {
    geo: string
}

interface  ResultMapState {
    zoom: number,
    zoomAccess: boolean
}



export class ResultMap extends React.Component<ResultMapProps, ResultMapState> {
    constructor(props: any) {
        super(props);
        this.state = {
            zoom: 13,
            zoomAccess: true
        }
    }
    render() {
        // console.log(this.props.currentCard);
        let mas = strToMas(this.props.geo);
        const parameters = (mas) ? {
            lat: (Number(mas[0]) + Number(mas[2])) / 2,
            lon: (Number(mas[1]) + Number(mas[3])) / 2,
            zoom: this.state.zoom
        } : {
            lon: 48,
            lat: 2,
            zoom: this.state.zoom
        };

        // const hasResults = !!this.props.hotels;

        return (
            <Map
                 id='leaflet-map'
                 maxZoom={maxZoom} minZoom={minZoom}
                 center={[parameters.lat, parameters.lon]} zoom={parameters.zoom}>
                <TileLayer
                    attribution='&amp;copy EqoIndex and <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://eqobooking.com:8000/v1/m/22/{z}/{x}/{y}.png"
                    // tileSize={512}
                    // zoomOffset={-1}
                />
            </Map>
        );
    }
}