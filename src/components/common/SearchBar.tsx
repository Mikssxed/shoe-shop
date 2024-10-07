import { Box, InputBase } from '@mui/material';
import { SearchNormal1 } from 'iconsax-react';

import { useIsMobile } from '@/hooks';
import { stylingConstants } from '@/lib/constants/themeConstants';
import BaseButton from '../ui/BaseButton';
import { buttonStyles } from '@/styles/commonStyles';

type SearchBarProps = {
  width: string;
  height: string;
  onChange?: (value: string) => void;
  value?: string;
  onKeyPress?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSearch?: () => void;
  onClear?: () => void;
  focused?: boolean;
  onInputClick?: () => void;
};

const SearchBar = ({
  width,
  height,
  onChange,
  value,
  onKeyPress,
  onSearch,
  onClear,
  focused = false,
  onInputClick,
}: SearchBarProps) => {
  const isMobile = useIsMobile();

  return (
    <Box
      data-testid="searchbar"
      sx={{
        position: 'relative',
        display: 'flex',
        marginInline: { xs: '0px 10px', sm: '20px', md: '40px' },
        width,
        height: { xs: '25px', sm: '40px', md: height },
        border: `1px solid ${stylingConstants.palette.grey[700]}`,
        borderRadius: `calc(${height}/2)`,
      }}
    >
      <Box
        data-testid="searchbar__search-icon"
        sx={{
          pl: { xs: '10px', sm: '14px', md: `calc(${height}/3)` },
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SearchNormal1 size="60%" color={stylingConstants.palette.grey[700]} />
      </Box>
      <InputBase
        data-testid="searchbar__input"
        onFocus={e => {
          if (!focused) e.target.blur();
        }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={e => {
          if (onChange) onChange(e.target.value);
        }}
        onKeyDown={e => {
          if (onKeyPress) onKeyPress(e);
        }}
        sx={{
          flexGrow: 1,
          pl: { xs: '25px', sm: '35px', md: `${height}` },
          pr: { xs: '10px', md: `calc(${height}/3)` },
          color: stylingConstants.palette.text.secondary,
          height: { xs: '25px', sm: '40px', md: height },
          '& > input': {
            fontSize: { xs: '12px', sm: '18px', md: `calc(${height}/3)` },
          },
        }}
        autoFocus={focused}
        onClick={onInputClick}
      />
      {onSearch && (
        <BaseButton
          variant="outlined"
          onClick={onSearch}
          sx={{ ...buttonStyles.searchInputBtn, mr: '4px' }}
          data-testid="searchbar__search-button"
        >
          Search
        </BaseButton>
      )}
      {onClear && (
        <BaseButton
          variant="outlined"
          onClick={onClear}
          sx={{
            ...buttonStyles.searchInputBtn,
            mr: { xs: '10px', sm: '18px', md: `calc(${height}/3)` },
          }}
          data-testid="searchbar__clear-button"
        >
          Clear
        </BaseButton>
      )}
    </Box>
  );
};

export default SearchBar;
