import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';import { DataTable, TextInput } from 'react-native-paper';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useAuthentication } from '~/context/AuthContext';
import firebase from '~/utils/firebase';
import getDoument from '~/utils/firestore/getData';
;

export default function ModalScreen() {
  const { name,data, url } = useLocalSearchParams();
  const [balance, setBalance] = useState<any | null>(null);
  const [realbalance, setRealbalance] = useState<any | null>(null);
  const [invdata, setInvdata] = useState<any | null>(null);
  const [amt, setAmt] = useState<any | null>('');
  const [error, setError] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthentication();
  const db = getFirestore(firebase);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const parsedData = await response.json();
        setInvdata(parsedData.results);        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setIsLoading(false);
      }
    }
    async function fetchBalance() {
      const result = await getDoument("users",user?.uid)
      console.log(result.result?.data()[name][data])
      setBalance(result.result?.data()[name][data])
      setRealbalance(result.result?.data().balance)
    }
    

      fetchBalance();
      fetchData();
    

  }, [user]);

  async function fetchSell() {
    const frankDocRef = doc(db, "users", user?.uid);
    const updatedBalance = parseFloat(balance) - parseFloat(amt);
  
    if (updatedBalance >= 0) {
      try {
        await updateDoc(frankDocRef, {
          [`cypto.${data}`]: updatedBalance
        });
        await updateDoc(frankDocRef, {
          balance:  realbalance+(parseFloat(amt) * invdata[0].c)
        });
        setBalance(updatedBalance);
      } catch (error) {
        console.error("Error updating balance:", error);
      }
    } else {
      setError("Not enough balance");
    }
  }
  async function fetchBuy() {
    const frankDocRef = doc(db, "users", user?.uid);
    const newAmt = parseFloat(amt) * invdata[0].c;
    const updatedRealBalance = realbalance - newAmt;
    console.log(updatedRealBalance)
    if (newAmt > 0 && updatedRealBalance >= 0) {
      try {
        await updateDoc(frankDocRef, {
          [`cypto.${data}`]: balance + parseFloat(amt),
          balance: updatedRealBalance
        });
        setBalance(balance + parseFloat(amt));
        setRealbalance(updatedRealBalance);
      } catch (error) {
        console.error("Error updating balance:", error);
      }
    } else {
      setError("Invalid amount or insufficient virtual balance");
    }
  }

  return (
<View className='flex-1 w-full p-2'>
  {isLoading ? (
    <View><Text>Loading...</Text></View>
  ) : (
    <View className='flex-1 w-full flex gap-10 justify-center items-center'>
      <View className='w-full flex items-start gap-5'>
        <Text className='text-6xl font-semibold'>{data}</Text>
        <Text className='text-xl'>Balance: {balance}</Text>
        {error&&<Text className='text-xl'>{error}</Text>}
      </View>
      {invdata && invdata.length > 0 && ( // Check if invdata is defined and not empty
        <DataTable>
          <DataTable.Header>
            <DataTable.Title numeric>Close</DataTable.Title>
            <DataTable.Title numeric>High</DataTable.Title>
            <DataTable.Title numeric>Low</DataTable.Title>
            <DataTable.Title numeric>Open</DataTable.Title>
          </DataTable.Header>

          {invdata.map((item, idx) => (
            <DataTable.Row key={idx}>
              <DataTable.Cell numeric>{item.c}</DataTable.Cell>
              <DataTable.Cell numeric>{item.h}</DataTable.Cell>
              <DataTable.Cell numeric>{item.l}</DataTable.Cell>
              <DataTable.Cell numeric>{item.o}</DataTable.Cell>
            </DataTable.Row>
          ))}

        </DataTable>
      )}
      {invdata && invdata.length > 0 && ( // Check if invdata is defined and not empty
        <>
          <View className='flex gap-2 w-full items-start'>
            <Text className='text-xl font-semibold'>Close: <Text className='text-blue-500' >{invdata[0].c}</Text></Text>
            <Text className='text-xl font-semibold'>High: <Text className='text-green-500' >{invdata[0].h}</Text></Text>
            <Text className='text-xl font-semibold'>Low: <Text className='text-red-500' >{invdata[0].l}</Text></Text>
          </View>
        </>
      )}
      <View className='w-full flex gap-2'>
      <TextInput

      className='w-full'
      label="Amount"
      value={amt}
      mode="outlined"
      onChangeText={amt => setAmt(amt)}
    />
        <Pressable className="w-full h-20 items-center justify-center bg-red-500 rounded-lg " onPress={() => { fetchSell() }} ><Text className='text-white text-lg'>Sell</Text></Pressable>
        <Pressable className="w-full h-20 items-center justify-center bg-green-500 rounded-lg" onPress={() => { fetchBuy() }} ><Text className='text-white text-lg'>Buy</Text></Pressable>
      </View>
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
