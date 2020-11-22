import React from 'react'
import "../../styles/ResultScreen/EQORating.less";

const yellowStar = require('../../icons/yellowStar.png');
const greenStar = require('../../icons/greenStar.png');
const greyStar = require('../../icons/greyStar.png');
const blueStar = require('../../icons/blueStar.png');
const yellowStarHalf = require('../../icons/yellowStar-half.png');
const greenStarHalf = require('../../icons/greenStar-half.png');
const greyStarHalf = require('../../icons/greyStar-half.png');
const blueStarHalf = require('../../icons/blueStar-half.png');

interface StarRatingProps {
    variant: number,
    number: number
}

export class StarRating extends React.Component<StarRatingProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let star;
        let starHalf;
        const number = this.props.number || 0.0;
        switch (this.props.variant) {
            case 1:
                star = <img className='icon-style' src={yellowStar}/>;
                starHalf = <img className={'icon-style'} src={yellowStarHalf}/>;
                break;
            case 2:
                star = <img className='icon-style full' src={greenStar}/>;
                starHalf = <img className={'icon-style'} src={greenStarHalf}/>;
                break;
            case 3:
                star = <img className='icon-style full' src={blueStar}/>;
                starHalf = <img className={'icon-style'} src={blueStarHalf}/>;
                break;
        }
        return (
            <div className={'stars'}>
                {number === 0.5 ? starHalf : number >= 1.0 ?
                    star : <img className='icon-style ' src={greyStar}/>}
                {number === 1.5 ? starHalf : number >= 2.0 ?
                    star : <img className='icon-style ' src={greyStar}/>}
                {number === 2.5 ? starHalf : number >= 3.0 ?
                    star : <img className='icon-style ' src={greyStar}/>}
                {number === 3.5 ? starHalf : number >= 4.0 ?
                    star : <img className='icon-style ' src={greyStar}/>}
                {number === 4.5 ? starHalf : number >= 5.0 ?
                    star : <img className='icon-style ' src={greyStar}/>}
            </div>
        );
    }
}