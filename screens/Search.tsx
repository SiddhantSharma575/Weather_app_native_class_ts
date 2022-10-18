import { Appbar, Title, TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import React, { Component } from 'react'
import Header from '../components/Header';




type CitiesState = {
  city: string;
  cities: string[]
}

interface SearchProps {
  navigation: any
}

class Search extends Component<SearchProps, CitiesState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      city: "",
      cities: []
    }
  }

  fetchCities = (text: any) => {
    console.log(text);
    this.setState({
      ...this.state,
      city: text
    })
    fetch(
      'https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=' +
      text +
      '&locationType=city&format=json',
    )
      .then(item => item.json())
      .then(cityData => {
        this.setState({
          ...this.state,
          cities: cityData.location.address
        })
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  btnClick = () => {
    this.props.navigation.navigate("home", {
      city: this.state.city
    })
  }

  listCheck = (cityname: string) => {
    this.setState({
      ...this.state,
      city: cityname
    })
    this.props.navigation.navigate("home", {
      city: cityname
    })
  }



  render(): React.ReactNode {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <TextInput
          label="City Name"
          style={{ color: '#00aaff' }}
          value={this.state.city}
          onChangeText={text => {
            this.fetchCities(text);
          }}
        />
        <Button
          mode="contained"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ backgroundColor: '#00aaff', margin: 20 }}
          onPress={() => this.btnClick()}>
          Search
        </Button>
        <FlatList
          data={this.state.cities}
          renderItem={({ item }) => {
            return (
              <Card style={{ margin: 2, padding: 12 }} onPress={() => this.listCheck(item)}>
                <Text>{item}</Text>
              </Card>
            );
          }}
          keyExtractor={item => item}
        />
      </View>
    )
  }
}

export default Search;
