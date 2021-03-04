import React, {useState} from 'react'
import {RouteComponentProps, Switch} from 'react-router'
import { shallowEqual } from 'react-redux'
import { RootState } from '@store/index'
import {Layout, Row, Col, Input, Menu, Dropdown, Button} from 'antd'
import styles from './BaseLayout.module.scss'
import {renderAllRouter} from '@src/router/router.loader'
import {
    SearchOutlined,
    SettingOutlined,
    TrademarkCircleOutlined,
    DownOutlined
} from '@ant-design/icons'
import img from '@src/assets/img/home/appDesign.png'
import {useSelector} from "react-redux";
import { equalResize } from '@src/utils/resize'

const {Header} = Layout

/**
 * 路由参数 Props 类型声明
 */
interface RouterProps extends RouteComponentProps<any> {}

type Props = RouterProps & {
    routes:any
}
const navItem = [
    {
        title: '我的应用',
        className: '',
        type: 'application'
    }
];

function introdutedNavItem(selected: string, setSelected) {

    function clickTab(item) {
        setSelected(item.type)
    }

    return (
        <Menu onClick={() => clickTab} selectedKeys={[selected]} mode="horizontal">
            {
                navItem.map((item,index) =>
                    <Menu.Item key={item.type}>{item.title}</Menu.Item>
                )
            }
        </Menu>
    )
}

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

export default function BaseLayout(props) {
    const device = useSelector((state:RootState) => state.global.device,shallowEqual);
    const [selected, setSelected] = useState('application');

    const router = renderAllRouter(props.routes);
    const textAlign:React.CSSProperties = equalResize(device.media,'gt','md') ? {textAlign:'center'}:{}
    console.log(equalResize(device.media,'gt','md'))

    return (
        <Layout className={styles['base_layout']}>
            <Header className={styles.header}>
                <Row className={styles.row}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
                        <h2 style={textAlign}>中科美络工具化平台</h2>
                    </Col>
                    <Col className={styles.menu_row} xs={0} sm={0} md={18} lg={18} xl={19} xxl={20}>
                        <div className={styles.search_box}>
                            <span className={styles.search_icon}>
                                <SearchOutlined/>
                            </span>
                            <span className={styles.input_wrap}>
                                <Input placeholder={'搜索应用'}/>
                            </span>
                        </div>
                        {
                            introdutedNavItem(selected,setSelected)
                        }
                        <div className={styles.icon_wrap}>
                            <Button type="text" icon={<SettingOutlined />}>
                            </Button>
                            <Button type="text" icon={<TrademarkCircleOutlined />}>
                            </Button>
                        </div>
                        <div className={styles.drop_down_wrap}>
                            <img className={styles.header_img} src={img}/>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    超级管理员 <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </Header>
            <Switch>
                {router}
            </Switch>
        </Layout>
    )
}
