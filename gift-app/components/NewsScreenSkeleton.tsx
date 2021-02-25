import React from 'react';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';;

const NewsScreenSkeleton = () => {
  return ( 
    <SkeletonContent
      containerStyle={{ flex: 1, width: 300 }}
      isLoading={false}
      layout={[
        { key: 'someId', width: 220, height: 20, marginBottom: 6 },
        { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
      ]}
    >
      <Text>Your content</Text>
      <Text>Other content</Text>
    </SkeletonContent>
  )
}

export default NewsScreenSkeleton;