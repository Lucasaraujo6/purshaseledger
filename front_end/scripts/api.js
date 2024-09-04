import axios from 'axios';

export const uploadImage = async (imageUri) => {
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  });

  try {
    const response = await axios.post('https://seu-backend.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao enviar a imagem:', error);
  }
};

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const resizedImage = await ImageResizer.createResizedImage(
      result.assets[0].uri,
      100, // largura da miniatura
      100, // altura da miniatura
      'JPEG',
      80 // qualidade da imagem
    );
    console.log(resizedImage.uri);
    await uploadImage(resizedImage.uri);
  }
};
