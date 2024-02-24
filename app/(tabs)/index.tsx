import {  Text, View, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useAuthentication } from '~/context/AuthContext';
import { useEffect, useState } from 'react';
import getDoument from '~/utils/firestore/getData';
import Carousel from 'react-native-snap-carousel';
import { Card,Button } from 'react-native-paper';
const sliderWidth = Dimensions.get("window").width;
const width = Dimensions.get("window").width;
export default function TabOneScreen() {
  const { user } = useAuthentication();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const entries = [
    { title: "Cypto", link: "/cypto" },
    { title: "Stocks", link: "/stocks" },
    { title: "Options", link: "/options" },
    { title: "indices", link: "/Indeices" },
    { title: "forex", link: "/Forex" },
  ];

  const renderitem = ({item, index}: { item: any; index: number }) => {
    return (
      <Card style={{ width: sliderWidth / 2, height: sliderWidth / 2}} mode="outlined" contentStyle={{flex:1,display:"flex",justifyContent:"space-around"}} >
        <Card.Title titleVariant="headlineSmall" title={item.title} subtitle="comming soon."  />
        {/* <Card.Content  >
          <Text variant="titleLarge">{item.title}</Text>
          <Text variant="bodyMedium">Comming soon</Text>
        </Card.Content> */}
        <Card.Actions style={{}} >
          <Button onPress={() => { router.push(item.link) }} mode="outlined"  >Select</Button>
        </Card.Actions>
      </Card>
    );
}

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchUsers()
      .then(() => setIsLoading(false))
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  async function fetchUsers() {
    try {
      const result = await getDoument("users", user?.uid);
      setData(result.result?.data());
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error); // Set error for potential display in UI
    }
  }
  return (
    <View className={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {data !== null && (
        <>
          <View className='flex w-full items-start rounded-full gap-10'>
            <View className='rounded-full py-2 bg-[#e5e5e5]  gap-3 flex flex-row items-center justify-center px-6'>
              <Image
                source={data.displayimg}
                className='border border-gray-500'
                style={{ width: 35, borderRadius:100, height: 35, }}
              />
              <Text className='font-semibold' >{data.email}</Text>
            </View>
            <View className='flex gap-4'>
              <Text className='text-lg'>Total Currency Balance</Text>
              <Text className='font-semibold text-3xl '>₹{data.balance}</Text>
            </View>
          </View>
          <Carousel
        data={entries}
        renderItem={renderitem}
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth / 2}
        firstItem={1}
      />

        </>
      )}
    </View>
  );
}

const styles = {
  container: `items-center flex-1  p-4`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
