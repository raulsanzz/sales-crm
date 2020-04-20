/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: '100%',
      marginBottom: '10px'
    },
    note: {
        display:'flex',
        justifyContent: 'left'  
    }
  });

const agendaNotes = ({ notes }) => {
    const classes = useStyles();

  return (
    <Fragment>
        {notes.length > 0 ?
            (notes.map((note, index) => 
                (<Card className={classes.root} key={index}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.note}>
                                Notes for: {note.createdAt}
                            </Typography>
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