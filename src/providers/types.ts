import { Color } from '@material-ui/lab/Alert';

export type SnackbarMessage = {
  isOpen: boolean;
  message: string,
  severity: Color
}