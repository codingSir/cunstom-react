import React, {FC} from 'react'
import { FrameContextConsumer } from 'react-frame-component'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

const FrameContext = React.createContext({
    window:Window
})

const FrameBindingContext: FC = ({ children}) => (
    <FrameContextConsumer>
        {({ window }: any) => (
            <DndProvider backend={ HTML5Backend } context={window}>
                {children}
            </DndProvider>
        )}
    </FrameContextConsumer>
)

export default FrameBindingContext