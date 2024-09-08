import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
// import ImageResizer from '@bam.tech/react-native-image-resizer'


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
  export const link = 'https://eccd-150-164-48-111.ngrok-free.app'
  
  export const uploadImage = async (image) => {
    
    const formData = new FormData();
  const response = await fetch(image);
  const blob = await response.blob();
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
  const handlePostRequest = () => {
    axios.post(`${link}/api`, {
      message: 'asdasds'
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };

  
export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    // console.log(,);
    // handlePostRequest()
    await uploadImage(result.assets[0].uri);
  }
  else {
    console.log('Nenhuma imagem selecionada');
  }
  console.log('Saiu aqui');
};
