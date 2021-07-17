import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import Frame from '@src/components/react-frame-component'
import FrameContext from '@src/components/FrameContext';
import { FrameContextConsumer } from 'react-frame-component'
import MainPanelRender from "@src/plugins/main-panel-render";
import {DndProvider,useDragDropManager } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import _ from 'lodash'
import {worker} from "cluster";


export default function FrameContent (){
    const dragDropManager = useDragDropManager();
    const ref = useRef();

    let iframes:any;
    let manager:any;

    useLayoutEffect(() => {

        return () =>{
            manager
                .getBackend()
                .removeEventListeners(iframes.contentWindow);
        }
    },[iframes]);
    const iframeInit = (dragDropManager) => {
        iframes = ReactDOM.findDOMNode(ref.current);
        dragDropManager.getBackend().addEventListeners(iframes.contentWindow);

        manager = dragDropManager;

        const heads = window.document.head.cloneNode(true)
        iframes.contentWindow.document.head.appendChild(heads)
    };

    const iframeDidUpdate = dragDropManager => {
        dragDropManager.getBackend().addEventListeners(iframes.contentWindow);

        // if (_.isUndefined(iframe.contentWindow.$)) {
        //     this.initFrameScript(iframe);
        // }
    };
    return(
        <Frame
            contentDidMount={() => iframeInit(dragDropManager)}
            ref={ref}
            contentDidUpdate={iframeDidUpdate}
            style={{position:'relative', width:'1200px', height:'800px', background:'white'}}
        >
            <MainPanelRender/>
        </Frame>
    )
}