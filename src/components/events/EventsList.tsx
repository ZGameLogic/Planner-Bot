import React, { useCallback, useState } from 'react';
import { useModel } from '../../hooks/ModelContext.tsx';
import { ScrollView, RefreshControl, Appearance } from 'react-native';
import EventListView from './EventListView.tsx';

function EventsList(): React.JSX.Element {
  const { plans, refresh } = useModel();
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = Appearance.getColorScheme();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh().finally(() => setRefreshing(false));
  }, [refresh]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {plans.map(plan => (
        <EventListView key={plan.id} plan={plan} />
      ))}
    </ScrollView>
  );
}

export default EventsList;
