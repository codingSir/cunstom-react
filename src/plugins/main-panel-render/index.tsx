import React, {FC, useState} from "react"
import {useDragDropManager, useDrop, DropTarget} from 'react-dnd'
import DragType from "@src/BasisClass/dragType";
import withScrolling, {
    createVerticalStrength
} from "../../components/react-dnd-scrollzone";

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
    const dragDropManager = useDragDropManager()
    console.log(props);
    const [ids,setids] = useState([]);
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: accept(),
        hover:(item) => {
            console.log('hover')
        },
        drop: (item:any) => (setids([...ids,item.id])),
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
            <div ref={drop}>
                {isActive ? 'Release to drop' : 'Drag a box here'}

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