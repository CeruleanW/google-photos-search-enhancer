import React from 'react';
// Library Link: https://www.npmjs.com/package/react-sticky-footer
import StickyFooter from 'react-sticky-footer';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  footerLink: {
    '&:visited': {
      color: 'blueviolet'
    }
  }
});

export default function Footer() {
	const classes = useStyles();
	return (
    <StickyFooter
    bottomThreshold={50}
    // stickAtThreshold={0}
      normalStyles={{
        backgroundColor: '#1b2024',
        padding: '1rem',
        color: 'rgb(192 192 192)',
        font: "300 0.9rem 'Lora', serif",
      }}
      stickyStyles={{
        backgroundColor: 'rgba(255,255,255,.8)',
        padding: '1rem',
        font: "300 1rem 'Lora', serif",
			}}
    >
      <Container>
        <Typography align='center' >
          {' '}
          Copyright &copy; 2020 Developed with ❤️ by
          <a className={classes.footerLink}
            href='https://github.com/CeruleanW'
          >
            {' '}
            Yi Yang
          </a>
        </Typography>
      </Container>
    </StickyFooter>
  );
}
