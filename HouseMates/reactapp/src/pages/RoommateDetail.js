import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Pic from '../static/mrbean.jpg'

// RoommateDetail consists of profile pic, name, categories of tags and post button.
const RoommateDetail = () => {
    // Styling
    const useStyles = makeStyles(theme => ({
        avatar: {
            height: 200,
            width: 200,
            marginBottom: 20,
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        tag: {
            marginRight: 5,
            marginTop: 5,
        },
        category: {
            marginBottom: 30,
        },
        card: {
            width: '100%',
            marginLeft: 23,
            marginRight: 23,
        },
        tooltip: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(3),
        },
    }))
    
    // Data (hard coded for now)
    const roommate = {
        id: 1,
        pic: 'mrbean.jpg',
        name: 'Rowan Atkinson',
        age: 66,
        gender: 'Male',
        nationality: 'English',
        introvertExtrovert: 'Extrovert',
        catDog: 'Cat person',
        discipline: 'Actor',
        company: 'Mr Bean',
        shift: 'morning',
        interests: ['Music', 'Gaming'],
        canCook: 'Can cook',
        smoker: 'Non-smoker',
        alcoholic: 'Non-alcoholic',
        sleepingTime: 'Sleeps early',
        religion: 'Anglican',
        dietary: 'Vegetarian',
        room: '1 room',
        facilities: ['Pool', 'Gym'],
        mates: '3 mates',
        car: 'Owns a car',
    }

    // Hooks
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams()

    // Handlers
    const handleBack = () => { history.go(-1) }
    const handleClick = () => { history.push("/form") }

    return (
        <div className={classes.card}>
            <Card>
                {/* Back button */}
                <CardHeader
                    avatar={
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    }
                />

                <CardContent className={classes.content}>
                    {/* Profile pic */}
                    <Avatar className={classes.avatar} src={Pic} />

                    {/* Name */}
                    <Typography variant="h5">{id} {roommate.name}</Typography>

                    <Typography variant="body2" color="textSecondary" className={classes.category}>
                        Looking for roommates who are:
                    </Typography>

                    {/* Categories of tags */}
                    <div>
                        <div className={classes.category}>
                            <Typography variant="body1" color="textPrimary" gutterBottom>
                                Personalities
                            </Typography>

                            <Chip className={classes.tag} label={roommate.age} color="primary" />
                            <Chip className={classes.tag} label={roommate.gender} color="primary" />
                            <Chip className={classes.tag} label={roommate.nationality} color="primary" />
                            <Chip className={classes.tag} label={roommate.introvertExtrovert} color="primary" />
                            <Chip className={classes.tag} label={roommate.catDog} color="primary" />
                        </div>

                        <div className={classes.category}>
                            <Typography variant="body1" color="textPrimary" gutterBottom>
                                Work / Study
                            </Typography>

                            <Chip className={classes.tag} label={roommate.discipline} color="primary" />
                            <Chip className={classes.tag} label={roommate.company} color="primary" />
                            <Chip className={classes.tag} label={roommate.shift} color="primary" />
                        </div>

                        <div className={classes.category}>
                            <Typography variant="body1" color="textPrimary" gutterBottom>Interests</Typography>

                            {roommate.interests.map(interest =>
                                <Chip key={interest} label={interest} color="primary" className={classes.tag} />
                            )}
                        </div>

                        <div className={classes.category}>
                            <Typography variant="body1" color="textPrimary" gutterBottom>
                                Habits
                            </Typography>

                            <Chip className={classes.tag} label={roommate.smoker} color="primary" />
                            <Chip className={classes.tag} label={roommate.alcoholic} color="primary" />
                            <Chip className={classes.tag} label={roommate.sleepingTime} color="primary" />
                            <Chip className={classes.tag} label={roommate.religion} color="primary" />
                            <Chip className={classes.tag} label={roommate.dietary} color="primary" />
                        </div>

                        <div className={classes.category}>
                            <Typography variant="body1" color="textPrimary" gutterBottom>
                                Room Preferences
                            </Typography>

                            <Chip className={classes.tag} label={roommate.room} color="primary" />
                            {roommate.facilities.map(facility =>
                                <Chip key={facility} label={facility} color="primary" className={classes.tag} />
                            )}
                            <Chip className={classes.tag} label={roommate.mates} color="primary" />
                        </div>
                    </div>
                </CardContent>
            </Card >

            {/* Post button */}
            <Tooltip title="" onClick={handleClick}>
                <Fab color="primary" className={classes.tooltip}>
                    <AddIcon />
                </Fab>
            </Tooltip>
        </div>
    )
}

export default RoommateDetail
