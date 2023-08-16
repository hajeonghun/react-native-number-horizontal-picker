### React Native Horizontal Picker

- This is a performance-optimized numeric horizontal picker.
- **It can also be used as a basic design and can be customized.** 

### Github Page - Docs
https://github.com/hajeonghun/react-native-horizontal-picker

### Preview (Default)
* **iPhone**  
<img width="30%" src="https://github.com/hajeonghun/react-native-horizontal-picker/assets/52861562/5e4891c2-3138-4245-8b9c-8685bee683ed" />  

* **Android**  
<img width="30%" src="https://github.com/hajeonghun/react-native-horizontal-picker/assets/52861562/3b35a084-faa3-4b66-bad9-6e8620b8844c" />  

### Preview (Custom Thumb)
* **iPhone**  
<img width="30%" src="https://github.com/hajeonghun/react-native-horizontal-picker/assets/52861562/b10bc147-8aae-4ccb-a38e-83d91e78adf0" />  

* **Android**  
<img width="30%" src="https://github.com/hajeonghun/react-native-horizontal-picker/assets/52861562/ca0a771b-fe1c-4e32-a489-1d5f2c76b28f" />

### Props
| Property | Type | Default | Description |
 |----------|------|---------|-------------|
| minimumValue | `number` | Required | Minimum value of measurement |
| maximumValue | `number` | Required | Maximum value of measurement|
| onChangeValue | `(value: number) => void;` | Required | Measured value during scroll event |
| customRenderItem | `(element: ListRenderItemInfo<number>, width: number) => ReactElement` | View | This is a customizable block element, and refer to the attached Default image for the basic element |
| thumbElement | `ReactElement` | View | This is a thumbElement. If you want to change, please provide the element. |
| focusValue | `number` | minimumValue | The number to be focused on during the first rendering |

### Getting started
Installation
```
npm i @ha/react-native-horizontal-picker
or
yarn add @ha/react-native-horizontal-picker
```

* Usage - Default
```typescript
import HorizontalPicker from '@ha/react-native-horizontal-picker';
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
import HorizontalPicker from '@ha/react-native-horizontal-picker';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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

  function renderItem(element: ListRenderItemInfo<number>, width: number) {
    const { index } = element;
    /**
     * Require width
     * Because, scrolling is calculated based on this value.
     */
    let style: ViewStyle = { width };

    // example code
    if (index < 9) {
      style = { ...style, borderRightWidth: 0 };
    }
    // Return the component you want to customize.
    return <CustomItem style={style} />;
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
