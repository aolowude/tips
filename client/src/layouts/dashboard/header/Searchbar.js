import { useState } from 'react';
import OpenAI from 'openai';

// @mui
import { styled } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
  borderBottom: '2px solid',
  borderBottomColor: 'blue',
}));

// ----------------------------------------------------------------------

async function fetchGpt(fetchQuery) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a food, nutrition and lifestyle assistant.' },
      { role: 'user', content: fetchQuery },
    ],
    model: 'gpt-3.5-turbo',
  });
  console.log(completion.choices[0]);

  // const image = await openai.images.generate({ prompt: 'Steak, salmon and thyme potatoes' });
  // console.log(image.data);
}

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchQuery, setFetchQuery] = useState('Fetch anything about food, nutrition, etc');

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleFetchGpt = async () => {
    setIsLoading(true);
    await fetchGpt(fetchQuery);
    setIsLoading(false);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Fetch..."
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              onChange={(ev) => setFetchQuery(ev.target.value)}
            />
            <Button variant="contained" disabled={isLoading} onClick={handleFetchGpt}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
