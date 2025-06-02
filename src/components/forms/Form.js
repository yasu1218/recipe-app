import { Button, Input } from '@rneui/themed'
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Form = props => {

  // Destructure the props to get the onInputChange function
  const { onInputChange, onSubmit } = props;

  return (
    <View style={styles.formContainer}>
      <View style={{ ...styles.formItems, ...styles.input }}> 
        <Input 
          disabledInputStyle={{ background: '#ddd' }} 
          label='Ingredient Search' 
          leftIcon={<Ionicons name='search' size={24} color='black' />}
          leftIconContainerStyle={{ marginRight: 10 }}
          placeholder='e.g. chicken, tomato, etc.'
          onChangeText={value => onInputChange(value)}
        />
      </View>
      <View style={styles.formItems}>
        <Button color='primary' title='Search' onPress={onSubmit} type='solid' />
      </View>
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
  formItems: {
    display: 'inline-flex',
  },
  input: {
    width: '65%'
  }
});