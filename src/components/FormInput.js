import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

import {SIZES, FONTS, COLORS} from "../constants"

export default function FormInput({containerStyle, label,placeholder,inputStyle,
onChange, keyboardType = "default",autoCompleteType="off",autoCapitalize="none",
errorMsg="", maxLength, value
}) {

    const [onfocus, setOnfocus] = React.useState(false)
    const [text, setText] = React.useState('')

  return (
    <View style={{...containerStyle}}>
        {/* Label  */}
<Text style={{color:COLORS.white, ...FONTS.h4, alignSelf:'center'}}>{label}</Text>
        {/* TextInput  */}
      <View style={{
          height:55,
          paddingHorizontal:SIZES.padding,
          marginTop:SIZES.base,
          borderRadius:SIZES.radius,
          backgroundColor: COLORS.lightGray,
          borderWidth:1,
          borderColor:onfocus? COLORS.black: COLORS.lightGray
      }}>
<TextInput
style={{
    flex:1,
    ...inputStyle
}}
placeholder={placeholder}
placeholderTextColor={COLORS.darkGray}
keyboardType={keyboardType}
autoComplete={autoCompleteType}
autoCapitalize={autoCapitalize}
maxLength={maxLength}
onFocus={() => setOnfocus(true)}
onBlur={() => setOnfocus(false)}

onChangeText = {
    (text) => onChange(text)
}
defaultValue={value}
/>
      </View>
    </View>
  )
}