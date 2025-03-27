import React, {useCallback, useMemo, useState} from 'react';
import {Appearance, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Card from '../Card.tsx';
import DiscordProfileIcon from '../DiscordProfileIcon.tsx';
import { useModel } from '../../hooks/ModelContext.tsx';
import {eventStyles} from '../../styles/eventStyles.ts';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {statusToColor} from '../../helpers/colors-helper.ts';
import * as Progress from 'react-native-progress';
import {getAcceptedCount} from "../../helpers/plan-helper.ts";


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

  const colorScheme = Appearance.getColorScheme();
  const styles = eventStyles(colorScheme);

  const EventUsers = useCallback((): React.JSX.Element => {
    const users = plan.invitees;

    if (expanded) {
      return <>
        <View style={styles.eventHStack}>
          <FontAwesome6
            name="address-card"
            iconStyle="regular"
            size={20}
            color={'purple'}
          />
          <Text style={styles.eventText}>Invitees</Text>
        </View>
        {users.map(user => {
          const dUser = getUserById(user["user id"]);

          return <View key={dUser.id} style={styles.eventHStack}>
            <DiscordProfileIcon size={20} avatar={dUser.avatar} id={dUser.id} />
            <Text style={[styles.eventText, {color: statusToColor(user.status, colorScheme === 'dark')}]}>{dUser.username}</Text>
          </View>
        })}
        <TouchableOpacity onPress={toggleExpanded} style={styles.eventChevron}>
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
            return <View key={dUser.id} style={styles.eventUserIcon}>
              <DiscordProfileIcon size={20} avatar={dUser.avatar} id={dUser.id} />
            </View>
          })}
        </ScrollView>
        <TouchableOpacity onPress={toggleExpanded} style={styles.eventChevron}>
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

  return <Card darkMode={colorScheme === 'dark'}>
    <View style={styles.eventCard}>
      <Text style={styles.eventTitle}>{plan.title}</Text>
      <View style={styles.eventHStack}>
        <DiscordProfileIcon
          size={20}
          avatar={author.avatar}
          id={author.id}
        />
        <Text style={styles.eventText}>{author.username}</Text>
      </View>
      <View style={styles.eventHStack}>
        <FontAwesome6
          name="clock"
          iconStyle="regular"
          size={20}
          color={'purple'}
        />
        <Text style={styles.eventText}>{plan["start time"] ?? 'Poll'}</Text>
      </View>
      {plan.notes && <View style={styles.eventHStack}>
          <FontAwesome6
              name="note-sticky"
              iconStyle="regular"
              size={20}
              color={'purple'}
          />
          <Text style={styles.eventText}>{plan.notes}</Text>
      </View>}
      {plan.count !== -1 && <>
        <View style={styles.eventHStack}>
          <FontAwesome6
              name="user-check"
              iconStyle="solid"
              size={20}
              color={'purple'}
          />
          <Text style={styles.eventText}>{`0/${plan.count} accepted`}</Text>
        </View>
        <View style={styles.eventProgressBar}>
          <Progress.Bar progress={getAcceptedCount(plan) / plan.count} width={null} height={10} color={'purple'} />
        </View>
      </>
      }
      <EventUsers/>
    </View>
  </Card>;
}

export default EventListView;
