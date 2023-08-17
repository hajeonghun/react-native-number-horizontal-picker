import React from 'react';
import { StyleSheet, View } from 'react-native';
function DefaultItem(_a) {
    var style = _a.style;
    return (<View style={StyleSheet.compose(styles.block, style)}/>);
}
export default DefaultItem;
var styles = StyleSheet.create({
    block: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderColor: '#979797',
        height: 30,
        borderRightWidth: 1,
    },
});
