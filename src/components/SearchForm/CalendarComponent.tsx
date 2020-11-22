import React from "react";
import {List, Switch, Calendar, Card, WingBlank, WhiteSpace, Icon} from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import "../../styles/SearchForm/CalendarComponent.less";

const imageSrc = require('../../icons/calendar.png');

interface CalendarComponentProps {
    onChange: (value: object) => any,
    checkin: string,
    checkout: string
}

interface CalendarComponentState {
    en: boolean,
    show: boolean,
    config: object,
    checkin: string,
    checkout: string
}

const now = new Date();

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

export class CalendarComponent extends React.Component<CalendarComponentProps, CalendarComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            en: false,
            show: false,
            config: {},
            checkin: this.props.checkin,
            checkout: this.props.checkout,
        };
    }

    onChange = () => {
        this.props.onChange({
            checkin: this.state.checkin,
            checkout: this.state.checkout
        });
    };

    render() {
        return (
            <div>
                <WingBlank size="md">
                    <Card
                        className='am-card'
                        onClick={()=>{this.setState({show: true})}}
                    >
                        <Card.Header
                            className='am-card-header-content'
                            thumb={imageSrc}
                            title={this.state.checkin + ' : ' + this.state.checkout}
                            extra={<Icon color='#9fc94d' type='down' />}
                        />
                    </Card>
                </WingBlank>
                <Calendar
                    locale={enUS}
                    visible={this.state.show}
                    defaultValue={[getDate(this.props.checkin), getDate(this.props.checkout)]}
                    onCancel={()=>this.setState({show: false})}
                    onConfirm={(value1, value2)=>{
                        this.setState({checkin: formatDate(value1), checkout: formatDate(value2), show : false },()=>this.onChange());
                    }}
                    minDate={getDate(this.props.checkin)}
                    maxDate={new Date(+getDate(this.props.checkout) + 29022400000)}
                />
            </div>
        );
    }
}