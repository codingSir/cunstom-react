import React from "react";

import styles from "./style.module.scss";

interface Props{
    isHover:boolean,
    isSelected:boolean
}
class LayoutHover extends React.Component<Props> {
    render() {
        const { isHover, isSelected } = this.props;

        if (!isHover || isSelected) {
            return null;
        }
        return (
            <React.Fragment>
                <div className={styles["top-border"]} />
                <div className={styles["right-border"]} />
                <div className={styles["bottom-border"]} />
                <div className={styles["left-border"]} />
            </React.Fragment>
        );
    }
}

export default LayoutHover;
