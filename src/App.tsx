import React from 'react';
import {Route, Router} from 'react-router';
import {WelcomeScreen} from "./components/WelcomeScreen";
import {ResultScreen} from "./components/ResultScreen/ResultScreen";
import {HashRouter, Switch} from 'react-router-dom';
import {app} from "./components/AppState";
import {Routes} from "../constants"
import './App.css';
import {Res} from "awesome-typescript-loader/dist/checker/protocol";
import {Result} from "antd-mobile";

interface AppProps {
}

interface AppState {
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route exact path={Routes.ROOT} render ={()=> (<WelcomeScreen hash={app.newHash()}/>)}/>
                        <Route exact path={Routes.ROOT_RESULT} render={() => (<ResultScreen hash={app.newHash()}/>)}/>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}