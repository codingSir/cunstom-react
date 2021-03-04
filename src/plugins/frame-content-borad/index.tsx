import React, {useCallback, useEffect, useRef, useState} from "react";
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
    const ref = useRef();
    let [isInit,setInit] = useState(true)
    let iframes:any;
    let manager:any;
    useEffect(() => {

        return () =>{
            manager
                .getBackend()
                .removeEventListeners(iframes.contentWindow);
        }
    });
    const iframeInit = (dragDropManager) => {
        console.log(ref);
        iframes = ReactDOM.findDOMNode(ref.current);
        dragDropManager.getBackend().addEventListeners(iframes.contentWindow);


        manager = dragDropManager;
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
            style={{position:'relative', width:'1200px', height:'800px'}}
        >
            <MainPanelRender/>
        </Frame>
    )
}