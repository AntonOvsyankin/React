import * as React from "react";
import {OpenStreetMapProvider} from "leaflet-geosearch";
import {WingBlank,Card, InputItem, List} from "antd-mobile";
import ListItem from "antd-mobile/lib/list/ListItem";
import "../../styles/SearchForm/LocationSearch.less";
import {type} from "os";

const imageSrc = require('../../icons/icon-input.png');

export interface bound {
    boundingbox: string[]
}

export interface city {
    raw: bound
    label: string
}

export interface LocationSearchProps {
    q?: string,
    onLocationChange: (geo?: any, q?: string) => any
}

export interface LocationSearchState {
    current ?: string,
    dataSource: city[],
    suggestionOptions?: ListItem[],
    value?: string
}

export class LocationSearch extends React.Component<LocationSearchProps, LocationSearchState, city> {
    constructor(props: any) {
        super(props);
        this.state = {
            dataSource: [],
            suggestionOptions: [],
            value: this.props.q || undefined,
            current: '',
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSearch(value?: string) {
        this.setState({value: value});
        if (value) {
            let openProvider = new OpenStreetMapProvider();
            let query_promise = openProvider.search({query: value});
            let data: any = [];
            query_promise.then((value: any) => {
                    for (let item of value) {
                        if (data.findIndex((f: any) => f.label === item.label) < 0)
                            data.push(item);
                    }
                    this.setState((current) => ({
                        ...current,
                        dataSource: data,
                        suggestionOptions: data.map((v: any, i: number) => (
                            <ListItem onClick={() => {
                                this.handleSelect(v.label)
                            }}> <span><img
                                alt='x'
                                src={v.raw.icon}/> {v.label}</span></ListItem>
                        )),
                    }));
                }
            );
        } else {
            this.setState({suggestionOptions: []});
            this.props.onLocationChange({
                geo: '',
                q: ''
            });
        }
    }

    handleSelect(value?: string) {
        let item: city | undefined = this.state.dataSource.find((v: any) => v.label === value);
        if (!item) return;
        this.setState({value: item.label},()=> this.setState({suggestionOptions: []}));
        let geo = [item.raw.boundingbox[0], item.raw.boundingbox[2], item.raw.boundingbox[1], item.raw.boundingbox[3]].join(',');
        this.props.onLocationChange({
            geo: geo,
            q: item.label
        });
    }

    render() {
        return (
            <div>
                <WingBlank size="md">
                <Card className='location-card-content am-card'>
                    <Card.Body className='location-card-body'>
                <List>
                        <InputItem value={this.state.value} className='location-input-main' clear onChange={this.handleSearch}
                                   placeholder="Where would you like to be?">
                            <img className='' src={imageSrc}/>
                        </InputItem>
                            {this.state.suggestionOptions}
                </List>
                    </Card.Body>
                </Card>
                </WingBlank>
            </div>
        );
    }
}
