import { Button, Card, Text } from "@rneui/themed";

const RecipeCard = props => {
  const { image, label, source, url, navigation } = props;

  return (
    <Card>
      <Card.Title>{label}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{ uri: image }}
        style={{ height: 200, width: '100%' }}
      />
      <Text style={{ marginBottom: 10 }}>
        Source: {source}
      </Text>
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title='View'
        onPress= { () => navigation.navigate('Show', {
            label,
            url
          })
        } 
      />
    </Card>
  );
}

export default RecipeCard;
