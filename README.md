### React Native Horizontal Picker

- This is a performance-optimized numeric horizontal picker.
- **It can also be used as a basic design and can be customized.** 
- There is also a vertical picker library -> [`react-native-number-vertical-picker`](https://www.npmjs.com/package/react-native-number-vertical-picker)

### NPM
[![npm version](https://badge.fury.io/js/react-native-number-horizontal-picker.svg)](https://www.npmjs.com/package/react-native-number-horizontal-picker)

### Github Page - Docs
https://github.com/hajeonghun/react-native-number-horizontal-picker

### Preview
| Design | iOS | Android |
 |-------|-----|---------|
| Default | <img width="100%" src="https://github.com/hajeonghun/react-native-horizontal-picker/assets/52861562/5e4891c2-3138-4245-8b9c-8685bee683ed" /> | <img width="100%" src="https://github.com/hajeonghun/react-native-horizontal-picker/assets/52861562/3b35a084-faa3-4b66-bad9-6e8620b8844c" /> |
| Custom Thumb | <img width="100%" src="https://github.com/hajeonghun/react-native-horizontal-picker/assets/52861562/b10bc147-8aae-4ccb-a38e-83d91e78adf0" /> | <img width="100%" src="https://github.com/hajeonghun/react-native-horizontal-picker/assets/52861562/ca0a771b-fe1c-4e32-a489-1d5f2c76b28f" /> |
  
### Props
| Property | Type | Default | Description |
 |----------|------|---------|-------------|
| minimumValue | `number` | Required | Minimum value of measurement |
| maximumValue | `number` | Required | Maximum value of measurement|
| onChangeValue | `(value: number) => void;` | Required | Measured value during scroll event |
| customRenderItem | `(element: ListRenderItemInfo<number>, style: ViewStyle) => ReactElement` | View | This is a customizable block element, and refer to the attached Default image for the basic element |
| thumbElement | `ReactElement` | View | This is a thumbElement. If you want to change, please provide the element. |
| focusValue | `number` | minimumValue | The number to be focused on during the first rendering |

### Getting started
Installation
```
npm i react-native-number-horizontal-picker
or
yarn add react-native-number-horizontal-picker
```

* Usage - Default
```typescript
import HorizontalPicker from 'react-native-number-horizontal-picker';
import { Text, View } from 'react-native';

function App() {   
  return (
    <View>
      <Text style={{ fontSize: 25 }}>{value} kg</Text>
        <HorizontalPicker
        minimumValue={0}
        maximumValue={200}
        focusValue={50}
        onChangeValue={handleChangeValue}
        />
    </View>
  )
}
```

* Usage - Custom Thumb and Item 
```typescript
import HorizontalPicker from 'react-native-number-horizontal-picker';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

// Custom Item Style
const styles = StyleSheet.create({
  block: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderColor: '#979797',
    height: 30,
    borderRightWidth: 1,
  },
});

// Custom Item Component
function CustomItem(style: ViewStyle){
  return (
    <View style={StyleSheet.compose(styles.block, style)} />
  );
}

function App() {
  // The Thumb element you desire.
  const thumbElement = (
    <Icon
      style={styles.thumb}
      name="caretdown"
      size={30}
      color="rgba(255,0,0,0.7)" 
    />
  );

  /**
   * Please do not change the 'width' property under any circumstances. 
   * This is related to rendering optimization.
   */
  function renderItem(element: ListRenderItemInfo<number>, style: ViewStyle) {
    const { index } = element;
    let overWriteStyle: ViewStyle = { };

    // example code
    if (index < 9) {
      overWriteStyle = { ...style, borderRightWidth: 0 };
    }
    // Return the component you want to customize.
    return <CustomItem style={overWriteStyle} />;
  }
  
  return (
    <View>
      <Text style={{ fontSize: 25 }}>{value} kg</Text>
        <HorizontalPicker
        minimumValue={0}
        maximumValue={200}
        focusValue={50}
        onChangeValue={handleChangeValue}
        thumbElement={thumbElement} // Custom Thumb Element
        customRenderItem={renderItem} // Custom Item Element
  />
    </View>
  )
}
```




  
# MIT
