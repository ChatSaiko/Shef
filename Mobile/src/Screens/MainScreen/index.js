import React,  {useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';

import RandomButton from '../../components/RandomButton';

import axios from 'axios';

import Search from '../../components/Search';
import RadioFilter from '../../components/RadioFilter';
import Recipe from '../../components/RecipeList/Recipe';
import styles from './styles';


export default function MainScreen(){
    
    const [data, setData] = useState([]);
     async function FilterBy(filter,param){
        if(filter == 'Area'){
             await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?', {
                params: {
                    a: param,
                },
            })
            .then((response) => {
                 //console.log(response.data.meals);
                 
                 setData([...data,response.data.meals]);
                 console.log(data);
            }) 
            .catch((error) => {
                console.log(error);
            })
        }
        else if(filter === 'Category'){

        }
        else if(filter === 'Name'){

        }
        else {
            console.log('invalid filter');
        }
    }
    useEffect(() => {
        FilterBy('Area', 'Japanese')
       
        return () => {
            console.log('Everything ok');
        }
    }, [])
    return(     
        <View style={styles.container}>   
            <View style={styles.searchPos}>
                <Search/>
            </View>  
            <View style={styles.radioPos}>
                <RadioFilter/>
            </View>
            
            <SafeAreaView style={styles.scroll}>
                <FlatList
                    data={data[0]}
                    renderItem={({item}) => (
                        <Recipe _title={item.strMeal}  _img={item.strMealThumb}/>
                    )}
                    keyExtractor={item => item.idMeal}
                    extraData={data}
                    style={{marginBottom:  75}}
                />
            
            </SafeAreaView>
            <RandomButton/>
            
            
            
        </View>
       
    )
}
