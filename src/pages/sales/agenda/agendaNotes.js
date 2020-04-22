/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles({
    root: {
      width: '100%',
      marginBottom: '10px'
    },
    note: {
        display:'flex',
        justifyContent: 'left'  
    },
    note1: {
        display:'flex',
        justifyContent: 'right'  
    }
  });

const agendaNotes = ({ notes }) => {
    const classes = useStyles();
  return (
    <Fragment>
        {notes ?
            (notes.map((note, index) => 
                (<Card className={classes.root} key={index} raised={true}>
                    <CardActionArea>
                        <CardHeader className={classes.note}
                        title={` Voice: ${note.voice}`}
                        subheader={note.createdAt}/>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.note}>
                                {note.note} 
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                ))): null
        }
    </Fragment>
  )
};

export default agendaNotes;