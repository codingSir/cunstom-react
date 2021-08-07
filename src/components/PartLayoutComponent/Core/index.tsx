import React, {FC, useEffect, useState, useRef} from "react";
import { connect } from "react-redux";
import Core from "@components/PartLayoutComponent/Core/Core";
import LayoutHover from "@components/PartLayoutComponent/plugins/layout-hover";
import LayoutSelected from "@components/PartLayoutComponent/plugins/layout-selected";
import Dragging from "@components/PartLayoutComponent/plugins/dragging";
import styles from './style.module.scss'
import {useDrag, useDrop} from "react-dnd";
import DragType from "@src/BasisClass/dragType";
import dndSortJudge from "@utils/dndSort";

const DragSourceTarget: FC<any> = React.memo((props) => {
    const { nodeId, setCurrentSelected, currentSelected, order } = props;

    const [isHover, setIsHover] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const ref = useRef(null)
    const [{opacity, isDragging}, connectDrag] = useDrag(
        () => ({
            item: { type:DragType.SystemComponent, draggedId: nodeId, order },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
                isDragging: monitor.isDragging(),
            }),
        }),
        []
    );

    const [, connectDrop] = useDrop({
        accept: [DragType.SystemComponent],
        hover(drag:any, monitor) {
            console.log(drag,order);
            if(drag.id === nodeId){

            }
            if(dndSortJudge(drag,ref,drag.order,order,false) && drag.indicatorInit){

            }
            return {
               isOver: monitor.isOver({ shallow: true })
            }
        },
    });

    useEffect(() =>{
        setIsSelected(nodeId === currentSelected);
    },[currentSelected])

    const clickNode = () =>{
        setCurrentSelected(nodeId)
    }

    const mouseOver = () => {
        setIsHover(true)
    }

    const mouseLeave = () => {
        setIsHover(false)
    }

    connectDrag(ref)
    connectDrop(ref)
    return (
            <div ref={ref}
                 role="Source"
                 onClick={clickNode}
                 onMouseOver={mouseOver}
                 onMouseLeave={mouseLeave}
                 className={styles.colLayout}
                >
                <Dragging {...props} isHover={isHover} isDragging={isDragging} isSelected={isSelected}/>
                <LayoutHover {...props} isHover={isHover} isSelected={isSelected}/>
                <LayoutSelected {...props} isHover={isHover} isSelected={isSelected}/>
                <Core {...props}/>
            </div>
    )
});
 class PartComponentLayout extends React.Component<any>{

     render() {
         return (
             <DragSourceTarget {...this.props} />
         );
     }
 }

const mapState = (state) => {
     return {
         currentSelected:state.windowNodesTree.currentSelected
     }
}
const mapDispatch = (dispatch, props) => {
     return{
         setCurrentSelected:(id) => dispatch.windowNodesTree.setCurrentSelected(id)
     }
}
export default connect(
    mapState,
    mapDispatch
)(PartComponentLayout)