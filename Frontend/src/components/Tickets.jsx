// AgentTickets.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import TicketResolvePopup from "./TicketResolvePopup";

const AgentTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [showResolvePopup, setShowResolvePopup] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState("");

  useEffect(() => {
    // Fetch tickets on component mount
    getTickets();
  }, []);

  const getTickets = async () => {
    try {
      const agentId = 1; // Replace with the actual agent ID
      const response = await axios.get(`http://localhost:3000/api/v1/agent/getTickets?agentId=${agentId}`);

      console.log("Response data:", response.data);

      if (response.status === 200 && response.data && response.data.length > 0) {
        setTickets(response.data);
      } else {
        console.error("Failed to fetch tickets. Server response:", response);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleResolveClick = (ticketId) => {
    const selectedTicket = tickets.find((ticket) => ticket._id === ticketId);
    if (selectedTicket && selectedTicket.Status !== "Closed") {
      setSelectedTicketId(ticketId);
      setShowResolvePopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowResolvePopup(false);
  };

  const handleResolveSave = () => {
    // Implement the logic you need after resolving the ticket
    getTickets(); // Refresh the ticket list or any other action
    setShowResolvePopup(false);
  };

  const centerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // This makes the content take the full height of the viewport
    backgroundImage: 'url("https://images.unsplash.com/photo-1600134637836-9d015f520941?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fFRpY2tldHN8ZW58MHx8MHx8fDA%3D")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: '8px',
    padding: '20px',
    margin: 'auto', // Center the container
    width: '80%', // Adjust as needed
    textAlign: 'center', // Center the text within the container
  };

  const tableStyle = {
    width: '100%', // Full width of the container
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white', // Background color for the table itself
    margin: 'auto', // Center the table
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '16px',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: 'rgba(33, 150, 243, 1)', // Change the background color without transparency
    color: '#fff',
    padding: '16px',
    textAlign: 'left',
  };

  const actionButtonStyle = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={centerStyle}>
      <div style={containerStyle}>
        <h1 style={{ color: '#2196F3', fontSize: '2.5em', marginBottom: '20px' }}>Support Agent Tickets</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Ticket ID</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Issue Type</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Priority</th>
              <th style={thStyle}>Ticket Owner</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td style={thTdStyle}>{ticket._id}</td>
                <td style={thTdStyle}>{ticket.Status}</td>
                <td style={thTdStyle}>{ticket.Issue_Type}</td>
                <td style={thTdStyle}>{ticket.Description}</td>
                <td style={thTdStyle}>{ticket.Priority}</td>
                <td style={thTdStyle}>{ticket.Ticket_Owner}</td>
                <td style={thTdStyle}>
                  {ticket.Status !== "Closed" ? (
                    <button style={actionButtonStyle} onClick={() => handleResolveClick(ticket._id)}>Resolve</button>
                  ) : (
                    <span style={{ color: '#888' }}>Closed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TicketResolvePopup
        isOpen={showResolvePopup}
        onClose={handleClosePopup}
        ticketId={selectedTicketId}
        onResolve={handleResolveSave}
      />
    </div>
  );
};

export default AgentTickets;
