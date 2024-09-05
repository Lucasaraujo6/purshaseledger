import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer'


  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  
  //   if (!result.canceled) {
  //     console.log(result.assets[0].uri);
  //   }
  // };

  
  // export const uploadImage = async (imageUri) => {
  //   try {
  //     // Converte a URI da imagem em um Blob
  //     const response = await fetch(imageUri);
  //     const blob = await response.blob();
  
  //     // Cria um FormData e adiciona o Blob
  //     const formData = new FormData();
  //     formData.append('image', blob, 'photo.jpg');
  
  //     console.log('formData', formData);
  
  //     // Use o endereço IP da sua máquina na rede local
  //     const uploadResponse = await axios.post('http://127.0.0.1:5000/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  
  //     console.log(uploadResponse.data);
  //   } catch (error) {
  //     console.error('Erro ao enviar a imagem:', error);
  
  //     if (error.response) {
  //       console.error('Resposta do servidor:', error.response.data);
  //       console.error('Status do servidor:', error.response.status);
  //       console.error('Cabeçalhos do servidor:', error.response.headers);
  //     } else if (error.request) {
  //       console.error('Pedido feito, mas sem resposta:', error.request);
  //     } else {
  //       console.error('Erro ao configurar o pedido:', error.message);
  //     }
  //   }
  // };
  
export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  console.log(PingComponent())
  if (!result.canceled) {
    // const resizedImage = await ImageResizer.createResizedImage(
    //   result.assets[0].uri,
    //   100, // largura da miniatura
    //   100, // altura da miniatura
    //   'JPEG',
    //   80 // qualidade da imagem
    // );
    // console.log(resizedImage.uri);
    // await uploadImage(resizedImage.uri);
    console.log(result.assets[0].uri,);
    await uploadImage(result.assets[0].uri,);
  }
};
