import React from "react";
import ButtonView from './view'
import img from './button.png'

export default class Button {
    name:'button';

    id:'123'

    style:{
    };

    icon: string = img;

    get component(){
        return ButtonView
    }
}