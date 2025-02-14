import { useState } from 'react';
import { Modal, View, TextInput, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'expo-image';
import {
  ModalContainer,
  SearchContainer,
  SearchInput,
  CoinItem,
  CoinInfo,
  CoinName,
  CoinSymbol,
  CloseButton,
  CloseButtonText,
  ModalHeader,
  ModalTitle,
  ModalOverlay
} from '@/components/styles/token-select-modal.styles';

interface TokenSelectModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (coin: any) => void;
  coins: any[];
}

export default function TokenSelectModal({
  visible,
  onClose,
  onSelect,
  coins
}: TokenSelectModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoins = coins.filter(
    coin =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCoin = ({ item }: { item: any }) => (
    <CoinItem
      key={`${item.id}-${item.symbol}`}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <Image
        source={{ uri: item.image_url }}
        style={{ width: 40, height: 40 }}
      />
      <CoinInfo>
        <CoinName>{item.name}</CoinName>
        <CoinSymbol>{item.symbol.toUpperCase()}</CoinSymbol>
      </CoinInfo>
    </CoinItem>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalOverlay>
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>Select Token</ModalTitle>
                <CloseButton onPress={onClose}>
                  <CloseButtonText>✕</CloseButtonText>
                </CloseButton>
              </ModalHeader>

              <SearchContainer>
                <SearchInput
                  placeholder="Search tokens..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCapitalize="none"
                />
              </SearchContainer>

              <FlatList
                data={filteredCoins}
                renderItem={renderCoin}
                keyExtractor={item => `${item.id}-${item.symbol}`}
              />
            </ModalContainer>
          </TouchableWithoutFeedback>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
} 