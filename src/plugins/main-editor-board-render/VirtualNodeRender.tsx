import React from "react";
import { FrameContextConsumer } from "@components/react-frame-component";
import _ from "lodash";
import {connect} from "react-redux";

interface Props {
    nodeId:string,
    order:Number,
    nodeChildIds:any [],
    parentId:string
    layoutComponent: any
}
class NodeRender extends React.Component<Props> {
    renderChild = (childId, index) => {
        const { nodeId } = this.props;
        return (
            <VirtualNodeRender
                key={childId}
                order={index}
                nodeId={childId}
                parentId={nodeId}
            />
        );
    };

    render() {
        const {
            nodeId,
            order,
            parentId,
            nodeChildIds,
            layoutComponent,
        } = this.props;

        console.log( layoutComponent)
        // const BasicLayoutComponent =
        const LayoutComponent =  layoutComponent.component

        return (
            <FrameContextConsumer>
                {({ document, window }) => (
                    <LayoutComponent
                        nodeId={nodeId}
                        order={order}
                        parentId={parentId}
                        isSimulationWindow={true}
                        getContainer={document}
                    >
                        {nodeChildIds.map(this.renderChild)}
                    </LayoutComponent>
                )}
            </FrameContextConsumer>
        );
    }
}

const mapState = (state, props) => {
    const nodeData = state.windowNodesTree.byId[props.nodeId];

    return {
        nodeChildIds: _.isUndefined(nodeData) ? [] : nodeData.childIds,
        partId: _.isUndefined(nodeData) ? null : nodeData.id,
        layoutType: _.isUndefined(nodeData) ? "isError" : nodeData.layoutType,
        layoutMark: _.isUndefined(nodeData) ? "isError" : nodeData.layoutMark,
        layoutComponent: nodeData,
    };
};

const mapDispatch = dispatch => {
    return {
        createVirtualNode: (nodeId, nodeData) =>
            dispatch({
                type: "windowNodesTree/createNode",
                payload: { nodeId, nodeData }
            }),
        addNodeChild: (parentId, nodeId, removeParentId, direction) =>
            dispatch.windowNodesTree.addNodeChild({
                parentId,
                nodeId,
                removeParentId,
                direction
            })
    };
};

const VirtualNodeRender = connect(mapState,mapDispatch)(NodeRender);

export default VirtualNodeRender;
