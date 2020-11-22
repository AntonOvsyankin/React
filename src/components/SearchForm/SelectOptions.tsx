import * as React from "react";
import {ActionSheet, Accordion, Popover, NavBar, Icon, List, Stepper, Grid, Card, WingBlank, Button} from "antd-mobile";
import ListItem from "antd-mobile/lib/list/ListItem";
import StepperAnt from "antd-mobile/lib/stepper";
import '../../styles/SearchForm/SelectOptions.less'

const imageRoom = require('../../icons/opened-exit-door_v2.png');
const imageAdult = require('../../icons/adult.png');
const imageChild = require('../../icons/child.png');

const Item = Popover.Item;

interface SelectOptionsProps {
    adults: number,
    children: number[],
    rooms: number,
    onChange: (value?: object) => any
}

interface SelectOptionsStates {
    show: boolean,
    adults: number,
    children: number[],
    rooms: number
}

export class SelectOptions extends React.Component<SelectOptionsProps, SelectOptionsStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            rooms: this.props.rooms || 1,
            children: this.props.children || [],
            adults: this.props.adults || 2
        };
    }

    onChange = () => {
        this.props.onChange(
            {
                rooms: this.state.rooms,
                adults: this.state.adults,
                children: this.state.children
            }
        );
    };

    changeAge(idx: number, val: any) {
        let ages = this.state.children.slice(0);
        ages[idx] = val;
        this.setState({children: ages}, this.onChange);
    }

    onCancel = () => {
        this.setState({
            rooms: this.props.rooms,
            adults: this.props.adults,
            children: this.props.children
        }, this.onChange);
    };

    render() {
        const styleList = {
            display: this.state.show === true ? 'block' : 'none'
        };
        let count: number = 0;
        let row = [];
        let children: any[] = [];
        for (let i = 0; i < this.state.children.length; i++) {
            children.push(
                <div className='selectOptions-card'>
                    <Card>
                        <Accordion>
                            <Accordion.Panel header={this.state.children[i]}>
                                <List>
                                    <List.Item onClick={() => {
                                        this.changeAge(i, 1)
                                    }}> 1 </List.Item>
                                    <List.Item onClick={() => {
                                        this.changeAge(i, 2)
                                    }}> 2 </List.Item>
                                    <List.Item onClick={() => {
                                        this.changeAge(i, 3)
                                    }}> 3 </List.Item>
                                </List>
                            </Accordion.Panel>
                        </Accordion>
                    </Card>
                </div>
            );
            count++;
            if (count < 2) {
                row.push(
                    <div className='selectOptions-children-pair'>
                        {children[i]}
                    </div>
                );
            } else {
                row.pop();
                row.push(
                    <div className='selectOptions-children-select'>
                        {children[i - 1]}
                        {children[i]}
                    </div>
                );
                count = 0;
            }
        }
        return (
            <div>
                <WingBlank size="md">
                    <Card
                        className='selectOptions-card-content'
                        onClick={() => {
                            this.setState({show: true});
                        }}
                    >
                        <Card.Body className='selectOptions-card-body'>
                            <div className='left-card-body'>

                                    <img className='left-card-adults' src={imageRoom}/>
                                    <label className='left-card-label'> {this.state.rooms} </label>


                                    <img className='left-card-adults' src={imageAdult}/>
                                    <label className='left-card-label'> {this.state.adults} </label>


                                    <img className='left-card-adults' src={imageChild}/>
                                    <label className='left-card-label'> {this.state.children.length} </label>

                            </div>
                            <div className='right-card-body'>
                                <Icon className='right-card-icon' type='down'/>
                            </div>
                        </Card.Body>
                    </Card>
                </WingBlank>
                <div className='selectOptions-list-main' style={styleList}>
                    <NavBar
                        className='am-navbar-light'
                        mode="light"
                        icon={<Icon color='#9fc94d' type="cross"/>}
                        onLeftClick={() => {
                            this.onCancel();
                            this.setState({show: false})
                        }}
                        rightContent={
                            <Icon
                                color='#9fc94d'
                                onClick={() => {
                                    this.onChange();
                                    this.setState({show: false})
                                }}
                                type="check"
                                style={{marginRight: '16px'}}
                            />}
                    >
                        NavBar
                    </NavBar>
                    <List.Item
                        wrap
                        style={{width: '340px'}}
                        className='selectOptions-list-parameter'
                        extra={
                            <Stepper
                                className='selectOptions-stepper'
                                showNumber
                                max={10}
                                min={1}
                                value={this.state.adults}
                                onChange={(e) => {
                                    this.setState({adults: e}, this.onChange);
                                }}
                            />}
                    >
                        adults
                    </List.Item>
                    <List.Item
                        style={{width: '340px'}}
                        className='selectOptions-list-parameter'
                        extra={
                            <Stepper
                                className='selectOptions-stepper'
                                showNumber
                                max={10}
                                min={1}
                                value={this.state.rooms}
                                onChange={(e) => {
                                    this.setState({rooms: e}, this.onChange);
                                }}
                            />}
                    >
                        rooms
                    </List.Item>
                    <List.Item
                        style={{width: '340px'}}
                        className='selectOptions-list-parameter'
                        extra={
                            <Stepper
                                className='selectOptions-stepper'
                                showNumber
                                max={10}
                                min={0}
                                value={this.state.children.length}
                                onChange={(e) => {
                                    e < this.state.children.length ? this.setState({children: this.state.children.splice(0, this.state.children.length - 1)}) :
                                        this.setState({children: [...this.state.children, 2]}, this.onChange);
                                }
                                }
                            />}
                    >
                        children
                    </List.Item>
                    {row}
                    <Button
                        className='selectOptions-button'
                        onClick={() => {
                            this.onChange();
                            this.setState({show: false})
                        }}
                    > Access
                    </Button>
                </div>

            </div>
        );
    }
}