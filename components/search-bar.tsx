import { router } from "expo-router";
import { useCoins } from "@/contexts/CoinsContext";
import { SearchBarContainer, SearchIcon, SearchInput, SearchInputContainer } from "./styles/search-bar.styles";

export default function SearchBar() {
  const { searchCoins, search } = useCoins();

  const handleSearch = (text: string) => {
    searchCoins(text);
    router.push(`/crypto?search=${text}`);
  }

  return (
    <SearchBarContainer>
      <SearchInputContainer>
        <SearchIcon source={require("@/assets/images/search-normal.svg")} tintColor="#c4c3d4" />
        <SearchInput
          placeholder="Search"
          placeholderTextColor="#9893ad"
          value={search}
          onChangeText={handleSearch}
        />
      </SearchInputContainer>
    </SearchBarContainer>
  );
}
