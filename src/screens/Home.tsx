import { useState } from "react";
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import Logo from '../assets/logo_secondary.svg'

import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderItem } from "../components/Order";

export function Home() {

  const [statusSelected, setStatusSelected] = useState< 'open' | 'closed'>('open')
  const [orders, setOrders] = useState<OrderItem[]>([{
    id: 'any_id',
    patrimony: 'any_patrimony',
    when: 'any_when',
    status: 'open',
  }])

  const navigation = useNavigation()

  const { colors } = useTheme()

  function handleNewOrder() {
    navigation.navigate('new')
  }

  function handleOrderDetails(orderId: string) {
    navigation.navigate('details', { orderId })
  }

  return (
    <VStack flex={1} pb={6} bg='gray.700'>
      <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton 
          icon={<SignOut size={26} color={colors.gray[300]}/>}
        />
      </HStack>


      <VStack flex={1} px={6}>
        <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
          <Heading color='gray.100'>
            Solicitações
          </Heading>
          <Text
            color='gray.200'
            >
              {orders.length}
            </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter 
            title="em andamento" 
            type='open' 
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'} 
              />
          <Filter 
            title="finalizados" 
            type='closed'
            onPress={() => setStatusSelected('closed')} 
            isActive={statusSelected === 'closed'} 
            />
        </HStack>

        <FlatList 
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Order data={item} onPress={() => handleOrderDetails(item.id)}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100}}
          ListEmptyComponent={ () => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40}/>
              <Text color="gray.300" fontSize="xl" mt={6} textAlign='center'>
                Você ainda não possui {'\n'}
                solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>

          )}
        />
        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>

      
    </VStack>
  )
}