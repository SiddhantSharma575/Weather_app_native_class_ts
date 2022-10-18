import { Appbar, Title } from 'react-native-paper';
import React from 'react'

class Header extends React.Component {
    render(): React.ReactNode {
        return (
            <>
                <Appbar.Header
                    style={{
                        backgroundColor: '#00aaff',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>

                    <Title style={{ color: 'white' }}>Weather App</Title>
                </Appbar.Header>
            </>
        )
    }
}

export default Header

