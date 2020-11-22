import React from 'react'
import {object} from "prop-types";


interface QueryParameters {
    [key: string]: any,

}

export function formatRoute(query : string, params: QueryParameters) {
    let hashParams = Object.entries(params)
        .filter(e => e[0][0] && !'_/#'.includes(e[0][0]))
        .map(e => `${e[0]}=${encodeURIComponent(e[1])}`).join('&');
    return `${query}?${hashParams}`;
}

function parseParams(hash: string) {
    let hashes = hash.slice(hash.indexOf('?') + 1).split('&');
    let params: QueryParameters = {};
    hashes.map(h => {
        let [key, val] = h.split('=');
        params[key] = decodeURIComponent(val);
    });

    return params
}

export class AppState {
    appState: object;
    navState: QueryParameters;
    hash?: string;
    constructor() {
        this.appState = {};
        this.navState = {};
        this.hash = '';
        this.newHash();
    }
    newHash() {
        if (this.hash !== window.location.hash) console.log('New hash', window.location.hash);
        this.navState = parseParams(this.hash = window.location.hash);
        return this.hash;
    }

    go = (action = '') => {
        const url = formatRoute(action, this.navState);
        //console.log('jump to: ', url);
        window.location.hash = url;
    };

    jump = (action = '') => {
        // rewrites hash in history, so that back button returns to previous of the current page
        const url = formatRoute(action, this.navState);
        //console.log('jump to: ', url);
        window.location.replace('#' + url);
    };

    setNavState(newState: any, defaults: any) {
        for (let prop of Object.keys(defaults)) this.navState[prop] = newState[prop];
    }

    getNavState(defaults: QueryParameters) {
        let ret: QueryParameters = {};
        for (let prop of Object.keys(defaults)) ret[prop] = this.navState[prop] || defaults[prop];
        return ret;
    }
}

export class AppStateAwareComponent<P, S> extends React.Component<P, QueryParameters> {
    getDefaultNavState() {
        return {};
    }

    constructor(props : any) {
        super(props);
        this.state = app.getNavState(this.getDefaultNavState());
    }

    componentDidUpdate(prevProps : any) {
        // console.log('componentDidUpdate', this.props.hash, app.hash);
        if (prevProps.hash !== app.hash) {
            this.setState(app.getNavState(this.getDefaultNavState()));
        }
    }
}

export let app = new AppState();
