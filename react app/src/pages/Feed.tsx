import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../css/Feed.module.css';

// Adjusted to potentially include any string key with string or undefined as value
interface RouteParams {
  [key: string]: string | undefined;
}

interface User {
  id: string;
  Name: string;
  email: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  users?: User[];
}

function Feed() {
  const [groups, setGroups] = useState<Group[]>([]);
  const params = useParams<RouteParams>();

  useEffect(() => {
    fetch("http://localhost:3001/groups")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Groups:', data);
        setGroups(data);
      })
      .catch(error => console.error('Error fetching groups:', error));
  }, []);

  const joinGroup = (groupId: string) => {
    const userId = params.userId || "defaultUserId";
    fetch(`http://localhost:3001/groups/${groupId}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to join group');
      }
      return response.json();
    })
    .then(updatedGroup => {
      console.log(`User ${userId} added to group`, updatedGroup);
    })
    .catch(error => {
      console.error('Error joining group:', error);
    });
  };

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.feedTitle}>Feed</h1>
      <ul>
        {groups.map((group) => (
          <li key={group.id} className={styles.groupItem}>
            <div className={styles.groupImageContainer} />
            <div className={styles.groupContent}>
              <h2 className={styles.groupName}>{group.name}</h2>
              <p className={styles.groupDescription}>{group.description}</p>
              <div>
                <strong>Members:</strong>
                <ul className={styles.membersList}>
                  {group.users?.map((user) => (
                    <li key={user.id} className={styles.memberItem}>{user.Name} ({user.email})</li>
                  ))}
                </ul>
              </div>
            </div>
            <button onClick={() => joinGroup(group.id)} className={styles.joinButton}>Join Group</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feed;
