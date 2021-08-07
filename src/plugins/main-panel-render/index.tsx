import React, {FC, useState} from "react"
import {useDragDropManager, useDrop, DropTarget} from 'react-dnd'
import DragType from "@src/BasisClass/dragType";
import withScrolling, {
    createVerticalStrength
} from "../../components/react-dnd-scrollzone";

import MainBoardRender from '@src/plugins/main-editor-board-render'
import {RootDispatch} from "@src/store";
import {useDispatch} from "react-redux";

const ScrollingComponent = withScrolling("div");
const linearVerticalStrength = createVerticalStrength(60);


const accept = () => {
    return [DragType.SystemComponent]
}

function ease(val) {
    const t = (val + 1) / 2; // [-1, 1] -> [0, 1]
    const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    return easedT * 2 - 1; // [0, 1] -> [-1, 1]
}

/* function ease(t, b, c, d) {
    return c * t / d + b;
}
 */
function vStrength(box, point) {
    return ease(linearVerticalStrength(box, point));
}

const DropSourceTarget: FC = (props: any) => {
    const dragDropManager = useDragDropManager();
    const dispatch: RootDispatch = useDispatch();
    console.log(props);

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: accept(),
        hover:(item:any,monitor) => {
            if(monitor.canDrop() && !item.indicatorInit){
                var part:any = dispatch.windowNodesTree.setWindowNodesTree(item)
                part.then(res => {
                    console.log(res)
                })
                item.indicatorInit = true;
            }
        },
        drop: (item:any) => {
            return{
                allowedDropEffect:'copy',
                copy:true
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }));

    const isActive = canDrop && isOver
    console.log(isActive)

    return (
        <ScrollingComponent
            className="artboard-scroll"
            verticalStrength={vStrength}
            dragDropManager={dragDropManager}
            style={{
                height: "100%",
                overflow: "auto",
                position: "relative"
            }}
        >
            <div ref={drop} style={{height:'100%',width:'100%'}}>
                <MainBoardRender/>
            </div>
        </ScrollingComponent>
    )
}

function MainPanelRender(props) {
    return (
        <>
            <DropSourceTarget {...props} />
        </>
    )
}

export default MainPanelRender