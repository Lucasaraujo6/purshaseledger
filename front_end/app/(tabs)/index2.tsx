
import { useState } from 'react';
import {  TouchableOpacity, Text } from 'react-native';
import { StyleSheet, Image, Platform } from 'react-native';
import React from 'react';
import { View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {link} from '@/hooks/api'
// import ImagePicker from 'react-native-image-crop-picker';

import { useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
export default function TabTwoScreen() {
  let link = 'http://127.0.0.1:5000';
  link = 'https://4db7-150-164-48-111.ngrok-free.app';
  
    const [image, setImage] = React.useState<string|null>(null);
  

  const pickImage= async () => {
    console.log('Entrou aqui');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // console.log(result.assets[0].uri,);
      // await uploadImage(result);
      setImage(result.assets[0].uri)
      console.log(image)
    }
    else {
      console.log('Nenhuma imagem selecionada');
    }
    console.log('Saiu aqui');
  };
  
  const handlePostRequest = async () => {
    console.log(image)
    let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
    console.log(`handlePostRequest: ${hours}:${minutes}:${seconds}`);
  const formData = new FormData();
  const response = await fetch(image!);
  const blob = await response.blob();
  // @ts-ignore
  formData.append('image', {
    uri: image,
    type: 'image/jpeg',
    name: 'photo.jpg',
  });

  axios.post(`${link}/api/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
};
const sendImage = ()=>{
  handlePostRequest();
  console.log('Controlar envio')
}

  const [resp,setResp]  = useState("")
    // useEffect(() => {
    //   const pingServer = async () => {
    //     try {
    //       axios({
    //         method: 'get',
    //         url: `${link}/ping`,
    //       }).then((response) => {
    //         setResp(response);
    //       });
    //     } catch (error) {
    //       console.error('Erro ao fazer ping no servidor:', error);
    //     }
    //   };

    //   pingServer();
    //   console.log(resp);
    // }, [resp]);
    useEffect(() => {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        console.log(`Reloaded: ${hours}:${minutes}:${seconds}`);
        
    }, [image]);
    const press = (text: string) =>{
      // const text = "asd"
      console.log(`${text} pressed`)
    }
    return (
      <View style={styles.container}>
        
        

        {!image &&<CustomButton text="Selecionar imagem" iconName="plus" onPress={pickImage} />}
        {image &&<>
         <Image source={{ uri: image }} style={styles.image} />
         <View style={styles.imageOptions}>
        <CustomButton text="Enviar imagem" iconName="send" onPress={sendImage} />
        <CustomButton text="Substituir imagem" iconName="rotate-right" onPress={pickImage} />
        </View>
        </>
        }
          

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      marginVertical: 20,
    },

    imageOptions: {
      flexDirection: 'row',
      gap: 10
    },
  });





// import Ionicons from '@expo/vector-icons/Ionicons';
// import { StyleSheet, Image, Platform } from 'react-native';
// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { pickImage } from '@/hooks/api';
// import React from 'react';
// import { View, Button } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// // import ImagePicker from 'react-native-image-crop-picker';

// import { useEffect } from 'react';
// export default function TabTwoScreen() {
//   // const pickImage = async () => {
//   //   let result = await ImagePicker.launchImageLibraryAsync({
//   //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   //     allowsEditing: true,
//   //     aspect: [4, 3],
//   //     quality: 1,
//   //   });
  
//   //   if (!result.canceled) {
//   //     console.log(result.assets[0].uri);
//   //   }
//   // };

//   // await axios.get('http://127.0.0.1:5000/ping');


//     useEffect(() => {
//       const pingServer = async () => {
//         try {
//           axios({
//             method: 'get',
//             url: `https://7488-150-164-48-111.ngrok-free.app/ping`,
//           }).then((response) => {
//             console.log(response.data);
//           });
//         } catch (error) {
//           console.error('Erro ao fazer ping no servidor:', error);
//         }
//       };

//       pingServer();
//     }, []);
//   const [image, setImage] = React.useState<string | null>(null);
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//        <Button title="Escolher Imagem" onPress={pickImage} />
//        {image && <Image source={{ uri: image }} 
//       //  style={{ width: 300, height: 400 }} 
//        />}
//      </View>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Explorer</ThemedText>
//       </ThemedView>
//       <ThemedText>This app includes example code to help you get started.</ThemedText>
//       <Collapsible title="File-based routing">
//         <ThemedText>
//           This app has two screens:{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
//           {/* <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText> */}
//           <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
//         </ThemedText>
//         <ThemedText>
//           The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
//           sets up the tab navigator.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/router/introduction">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Android, iOS, and web support">
//         <ThemedText>
//           You can open this project on Android, iOS, and the web. To open the web version, press{' '}
//           <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
//         </ThemedText>
//       </Collapsible>
//       <Collapsible title="Images">
//         <ThemedText>
//           For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
//           different screen densities
//         </ThemedText>
//         <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
//         <ExternalLink href="https://reactnative.dev/docs/images">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Custom fonts">
//         <ThemedText>
//           Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
//           <ThemedText style={{ fontFamily: 'SpaceMono' }}>
//             custom fonts such as this one.
//           </ThemedText>
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Light and dark mode components">
//         <ThemedText>
//           This template has light and dark mode support. The{' '}
//           <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
//           what the user's current color scheme is, and so you can adjust UI colors accordingly.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Animations">
//         <ThemedText>
//           This template includes an example of an animated component. The{' '}
//           <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
//           the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
//           to create a waving hand animation.
//         </ThemedText>
//         {Platform.select({
//           ios: (
//             <ThemedText>
//               The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
//               component provides a parallax effect for the header image.
//             </ThemedText>
//           ),
//         })}
//       </Collapsible>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });

