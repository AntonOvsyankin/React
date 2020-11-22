import  React from "react";
import {Button} from "antd-mobile";
import "../../styles/ResultScreen/ButtonSort.less";

interface ButtonSortProps {
    onChange : (param: object) => any
}

export class ButtonSort extends React.Component<ButtonSortProps> {
    constructor(props: any) {
        super(props);
    }

    onClick = (value: string, number: number) => {
        this.props.onChange({
            sort: value,
            autoFocus: number
        });
    };

    render() {
        return(
            <div className='filter-div-buttons'>
                    <Button className='hotelSort' onClick={() => this.onClick('eqo', 1)}> EQO Index </Button>
                    <Button className='hotelSort'  onClick={() => this.onClick('rating', 2)}> Guest rating </Button>
                    <Button className='hotelSort'  onClick={() => this.onClick('price', 3)}> Price </Button>
                    <Button className='hotelSort'  onClick={() => this.onClick('distance', 4)}> Distance </Button>
            </div>
        );
    }
}