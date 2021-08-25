import { Button, Image, StyleSheet, Text, View } from "react-native";
import { RNCamera } from "react-native-camera";
import React, { PureComponent } from "react";
import Header from './components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

var isCaptured = false;

export default class App extends PureComponent {

    state = {
        photoURI: undefined,
    };

    //https://stackoverflow.com/questions/50405983/delay-on-the-capture-of-an-image-react-native-camera-expo-camera/52988963#52988963
    onPressShutter = () => {
        this.camera.takePictureAsync({ skipProcessing: true }).then(result => {
            this.setState({
                photoURI: result.uri,
            });
        });
        isCaptured = true;
    };

    backToCamera = () => {
        isCaptured = false;
        this.forceUpdate() // Force React Component to re-render
    }

    renderCameraOrPreview = () => {
        if (isCaptured) {
            return (
                <View style={styles.view}>
                    <Header title="Çektiğiniz Fotoğraf" />
                    <Image style={styles.preview} source={{ uri: this.state.photoURI }} />
                    <Button title="BACK" color='#6A60A9' onPress={this.backToCamera} />

                </View>
            );
        }

        return (
            <View style={styles.view}>
                <Header title="Fotoğraf Çekin" />
                <RNCamera ref={ref => (this.camera = ref)} style={styles.camera}>
                </RNCamera>
                <Button title="CAPTURE" size={50} color='#6A60A9' onPress={this.onPressShutter} />
                {/*<FontAwesomeIcon size={50} style={styles.button} icon={ faCamera } onPress={this.onPressShutter} />*/}

            </View>

        );
    };

    render() {
        return (
            <View style={styles.container}>
                {this.renderCameraOrPreview()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    camera: {
        flex: 1,
    },
    preview: {
        flex: 1,
    },
    view: {
        flex: 10,
    },
   
    button: {
        flex: 1,
    }
});
