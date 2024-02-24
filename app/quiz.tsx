import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import  QuizMain from '~/components/mutualfunds/quiz';



export default function Quiz() {
    const { name,id} = useLocalSearchParams();
    return (
        <View className={styles.container}>
            <QuizMain name={name} id={id} />
        </View>
    );
}

const styles = {
    container: `items-center flex-1 w-full justify-center `,
};
