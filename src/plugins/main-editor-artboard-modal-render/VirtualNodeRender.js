import React, { Component } from "react";
import { FrameContextConsumer } from "../../components/react-frame-component";
import { connect } from "react-redux";
import { inject, observer } from "mobx-react";
import _ from "lodash";

@inject((allStores, nextProps) => ({
    getPreBaseLayoutByKey:
        allStores.rootStore.applicationStore.getPreBaseLayoutByKey,
    getPartComponentClassByPartId:
        allStores.rootStore.applicationStore.getPartComponentClassByPartId
}))
@observer
class NodeRender extends Component {
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
            parentId,
            partId,
            order,
            nodeChildIds,
            layoutType,
            layoutMark,
            getPreBaseLayoutByKey,
            getPartComponentClassByPartId
        } = this.props;

        if (layoutType === "isError" || layoutMark === "isError") {
            return null;
        }
        console.log('---layoutMark', layoutMark, partId)
        const BasicLayoutComponent = _.isNull(partId)
            ? getPreBaseLayoutByKey(layoutMark).layoutComponent
            : getPartComponentClassByPartId(partId).layoutComponent;

        return (
            <FrameContextConsumer>
                {({ document, window }) => (
                    <BasicLayoutComponent
                        nodeId={nodeId}
                        layoutType={layoutType}
                        order={order}
                        parentId={parentId}
                        isSimulationWindow={true}
                        getContainer={document}
                    >
                        {nodeChildIds.map(this.renderChild)}
                    </BasicLayoutComponent>
                )}
            </FrameContextConsumer>
        );
    }
}

const mapState = (state, props) => {
    const nodeData = state.windowNodesTree.byId[props.nodeId];

    return {
        nodeChildIds: _.isUndefined(nodeData) ? [] : nodeData.childIds,
        partId: _.isUndefined(nodeData) ? null : nodeData.partId,
        layoutType: _.isUndefined(nodeData) ? "isError" : nodeData.layoutType,
        layoutMark: _.isUndefined(nodeData) ? "isError" : nodeData.layoutMark
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

const VirtualNodeRender = connect(
    mapState,
    mapDispatch
)(NodeRender);

export default VirtualNodeRender;
