import React from 'react';
import { useModel } from '../../hooks/ModelContext.tsx';
import {ScrollView, Text} from 'react-native';
import EventListView from "./EventListView.tsx";

function EventsList(): React.JSX.Element {
  const { plans } = useModel();

  return <ScrollView>{plans.map(plan => {
    return <EventListView key={plan.id} plan={plan} />
  })}</ScrollView>;
}

export default EventsList;
