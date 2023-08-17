import React, {ReactElement, useCallback, useEffect, useRef, useState,} from 'react';
import {
    FlatList,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import DefaultItem from './DefaultItem';
import {ListRenderItemInfo} from '@react-native/virtualized-lists/Lists/VirtualizedList';

const MULTIPLICITY = 1;
const VISIBLE_ITEM_COUNT = 20;

interface HorizontalPickerProps {
    minimumValue: number;
    maximumValue: number;
    onChangeValue: (value: number) => void;
    customRenderItem?: (
      element: ListRenderItemInfo<number>,
      style: ViewStyle,
    ) => ReactElement;
    thumbElement?: ReactElement;
    focusValue?: number;
}

function HorizontalPicker({
                              minimumValue,
                              maximumValue,
                              onChangeValue,
                              customRenderItem,
                              thumbElement = <View style={styles.thumb} />,
                              focusValue,
                          }: HorizontalPickerProps) {
    const flatList = useRef<FlatList>(null);
    const [oneItemWidth, setOneItemWidth] = useState(0);
    const data = Array.from(
      { length: maximumValue - minimumValue + VISIBLE_ITEM_COUNT },
      (_, index) => index + 1,
    );

    function onLayout({ nativeEvent }: LayoutChangeEvent) {
        const calculatedWidth = Math.round(
          nativeEvent.layout.width / VISIBLE_ITEM_COUNT,
        );

        setOneItemWidth(calculatedWidth);
    }

    function renderItem(element: ListRenderItemInfo<number>) {
        const { index } = element;
        let style: ViewStyle = { width: oneItemWidth }; // Require width

        if (index < 9 || index > data.length - VISIBLE_ITEM_COUNT + 9) {
            style = { ...style, borderRightWidth: 0 };
        }

        if ((index + 1) % 10 === 0 && index + 1 <= maximumValue) {
            style = { ...style, height: 40, borderRightWidth: 3 };
        }

        if (customRenderItem) {
            // Require width
            return customRenderItem(element, style);
        }

        return <DefaultItem style={style} />;
    }

    function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        let value =
          minimumValue +
          Math.floor(event.nativeEvent.contentOffset.x / oneItemWidth) *
          MULTIPLICITY;

        if (value < minimumValue || value > maximumValue) {
            return;
        }

        onChangeValue(value);
    }

    const scrollToElement = useCallback(
      (value: number) => {
          flatList.current &&
          flatList.current.scrollToOffset({
              offset: ((value - minimumValue) * oneItemWidth) / MULTIPLICITY,
              animated: false,
          });
      },
      [minimumValue, oneItemWidth],
    );

    useEffect(() => {
        function hasFocusValue(value: number | undefined) {
            return value !== null && value !== undefined;
        }

        if (!hasFocusValue(focusValue)) {
            return;
        }

        setTimeout(() => scrollToElement(focusValue as number), 0); // 타입 컴파일러가 제대로 추론 못함.
    }, [focusValue, scrollToElement]);
    return (
      <View style={styles.mainContainer} onLayout={onLayout}>
          <FlatList
            ref={flatList}
            style={styles.wrapper}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(element, index) => index.toString()}
            data={data}
            renderItem={renderItem}
            onScroll={onScroll}
            getItemLayout={(data, index) => ({
                length: oneItemWidth,
                offset: oneItemWidth * index,
                index,
            })}
          />
          {thumbElement}
      </View>
    );
}

export default HorizontalPicker;

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        width: '100%',
        height: 80,
    },
    wrapper: {
        flex: 1,
    },
    thumb: {
        position: 'absolute',
        borderLeftWidth: 3,
        height: 60,
        borderColor: 'red',
        backgroundColor: 'orange',
        alignSelf: 'center',
        top: 10,
    },
});
