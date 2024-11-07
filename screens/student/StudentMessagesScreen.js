import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, FlatList, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { db, createUserProfile } from '../../config/firebase';
import { collection, doc, addDoc, getDoc, onSnapshot, query, where, orderBy, getDocs, setDoc, serverTimestamp, limit, updateDoc } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function StudentMessagesScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [userId, setUserId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(true);

  useEffect(() => {
    loadFriends();
    loadFriendRequests();
  }, [userId]);

  const hideUnhide = () => {
    setShowFriendRequests(!showFriendRequests);
  };

  const loadFriendRequests = () => {
    if (!userId) return;
    const friendRequestsRef = collection(db, "friendRequests");
    console.log("userid:", userId);
    const q = query(friendRequestsRef, where("receiverId", "==", userId.toString()), where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setFriendRequests(requests);
      console.log("Friend requests:", requests);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  };

  const acceptFriendRequest = async (requestId, senderId, receiverId) => {
    const friendRequestRef = doc(db, "friendRequests", requestId);
    await updateDoc(friendRequestRef, { status: "accepted" });

    const friendsRef = collection(db, "friends");
    await setDoc(doc(friendsRef, `${senderId}_${receiverId}`), {
      user1: senderId,
      user2: receiverId,
      friendshipSince: new Date()
    });

    alert("Friend request accepted!");
    loadFriendRequests();
    loadFriends();
  };

  const rejectFriendRequest = async (requestId) => {
    const friendRequestRef = doc(db, "friendRequests", requestId);
    await updateDoc(friendRequestRef, { status: "rejected" });
    alert("Friend request rejected!");
  };


  const onRefresh = async () => {
    setRefreshing(true);
    await loadFriends();
    setRefreshing(false);
  };

  useEffect(() => {
    const setupUserProfile = async () => {
      try {
        setIsLoading(true);
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession) {
          const parsedSession = JSON.parse(userSession);
          const userId = parsedSession.user_id;
          setUserId(userId);

          const userInfo = {
            displayName: parsedSession.email,
            email: parsedSession.email,
            profilePicUrl: 'https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png',
            userId: userId.toString()
          };

          await createUserProfile(userId, userInfo);
        }
      } catch (error) {
        console.error("Failed to set up user profile:", error);
      }
      finally {
        setIsLoading(false);
      }
    };

    setupUserProfile();
  }, []);

  const loadFriends = () => {
    if (!userId) return;
    setIsLoading(true);
    setFriendsList([]);

    const friendsQuery = query(
      collection(db, 'friendRequests'),
      where('status', '==', 'accepted')
    );

    const unsubscribeFriends = onSnapshot(friendsQuery, async (snapshot) => {
      const friendsPromises = snapshot.docs.map(async (docSnapshot) => {
        console.log("Processing friend:", docSnapshot.id);
        const data = docSnapshot.data();
        const friendId = data.senderId == userId ? data.receiverId : data.senderId;

        const userRef = doc(db, 'users', friendId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : {};

        const conversationId = generateConversationId(userId, friendId);
        const conversationRef = doc(db, 'conversations', conversationId);

        const unsubscribeSeenStatus = onSnapshot(conversationRef, (conversationSnap) => {
          const seenStatus = conversationSnap.exists() ? conversationSnap.data().seen : false;

          const lastMessageQuery = query(
            collection(db, 'conversations', conversationId, 'messages'),
            orderBy('timestamp', 'desc'),
            limit(1)
          );

          const unsubscribeLastMessage = onSnapshot(lastMessageQuery, (lastMessageSnapshot) => {
            let lastMessage = {};
            if (!lastMessageSnapshot.empty) {
              const lastMessageData = lastMessageSnapshot.docs[0].data();
              lastMessage = {
                text: lastMessageData.text || "No message",
                timestamp: lastMessageData.timestamp || 0,
                seen: seenStatus
              };
            } else {
              lastMessage = { text: "No message yet", timestamp: 0, seen: seenStatus };
            }

            setFriendsList((prevFriendsList) => {
              const updatedFriends = prevFriendsList.filter(f => f.friendId !== friendId);

              const newFriendsList = [...updatedFriends, { friendId, ...data, ...userData, lastMessage }];

              newFriendsList.sort((a, b) => (b.lastMessage.timestamp?.seconds || 0) - (a.lastMessage.timestamp?.seconds || 0));

              console.log("Updated and sorted friends list:", newFriendsList);
              return newFriendsList;
            });
          });

          return { friendId, ...data, ...userData, unsubscribeLastMessage, unsubscribeSeenStatus };
        });
      });

      const friends = (await Promise.all(friendsPromises)).filter(Boolean);
      setIsLoading(false);
    });

    return () => {
      unsubscribeFriends();
      friendsList.forEach((friend) => {
        if (friend.unsubscribeLastMessage) {
          friend.unsubscribeLastMessage();
        }
        if (friend.unsubscribeSeenStatus) {
          friend.unsubscribeSeenStatus();
        }
      });
    };
  };

  const selectFriend = async (friend) => {
    setSelectedFriend(friend);
    const conversationId = generateConversationId(userId, friend.friendId);

    const messagesQuery = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    try {
      const snapshot = await getDocs(messagesQuery);
      const conversationMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      markFriendAsSeen(friend);
      navigation.navigate('StudentConversationScreen', {
        name: friend.name,
        selectedFriendId: friend.friendId,
        initialMessages: conversationMessages,
        senderId: userId,
        conversationId: conversationId
      });
    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  };

  const markFriendAsSeen = (friend) => {
    const updatedFriendsList = friendsList.map((f) => {
      if (f.friendId === friend.friendId) {
        return { ...f, seen: true };
      }
      return f;
    });

    setFriendsList(updatedFriendsList);
    console.log("Updated friends list:", JSON.stringify(updatedFriendsList));
  };


  const sendFriendRequest = async (friendId, friendName) => {
    Alert.alert(
      "Add Friend",
      `Would you like to add ${friendName} as a friend?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const friendRequestRef = doc(db, "friendRequests", `${userId}_${friendId}`);
              await setDoc(friendRequestRef, {
                senderId: userId.toString(),
                receiverId: friendId,
                status: "pending"
              });

              setSearchResults([]);
              setSearchText('');

              Alert.alert("Friend request sent!");
            } catch (error) {
              console.error("Error sending friend request: ", error);
              Alert.alert("Failed to send friend request");
            }
          }
        }
      ]
    );
  };

  const searchUsers = async () => {
    setIsLoading(true);
    if (searchText.trim()) {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('email', '==', searchText.trim()))
      );
      const results = querySnapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
      setSearchResults(results);
      setIsLoading(false);
    }
  };

  const generateConversationId = (uid1, uid2) => {
    return Number(uid1) < Number(uid2) ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

  const searchTextChanged = (text) => {
    if (text === '') {
      setSearchResults([]);
    }
    setSearchText(text);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Friend Requests */}
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity onPress={hideUnhide} style={styles.toggleButton}>
          <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: 'bold' }}>Friend Requests</Text>
          <Icon name={showFriendRequests ? "arrow-up-bold" : "arrow-down-bold"} size={24} color="#888" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {showFriendRequests && friendRequests.length > 0 && (
          <FlatList
            data={friendRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.requestCard}>
                <View style={styles.requestInfo}>
                  <Image
                    source={{
                      uri: item.senderProfilePic || 'https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png'
                    }}
                    style={styles.requestAvatar}
                  />
                  <Text style={styles.requestText}>{item.senderName || item.senderId} has sent you a friend request.</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => acceptFriendRequest(item.id, item.senderId, item.receiverId)} style={styles.acceptButton}>
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => rejectFriendRequest(item.id)} style={styles.rejectButton}>
                    <Text style={styles.rejectButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        {showFriendRequests && friendRequests.length == 0 && (
          <Text style={styles.noRequestsText}>No friend requests</Text>
        )}
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search by email"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={() => searchUsers(searchText)}>
          <Icon name="magnify" size={25} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Search Results</Text>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => sendFriendRequest(item.userId, item.displayName)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                  <Image source={{ uri: item.profilePicUrl }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                  <Text style={{ marginLeft: 10 }}>{item.displayName}</Text>
                </View>
              </TouchableOpacity>
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      ) : (
        <FlatList
          data={friendsList}
          keyExtractor={(item) => item.friendId}
          renderItem={({ item }) => {
            //console.log("Rendering item:", item.lastMessage); // Log the item being rendered

            return (
              <TouchableOpacity onPress={() => selectFriend(item)} style={styles.friendItem}>
                <Image source={{ uri: item.profilePicUrl }} style={styles.friendAvatar} />
                <View>
                  <Text style={styles.friendName}>{item.email}</Text>
                  <Text
                    style={[
                      styles.lastMessage,
                      item.lastMessage?.seen == false ? styles.unseenMessage : {}
                    ]}
                  >
                    {item.lastMessage?.text}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />

      )}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: 'gray',
  },
  unseenMessage: {
    fontWeight: 'bold',
    color: 'black',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  messageInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0084ff',
    padding: 10,
    borderRadius: 20,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  requestCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  requestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  requestText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  rejectButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  noRequestsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});
