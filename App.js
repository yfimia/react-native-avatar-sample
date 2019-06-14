import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import PhotoUpload from 'react-native-photo-upload'
import ImageResizer from 'react-native-image-resizer'
import { Row, Col, Button } from 'native-base'

const PHOTO_SIZE_LARGE = 170;
const PHOTO_SIZE_MEDIUM = 100;
const PHOTO_SIZE_SMALL = 70;


type Props = {};
export default class App extends Component<Props> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            largePhotoUri: 'https://i.pinimg.com/474x/52/fe/c5/52fec54732ea8fa383f614f447aec4ac--avatar-james-cameron-blue-avatar.jpg',
            largePhotoData : null,

            mediumPhotoUri: 'https://i.pinimg.com/474x/52/fe/c5/52fec54732ea8fa383f614f447aec4ac--avatar-james-cameron-blue-avatar.jpg',
            smallPhotoUri: 'https://i.pinimg.com/474x/52/fe/c5/52fec54732ea8fa383f614f447aec4ac--avatar-james-cameron-blue-avatar.jpg',
            
            
            photoUri : 'https://i.pinimg.com/474x/52/fe/c5/52fec54732ea8fa383f614f447aec4ac--avatar-james-cameron-blue-avatar.jpg',
            photoData : null,

            offsetX : 0,
            offsetY : 0,
            width : PHOTO_SIZE_LARGE,
            height : PHOTO_SIZE_LARGE,
            percent : 100,
            displayWidth : PHOTO_SIZE_LARGE,
            displayHeight : PHOTO_SIZE_LARGE,
            resizeMode : 'cover'

        }
    }

    changePhoto(uri, data){
        console.log('Image Uri: ', uri);
        console.log('Base64 Data: ', data);
        this.setState({ photoUri: uri, photoData: `data:image/png;base64,${data}` });
    }

    zoomIn(){
        this.setState({displayWidth : this.state.percent + 1})
    }

    zommOut(){
        this.setState({displayWidth : this.state.percent - 1})
    }

    processResponse(response){
        console.log("Response: ", response)
        if (response){
            let { width, height, fileName, fileSize, isVertical, origURL, timestamp, uri } = response;
            this.changePhotoUri(uri)
        }
        
    }

    render() {
        // 
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <Row style={styles.imagePickerRow}>
                        <Col style={styles.pickerCol}>
                            <Text style={styles.selectPictureText}>Select Picture</Text>
                            <PhotoUpload 
                                //onPhotoSelect={ (avatar, x) => this.changePhotoBase64(avatar, x) }  
                                onResponse={ (response) => this.processResponse(response) }
                            >
                                <Image
                                    style={styles.pickerImg}
                                    resizeMode='cover'
                                    source={{ uri: this.state.photoUri }}
                                />
                            </PhotoUpload>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col><Button block onPress={() => this.zoomIn() }><Text>+</Text></Button></Col>
                        <Col><Button block onPress={() => this.zommOut() }><Text>-</Text></Button></Col>
                        <Col><Button block onPress={() => this.zoomIn() }><Text>Rotate Left</Text></Button></Col>
                        <Col><Button block onPress={() => this.zommOut() }><Text>Rotate Right</Text></Button></Col>
                    </Row>
                    <Row>
                        <Col><Button block onPress={() => this.zoomIn() }><Text>Move Left</Text></Button></Col>
                        <Col><Button block onPress={() => this.zommOut() }><Text>Move Right</Text></Button></Col>
                        <Col><Button block onPress={() => this.zoomIn() }><Text>Move Up</Text></Button></Col>
                        <Col><Button block onPress={() => this.zommOut() }><Text>Move Down</Text></Button></Col>
                    </Row>

                    {/* <Row>
                        <Col><Button block onPress={() => this.generatePreview() }><Text>Preview</Text></Button></Col>
                    </Row> */}


                    <Row style={styles.previewRow}>
                        <Col style={styles.previewLargeCol}>
                            <Image
                                style={styles.largeAvatarImg}
                                resizeMode='cover'
                                source={{ uri: this.state.photoUri }}
                            />
                        </Col>
                        <Col style={styles.previewMediumCol}>
                            <Image
                                style={styles.mediumAvatarImg}
                                resizeMode='cover'
                                source={{ uri: this.state.photoUri }}
                            />
                        </Col>
                        <Col style={styles.previewSmallCol}>
                            <Image
                                style={styles.smallAvatarImg}
                                resizeMode='cover'
                                source={{ uri: this.state.photoUri }}
                            />
                        </Col>
                    </Row>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imagePickerRow: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 380,
    },
    pickerCol: {
        margin: 15,
        // backgroundColor: '#FF0000',
    },
    pickerImg: {
        paddingVertical: 0,
        width: 250,
        height: 250,
        borderRadius: 0
    },
    selectPictureText:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    previewRow: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: PHOTO_SIZE_LARGE,
    },

    previewLargeCol: {
        // backgroundColor: '#FF0000',
        width: PHOTO_SIZE_LARGE,
        margin: 3
    },

    previewMediumCol: {
        // backgroundColor: '#00FF00',
        width: PHOTO_SIZE_MEDIUM,
        margin: 3
    },

    previewSmallCol: {
        // backgroundColor: '#0000FF',
        width: PHOTO_SIZE_SMALL,
        margin: 3
    },

    largeAvatarImg: {
        height: PHOTO_SIZE_LARGE,
        width: PHOTO_SIZE_LARGE,
        // borderColor: '#000000',
        // borderWidth: 1,
        borderRadius: PHOTO_SIZE_LARGE / 2
    },
    mediumAvatarImg: {
        height: PHOTO_SIZE_MEDIUM,
        width: PHOTO_SIZE_MEDIUM,
        // borderColor: '#000000',
        // borderWidth: 1,
        borderRadius: PHOTO_SIZE_MEDIUM / 2
    },
    smallAvatarImg: {
        height: PHOTO_SIZE_SMALL,
        width: PHOTO_SIZE_SMALL,
        // borderColor: '#000000',
        // borderWidth: 1,
        borderRadius: PHOTO_SIZE_SMALL / 2
    },







});
