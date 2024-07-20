import { LinearProgress, linearProgressClasses, styled } from '@mui/material';
import { theme as themes } from '../../../themes/styles';
export const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor:
      theme.palette.mode === 'light'
        ? themes.colors.primary
        : themes.colors.bluePrimary,
  },
}));

export const styleButtonUi = {
  height: '56px',
  display: 'block',
  position: 'relative',
  left: '-10px',
  backgroundColor: 'gray',
  color: 'white',
  borderRadius: '0px 7px 7px 0px',
  boxShadow: 'none',
  ':hover': { backgroundColor: 'gray', boxShadow: 'none' },
};
