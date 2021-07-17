import React, {Component, useCallback} from "react";
import { connect } from 'react-redux'
import VirtualNodeRender from "./VirtualNodeRender";
import PartLayoutComponent from '@src/components/PartLayoutComponent'

class BoardRender extends Component<any> {
    constructor(props) {
        super(props);
    }
    render() {
        const { rootIds } = this.props;
        const LayoutComponent = new PartLayoutComponent().layoutComponent;

        return (
            <>
                {rootIds.length > 0 &&
                    rootIds.map((id, index) => {
                        return (
                           <LayoutComponent key={index} order={index} nodeId={id}>
                               <VirtualNodeRender
                                   key={id}
                                   order={index}
                                   nodeId={id}
                                   parentId={"root"}
                               />
                           </LayoutComponent>
                        );
                    })}
            </>
        );
    }
}

const mapState = (state, props) => {
    return {
        rootIds: state.windowNodesTree.rootIds,
    };
};

const mapDispatch = dispatch => {
    return {
        setRootIds:(payload) =>{
            dispatch.windowNodesTree.setRootIds(payload)
        }
    };
};
export default connect(mapState, mapDispatch)(BoardRender)
