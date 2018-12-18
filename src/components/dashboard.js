import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>dashboard</Text>
            </View>
        );
    }
}
export default dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
