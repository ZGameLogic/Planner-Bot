import React, { useCallback, useState } from 'react';
import { useModel } from '../../hooks/ModelContext.tsx';
import { ScrollView, RefreshControl } from 'react-native';
import EventListView from './EventListView.tsx';

function EventsList(): React.JSX.Element {
  const { plans, refresh } = useModel();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh().finally(() => setRefreshing(false));
  }, [refresh]);

  return (
    <ScrollView
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
