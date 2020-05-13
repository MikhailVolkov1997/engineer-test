import React, { Fragment } from 'react';
import { List, ListItemText, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class AsteroidInfo extends React.Component {

    backBtn = () => {
        this.props.clearAsteroid();
        this.props.history.goBack();
    }

    render() {
        const {asteroid} = this.props;

        if (!asteroid) {
            return <Redirect to='/' />
        }

        return (
            <Fragment>
                <List>
                    <ListItemText> 
                        ASTEROID NAME: {asteroid.name}
                    </ListItemText>
                    <ListItemText>
                        NASA_JPL_URL: {asteroid.nasa_jpl_url}
                    </ListItemText>
                    <ListItemText>
                        IS_POTENTIALLY_HAZARDOUS_ASTEROID: {asteroid.is_potentially_hazardous_asteroid ? 'True' : 'False'}
                    </ListItemText>
                </List>
                <Button color="primary" onClick={this.backBtn}>
                    Back
                </Button>
         </Fragment>
        )
    }
}

export default AsteroidInfo;
