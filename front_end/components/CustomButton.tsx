import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  iconName: string;
  disabled?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({ onPress, text, iconName, disabled = false }) => {
  
  // const icon = <FontAwesome6 name={iconName} regular size={30} color="#fff" />;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled} >
      <Text style={styles.text}>{text}</Text>
      <Icon name={iconName} size={30} color="#fff" style={styles.icon} />
      { //icon
        }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  icon: {
    marginTop: 5,
  },
});

export default CustomButton;
