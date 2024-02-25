import { StatusBar } from 'expo-status-bar';
import { Button, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router'
import EditScreenInfo from '../components/edit-screen-info';
import { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Cypto() {
    const { data } = useLocalSearchParams();

    const [Cyptodata, setCyptodata] = useState<any | null>(data);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');

    useEffect(() => {
        async function fetchCyptoData(){
            try {
                setIsLoading(true); 
                const response = await fetch(`https://api.polygon.io/v3/reference/tickers?market=crypto&active=true&apiKey=278F7FbSJigIRs029vdlJOps_62S8S6Z`);
                const parsedData = await response.json();
                setCyptodata(parsedData.results);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error, e.g., display an error message
            }
        }
        fetchCyptoData()
        
    }, [])
    




    return (
        <View className={styles.container}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                {!isLoading?(
    
                <ScrollView contentContainerStyle={{alignItems:"center",justifyContent:"center"}} className='w-full flex'>

                {Cyptodata.map((item: any, idx: any) => (
                  <Pressable onPress={()=>{router.push({ pathname: '/modal', params:  {name:"cypto",data:item.ticker,url:`https://api.polygon.io/v2/aggs/ticker/${item.ticker}/range/1/day/2024-02-21/2024-02-23?adjusted=true&sort=asc&limit=120&apiKey=278F7FbSJigIRs029vdlJOps_62S8S6Z`}  })}}  key={idx} className='h-28 
                  p-4
                  w-[94%]
                  rounded-lg
                  my-2
                  bg-[#e5e5e5]
                  dark:bg-[#252525] 
                  flex justify-between items-center flex-1'>
                    <View className='w-full'>
                      <Text className='text-2xl'>{item.ticker}</Text>
                      <Text className='text-xl' >{item.name}</Text>
                    </View>
                  </Pressable>
                ))}</ScrollView>
                ):(<View>
                    <Text>Loading...</Text>
                </View>)}
        </View>
    );
}

const styles = {
    container: `items-center flex-1 w-full justify-center `,
};
