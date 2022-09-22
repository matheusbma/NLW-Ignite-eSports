import { View, Image, FlatList } from 'react-native';

import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';

import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
      />

      <Heading
        title='Encontre seu duo!'
        subtitle='Selecione o game que deseja jogar...'
      />

      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={GAMES}
      contentContainerStyle={styles.contentList}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <GameCard
          data={item}
        />
      )}
      />

    </View>
  );
}