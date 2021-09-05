import * as React from 'react';
import {Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

import AppHeader from '../assets/AppHeader';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            isSearchPressed: false,
            word: 'loading....',
            lexicalCategory: '',
            definition: ''
        }
    }

    getWord = (word) => {
        var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
        
        return fetch(url)
            .then((data) => {
            return data.json();
        })

        .then((response) => {
            var word = response[0].word;
            var lexicalCategory = response[0].meanings[0].partOfSpeech;
            var definition = response[0].meanings[0].definitions[0].definition;
      
            this.setState({
                word: word.trim(),
                lexicalCategory:lexicalCategory,
                definition: definition.trim(),
            });
        });

        // var searchKeyword=word.toLowerCase();
        // var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"

        // return fetch(url)
        // .then((data) => {
        //     if (data.status === 200){
        //         return data.json()
        //     } else{
        //         return null
        //     }
        // })
        // .then((response) => {
        //     var responseObject = response;

        //     if (responseObject){
        //         var wordData = responseObject.definitions[0]
        //         var definition = wordData.description
        //         var lexicalCategory = wordData.wordtype

        //         this.setState ({
        //             "word": this.state.text,
        //             "definition": definition,
        //             "lexicalCategory": lexicalCategory
        //         })
        //     } else {
        //         this.setState ({
        //             "word": this.state.text,
        //             "definition": "Not Found"
        //         })
        //     }
        // })
    }

    render() {
        return(
            <View>
                <AppHeader/>
                <TextInput style={styles.inputBox}
                onChangeText={text => {
                    this.setState({
                        text: text,
                        isSearchPressed: false,
                        word: "Loading...",
                        lexicalCategory: '',
                        examples: [],
                        defination: ""
                    })
                }} value={this.state.text}/>
                <View>
                <TouchableOpacity style={styles.searchButton}
                onPress={() => {
                    this.setState({ isSearchPressed: true });
                    this.getWord(this.state.text)
                }}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 18 , fontWeight:"bold"}}>Word :{this.state.word}</Text>
                <Text style={{ fontSize: 18 , fontWeight:"bold", marginTop:20}}>Type :{this.state.lexicalCategory}</Text>
                <Text style={{ fontSize: 18 , fontWeight:"bold", marginTop:20}}>Definition :{this.state.definition}</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        marginTop: 50,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        outline: 'none',
      },
      searchButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth:2,
        borderRadius: 15,
        marginTop: 60,
        width: 200,
        height: 50
      },
      buttonText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
      }
})