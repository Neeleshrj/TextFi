import React, { useState } from 'react';
import { View,StyleSheet} from 'react-native';
import { Tab, TabView, Text,Icon } from 'react-native-elements';

const TopTab = () => {
    const [index, setIndex] = useState(0);

    return (
        <>
            <Tab value={index} onChange={setIndex}>
                <Tab.Item 
                    icon={<Icon name='chat'/>}
                    title="Public"
                />
                <Tab.Item 
                    icon={<Icon name='chat-bubble'/>}
                    title="Private"
                />
            </Tab>
            <TabView value={index} onChange={setIndex} >
                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                    <Text h1>Recent</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                    <Text h1>Favorite</Text>
                </TabView.Item>
            </TabView>
        </>
    );
};

export default TopTab;