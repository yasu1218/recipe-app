import { Card, Text } from "@rneui/themed";

const RecipeCard = props => {
  const { image, label, source, url } = props;

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
    </Card>
  );
}

export default RecipeCard;
