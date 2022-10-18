
import React, { Component } from 'react'
import { Appbar, Title, TextInput, Button, Card } from 'react-native-paper'
import { View, Text, FlatList, Image } from 'react-native'
import Header from "../components/Header"

type CountryType = {
  name: {
    common: string
  };
  flags: {
    png: string;
  };
  capital: string[];
  population: number;
  latlng: number[]
}
type CountryState = {
  countryName: string;
  countryData: CountryType[];
  capitalName: string;
  loading: boolean;
  error: string
}
interface MyProp {
  navigation: any
}

class Country extends Component<MyProp, CountryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countryName: '',
      countryData: [],
      capitalName: "",
      loading: false,
      error: ""
    }
  }

  btnClick() {
    this.setState({
      ...this.state,
      loading: true
    })
    fetch(`https://restcountries.com/v3.1/name/${this.state.countryName}?fullText=true`)
      .then(item => item.json())
      .then(cData => {
        if (cData.status === 404 || cData.message === "Not Found") {
          // setError('404! Not Found')
          // setLoading(false)
          this.setState({
            ...this.state,
            loading: false,
            error: "404! Not Found"
          })
          return;
        }
        // setCountryData(cData)
        // setCapitalName(cData[0].capital[0])
        // setLoading(false)
        // setError('')
        this.setState({
          ...this.state,
          countryData: cData,
          capitalName: cData[0].capital[0],
          loading: false,
          error: ""
        })
      })
      .catch(err => {
        // setCountryData(null)
        // setLoading(false)
        // setError('Country Not Found')
        this.setState({
          ...this.state,
          countryData: [],
          loading: false,
          error: "Network Error"
        })
      })
  }

  handleCapWeather() {
    this.props.navigation.navigate('home', {
      city: this.state.capitalName,
    })
  }



  render(): React.ReactNode {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <TextInput
          label="Enter Country Name"
          style={{ color: '#00aaff' }}
          value={this.state.countryName}
          onChangeText={text => {
            // setCountryName(text);
            // setLoading(false);
            // setCountryData(null);
            // setError("")
            this.setState({
              ...this.state,
              countryName: text,
              loading: false,
              countryData: [],
              error: ""
            })
          }}
        />
        <Button
          mode="contained"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ backgroundColor: '#00aaff', margin: 20 }}
          onPress={() => this.btnClick()}>
          Search
        </Button>

        {this.state.loading && <Text>Loading...</Text>}
        {this.state.error !== '' && <Text>{this.state.error}</Text>}

        {this.state.countryData.length > 0 && (
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{
                width: 120,
                height: 120,
              }}
              source={{
                uri: this.state.countryData[0]?.flags?.png,
              }}
            />
            <Title>Name : {this.state.countryData[0].name.common}</Title>
            <Title>Capital : {this.state.countryData[0].capital[0]}</Title>
            <Title>Pop : {this.state.countryData[0].population}</Title>
            <Title>
              Lat/Lang : {this.state.countryData[0].latlng[0]} ,
              {this.state.countryData[0].latlng[1]}
            </Title>
            <Button
              mode="contained"
              style={{ backgroundColor: '#00aaff', margin: 20 }}
              onPress={() => this.handleCapWeather()}>
              Get Capital Weather
            </Button>
          </View>
        )}
      </View>
    )
  }
}

export default Country;