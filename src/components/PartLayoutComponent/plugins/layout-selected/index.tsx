import React, { Component } from "react";
import _ from "lodash";

import styles from "./style.module.scss";

interface Props {
    isSelected:boolean,
    title: string,
    customTitle:string
}
class LayoutSelected extends Component<Props> {
    render() {
        const {
            isSelected,
            title,
            customTitle
        } = this.props;

        if (!isSelected) {
            return null;
        }
        return (
            <React.Fragment>
                <div className={styles["top-border"]} />
                <div className={styles["right-border"]} />
                <div className={styles["bottom-border"]} />
                <div className={styles["left-border"]} />
                <div className={styles["drag-handle"]} />
                <div className={styles["layout-label"]}>
                    {!_.isEmpty(customTitle) || _.isNumber(customTitle)
                        ? customTitle
                        : title}
                </div>
            </React.Fragment>
        );
    }
}

export default LayoutSelected;
