import React from 'react';
import {SearchForm} from "./SearchForm/SearchForm";
import {AppStateAwareComponent} from "./AppState";
import {DEFAULT_NAVSTATE} from "../../constants";
import {app} from "./AppState";


interface WelcomeScreenProps {
    hash : string
}
interface WelcomeScreenState {

}

export class WelcomeScreen extends AppStateAwareComponent<WelcomeScreenProps,WelcomeScreenState>{
    constructor(props: string) {
        super(props);
    }

    getDefaultNavState() {
        return DEFAULT_NAVSTATE;
    }

    render() {
        return (
            <SearchForm
                q={this.state.q}
                geo={this.state.geo}
                adults={this.state.adults}
                rooms={this.state.rooms}
                children={this.state.children}
                checkin={this.state.checkin}
                checkout={this.state.checkout}
                onChange = {(e: object) => {
                this.setState(e, () => {
                    app.setNavState(this.state, this.getDefaultNavState());
                    app.go('s');
                })
            }}/>
        );
    }
}