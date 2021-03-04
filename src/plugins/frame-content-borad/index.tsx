import React, {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Frame from '@src/components/react-frame-component'
import FrameContext from '@src/components/FrameContext';
import { FrameContextConsumer } from 'react-frame-component'
import MainPanelRender from "@src/plugins/main-panel-render";
import {DndProvider,useDragDropManager } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import _ from 'lodash'


export default function FrameContent (){
    const dragDropManager = useDragDropManager();
    let [isInit,setInit] = useState(true)
    let iframes:any;
    let manager:any;
    const handleRef = el => {
        iframes = el;
        // setIframe(el);
        console.log(el.node.contentWindow)
    };
    useEffect(() => {
        return () =>{
            manager
                .getBackend()
                .removeEventListeners(iframes.node.contentWindow);
        }
    });
    const iframeInit = dragDropManager => {
        setTimeout(() =>  {
            console.log(iframes);
            dragDropManager.getBackend().addEventListeners(iframes.node.contentWindow);
        },200)
        // dragDropManager.getBackend().addEventListeners(iframes.node.contentWindow);
        //
        manager = dragDropManager;
    };

    const iframeDidUpdate = dragDropManager => {
        setTimeout(() =>  {
            dragDropManager.getBackend().addEventListeners(iframes.node.contentWindow);
        },200)
        // if (_.isUndefined(iframe.contentWindow.$)) {
        //     this.initFrameScript(iframe);
        // }
    };
    return(
        <Frame
            contentDidMount={iframeInit(dragDropManager)}
            ref={handleRef}
            contentDidUpdate={iframeDidUpdate}
            style={{position:'relative', width:'1200px', height:'800px'}}
        >
            <MainPanelRender/>
        </Frame>
    )
}