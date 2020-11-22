import * as React from "react";
import {WingBlank, WhiteSpace, DatePicker, InputItem, Accordion, List, Button} from "antd-mobile";
import ListItem from "antd-mobile/lib/list/ListItem";
import {LocationSearch} from "./LocationSearch";
import '../../styles/SearchForm/SearchForm.less';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import 'date.format';
import {SelectOptions} from "./SelectOptions";
import {CalendarComponent} from "./CalendarComponent";

//import {DATE_FORMAT} from "../../../constants"

function formatDate(date: any) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export const getDate = (value: string) => {
    return new Date(value.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1'));
};


interface Date {
    format(value: Date): string;
}

interface SearchFormProps {
    onChange: (value: object) => any,
    checkin: string,
    checkout: string,
    q?: string,
    geo?: string,
    adults?: string,
    rooms?: string,
    children?: string
}

interface SearchFormStates {
    q?: string,
    geo?: string,
    checkin: string,
    checkout: string,
    adults?: string,
    rooms?: string,
    children?: string
}

export class SearchForm extends React.Component<SearchFormProps, SearchFormStates> {
    constructor(props: any) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    onChange = () => {
        this.props.onChange(this.state);
    };

    render() {
        return (
            <div className='searchForm-div-main'>
                    <LocationSearch q = {this.props.q} onLocationChange={(value) => {this.setState(value)}}/>
                    <WhiteSpace size="lg" />
                    <CalendarComponent checkin={this.state.checkin} checkout={this.state.checkout}
                                       onChange={(value) => this.setState(value)}/>
                    <WhiteSpace size="lg" />
                    <SelectOptions
                        children={[]}
                        adults={2}
                        rooms={1}
                        onChange={(value: any) => {
                            this.setState({
                                adults: value.adults,
                                rooms: value.rooms,
                                children: value.children.join(','),
                            });
                        }}
                    />
                    <WhiteSpace size="lg" />
                    <WingBlank size="md">
                        <Button className='searchForm-button' onClick={this.onChange}> Search </Button>
                    </WingBlank>
            </div>
        );
    }
}