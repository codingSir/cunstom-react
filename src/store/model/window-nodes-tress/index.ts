import {RootDispatch} from "@src/store";
import partComponents from '@src/frameComponent'
import _ from 'lodash';
import {v1 as uuid} from "uuid";

interface NodesTreeDeclare  {
    byId: {},
    rootIds: string [],
    currentSelected: string,
}
const state:NodesTreeDeclare = {
    byId:{},
    rootIds: [],
    currentSelected:''
}
export default {
    name:'windowNodesTree',
    state,
    reducers:{
        setWindowNodesTree(state:NodesTreeDeclare, payload):NodesTreeDeclare{
            if(state.rootIds.includes(payload.id)){
            }else{
                if(payload.layoutType){
                    let part = _.cloneDeep(_.find(partComponents, item => item.layoutType === payload.layoutType));
                    if(part){
                        part.id = uuid();
                        state.byId[part.id] = part;
                        state.rootIds.push(part.id);
                    }
                }
            }
            return state;
        },
        setCurrentSelected(state:NodesTreeDeclare, payload):NodesTreeDeclare{
          state.currentSelected = payload
          return state
        },
        sortById(state: NodesTreeDeclare, payload):NodesTreeDeclare{

            return  state
        }
    },
    effects:(dispatch:RootDispatch) => ({

    })
}