import * as React from "react";
import {CardComponent} from "./CardComponent";

interface HotelListState {
}

interface HotelListProps {
    hotels: object[]
}

export class HotelList extends React.Component<HotelListProps, HotelListState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        if (this.props.hotels) {
            return (
                <div>
                    {this.props.hotels.map((value: object) =>
                        <CardComponent
                            days={3}
                            hotel={value}
                        />
                    )}
                </div>
            );
        } else {
            return (
                <div/>
            );
        }
    }

}