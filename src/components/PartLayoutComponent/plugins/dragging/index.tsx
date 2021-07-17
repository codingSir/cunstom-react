import React, { Component, Fragment } from "react";
import _ from "lodash";

import styles from "./style.module.scss";

interface Props  {
    isDragging:boolean,
    isOver:boolean,
    isSelected:boolean
}
class Dragging extends Component<Props> {

    render() {
        const { isSelected, isDragging, isOver } = this.props;


        return (
            isDragging && (
                <div
                    className={styles.dragging}
                    style={{ zIndex: isSelected || isDragging || isOver ? 100 : 0 }}
                >
                    <Fragment>
                        <div className={styles["top-border"]} />
                        <div className={styles["right-border"]} />
                        <div className={styles["bottom-border"]} />
                        <div className={styles["left-border"]} />
                        <div className={styles["dragging_over"]}>
                            <div className={styles["dragging_title"]}></div>
                        </div>
                    </Fragment>
                </div>
            )
        );
    }
}

export default Dragging;
