// material-ui
// import { useTheme } from '@mui/material/styles';

import logo from '../../assets/images/kvs2.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  // const theme = useTheme();

  return (
    <>
      <img src={logo} alt="E_BloodBank" width="100" />
    </>
  );
};

export default Logo;
