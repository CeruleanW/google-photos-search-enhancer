import { IconButton } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import MUIDrawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DrawerList } from './DrawerList';
import { LastUpdateTime } from './LastUpdateTime';
import styled from 'styled-components';
import { getTimeStamp } from '../../features/client-storage';

const StyledContainer = styled.div`
  min-width: 16rem;
`;

const LastUpdateContainer = styled.div`
  padding: 1rem;
`;

export function Drawer({ show, onHide, }) {
  const theme = useTheme();

  return (
    <MUIDrawer
      variant='persistent'
      anchor='left'
      open={show}
    >
      <StyledContainer>
        <div>
          <IconButton onClick={onHide}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <DrawerList />
        <Divider />
        <LastUpdateContainer><LastUpdateTime lastUpdateTime={getTimeStamp()} /></LastUpdateContainer>
      </StyledContainer>
    </MUIDrawer>
  )
}
