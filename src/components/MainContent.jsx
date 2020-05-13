import React from 'react';
import { Button, TextField, Container} from '@material-ui/core'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class MainContent extends React.Component {
    state = {
        searchValue: '',
    }

   inputChange = (event) => {
       const value = event.target.value;

       this.setState({
           searchValue: value
       })
   }

   onSubmit = () => {
       const {searchValue} = this.state;
       if (searchValue) {
           this.props.getAsteroids(searchValue);
       }
   }

    render() {
        const {searchValue } = this.state;

        if (this.props.asteroid) {
            return <Redirect to='/asteroid-info' />
        }
        
        return (
        <Container maxWidth="sm">
            <Button 
                variant="contained" 
                color="primary" 
                disabled={!searchValue.length} 
                onClick={this.onSubmit}
            >
               Submit
            </Button>
            <TextField 
                id="standard-basic" 
                placeholder='Enter Asteroid ID' 
                onChange={this.inputChange} 
            />
            <span className='error'>{this.props.error}</span>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={this.props.getRandomAsteroids}
            >
                Random
            </Button>
        </Container>
        )
    }
}

export default MainContent;