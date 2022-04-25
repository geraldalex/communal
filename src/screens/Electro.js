import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Modal,
    Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { FONTS, SIZES, COLORS, icons,images } from '../constants';

import { FormInput } from '../components';
import * as SecureStore from 'expo-secure-store';





const Electro = ({ navigation }) => {
  //  состояние связаное с SecureStore
  const [key] = React.useState("Electro");
  const [value, onChangeValue] = React.useState("");
  const [result, onChangeResult] = React.useState("");

  const [key1] = React.useState("Electro1");
  const [value1, onChangeValue1] = React.useState("");
  const [result1, onChangeResult1] = React.useState("");
  // переменные состояния приложения

  const [countKvt, setCountKvt] = React.useState("");
  const [sumEnd, setSumEnd] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);

  // Вызов аодсчета суммы и обновление result
  React.useEffect(() => {
    getValueFor(key);
    getValueFor1(key1);
    sum();
    console.log(result)
    console.log(result1)
  });
  // функция подсчета суммы
  const sum = () => {
   
      let p;
      if (countKvt < 250) {
        p = result * countKvt;
      } else {
        p = result * 250 + result1 * (countKvt - 250);
      }
 
    setSumEnd(p.toFixed(2));
    console.log("Render");
  };

  // сохранения в SecureStore и обновление result
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);

    if (result) {
      onChangeResult(result);
    }
  }

  async function getValueFor1(key1) {
    let result1 = await SecureStore.getItemAsync(key1);

    if (result1) {
      onChangeResult1(result1);
    }
  }

  return (
    <ImageBackground
      source={images.images}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
<Text style={{...FONTS.h1, marginTop: SIZES.padding * 3, alignSelf:'center', color:COLORS.yellow}}>Электроэнергия</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: SIZES.padding * 2,
          marginHorizontal: SIZES.base * 2,
        }}
      >
        {/* вывод цен на экран */}
        <View style={{ width: "25%" }}>
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Цена за кВт до 250</Text>
          <Text style={{alignSelf:'center',color:COLORS.yellow, ...FONTS.body3, textDecorationLine:'underline'}}>{result}</Text>
        </View>

        <View style={{ width: "25%" }}>
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Цена за кВт до 250</Text>
          <Text style={{alignSelf:'center' ,color:COLORS.yellow, ...FONTS.body3, textDecorationLine:'underline'}}>{result1}</Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={icons.settings2}
            resizeMode="contain"
            style={{
              width: 35,
              height: 35,
              tintColor: COLORS.yellow,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* форма ввода количества потребленных кВт */}
      <View style={{ alignItems: "center", marginTop: SIZES.padding * 2 }}>
        <FormInput
          containerStyle={{ width: "45%" }}
          maxLength={4}
          label="Количество кВт"
          keyboardType="decimal-pad"
          onChange={(value) => {
            setCountKvt(value);
          }}
          placeholder="Введите кол-во"
          value={countKvt}
        />
      </View>

      {/* Вывод на экран суммы за потребленное количество кВт           */}
      <Text
        style={{
          paddingHorizontal: SIZES.base * 2,
          marginTop: SIZES.padding * 6,
          ...FONTS.h2,
          color: COLORS.white,
          textDecorationLine:'underline'
        }}
      >{`Сумма : ${sumEnd} грн.`}</Text>

      {/* Модальное окно */}
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        {/*All views of Modal*/}
        <View
          style={{
            backgroundColor: "#50575e",
            height: 400,
            width: "80%",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.black,
            marginTop: 80,
            marginLeft: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: SIZES.base * 2,
              marginTop: SIZES.base * 2,
            }}
          >
            <Text style={{ color: "red", marginTop: 10, ...FONTS.body2, textDecorationLine:'underline' }}>
              Тарифы
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                source={icons.close}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: COLORS.black,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: SIZES.base * 2 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: SIZES.base * 2,
              }}
            >
              <FormInput
                containerStyle={{ width: "35%" }}
                maxLength={5}
                label="Цена за кВт до 250"
                keyboardType="decimal-pad"
                onChange={(text) => {
                   
                  onChangeValue(text);
                   
                }}
                value={result}
              />
              <FormInput
                containerStyle={{ width: "35%" }}
                maxLength={5}
                label="Цена за кВт свыше 250"
                keyboardType="decimal-pad"
                onChange={(text) => {
                   
                        onChangeValue1(text);
                         
                }}
                value={result1}
              />
            </View>

            <View style={{ marginTop: 50 }}>
             
              <Button
             
                title="Сохранить"
                onPress={() => {
              
                if(value){
                    save(key, value);
                }
                if(value1){
                    save(key1, value1);

                }
                 
                  
                  
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

export default Electro;