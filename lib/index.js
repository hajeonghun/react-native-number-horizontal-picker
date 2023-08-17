var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useCallback, useEffect, useRef, useState, } from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';
import DefaultItem from './DefaultItem';
var MULTIPLICITY = 1;
var VISIBLE_ITEM_COUNT = 20;
function HorizontalPicker(_a) {
    var minimumValue = _a.minimumValue, maximumValue = _a.maximumValue, onChangeValue = _a.onChangeValue, customRenderItem = _a.customRenderItem, _b = _a.thumbElement, thumbElement = _b === void 0 ? <View style={styles.thumb}/> : _b, focusValue = _a.focusValue;
    var flatList = useRef(null);
    var _c = useState(0), oneItemWidth = _c[0], setOneItemWidth = _c[1];
    var data = Array.from({ length: maximumValue - minimumValue + VISIBLE_ITEM_COUNT }, function (_, index) { return index + 1; });
    function onLayout(_a) {
        var nativeEvent = _a.nativeEvent;
        var calculatedWidth = Math.round(nativeEvent.layout.width / VISIBLE_ITEM_COUNT);
        setOneItemWidth(calculatedWidth);
    }
    function renderItem(element) {
        var index = element.index;
        var style = { width: oneItemWidth }; // Require width
        if (index < 9 || index > data.length - VISIBLE_ITEM_COUNT + 9) {
            style = __assign(__assign({}, style), { borderRightWidth: 0 });
        }
        if ((index + 1) % 10 === 0 && index + 1 <= maximumValue) {
            style = __assign(__assign({}, style), { height: 40, borderRightWidth: 3 });
        }
        if (customRenderItem) {
            // Require width
            return customRenderItem(element, style);
        }
        return <DefaultItem style={style}/>;
    }
    function onScroll(event) {
        var value = minimumValue +
            Math.floor(event.nativeEvent.contentOffset.x / oneItemWidth) *
                MULTIPLICITY;
        if (value < minimumValue || value > maximumValue) {
            return;
        }
        onChangeValue(value);
    }
    var scrollToElement = useCallback(function (value) {
        flatList.current &&
            flatList.current.scrollToOffset({
                offset: ((value - minimumValue) * oneItemWidth) / MULTIPLICITY,
                animated: false,
            });
    }, [minimumValue, oneItemWidth]);
    useEffect(function () {
        function hasFocusValue(value) {
            return value !== null && value !== undefined;
        }
        if (!hasFocusValue(focusValue)) {
            return;
        }
        setTimeout(function () { return scrollToElement(focusValue); }, 0); // 타입 컴파일러가 제대로 추론 못함.
    }, [focusValue, scrollToElement]);
    return (<View style={styles.mainContainer} onLayout={onLayout}>
          <FlatList ref={flatList} style={styles.wrapper} horizontal showsHorizontalScrollIndicator={false} keyExtractor={function (element, index) { return index.toString(); }} data={data} renderItem={renderItem} onScroll={onScroll} getItemLayout={function (data, index) { return ({
            length: oneItemWidth,
            offset: oneItemWidth * index,
            index: index,
        }); }}/>
          {thumbElement}
      </View>);
}
export default HorizontalPicker;
var styles = StyleSheet.create({
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
