import React, {FC} from "react";
import {useDragDropManager, useDrop, DropTarget} from 'react-dnd'
import DragType from "@src/BasisClass/dragType";

const accept = () => {
    return [DragType.SystemComponent]
}


const DropSourceTarget: FC = (props:any) => {
    console.log(props)
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: accept(),
        // hover:(item) => {
        //     console.log(item)
        // },
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }))
    const isActive = canDrop && isOver
    console.log(isActive)
    return (
        <div ref={drop}>
            {isActive ? 'Release to drop' : 'Drag a box here'}
        </div>
    )
}

function MainPanelRender(props){
    return (
        <>
            <DropSourceTarget {...props} />
        </>
    )
}

export default MainPanelRender