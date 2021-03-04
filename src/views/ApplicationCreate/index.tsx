import React, {useState} from 'react'
import {Card, Divider, Input, Modal} from "antd";
import styles from './application.module.scss'
import { PlusCircleOutlined } from '@ant-design/icons'
import {RouteComponentProps} from "react-router";

/**
 * 路由参数 Props 类型声明
 */
interface RouterProps extends RouteComponentProps<any> {}

const gridStyle: React.CSSProperties = {
    width: '20%',
    height: '200px',
    textAlign: 'center',
    border:"none",
    margin: '10px 2.5%',
    background:'#fff'
};

type Props = RouterProps;

function CreateApplicationDialog(props:Props, isModalVisible, setIsModalVisible){
    const [applicationName,setApplicationName] = useState('');

    function handleOk(){
        setIsModalVisible(false);
        props.history.push('/pcEditor')
    }
    function handleCancel(){
        setIsModalVisible(false)
    }
    return(
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <span>应用名称</span>
            <Input value={applicationName} onChange={(e) => setApplicationName(e.target.value)}/>
        </Modal>
    )
}

export default function ApplicationCreate(props:Props){
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div>
            <Card  className={styles.card_wrap} bordered={false} bodyStyle={{background:'none'}}>
                <Card.Grid style={gridStyle} className={styles.card_item_1}>
                    <div className={styles.create_wrap}>
                        <PlusCircleOutlined/>
                        <p>创建应用</p>
                    </div>
                    <div className={styles.create_select_wrap}>
                        <a onClick={() => setIsModalVisible(true)}>全新创建</a>
                        <Divider type="vertical" className={styles.divider}/>
                        <a>选择模板</a>
                    </div>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                    Content
                </Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
            {
                CreateApplicationDialog(props, isModalVisible, setIsModalVisible)
            }
        </div>
    )
}