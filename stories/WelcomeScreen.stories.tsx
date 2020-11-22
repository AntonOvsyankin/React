import { storiesOf } from '@storybook/react';
import * as React from 'react';
import {Button} from "antd-mobile";
import 'antd-mobile/dist/antd-mobile.less';
import {LocationSearch} from "../src/components/SearchForm/LocationSearch";
import {SearchForm} from "../src/components/SearchForm/SearchForm";
import {HotelList} from "../src/components/ResultScreen/HotelList";
import result from "../src/hotels";
import {CardComponent} from "../src/components/ResultScreen/CardComponent";
import {ButtonSort} from "../src/components/ResultScreen/ButtonSort";
import {CalendarComponent} from "../src/components/SearchForm/CalendarComponent";

storiesOf("Button", module)
    .add("with text", () => (
        <Button onClick={()=> console.log('Check')}>Hello Button</Button>
    ))
    .add("with some emoji", () => (
        <Button>😀 😎 👍 💯</Button>
    ));

storiesOf("LocationSearch", module)
    .add('test', ()=>(
        <LocationSearch
            q = {''}
            onLocationChange={()=> console.log('test')}
        />
    ));

storiesOf("SearchForm", module)
    .add('test', ()=>(
        <SearchForm  checkin={'2019-09-10'} checkout={'2019-09-28'} onChange = {(value: object)=> console.log(value)}/>
    ));

storiesOf("HotelList", module)
    .add('test', ()=>(
        <HotelList hotels={result.hotels}/>
    ));

storiesOf("CardComponent", module)
    .add('test', ()=>(
        <CardComponent hotel={result.hotels[0]} days={3}/>
    ));

storiesOf("ButtonsSort", module)
    .add('test', ()=>(
        <ButtonSort onChange={(value: object) => console.log(value)}/>
    ));

storiesOf("CalendarComponent", module)
    .add('test', ()=>(
        <CalendarComponent checkin={'2019-09-22'} checkout={'2019-10-27'} onChange={(value)=> console.log(value)}/>
    ));


