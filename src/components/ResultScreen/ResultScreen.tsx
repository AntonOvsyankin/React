import React from 'react';
import {AppStateAwareComponent, formatRoute, app} from "../AppState";
import {DEFAULT_NAVSTATE, DEFAULT_NAVSTATE_RESULTS} from "../../../constants";
import {HotelList} from "./HotelList";
import {type} from "os";
import {Button} from "antd-mobile";
import "../../styles/ResultScreen/ResultScreen.less";
import {ResultMap} from "./ResultMap";

interface ResultScreenProps {
    hash : string
}
interface ResultScreenState {
    hotels?: object,
    paramsOfView?: number;
}

export class ResultScreen extends AppStateAwareComponent<ResultScreenProps, ResultScreenState>{
    lastFetch: any;
    constructor(props: object) {
        super(props);
        this.setState({ hotels: '', paramsOfView: 1});
        this.lastFetch = null;
    }

    getDefaultNavState() {
        return DEFAULT_NAVSTATE_RESULTS;
    }

    loadHotels() {
        this.setState({hotels: ''});
        const params = {
            q: this.state.q,
            geo: this.state.geo,
            adults: this.state.adults,
            rooms: this.state.rooms,
            // children: this.state.,
            checkin: this.state.checkin,
            checkout: this.state.checkout,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            currency: this.state.currency,
            sort: this.state.sort,
            priceTotal: this.state.priceTotal,
            eqo: this.state.eqo,
            star: this.state.star,
        };

        const uri = formatRoute('s', params);

        if (this.lastFetch === uri) {
            return; // already in progress
        } else {
            this.lastFetch = uri;
        }

        console.log('Loading hotels:', params);

        fetch('/v1/' + uri, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((result) => {
            return result.json();
        }).then((response) => {
            console.log('Received response:', response.hotels);
            this.setState({hotels: response.hotels});
        }).catch((error) => {
            alert(error);
        });
    }

    componentDidUpdate(prevProps: any) {
        super.componentDidUpdate(prevProps);
    }

    componentDidMount(): void {
        this.setState({paramsOfView: 1});
        this.loadHotels();
    }

    render() {
        console.log(this.state.paramsOfView);
        if (this.state.paramsOfView === 1) {
            return (
                <div>
                    <HotelList hotels={this.state.hotels}/>
                    <div className='ResultScreen0div-buttons'>  <Button className='button-map' onClick={()=> this.setState({paramsOfView: 2})}> Map </Button> </div>
                </div>
            );
        } else
        if (this.state.paramsOfView === 2) {
            return(
            <div>
                <ResultMap  geo={this.state.geo}/>
            </div>
            );
        } else {
            return (
                <div/>
            );
        }
    }
}