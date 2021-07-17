import React from "react";
import ButtonView from './view'
import img from './button.png'
import PartLayoutComponent from "@components/PartLayoutComponent";

export default class Button extends PartLayoutComponent{

    constructor() {
        super();
    }
    /**
     * 组件名字
     * */
    name = 'button';
    /**
     * id
     * */
    id = '';
    /**
     * 组件名字
     * */
    style = {

    };

    partId = "button1";

    layoutType = 'baseButton';
    /**
     * 展示的图标
     * */
    icon: string = img;
    /**
     * 组件views
     * */
    get component(){
        return ButtonView
    }
}