import React, {FC} from "react";
import {ConnectDragSource, useDrag} from 'react-dnd';
import {Row, Col} from 'antd';
import components from '@src/frameComponent';
import DragType from "@src/BasisClass/dragType";

import styles from './system-component.module.scss'


const toolType = () => {
    return DragType.SystemComponent
}

export interface DragProps {
    layoutType?: string
    type?: string,
    nodeId
    isDropped?: boolean
};

const DragSourceTarget: FC<DragProps> = React.memo(({layoutType, type, nodeId, isDropped, children}) => {
    const [{opacity}, drag] = useDrag(
        () => ({
            item: {layoutType, type, indicatorInit:false,id: null},
            options:{
                dropEffect:'copy'
            },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        []
    );

    return (
        <div ref={drag} role="Source" style={{opacity}}>
            {children}
        </div>
    )
});

export default function SystemComponentBoard() {
    return (
        <div className={styles.system_component_content}>
            {
                components.map((item, index) =>
                    <Row key={index} gutter={[16, 16]} className={styles.board_row}>
                        <Col span={8}>
                            <DragSourceTarget layoutType={item.layoutType} type={toolType()} nodeId={item.id}>
                                <img src={item.icon}/>
                            </DragSourceTarget>
                        </Col>
                    </Row>
                )
            }
        </div>
    )
}