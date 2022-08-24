import React, { useState } from 'react';
import {
    View,
    Text,
    Animated,
    FlatList
} from 'react-native';
import { Extrapolate } from 'react-native-reanimated';
import {COLORS, SIZES, constants, FONTS} from '../../constants';
import { TextButton } from "../../components";
import Walkthrough1 from './Walkthrough1';
import Walkthrough2 from './Walkthrough2';



const Walkthrough = ({navigation}) => {

    const [walkthroughAnimate2, setWalkthrouhAnimate2] = useState(false);

    const onViewChangeRef = React.useRef(({viewableItems, changed})=>{
        if(viewableItems[0].index == 1){
            setWalkthrouhAnimate2(true)
        }
    })

    const scrollX  = React.useRef(new Animated.Value(0)).current
    

    const Dots  = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width);
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent: 'center'
                }}
            >
                {
                    constants.walkthrough.map((item, index) => {
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.dark08, COLORS.primary, COLORS.dark08],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                style={{
                                    borderRadius: 5,
                                    marginHorizontal: 6,
                                    width: 10,
                                    height: 10,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function renderFooter(){
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right:0,
                    height: SIZES.height * 0.2,
                    //backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.height > 700 ? SIZES.padding : 20,
                }}
            >
                <Dots />

                {/* buttons */}
                <View
                    style={{
                        flexDirection: 'row',
                        height: 55,
                        marginTop: 30,
                    }}
                >
                    <TextButton 
                        label="Join Now"
                        contentContainerStyle={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGrey,
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3,
                        }}
                    />
                           <TextButton 
                                label="Log In"
                                contentContainerStyle={{
                                    flex: 1,
                                    marginLeft: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.primary,
                                }}
                                labelStyle={{                                 
                                    ...FONTS.h3,
                                }}
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{name: "AuthMain"}]
                                    })
                                }}
                    />

                </View>
            </View>
        )
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.light
        }}>
            <Animated.FlatList
                data={constants.walkthrough}
                keyExtractor={(item) => item.id}
                horizontal
                snapToInterval={SIZES.width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewChangeRef.current}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX } } } ],
                    {
                        useNativeDriver: false
                    }
                )}
                renderItem={({item, index})=>{
                    return(
                        <View
                            style={{
                               
                                width: SIZES.width,
                                justifyContent: 'center',
                                
                             
                            }}
                        >
                            {/* walkthrough image section */}
                            <View style={{
                                flex: 1,
                               justifyContent:'center',
                                
                            }}>
                                {index == 0 && <Walkthrough1 />}
                                {index == 1 && <Walkthrough2 animate={walkthroughAnimate2} />}
                            </View>
                             {/* title & description */}
                             <View
                                style={{
                                   // flex: 0.5, 
                                    height: SIZES.height * 0.35,
                                    alignItems:'center',
                                    justifyContent: 'flex-start',
                                    paddingHorizontal: SIZES.padding,
                                    
                                }}
                             >
                                <Text
                                    style={{
                                        ...FONTS.h1,

                                    }}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: SIZES.radius,
                                        textAlign: 'center',
                                        ...FONTS.body3,
                                        color: COLORS.grey

                                    }}
                                >
                                    {item.sub_title}
                                </Text>
                            </View>
                        </View>
                    )
                }}
                
            />
            {renderFooter()}
        </View>
    )
}

export default Walkthrough;