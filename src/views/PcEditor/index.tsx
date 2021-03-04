import React from "react";
import {Button, Col, Dropdown, Input, Layout, Menu, Row, Tabs} from 'antd'
import Panel from "@src/views/PcEditor/panel";
import SystemComponentBoard from "@src/plugins/system-conponent-board";
import styles from './pcEditor.module.scss'
import {DownOutlined, SearchOutlined, SettingOutlined, TrademarkCircleOutlined} from "@ant-design/icons";

const {Header, Sider, Content} = Layout;
const {TabPane} = Tabs


export default function PcEditor(props) {
    return (
        <Layout className={styles.pc_editor}>
            <Header className={styles.site_layout_background + ' ' + styles.header_wrap}>
                <Row className={styles.row}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
                        <h2>我的应用</h2>
                    </Col>
                    <Col className={styles.menu_row} xs={0} sm={0} md={18} lg={18} xl={19} xxl={20}>
                        <div className={styles.icon_wrap}>
                            <Button type="text" icon={<SettingOutlined/>}>
                            </Button>
                            <Button type="text" icon={<TrademarkCircleOutlined/>}>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Sider className={styles.site_layout_background} width={'260px'}>
                    <Tabs defaultActiveKey="1" tabPosition={'left'}>
                        <TabPane
                            className={styles.tabPane}
                            tab={
                                <span>Tab 1</span>
                            }
                            key="1"
                        >
                            <SystemComponentBoard/>
                        </TabPane>
                        <TabPane
                            className={styles.tabPane}
                            tab={
                                <span>Tab 2</span>
                            }
                            key="2"
                        >
                            Tab 2
                        </TabPane>
                    </Tabs>
                </Sider>
                <Content className={styles.content}>
                    <Panel/>
                </Content>
            </Layout>
        </Layout>
    )
}