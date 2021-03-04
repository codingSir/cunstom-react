import React, {useRef} from 'react';
import './global.scss'
import './antd.less';
import {renderAllRouter} from '@router/router.loader'
import {GlobalContext, GlobalProvider} from "@assets/context/global-context";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {Switch, RouteComponentProps, Route} from "react-router";
import {RootDispatch, useTypedSelector} from "@src/store";
import {useDispatch} from "react-redux";
import {getDevice} from '@utils/device'
import LoginTips, {useLoginReduce} from '@src/custom-hook/login-tips-hook/login.tips'
import NotMatch from '@src/views/404'
import onResize from '@src/utils/resize'

function mapStateToProps(state) {
    return state;
}

/**
 * 路由参数 Props 类型声明
 */
interface RouterProps extends RouteComponentProps<any> {
}

/**
 * 映射状态（从 store 中获取某些状态并传递给当前组件）类型声明
 */
type MapStateFromStoreProps = ReturnType<typeof mapStateToProps>;

type AppProps = RouterProps & MapStateFromStoreProps & {
    routes?: any
};


function App(props) {

    const {routes} = props;
    const [status, setLoginTips] = useLoginReduce();
    const dispatch: RootDispatch = useDispatch();
    const appRef = useRef();

    /*监听界面resize*/
    // useResizeDetector({onResize,targetRef:appRef,refreshMode:"throttle",refreshRate: 500})
    onResize();

    const router = renderAllRouter(routes, {setLoginTips, ...props});
    dispatch.global.setDevice(getDevice);

    return (
        <GlobalProvider>
            <DndProvider backend={HTML5Backend}>
                <div className="App" ref={appRef}>
                    <Switch>
                        {router}
                        <Route path={'/*'} component={NotMatch}></Route>
                    </Switch>
                    <LoginTips status={status} setLoginTips={setLoginTips}/>
                </div>
            </DndProvider>
        </GlobalProvider>
    );
}


export default App;
