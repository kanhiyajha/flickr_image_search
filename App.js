/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios'
const API_KEY = "29256a178a97a84915b3c80efab71707";

export default class App extends Component
{
constructor(props) { 
  super(props)
  this.state = {
       images: []
        }
    }
componentDidMount() {
          this.imageSearch('text')
        }
imageSearch = (text) => {
        this.setState({
            fromFetch: false,
            loading: true,
        })

      let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='.concat(API_KEY, '&format=json&text=',text,'&nojsoncallback=true&per_page=20&extras=url_s')
      console.log(url)
        axios.get(url)
            .then(response => {
                console.log( response.data.photos.photo);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        axiosData: response.data,
                         images: response.data.photos.photo

                    })
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });
    }

  render() {
      return (
         <SafeAreaView style={styles.container}>
          <View>

           <TextInput style={styles.search} placeholder={'Search'} value={this.state.searchText} onChangeText={(text)=> { this.setState({
        searchText: text
                 })
         this.imageSearch(text) }} />

          <FlatList 
          data={this.state.images} numColumns={2}
          renderItem={({item}) => <View>
         <Image style={styles.image} source={{uri: item.url_s}} />
       </View>}
        />
        </View>
     </SafeAreaView>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  image: {
     width: (Dimensions.get('window').width / 2) - 20,
    height: 150,
    margin: 10,
    backgroundColor: '#F5FCFF'
  },
  flatListStyle: { flex: 1,
    backgroundColor: 'steelblue'
},
search: { 
  height: 40,
  marginLeft: 10,
  marginRight: 10,
  fontSize: 20,
  marginTop: 10
}
});

