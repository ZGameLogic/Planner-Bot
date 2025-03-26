import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Card from '../Card.tsx';
import DiscordProfileIcon from '../DiscordProfileIcon.tsx';
import { useModel } from '../../hooks/ModelContext.tsx';
import {eventStyles} from '../../styles/eventStyles.ts';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

type EventListViewProps = {
  plan: Plan
}

function EventListView({plan}: EventListViewProps): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);

  const { getUserById } = useModel();

  const author = useMemo<DiscordUser>(() => {
    return getUserById(plan["author id"]);
  }, [plan]);

  const toggleExpanded = () => {
    setExpanded(prevState => !prevState);
  };

  const EventUsers = useCallback((): React.JSX.Element => {
    const users = plan.invitees;

    if (expanded) {
      return <>
        <View style={eventStyles.eventHStack}>
          <FontAwesome6
            name="address-card"
            iconStyle="regular"
            size={20}
            color={'purple'}
          />
          <Text style={eventStyles.eventText}>Invitees</Text>
        </View>
        {users.map(user => {
          const dUser = getUserById(user["user id"]);
          return <View key={dUser.id} style={eventStyles.eventHStack}>
            <DiscordProfileIcon size={20} avatar={dUser.avatar} id={dUser.id} />
            <Text style={eventStyles.eventText}>{dUser.username}</Text>
          </View>
        })}
        <TouchableOpacity onPress={toggleExpanded} style={eventStyles.eventChevron}>
          <FontAwesome6
            name="chevron-up"
            iconStyle="solid"
            size={20}
            color={'purple'}
          />
        </TouchableOpacity>
      </>;
    } else {
      return <>
        <ScrollView horizontal={true}>
          {users.map(user => {
            const dUser = getUserById(user["user id"]);
            return <View key={dUser.id} style={eventStyles.eventUserIcon}>
              <DiscordProfileIcon size={20} avatar={dUser.avatar} id={dUser.id} />
            </View>
          })}
        </ScrollView>
        <TouchableOpacity onPress={toggleExpanded} style={eventStyles.eventChevron}>
          <FontAwesome6
            name="chevron-down"
            iconStyle="solid"
            size={20}
            color={'purple'}
          />
        </TouchableOpacity>
      </>
    }
  }, [expanded, plan]);

  return <Card>
    <Text style={eventStyles.eventTitle}>{plan.title}</Text>
    <View style={eventStyles.eventHStack}>
      <DiscordProfileIcon
        size={20}
        avatar={author.avatar}
        id={author.id}
      />
      <Text style={eventStyles.eventText}>{author.username}</Text>
    </View>
    <View style={eventStyles.eventHStack}>
      <FontAwesome6
        name="clock"
        iconStyle="regular"
        size={20}
        color={'purple'}
      />
      <Text style={eventStyles.eventText}>{plan["start time"] ?? 'Poll'}</Text>
    </View>
    {plan.notes && <View style={eventStyles.eventHStack}>
        <FontAwesome6
            name="note-sticky"
            iconStyle="regular"
            size={20}
            color={'purple'}
        />
        <Text style={eventStyles.eventText}>{plan.notes}</Text>
    </View>}
    <EventUsers/>
  </Card>;
}

export default EventListView;
