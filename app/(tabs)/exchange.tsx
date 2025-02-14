import { useState, useCallback, Fragment, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Alert } from 'react-native';
import { Image } from 'expo-image';
import { GoBackButton } from '@/components/styles/signup.styles';
import { useCoins } from '@/contexts/CoinsContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { CoinImage } from '@/components/styles/crypto-symbol-screen.styles';
import {
  Container,
  Header,
  Title,
  ExchangeContainer,
  CurrencySelector,
  CurrencyText,
  AmountInput,
  SwapButton,
  ConvertButton,
  ConvertButtonText,
  PriceText
} from '@/components/styles/exchange.styles';
import TokenSelectModal from '@/components/token-select-modal';
import { api } from '@/contexts/AuthContext';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import { useBookmarks } from '@/contexts/BookmarksContext';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image_url: string;
  current_price: number;
}

export default function ExchangeScreen() {
  const { from, to } = useLocalSearchParams();
  const [fromCoin, setFromCoin] = useState<Coin | null>(null);
  const [toCoin, setToCoin] = useState<Coin | null>(null);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const { currency } = useCurrency();
  const { coins } = useCoins();
  const { bookmarks } = useBookmarks();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectingType, setSelectingType] = useState<'from' | 'to' | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const fromFormattedPrice = useFormattedPrice(fromCoin?.current_price, currency);
  const toFormattedPrice = useFormattedPrice(toCoin?.current_price, currency);

  useEffect(() => {
    const fetchSpecificCoins = async () => {
      try {
        if (from) {
          const fromSymbol = from.toString().toLowerCase();
          // Check both coins and bookmarks
          const existingFromCoin = [...coins, ...bookmarks].find(
            (coin) => coin.symbol.toLowerCase() === fromSymbol
          );

          if (!existingFromCoin) {
            const response = await api.get(`/coins/${fromSymbol}`, {
              params: { vs_currency: currency }
            });
            if (response.data?.data) {
              setFromCoin(response.data.data);
            }
          } else {
            setFromCoin(existingFromCoin);
          }
        }

        if (to) {
          const toSymbol = to.toString().toLowerCase();
          // Check both coins and bookmarks
          const existingToCoin = [...coins, ...bookmarks].find(
            (coin) => coin.symbol.toLowerCase() === toSymbol
          );

          if (!existingToCoin) {
            const response = await api.get(`/coins/${toSymbol}`, {
              params: { vs_currency: currency }
            });
            if (response.data?.data) {
              setToCoin(response.data.data);
            }
          } else {
            setToCoin(existingToCoin);
          }
        }
      } catch (error) {
        console.error('Error fetching specific coins:', error);
      }
    };

    fetchSpecificCoins();
  }, [from, to, coins, bookmarks, currency]);

  const handleSwap = () => {
    const temp = fromCoin;
    setFromCoin(toCoin);
    setToCoin(temp);
    setConvertedAmount('');
    setAmount('');
  };

  const handleConvert = useCallback(async () => {
    if (!fromCoin || !toCoin || !amount) return;

    setIsConverting(true);
    try {
      const response = await api.post<{
        data: {
          fromAmount: number
          toAmount: number
          rate: number
          lastUpdated: string
        }
      }>('/coins/convert', {
        fromSymbol: fromCoin.name.toLowerCase(),
        toSymbol: toCoin.name.toLowerCase(),
        amount: parseFloat(amount),
        vs_currency: currency
      });

      if (!response.data || typeof response.data.data.toAmount !== 'number') {
        throw new Error('Invalid response format');
      }

      setConvertedAmount(response.data.data.toAmount.toFixed(8));
    } catch (error) {
      console.error('Conversion error:', error);
      Alert.alert(
        'Conversion Error',
        'Unable to perform conversion. Please try again.'
      );
      setConvertedAmount('');
    } finally {
      setIsConverting(false);
    }
  }, [fromCoin, toCoin, amount]);

  const selectCoin = (type: 'from' | 'to') => {
    setSelectingType(type);
    setModalVisible(true);
  };

  const handleCoinSelect = (coin: any) => {
    if (selectingType === 'from') {
      setFromCoin(coin);
    } else {
      setToCoin(coin);
    }
  };

  return (
    <Container>
      <Header>
        <GoBackButton onPress={() => router.back()} />
        <Title>Exchange</Title>
      </Header>

      <ExchangeContainer>
        <View>
          <CurrencySelector onPress={() => selectCoin('from')}>
            {fromCoin ? (
              <Fragment>
                <CoinImage
                  source={{ uri: fromCoin.image_url }}
                  style={{ width: 32, height: 32 }}
                />
                <CurrencyText>{fromCoin.symbol.toUpperCase()}</CurrencyText>
              </Fragment>
            ) : (
              <CurrencyText>Select coin</CurrencyText>
            )}
            <AmountInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
            />
          </CurrencySelector>
          {fromCoin && (
            <PriceText>
              1 {fromCoin.symbol.toUpperCase()} = <PriceText style={{ color: '#0ab27d' }}>{fromFormattedPrice}</PriceText>
            </PriceText>
          )}
        </View>

        <SwapButton onPress={handleSwap}>
          <Image
            source={require('@/assets/images/exchange.svg')}
            style={{ width: 24, height: 24, tintColor: '#ffffff' }}
          />
        </SwapButton>

        <View>
          <CurrencySelector onPress={() => selectCoin('to')}>
            {toCoin ? (
              <Fragment>
                <CoinImage
                  source={{ uri: toCoin.image_url }}
                  style={{ width: 32, height: 32 }}
                />
                <CurrencyText>{toCoin.symbol.toUpperCase()}</CurrencyText>
              </Fragment>
            ) : (
              <CurrencyText>Select coin</CurrencyText>
            )}
            <CurrencyText style={{ flex: 1, textAlign: 'right' }}>
              {convertedAmount || '0.00'}
            </CurrencyText>
          </CurrencySelector>
          {toCoin && (
            <PriceText>
              1 {toCoin.symbol.toUpperCase()} = <PriceText style={{ color: '#0ab27d' }}>{toFormattedPrice}</PriceText>
            </PriceText>
          )}
        </View>

        <ConvertButton
          onPress={handleConvert}
          disabled={!fromCoin || !toCoin || !amount || isConverting}
        >
          <ConvertButtonText>
            {isConverting ? 'Converting...' : 'Convert'}
          </ConvertButtonText>
        </ConvertButton>
      </ExchangeContainer>

      <TokenSelectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleCoinSelect}
        coins={coins}
      />
    </Container>
  );
} 