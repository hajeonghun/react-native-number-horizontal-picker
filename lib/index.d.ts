import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import { ListRenderItemInfo } from '@react-native/virtualized-lists/Lists/VirtualizedList';
interface HorizontalPickerProps {
    minimumValue: number;
    maximumValue: number;
    onChangeValue: (value: number) => void;
    customRenderItem?: (element: ListRenderItemInfo<number>, style: ViewStyle) => ReactElement;
    thumbElement?: ReactElement;
    focusValue?: number;
}
declare function HorizontalPicker({ minimumValue, maximumValue, onChangeValue, customRenderItem, thumbElement, focusValue, }: HorizontalPickerProps): React.JSX.Element;
export default HorizontalPicker;
