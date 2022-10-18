import { Appbar, Title, TextInput, Button, Card } from 'react-native-paper'
import { View, Text, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import Header from '../components/Header'

interface HomeProps {
  route: any
}

type WeatherData = {
  name: string,
  temp: string,
  humidity: string,
  desc: string,
  icon: string
}

interface HomeState {
  info: WeatherData
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      info: {
        name: "loading...",
        humidity: "loading...",
        temp: "loading...",
        desc: "loading...",
        icon: "loading..."
      }
    }
  }

  componentDidMount(): void {
    this.getWeather()
  }

  getWeather() {
    let mycity;
    const { city } = this.props.route.params;
    mycity = city;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${mycity}&appid=2f307f361343f471569db6cada2071fe`,
    )
      .then(data => data.json())
      .then(results => {
        this.setState({
          info: {
            name: results.name,
            temp: results.main.temp,
            humidity: results.main.humidity,
            desc: results.weather[0].description,
            icon: results.weather[0].icon,
          }
        })
      })
  }


  render(): React.ReactNode {
    if (this.props.route.params.city !== "indore") {
      this.getWeather()
    }
    return (
      <>
        <View style={{ flex: 1 }}>
          <Header />
          <View style={{ alignItems: 'center' }}>
            <Title style={{ color: '#00aaff', marginTop: 30, fontSize: 30 }}>
              {this.state.info.name}
            </Title>
            <Image
              style={{
                width: 120,
                height: 120,
              }}
              source={{
                uri:
                  'https://openweathermap.org/img/w/' +
                  this.state.info.icon +
                  '.png',
              }}
            />
          </View>

          <Card style={{ margin: 5, padding: 12 }}>
            <Title style={{ color: '#00aaff' }}>
              Temperature : {Number(this.state.info.temp) - 273}
            </Title>
          </Card>
          <Card style={{ margin: 5, padding: 12 }}>
            <Title style={{ color: '#00aaff' }}>
              Humidity : {this.state
                .info.humidity}
            </Title>
          </Card>
          <Card style={{ margin: 5, padding: 12 }}>
            <Title style={{ color: '#00aaff' }}>
              Description : {this.state.info.desc}
            </Title>
          </Card>
        </View>
      </>
    )
  }
}

export default Home
