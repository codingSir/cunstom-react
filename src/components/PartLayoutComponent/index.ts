import React,{FC,useRef} from "react";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import dragType from "@src/BasisClass/dragType";
import styles from '@src/components/SortComponent/sort.module.scss'
import BaseComponent from "../../BasisClass/BaseComponent";
import Core from './Core'


export default class PartLayoutComponent extends BaseComponent{
    static layoutMark = "PartComponentLayout";

    title = "元件容器";

    partId = null;

    layoutType = "partComponentLayout";

    get layoutComponent() {
        return Core;
    }
}