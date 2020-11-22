import React from 'react'
import '../../styles/ResultScreen/CardComponent.less';
import {StarRating} from "./StarRating";

const imageSrc = require('../../icons/goodIcon.png');

interface CardComponentProps {
    days: number,
    hotel: any
}

interface CardComponentState {

}

export const openHotel = (hotel: any) => {
    console.log('Open', hotel);
    window.open(`/v1/go/${hotel.src}/${hotel.id}${hotel.url}`, 'booking');
};

export class CardComponent extends React.Component<CardComponentProps, CardComponentState> {

    render() {
        const soldOut = {
            marginTop: this.props.hotel.icon === 'hotel_soldout' ? '25px' : '-15px'
        };
        const spanStyle = {
            display: (this.props.hotel.stars === 0) ? 'none' : 'block'
        };
        const currentMarkerComponent = {
            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.25)'
        };
        return (
            <div ref="card" style={currentMarkerComponent}
                 className='div-card' onClick={() => openHotel(this.props.hotel)}>
                <div className='div-block-left'>
                    <img className='div-block-img' src={'https://static.booking.com' + this.props.hotel.image_url}/>
                </div>
                <div className='div-block-right'>
                    <div className='div-block-description'>
                        <p className='label-block-title'>  {this.props.hotel.title}</p>
                        <StarRating number={this.props.hotel.stars} variant={1}/>
                        <div className='div-block-eqo div-block-margin'>
                            <label className='label-block-right'> EQO Outdoors </label>
                            <StarRating
                                variant={2}
                                number={this.props.hotel.eqo}
                            />
                        </div>
                        <div className='div-block-eqo'>
                            <label className='label-block-right label-block-indoors'> EQO Indoors </label>
                            <StarRating
                                variant={3}
                                number={Math.abs(this.props.hotel.eqo_in)}
                            />
                        </div>
                        <label className='label-block-description'> Some description of hotel </label>
                        <div className='div-block-price'>
                            <div className='div-price-right'>
                                <div className='div-price-nights'>
                                    <label className='label-block-cost'>  {this.props.hotel.price} </label>
                                    <label className='label-nights'> {this.props.days > 1 ? 'Price for ' + this.props.days + ' nights' : 'Price for 1 night'} </label>
                                </div>
                                {/*<div className='card-block-price'>*/}
                                {/*    <div className='card-free-cancellation'>*/}
                                {/*        <p className='p-no-door p-fix label-rooms-soldOut'> SOLD OUT </p>*/}
                                {/*    </div>*/}
                                {/*</div>}*/}
                            </div>
                            <div className='div-price-sales'>
                                <label className='label-sales-count'> Only 4 left! </label>
                            </div>
                        </div>
                    </div>
                </div>
                {(this.props.hotel.review > 0) ?
                    <div className='div-review-position'>
                        <label
                            className='label-block-mark'>  {(this.props.hotel.review - Math.floor(this.props.hotel.review) > 0) ?
                            this.props.hotel.review : this.props.hotel.review + '.0'}
                        </label>
                    </div> : <div/>}
            </div>
        );
    }
}
