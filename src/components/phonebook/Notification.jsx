const Notification = ({ message, error }) => {
  if (!message) {
    return null;
  }

  const notificationStyle = {
    background: error ? 'crimson' : '#69d369',
    color: error ? '#eee' : '#101112',
    margin: '8px 0',
    padding: '4px 20px',
    borderRadius: '4px',
    width: 'max-content',
  };

  return (
    <div className="notification" style={notificationStyle}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
