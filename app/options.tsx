import { StatusBar } from 'expo-status-bar';
import { Button, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, router } from 'expo-router'
import EditScreenInfo from '../components/edit-screen-info';
import { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Options() {
    const [Optionsdata, setOptionsdata] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [popup, setPopup] = useState(true);
    const [name, setName] = useState('');
    async function fetchOptions() {
        try {
            setIsLoading(true); // Set loading to true before fetching data
            const response = await fetch(`https://api.polygon.io/v3/reference/tickers?market=otc&active=true&apiKey=278F7FbSJigIRs029vdlJOps_62S8S6Z`);
            const parsedData = await response.json();
            console.log(parsedData)
            setOptionsdata(parsedData.results);
            setIsLoading(false);
            // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, e.g., display an error message
        }
    }

    useEffect(() => {
        fetchOptions()
    }, [])
    





    return (
        <View className={styles.container}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                {!isLoading?(
    
                <ScrollView contentContainerStyle={{alignItems:"center",justifyContent:"center"}} className='w-full flex'>
                    <View className='flex w-[94%] py-2 flex-row rounded-lg items-center justify-center gap-2' >
                    <TextInput className='p-2 rounded-lg flex-1 border h-14' placeholder='Enter Options Name' value={name} onChangeText={(txt) => { setName(txt) }} />
                    <Pressable className='bg-blue-500 h-14 flex items-center justify-center px-4 text-white p-2 rounded-lg' onPress={() => { fetchOptions() }} >
                        {!isLoading?(<FontAwesome color="white" name='search' />):(<Text>Loading..</Text>)}
                        </Pressable>
                </View>
                {Optionsdata.map((item: any, idx: any) => (
                  <Pressable onPress={()=>{router.push({ pathname: '/modal', params:  {data:item.ticker,url:`https://api.polygon.io/v2/aggs/ticker/${item.ticker}/range/1/day/2024-02-22/2024-02-23?adjusted=true&sort=asc&limit=120&apiKey=278F7FbSJigIRs029vdlJOps_62S8S6Z`}  })}}  key={idx} className='h-24 
                  p-4
                  w-[94%]
                  rounded-lg
                  my-2
                  bg-black/10
                  dark:bg-[#252525] 
                  flex justify-between items-center flex-1'>
                    <View className='w-full'>
                      <Text >Ticker: {item.ticker}</Text>
                      <Text >Name: {item.name}</Text>
                    </View>
                    <View>
                      <Text>Primary Exchange: {item.primary_exchange}</Text>
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
