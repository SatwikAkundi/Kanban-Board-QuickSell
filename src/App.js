import React, { useState, useEffect } from 'react';
import TicketComponent from './components/card';
import './App.css';
import Navbar from './components/Header';

function App() {
  const apiEndpoint = 'https://api.quicksell.co/v1/internal/frontend-assignment';
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const sortTickets = (ticketsToSort) => {
    return ticketsToSort.sort((a, b) => {
      if (sortingOption === 'priority') {
        return b.priority - a.priority;
      } else if (sortingOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const handleGroupingChange = (newGroupingOption) => {
    setGroupingOption(newGroupingOption);
    sessionStorage.setItem('groupingOption', newGroupingOption);
  };

  const handleSortingChange = (newSortingOption) => {
    setSortingOption(newSortingOption);
    sessionStorage.setItem('sortingOption', newSortingOption);
  };

  useEffect(() => {
    const storedGroupingOption = sessionStorage.getItem('groupingOption');
    const storedSortingOption = sessionStorage.getItem('sortingOption');

    setGroupingOption(storedGroupingOption || 'status');
    setSortingOption(storedSortingOption || 'priority');
  }, []);



  const groupTickets = (ticketsToGroup) => {
    if (groupingOption === 'status') {
      return ticketsToGroup.reduce((grouped, ticket) => {
        const status = ticket.status;
        grouped[status] = [...(grouped[status] || []), ticket];
        return grouped;
      }, {});
    } else if (groupingOption === 'user') {
      return ticketsToGroup.reduce((grouped, ticket) => {
        const userName = getUserName(ticket.userId);
        grouped[userName] = [...(grouped[userName] || []), ticket];
        return grouped;
      }, {});
    } else if (groupingOption === 'priority') {
      return ticketsToGroup.reduce((grouped, ticket) => {
        const priorityLabel = getPriorityLabel(ticket.priority);
        grouped[priorityLabel] = [...(grouped[priorityLabel] || []), ticket];
        return grouped;
      }, {});
    }
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response is not valid: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => {
        console.error('Fetching data error:', error);
      });
  }, []);

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : `User (${userId})`;
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 0:
        return 'No priority';
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      case 4:
        return 'Urgent';
      default:
        return `Not defined (${priority})`;
    }
  };



  const groupedAndSortedTickets = groupTickets(sortTickets(tickets));

  return (
    <div className="main">
      <div>
        <Navbar
          className="header"
          onGroupingChange={handleGroupingChange}
          onOrderingChange={handleSortingChange}
        />
      </div>
      <div className="display-board">
        {Object.keys(groupedAndSortedTickets).map((groupKey) => (
          <div key={groupKey} className="sm-card">
            <h2>{groupKey}</h2>
            {groupedAndSortedTickets[groupKey].map((ticket) => (
              <TicketComponent key={ticket.id} {...ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
