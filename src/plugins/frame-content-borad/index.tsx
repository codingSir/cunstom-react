import React, {useState} from "react";
import Frame from 'react-frame-component'
import FrameContext from '@src/components/FrameContext';
import { FrameContextConsumer } from 'react-frame-component'
import MainPanelRender from "@src/plugins/main-panel-render";
import {DndProvider,useDragDropManager } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


export default function FrameContent (){
    const dragDropManager = useDragDropManager();

    function iframeInit(dragDropManager){
        console.log(dragDropManager)
        console.log('222')
    }
    return(
        <Frame style={{position:'relative', width:'1200px', height:'800px'}} >
            <MainPanelRender/>
        </Frame>
    )
}