import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnvironmentProps{
    key: string;
    title: string
}

export function PlantSelect() {
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigator = useNavigation();

    const handleEnvironmentSelected = (env: string) => {
        setEnvironmentSelected(env);

        if(env == 'all')
            return setFilteredPlants(plants);
        
        const filtered = plants.filter(plant => 
            plant.environments.includes(env)
        )

        setFilteredPlants(filtered);
    }

    const handlePlantSelected = (plant: PlantProps) => {
        navigator.navigate('PlantSave', { plant });
    }

    async function fetchPlants(){
        const { data } = await api
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=10`);

        if(!data)
            return setLoading(true);
        
        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    const handleFetchMore = (distance: number) => {
        if(distance < 1)
            return;
        
        setLoadingMore(true);
        setPage(p => p + 1);
        fetchPlants();
    }

    useEffect(() => {
        async function fetchEnviroment(){
            const { data } = await api
                .get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }

        fetchEnviroment();
    },[])

    useEffect(() => {      
        fetchPlants();
    },[])

    if(loading)
        return <Load />

    return (
    <View style={styles.container}>    
        <View style={styles.header}>         
            <Header />
            <Text style={styles.title}>
                Em qual ambiente
            </Text>
            <Text style={styles.subtitle}>
                você quer colocar sua planta?
            </Text>
        </View>   
        <View>
            <FlatList 
                data={environments}
                keyExtractor={(item) => String(item.key)}
                renderItem={( { item } )=> (                                    
                    <EnvironmentButton 
                        title={item.title}
                        active={item.key === environmentSelected}
                        onPress={() => handleEnvironmentSelected(item.key)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentList}
            />
        </View>

        <View style={styles.plants}>
            <FlatList 
                data={filteredPlants}
                keyExtractor={(item) => String(item.id)}
                renderItem={( { item } )=> (                                    
                    <PlantCardPrimary 
                        data={item}
                        onPress={() => handlePlantSelected(item)}
                    />
                )}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
                onEndReachedThreshold={0.1}
                onEndReached={( {distanceFromEnd} ) => handleFetchMore(distanceFromEnd)}
                ListFooterComponent={
                   loadingMore 
                   ? <ActivityIndicator color={colors.green}/>
                   : <></>
                }
            />
        </View>
    </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {        
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight:20,
        marginTop: 17
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight:20,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        paddingLeft: 32,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
    contentContainerStyle: {
    }
})