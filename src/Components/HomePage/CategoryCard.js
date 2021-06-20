import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
        width:'100%',
    },
    media: {
        height: 120,
    },
});

const CategoryCard = ({ image, categories, category, questionCounts, choseQuiz, choseExam }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={category}
                />
                <CardContent>
                    <Typography  variant="body1" component="h3">
                        {category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {questionCounts?.map(count => {
                            if (count.category === category) {
                                return (
                                    count.count
                                )
                            }
                        })} MCQs
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained"  onClick={choseQuiz} size="small" color="primary">
                    Pop Quiz
                </Button>
                <Button variant="contained" onClick={choseExam} size="small" color="secondary">
                    Mock Exam
                </Button>
            </CardActions>
        </Card>
    );
}

export default CategoryCard