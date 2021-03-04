import React from "react";
import {Layout} from 'antd'
import Scrollbar from 'react-scrollbars-custom';
import styles from './pcEditor.module.scss'
import FrameContent from "@src/plugins/frame-content-borad"

const ThUmBX: React.CSSProperties = {
    display: 'block',
    borderRadius: '4px',
    height: '6px',
    backgroundColor: 'rgb(196, 196, 196)'
}
const ThUmBY: React.CSSProperties = {
    display: 'block',
    borderRadius: '4px',
    width: '6px',
    backgroundColor: 'rgb(196, 196, 196)'
}

export default function Panel(props) {
    const panelContainerWith = 2400, panelContainerHeight = 2000
    return (
        <div className={styles.main_content}>
            <Scrollbar scrollbarWidth={15}
                       scrollTop={380}
                       scrollLeft={380}
                       trackXProps={{
                           renderer: props => {
                               props.style.background = 'none'
                               const {elementRef, ...restProps} = props;
                               return <div {...restProps} ref={elementRef} className={styles.TrackX}/>;
                           }
                       }}
                       trackYProps={{
                           renderer: props => {
                               props.style.background = 'none'
                               const {elementRef, ...restProps} = props;
                               return <div {...restProps} ref={elementRef} />;
                           }
                       }}
                       thumbXProps={{
                           renderer: props => {
                               const {elementRef, ...restProps} = props;
                               return <div {...restProps} ref={elementRef} style={ThUmBX}/>;
                           }
                       }}
                       thumbYProps={{
                           renderer: props => {
                               const {elementRef, ...restProps} = props;
                               return <div {...restProps} ref={elementRef}  style={ThUmBY}/>;
                           }
                       }}
                       removeTracksWhenNotUsed={false}
            >
                <div className={styles.main_panel} style={{width: panelContainerWith, height: panelContainerHeight}}>
                    <div className={styles.artboard} style={{left: '416px', top:'416px'}}>
                        <FrameContent></FrameContent>
                    </div>
                </div>
            </Scrollbar>
        </div>
    )
}