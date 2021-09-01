import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SvgIcon from '@material-ui/core/Icon';
import {ReactComponent as HistorySvg} from "../illustrations/history.svg";
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
    titleStyle: {
        textAlign: 'center'
    },
    illustrationSize:{
        width: 200,
        height: 200,
        justify: 'center',
        alignItems: 'center'
    }
})

export default function WillVisitAgain(){
    const classes = useStyles()

    return(

        <Container maxWidth='xs'>
            <h1 className={classes.titleStyle}>Your appointment history</h1>
            <Box textAlign="center">
            <SvgIcon component={HistorySvg} className={classes.illustrationSize} />
            </Box>

        </Container>
    )
}