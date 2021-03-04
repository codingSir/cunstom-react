import React, { Component } from "react";
import { connect } from "react-redux";

import VirtualNodeRender from "./VirtualNodeRender";

class ModalTplRender extends Component {
    render() {
        const { rootIds } = this.props;

        return (
            <React.Fragment>
                {rootIds.length > 0 &&
                    rootIds.map((id, index) => {
                        return (
                            <VirtualNodeRender
                                key={index}
                                order={index}
                                nodeId={id}
                                parentId={"root"}
                            />
                        );
                    })}
            </React.Fragment>
        );
    }
}