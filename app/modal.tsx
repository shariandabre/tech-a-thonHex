import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';;

export default function ModalScreen() {
  const { data, url } = useLocalSearchParams();

  const [invdata, setInvdata] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(url)
    async function fetchData() {
      try {
        const response = await fetch(url);
        const parsedData = await response.json();
        console.log(parsedData)
        setInvdata(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setIsLoading(false);
      }
    }
    if (url) {
      fetchData();
    }

  }, [url]);



  return (
    <View className={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      {isLoading ? (<View><Text>Loading...</Text></View>) : (
        <View >
          {invdata && (<View><View>
            <Text className='text-6xl font-semibold'>{data}</Text>
          </View>
            <View>
              <Text className='text-xl font-semibold'>{invdata?.results[0].c}</Text>
            </View>
            <View>
              <Pressable className="w-full h-10 bg-red-500 rounded-lg" onPress={() => { fetchSell() }} ><Text className='text-white text-lg'>Sell</Text></Pressable>
              <Pressable className="w-full h-10 bg-green-500 rounded-lg" onPress={() => { fetchBuy() }} ><Text className='text-white text-lg'>Buy</Text></Pressable>

            </View></View>)}
        </View>
      )}
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
